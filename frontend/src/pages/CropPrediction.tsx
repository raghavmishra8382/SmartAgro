import { useState } from 'react';
import { GROQ_API_KEY } from '@/lib/env';
import { FertilizerRecommendationCard, FertilizerAdvice } from '@/components/crop/FertilizerRecommendationCard';
import { Sprout, TestTube, Droplets, Thermometer, FlaskConical, Wind, Activity, RefreshCw } from 'lucide-react';

type SoilParameter = {
  nitrogen: string;
  phosphorus: string;
  potassium: string;
  ph: string;
  rainfall: string;
  temperature: string;
  humidity: string;
};

type CropPrediction = {
  crop: string;
  confidence: number;
};

export default function CropPrediction() {
  const [soilParams, setSoilParams] = useState<SoilParameter>({
    nitrogen: '',
    phosphorus: '',
    potassium: '',
    ph: '',
    rainfall: '',
    temperature: '',
    humidity: ''
  });

  const [selectedCrop, setSelectedCrop] = useState<string>('');
  const [predictions, setPredictions] = useState<CropPrediction[]>([]);
  const [fertilizerAdvice, setFertilizerAdvice] = useState<FertilizerAdvice | null>(null);
  const [isPredicting, setIsPredicting] = useState(false);
  const [isFetchingFertilizer, setIsFetchingFertilizer] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSoilParams(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCropChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCrop(e.target.value);
    setFertilizerAdvice(null); // Clear previous fertilizer recommendations
  };

  const predictCrops = async () => {
    if (!validateInputs()) {
      return;
    }

    setIsPredicting(true);

    try {
      const response = await fetch('https://crop-recommendation-gc3x.onrender.com/predict_crops', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          n: parseFloat(soilParams.nitrogen),
          p: parseFloat(soilParams.phosphorus),
          k: parseFloat(soilParams.potassium),
          temp: parseFloat(soilParams.temperature) || 0,
          humidity: parseFloat(soilParams.humidity) || 0,
          ph: parseFloat(soilParams.ph),
          rainfall: parseFloat(soilParams.rainfall) || 0
        })
      });

      const contentType = response.headers.get("content-type") || "";
      const rawText = await response.text();
      const data = contentType.includes("application/json")
        ? JSON.parse(rawText)
        : null;

      if (!response.ok || !data?.predictions) {
        const serverMsg =
          data?.error ||
          data?.message ||
          `Prediction API error (status ${response.status})`;
        throw new Error(serverMsg);
      }

      setPredictions(data.predictions.slice(0, 5)); // Take top 5 predictions
    } catch (error) {
      console.error('Error fetching predictions:', error);
      alert('Failed to fetch crop predictions. Please try again.');
    } finally {
      setIsPredicting(false);
    }
  };

  const getFertilizerAdvice = async () => {
    if (!selectedCrop) {
      alert('Please select a crop first');
      return;
    }

    setIsFetchingFertilizer(true);
    setFertilizerAdvice(null);

    try {
      if (!GROQ_API_KEY) {
        throw new Error("Groq API Key is missing");
      }

      const prompt = `You are an expert agricultural advisor. Provide detailed fertilizer advice for growing ${selectedCrop} based on these parameters:
      - Nitrogen (N): ${soilParams.nitrogen} kg/ha
      - Phosphorus (P): ${soilParams.phosphorus} kg/ha
      - Potassium (K): ${soilParams.potassium} kg/ha
      - pH: ${soilParams.ph}
      
      Return the response in a structured JSON format with the following keys:
      {
        "cropName": "Name of the crop",
        "detectedIssue": "Brief summary of soil nutrient status (e.g., deficiency in Nitrogen)",
        "recommendedFertilizer": "Primary fertilizer recommended",
        "applicationMethod": "Method (e.g., Broad casting, Drip, Spray)",
        "recommendedQuantity": "Specific dosage/quantity",
        "applicationTiming": "Best time to apply",
        "expectedBenefits": "Outcome for the plant",
        "precautions": "Safety measures"
      }
      Do not use any markdown formatting. Ensure terms are simple and easy for a farmer to understand.`;

      const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${GROQ_API_KEY}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          messages: [
            { role: "system", content: "You are a helpful agricultural expert advisor providing JSON-structured advice." },
            { role: "user", content: prompt }
          ],
          model: "llama-3.3-70b-versatile",
          temperature: 0.7,
          response_format: { type: "json_object" }
        })
      });

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }

      const data = await response.json();
      const adviceContent = data.choices[0]?.message?.content;

      if (adviceContent) {
        const parsedAdvice = JSON.parse(adviceContent) as FertilizerAdvice;
        setFertilizerAdvice(parsedAdvice);
      } else {
        throw new Error("Empty advice response");
      }
    } catch (error) {
      console.error('Error generating fertilizer advice:', error);
      alert('Failed to generate fertilizer advice. Please check your connection and try again.');
    } finally {
      setIsFetchingFertilizer(false);
    }
  };

  const validateInputs = () => {
    const requiredFields = ['nitrogen', 'phosphorus', 'potassium', 'ph'] as const;
    const missingFields = requiredFields.filter(field => !soilParams[field]);

    if (missingFields.length > 0) {
      alert(`Please fill in all required fields: ${missingFields.join(', ')}`);
      return false;
    }

    if (parseFloat(soilParams.ph) < 0 || parseFloat(soilParams.ph) > 14) {
      alert('pH must be between 0 and 14');
      return false;
    }

    return true;
  };

  const resetForm = () => {
    setSoilParams({
      nitrogen: '',
      phosphorus: '',
      potassium: '',
      ph: '',
      rainfall: '',
      temperature: '',
      humidity: ''
    });
    setPredictions([]);
    setSelectedCrop('');
    setFertilizerAdvice(null);
  };

  return (
    <div className="py-12 bg-gray-50/50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2 flex items-center">
            <Sprout className="w-8 h-8 mr-3 text-forest-600" />
            Crop Prediction
          </h1>
          <p className="text-gray-600 max-w-3xl">
            Our advanced algorithms analyze multiple factors to recommend the best crops for your land.
            Enter your soil parameters and get instant AI-powered recommendations tailored to your specific conditions.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Form Section */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="p-6 border-b border-gray-100 bg-gray-50/30 flex justify-between items-center">
                <div>
                  <h2 className="text-lg font-bold text-gray-900">Soil Parameter Analysis</h2>
                  <p className="text-sm text-gray-500 mt-1">Enter your soil test results for accurate predictions</p>
                </div>
                <button
                  onClick={resetForm}
                  className="flex items-center text-sm font-medium text-gray-500 hover:text-forest-600 transition-colors bg-white border border-gray-200 px-3 py-1.5 rounded-lg shadow-sm hover:bg-gray-50"
                >
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Reset
                </button>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* NPK Inputs */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="nitrogen">
                      Nitrogen (N) <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FlaskConical className="h-4 w-4 text-gray-400" />
                      </div>
                      <input
                        type="text"
                        id="nitrogen"
                        name="nitrogen"
                        value={soilParams.nitrogen}
                        onChange={handleInputChange}
                        className="block w-full pl-10 pr-12 py-2.5 sm:text-sm border-gray-300 border rounded-xl focus:ring-forest-500 focus:border-forest-500"
                        placeholder="0-140"
                      />
                      <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                        <span className="text-gray-500 sm:text-sm">kg/ha</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="phosphorus">
                      Phosphorus (P) <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FlaskConical className="h-4 w-4 text-gray-400" />
                      </div>
                      <input
                        type="text"
                        id="phosphorus"
                        name="phosphorus"
                        value={soilParams.phosphorus}
                        onChange={handleInputChange}
                        className="block w-full pl-10 pr-12 py-2.5 sm:text-sm border-gray-300 border rounded-xl focus:ring-forest-500 focus:border-forest-500"
                        placeholder="0-140"
                      />
                      <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                        <span className="text-gray-500 sm:text-sm">kg/ha</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="potassium">
                      Potassium (K) <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FlaskConical className="h-4 w-4 text-gray-400" />
                      </div>
                      <input
                        type="text"
                        id="potassium"
                        name="potassium"
                        value={soilParams.potassium}
                        onChange={handleInputChange}
                        className="block w-full pl-10 pr-12 py-2.5 sm:text-sm border-gray-300 border rounded-xl focus:ring-forest-500 focus:border-forest-500"
                        placeholder="0-200"
                      />
                      <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                        <span className="text-gray-500 sm:text-sm">kg/ha</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="ph">
                      pH Value <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <TestTube className="h-4 w-4 text-gray-400" />
                      </div>
                      <input
                        type="text"
                        id="ph"
                        name="ph"
                        value={soilParams.ph}
                        onChange={handleInputChange}
                        className="block w-full pl-10 py-2.5 sm:text-sm border-gray-300 border rounded-xl focus:ring-forest-500 focus:border-forest-500"
                        placeholder="3.5-9.0"
                      />
                    </div>
                  </div>

                  {/* Environment Inputs */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="rainfall">
                      Rainfall
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Droplets className="h-4 w-4 text-gray-400" />
                      </div>
                      <input
                        type="text"
                        id="rainfall"
                        name="rainfall"
                        value={soilParams.rainfall}
                        onChange={handleInputChange}
                        className="block w-full pl-10 pr-12 py-2.5 sm:text-sm border-gray-300 border rounded-xl focus:ring-forest-500 focus:border-forest-500"
                        placeholder="0-500"
                      />
                      <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                        <span className="text-gray-500 sm:text-sm">mm</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="temperature">
                      Temperature
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Thermometer className="h-4 w-4 text-gray-400" />
                      </div>
                      <input
                        type="text"
                        id="temperature"
                        name="temperature"
                        value={soilParams.temperature}
                        onChange={handleInputChange}
                        className="block w-full pl-10 pr-12 py-2.5 sm:text-sm border-gray-300 border rounded-xl focus:ring-forest-500 focus:border-forest-500"
                        placeholder="0-60"
                      />
                      <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                        <span className="text-gray-500 sm:text-sm">°C</span>
                      </div>
                    </div>
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="humidity">
                      Humidity
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Wind className="h-4 w-4 text-gray-400" />
                      </div>
                      <input
                        type="text"
                        id="humidity"
                        name="humidity"
                        value={soilParams.humidity}
                        onChange={handleInputChange}
                        className="block w-full pl-10 pr-12 py-2.5 sm:text-sm border-gray-300 border rounded-xl focus:ring-forest-500 focus:border-forest-500"
                        placeholder="10-100"
                      />
                      <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                        <span className="text-gray-500 sm:text-sm">%</span>
                      </div>
                    </div>
                  </div>
                </div>

                <button
                  onClick={predictCrops}
                  disabled={isPredicting}
                  className="w-full mt-8 bg-forest-600 hover:bg-forest-700 text-white py-3.5 px-6 rounded-xl font-medium shadow-sm transition duration-200 focus:outline-none focus:ring-2 focus:ring-forest-500 focus:ring-offset-2 disabled:opacity-70 flex items-center justify-center"
                >
                  {isPredicting ? (
                    <>
                      <RefreshCw className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" />
                      Processing Analysis...
                    </>
                  ) : (
                    <>
                      <Activity className="mr-2 h-5 w-5" />
                      Predict Suitable Crops
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Results Section */}
          <div className="lg:col-span-1 space-y-6">
            {predictions.length > 0 && (
              <div className="bg-white rounded-2xl shadow-sm border border-forest-200 overflow-hidden relative">
                <div className="absolute top-0 left-0 w-1 h-full bg-forest-500"></div>
                <div className="p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-1 flex items-center">
                    <Sprout className="w-5 h-5 mr-2 text-forest-600" />
                    Recommended Crops
                  </h3>
                  <p className="text-sm text-gray-500 mb-4">Based on 98% accuracy model</p>
                  <ul className="space-y-3">
                    {predictions.map((pred, index) => (
                      <li key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl border border-gray-100">
                        <div className="flex items-center">
                          <span className="flex items-center justify-center w-6 h-6 rounded-full bg-white shadow-sm border border-gray-200 text-xs font-bold text-gray-700 mr-3">
                            {index + 1}
                          </span>
                          <span className="font-semibold text-gray-800 capitalize">{pred.crop}</span>
                        </div>
                        <span className="text-sm font-medium text-forest-600 bg-forest-50 px-2 py-1 rounded-md">
                          {(pred.confidence).toFixed(1)}% Match
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="p-6 border-b border-gray-100 bg-gray-50/30">
                <h2 className="text-lg font-bold text-gray-900">Fertilizer Advice</h2>
                <p className="text-sm text-gray-500 mt-1">Select a crop for specific recommendations</p>
              </div>
              <div className="p-6">
                <select
                  value={selectedCrop}
                  onChange={handleCropChange}
                  className="block w-full py-2.5 pl-3 pr-10 text-base border-gray-300 border rounded-xl focus:outline-none focus:ring-forest-500 focus:border-forest-500 sm:text-sm"
                  disabled={predictions.length === 0}
                >
                  <option value="">-- Select Crop --</option>
                  {predictions.map(pred => (
                    <option key={pred.crop} value={pred.crop}>
                      {pred.crop}
                    </option>
                  ))}
                </select>

                <button
                  onClick={getFertilizerAdvice}
                  disabled={isFetchingFertilizer || !selectedCrop}
                  className="w-full mt-4 bg-white border border-forest-600 text-forest-700 hover:bg-forest-50 py-3 px-6 rounded-xl font-medium transition duration-200 focus:outline-none focus:ring-2 focus:ring-forest-500 focus:ring-offset-2 disabled:opacity-50 disabled:border-gray-300 disabled:text-gray-400 flex items-center justify-center"
                >
                  {isFetchingFertilizer ? (
                    <>
                      <RefreshCw className="animate-spin -ml-1 mr-3 h-5 w-5" />
                      Generating...
                    </>
                  ) : "Get Fertilizer Advice"}
                </button>
              </div>
            </div>
          </div>
        </div>

        {fertilizerAdvice && (
          <div className="mt-8">
            <FertilizerRecommendationCard advice={fertilizerAdvice} />
          </div>
        )}
      </div>
    </div>
  );
}
