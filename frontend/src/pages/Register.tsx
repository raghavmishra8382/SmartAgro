import React, { useState } from "react";
import { Eye, EyeOff, Wheat, X, UserPlus, Sparkles } from "lucide-react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

interface FormData {
  fullName: string;
  email: string;
  phoneNumber: string;
  password: string;
  location: string;
  farmSize: string;
  language: string;
}

export default function Register() {
  const navigate = useNavigate();
  const { register } = useAuth();
  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    email: "",
    phoneNumber: "",
    password: "",
    location: "",
    farmSize: "",
    language: "English",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Handle input changes
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError("");
  };

  // Handle Step 1 (Basic Info)
  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!formData.fullName || !formData.email || !formData.password) {
      setError("Please fill all required fields.");
      return;
    }

    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return;
    }

    // Open the dialog for next details
    setShowDialog(true);
  };

  // Handle Final Submit (Step 2)
  const handleFinalSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await register(formData);
      navigate("/home");
    } catch (err: any) {
      setError(err.message || "Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[hsl(40,33%,98%)] p-4 sm:p-6 relative overflow-hidden">
      {/* Decorative background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-forest-100/30 rounded-full blur-3xl" />
        <div className="absolute -bottom-24 -right-24 w-80 h-80 bg-cream-200/40 rounded-full blur-3xl" />
        <div className="absolute top-1/3 right-1/3 w-[500px] h-[500px] bg-sage-100/20 rounded-full blur-3xl" />
      </div>

      <div className="w-full max-w-[440px] relative z-10 animate-fadeInUp">
        <div className="bg-white/90 backdrop-blur-xl border border-gray-100/80 rounded-3xl shadow-elevated p-7 sm:p-9 relative">
          {/* App Icon */}
          <div className="text-center mb-7">
            <div className="flex items-center justify-center w-14 h-14 bg-gradient-to-br from-forest-600 to-forest-700 rounded-2xl shadow-glow-green mx-auto mb-4">
              <Wheat className="w-7 h-7 text-white" />
            </div>
            <h1 className="text-2xl sm:text-[28px] font-bold text-gray-900 tracking-tight">
              Create Account
            </h1>
            <p className="text-gray-500 text-sm mt-1.5 font-medium flex items-center justify-center gap-1.5">
              Step 1: Basic Information
              <Sparkles className="h-3.5 w-3.5 text-cream-600" />
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-5 p-3.5 bg-red-50 border border-red-100/60 rounded-xl text-red-600 text-sm font-medium animate-scaleIn">
              {error}
            </div>
          )}

          {/* Step 1 Form */}
          <form onSubmit={handleNext} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">Full Name</label>
              <input
                name="fullName"
                type="text"
                placeholder="John Doe"
                value={formData.fullName}
                onChange={handleChange}
                required
                className="input-premium py-3"
              />
            </div>

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
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">Phone</label>
              <input
                name="phoneNumber"
                type="tel"
                placeholder="+91 XXXXX XXXXX"
                value={formData.phoneNumber}
                onChange={handleChange}
                className="input-premium py-3"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">Password</label>
              <div className="relative">
                <input
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Min. 6 characters"
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
              className="btn-primary w-full h-12 text-[15px] mt-2"
            >
              <UserPlus className="w-4 h-4" />
              Continue
            </button>
          </form>

          {/* Step 2 Dialog */}
          {showDialog && (
            <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50 p-4">
              <div className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-elevated w-full max-w-md p-7 relative max-h-[90vh] overflow-y-auto animate-scaleIn border border-gray-100/80">
                <button
                  onClick={() => setShowDialog(false)}
                  className="absolute top-4 right-4 p-1.5 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-all"
                >
                  <X className="w-4 h-4" />
                </button>

                <h2 className="text-xl font-bold text-gray-900 mb-1 tracking-tight">
                  Farm Details
                </h2>
                <p className="text-sm text-gray-500 mb-5 font-medium">Step 2: Tell us about your farm</p>

                {/* Error Message in Dialog */}
                {error && (
                  <div className="mb-4 p-3.5 bg-red-50 border border-red-100/60 rounded-xl text-red-600 text-sm font-medium">
                    {error}
                  </div>
                )}

                <form onSubmit={handleFinalSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">Location</label>
                    <input
                      name="location"
                      type="text"
                      placeholder="Village / District"
                      value={formData.location}
                      onChange={handleChange}
                      className="input-premium py-3"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">Farm Size</label>
                    <input
                      name="farmSize"
                      type="number"
                      placeholder="Size in acres"
                      value={formData.farmSize}
                      onChange={handleChange}
                      className="input-premium py-3"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">Language</label>
                    <select
                      name="language"
                      value={formData.language}
                      onChange={handleChange}
                      className="input-premium py-3"
                    >
                      <option value="English">English</option>
                      <option value="Hindi">Hindi</option>
                      <option value="Bhojpuri">Bhojpuri</option>
                      <option value="Gujarati">Gujarati</option>
                      <option value="Marathi">Marathi</option>
                    </select>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="btn-primary w-full h-12 text-[15px] mt-2 disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {loading ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        Creating account…
                      </>
                    ) : (
                      "Create Account"
                    )}
                  </button>
                </form>
              </div>
            </div>
          )}

          {/* Login Link */}
          <div className="text-center mt-6 text-sm text-gray-500">
            <p>
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-forest-600 hover:text-forest-700 font-semibold transition"
              >
                Sign in
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
