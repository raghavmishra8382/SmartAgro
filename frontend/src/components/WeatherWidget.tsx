import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Cloud,
  Droplets,
  Wind,
  MapPin,
  ThermometerSun,
  ArrowRight,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const WeatherWidget: React.FC = () => {
  const [data, setData] = useState<any>(null);
  const [location, setLocation] = useState<string>("Detecting...");
  const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
  const navigate = useNavigate();

  // Fetch weather by coordinates using Current Weather API (Student Plan compatible)
  const fetchWeatherByCoords = async (lat: number, lon: number) => {
    if (!API_KEY) {
      setLocation("API Key Missing");
      return;
    }
    try {
      // Get accurate location name first using reverse geocoding
      let nextLocation: string | null = null;
      try {
        const reverseGeo = await axios.get(
          `https://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=1&appid=${API_KEY}`
        );
        if (reverseGeo.data?.[0]) {
          const geo = reverseGeo.data[0];
          const parts = [];
          if (geo.name) parts.push(geo.name);
          if (geo.state && geo.state !== geo.name) parts.push(geo.state);
          if (geo.country) parts.push(geo.country);
          nextLocation = parts.length > 0 ? parts.join(", ") : geo.name || null;
        }
      } catch (reverseErr) {
        console.warn("Reverse geocoding failed, will try other methods:", reverseErr);
      }

      // Try current weather API first
      let weatherData;
      try {
        const res = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`
        );
        weatherData = res.data;
        if (!nextLocation && res.data.name) {
          nextLocation = res.data.name;
        }
      } catch (currentErr: any) {
        try {
          const forecastRes = await axios.get(
            `https://api.openweathermap.org/data/2.5/forecast/daily?lat=${lat}&lon=${lon}&cnt=1&units=metric&appid=${API_KEY}`
          );
          if (forecastRes.data.list && forecastRes.data.list.length > 0) {
            const firstDay = forecastRes.data.list[0];
            weatherData = {
              main: {
                temp: firstDay.temp.day,
                feels_like: firstDay.feels_like.day,
                humidity: firstDay.humidity,
                pressure: firstDay.pressure,
              },
              weather: firstDay.weather,
              wind: {
                speed: (firstDay.speed || 0) * 3.6,
              },
              visibility: 10000,
            };
            if (!nextLocation && forecastRes.data.city?.name) {
              nextLocation = forecastRes.data.city.name;
            }
          }
        } catch (forecastErr) {
          throw currentErr; // Throw original error
        }
      }

      if (weatherData) {
        setData(weatherData);
      }

      if (!nextLocation) {
        nextLocation = `${lat.toFixed(4)}, ${lon.toFixed(4)}`;
      }
      setLocation(nextLocation);
    } catch (err: any) {
      console.error("Error fetching weather:", err);
      if (err?.response?.status === 401) {
        setLocation("Invalid API Key");
      } else {
        setLocation("Error loading weather");
      }
    }
  };

  // Detect user location
  useEffect(() => {
    if (!API_KEY) return;
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          fetchWeatherByCoords(pos.coords.latitude, pos.coords.longitude);
        },
        (error) => {
          console.warn("Geolocation error:", error);
          fetchWeatherByCoords(22.5726, 88.3639); // Default: Kolkata
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 300000,
        }
      );
    } else {
      fetchWeatherByCoords(22.5726, 88.3639);
    }
  }, [API_KEY]);

  if (!API_KEY) {
    return (
      <div className="card-premium p-6 text-center">
        <div className="text-sm text-gray-500 font-medium">Weather API key missing</div>
        <div className="text-xs text-gray-400 mt-1">Add VITE_WEATHER_API_KEY to Client/.env</div>
      </div>
    );
  }

  if (!data)
    return (
      <div className="card-premium p-6">
        <div className="space-y-3">
          <div className="h-4 w-24 bg-gray-100 rounded animate-pulse" />
          <div className="h-8 w-20 bg-gray-100 rounded animate-pulse" />
          <div className="grid grid-cols-3 gap-3">
            {[1,2,3].map(i => <div key={i} className="h-16 bg-gray-50 rounded-xl animate-pulse" />)}
          </div>
        </div>
      </div>
    );

  return (
    <div
      className="card-premium p-5 md:p-6 cursor-pointer group space-y-4"
      onClick={() => navigate("/weather")}
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="section-label mb-1">
            Local Conditions
          </p>
          <h2 className="text-base font-bold text-gray-900 flex items-center gap-2">
            <MapPin className="h-4 w-4 text-forest-600" />
            <span className="truncate">{location}</span>
          </h2>
        </div>
        <div className="rounded-xl bg-gradient-to-br from-sky-50 to-blue-50 p-2 border border-sky-100/60 group-hover:shadow-soft transition-all duration-200">
          <img
            src={`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`}
            alt="Weather"
            className="h-12 w-12"
          />
        </div>
      </div>

      <div className="flex items-baseline gap-3">
        <div className="text-4xl font-bold text-gray-900 tracking-tight">
          {Math.round(data.main.temp)}°C
        </div>
        <div className="flex items-center gap-1.5 text-sm text-gray-500">
          <ThermometerSun className="h-4 w-4 text-cream-600" />
          <span>Feels {Math.round(data.main.feels_like || data.main.temp)}°</span>
        </div>
      </div>
      <p className="text-sm text-gray-600 capitalize font-medium">
        {data.weather[0].description}
      </p>

      <div className="grid grid-cols-3 gap-2.5">
        <InfoChip
          icon={Droplets}
          label="Humidity"
          value={`${data.main.humidity}%`}
          tone="sky"
        />
        <InfoChip icon={Wind} label="Wind" value={`${data.wind.speed} km/h`} tone="forest" />
        <InfoChip
          icon={Cloud}
          label="Visibility"
          value={`${(data.visibility / 1000).toFixed(1)} km`}
          tone="cream"
        />
      </div>

      <div className="flex items-center justify-between text-xs text-gray-400 pt-1 group-hover:text-gray-500 transition-colors">
        <span className="font-medium">Tap for full forecast</span>
        <span className="flex items-center gap-1 text-forest-600 font-bold group-hover:gap-2 transition-all duration-200">
          View details <ArrowRight className="h-3 w-3" />
        </span>
      </div>
    </div>
  );
};

export default WeatherWidget;

const InfoChip = ({
  icon: Icon,
  label,
  value,
  tone = "slate",
}: {
  icon: any;
  label: string;
  value: string;
  tone?: "forest" | "cream" | "sky" | "slate";
}) => {
  const tones = {
    forest: { bg: "bg-forest-50/80", text: "text-forest-600", border: "border-forest-100/40" },
    cream: { bg: "bg-cream-50/80", text: "text-cream-700", border: "border-cream-200/40" },
    sky: { bg: "bg-sky-50/80", text: "text-sky-600", border: "border-sky-100/40" },
    slate: { bg: "bg-gray-50/80", text: "text-gray-600", border: "border-gray-100/40" },
  };
  const t = (tones as any)[tone] || tones.slate;
  return (
    <div className={`rounded-xl border ${t.border} bg-white p-2.5 flex flex-col gap-1 shadow-inner-soft`}>
      <div className={`inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wide ${t.text}`}>
        <Icon className="h-3.5 w-3.5" />
        {label}
      </div>
      <span className="text-sm font-bold text-gray-800">{value}</span>
    </div>
  );
};
