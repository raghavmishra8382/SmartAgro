from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import tensorflow as tf
from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing import image
from tensorflow.keras.applications import EfficientNetB0
from tensorflow.keras import layers, models
import numpy as np
import io
from PIL import Image
import os

app = FastAPI(title="SmartAgro Plant Disease Prediction API")

# Configure CORS to allow the frontend to make requests directly if needed
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Model paths - adjust based on your actual model location
MODEL_DIR = os.path.join(os.path.dirname(__file__), '../model')
MODEL_WEIGHTS_PATH = os.path.join(MODEL_DIR, 'disease_model.weights.h5')
MODEL_H5_PATH = os.path.join(MODEL_DIR, 'disease_model.h5')
MODEL_SAVED_MODEL_PATH = os.path.join(MODEL_DIR, 'disease_model')

# Model input size (must match training)
IMG_SIZE = (160, 160)

CLASS_NAMES = [
    'Pepper__bell___Bacterial_spot', 'Pepper__bell___healthy', 
    'Potato___Early_blight', 'Potato___Late_blight', 'Potato___healthy',
    'Tomato_Bacterial_spot', 'Tomato_Early_blight', 'Tomato_Late_blight',
    'Tomato_Leaf_Mold', 'Tomato_Septoria_leaf_spot', 
    'Tomato_Spider_mites_Two_spotted_spider_mite', 'Tomato_Target_Spot',
    'Tomato_Tomato_Yellow_Leaf_Curl_Virus', 'Tomato_Tomato_mosaic_virus',
    'Tomato_healthy'
]

model = None

def load_prediction_model():
    global model
    try:
        # 1. Try loading full H5 model first
        if os.path.exists(MODEL_H5_PATH):
            model = load_model(MODEL_H5_PATH)
            print(f"[SUCCESS] Loaded full model from {MODEL_H5_PATH}")
        # 2. Try loading TensorFlow SavedModel folder
        elif os.path.exists(MODEL_SAVED_MODEL_PATH) and os.path.isdir(MODEL_SAVED_MODEL_PATH):
            model = load_model(MODEL_SAVED_MODEL_PATH)
            print(f"[SUCCESS] Loaded model from SavedModel folder {MODEL_SAVED_MODEL_PATH}")
        # 3. Try loading weights
        elif os.path.exists(MODEL_WEIGHTS_PATH):
            # Rebuild the model architecture to load weights
            inputs = layers.Input(shape=(*IMG_SIZE, 3))
            x = layers.Rescaling(1.0 / 255)(inputs)
            base_model = EfficientNetB0(
                weights='imagenet',
                include_top=False,
                input_shape=(*IMG_SIZE, 3)
            )
            base_model.trainable = False
            x = base_model(x)
            x = layers.GlobalAveragePooling2D()(x)
            x = layers.Dense(128, activation='relu')(x)
            x = layers.Dropout(0.3)(x)
            outputs = layers.Dense(len(CLASS_NAMES), activation='softmax')(x)
            model = models.Model(inputs, outputs)
            model.load_weights(MODEL_WEIGHTS_PATH)
            print(f"[SUCCESS] Loaded model weights from {MODEL_WEIGHTS_PATH}")
        else:
            print("[WARNING] Model files not found. Inference will be disabled until a model is placed in the model/ directory.")
    except Exception as e:
        print(f"[ERROR] Error loading model: {e}")
        model = None

# Load model on startup
@app.on_event("startup")
async def startup_event():
    load_prediction_model()

@app.get("/health")
def health():
    return {
        "status": "ok",
        "model_loaded": model is not None
    }

@app.post("/predict")
async def predict(image: UploadFile = File(...)):
    global model
    if model is None:
        # Try one more load attempt in case user pasted the model after startup
        load_prediction_model()
        if model is None:
            raise HTTPException(status_code=503, detail="Model is not loaded on the server.")

    try:
        # Read uploaded image bytes
        contents = await image.read()
        pil_img = Image.open(io.BytesIO(contents)).convert("RGB")
        
        # Preprocess: resize to match model inputs
        pil_img = pil_img.resize(IMG_SIZE)
        img_array = np.array(pil_img)
        img_array = np.expand_dims(img_array, axis=0) / 255.0

        # Predict
        prediction = model.predict(img_array, verbose=0)
        predicted_index = np.argmax(prediction)
        predicted_class = CLASS_NAMES[predicted_index]
        confidence = float(np.max(prediction) * 100)

        # Parse disease information
        disease_name = predicted_class.replace('__', ' ').replace('_', ' ')
        is_healthy = 'healthy' in predicted_class.lower()

        return {
            'disease': disease_name,
            'predicted_class': predicted_class,
            'confidence': round(confidence, 2),
            'status': 'healthy' if is_healthy else 'disease_detected',
            'is_healthy': is_healthy,
            'all_predictions': {
                CLASS_NAMES[i]: float(prediction[0][i] * 100) 
                for i in range(len(CLASS_NAMES))
            }
        }
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Prediction failed: {str(e)}")

if __name__ == '__main__':
    import uvicorn
    # Run on port 5001 to match existing configuration
    uvicorn.run(app, host="127.0.0.1", port=5001)
