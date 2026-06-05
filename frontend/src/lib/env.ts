export const GROQ_API_KEY = import.meta.env.VITE_GROQ_API_KEY || "";
export const ELEVENLABS_API_KEY = import.meta.env.VITE_ELEVENLABS_API_KEY || "";
export const OPENWEATHER_API_KEY = import.meta.env.VITE_WEATHER_API_KEY || "";

// API Base URL Configuration
// Falls back to localhost for local development; production value comes from .env.production / Vercel env vars
export const API_BASE_URL =
    import.meta.env.VITE_API_URL || "http://localhost:5050";

// Plant disease ML service (FastAPI on Render)
export const DISEASE_API_URL =
    import.meta.env.VITE_DISEASE_API_URL || "http://localhost:5001";

// Helper function to construct API URLs
export const apiUrl = (path: string): string => {
    return `${API_BASE_URL}${path}`;
};
