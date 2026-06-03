import React, { useState } from "react";
import { Eye, EyeOff, Wheat, LogIn, Sparkles } from "lucide-react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

interface LoginData {
  email: string;
  password: string;
}

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [formData, setFormData] = useState<LoginData>({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError("");
  };

  // Handle Login Submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!formData.email || !formData.password) {
      setError("Please enter both email and password.");
      return;
    }

    setLoading(true);
    try {
      await login(formData.email, formData.password);
      navigate("/home");
    } catch (err: any) {
      setError(err.message || "Invalid credentials. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[hsl(40,33%,98%)] p-4 sm:p-6 relative overflow-hidden">
      {/* Decorative background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-forest-100/30 rounded-full blur-3xl" />
        <div className="absolute -bottom-24 -left-24 w-80 h-80 bg-cream-200/40 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-sage-100/20 rounded-full blur-3xl" />
      </div>

      <div className="w-full max-w-[420px] relative z-10 animate-fadeInUp">
        {/* Card */}
        <div className="bg-white/90 backdrop-blur-xl border border-gray-100/80 rounded-3xl shadow-elevated p-7 sm:p-9">
          {/* App Icon */}
          <div className="text-center mb-7">
            <div className="flex items-center justify-center w-14 h-14 bg-gradient-to-br from-forest-600 to-forest-700 rounded-2xl shadow-glow-green mx-auto mb-4">
              <Wheat className="w-7 h-7 text-white" />
            </div>
            <h1 className="text-2xl sm:text-[28px] font-bold text-gray-900 tracking-tight">
              Welcome Back
            </h1>
            <p className="text-gray-500 text-sm mt-1.5 font-medium flex items-center justify-center gap-1.5">
              Sign in to continue
              <Sparkles className="h-3.5 w-3.5 text-cream-600" />
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-5 p-3.5 bg-red-50 border border-red-100/60 rounded-xl text-red-600 text-sm font-medium animate-scaleIn">
              {error}
            </div>
          )}

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">Email</label>
              <input
                name="email"
                type="email"
                placeholder="your@email.com"
                value={formData.email}
                onChange={handleChange}
                required
                className="input-premium py-3"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">Password</label>
              <div className="relative">
                <input
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="input-premium py-3 pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition p-1"
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full h-12 text-[15px] mt-2 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  Signing in…
                </>
              ) : (
                <>
                  <LogIn className="w-4 h-4" />
                  Sign In
                </>
              )}
            </button>
          </form>

          {/* Extra Links */}
          <div className="text-center mt-6 text-sm text-gray-500">
            <p>
              Don't have an account?{" "}
              <Link
                to="/register"
                className="text-forest-600 hover:text-forest-700 font-semibold transition"
              >
                Create one
              </Link>
            </p>
          </div>
        </div>

        {/* Branding */}
        <p className="text-center mt-5 text-xs text-gray-400 font-medium">
          Powered by <span className="text-forest-600 font-semibold">SmartAgro AI</span>
        </p>
      </div>
    </div>
  );
}
