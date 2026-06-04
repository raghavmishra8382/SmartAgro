/**
 * Environment variable validation for production deployment
 * Ensures all required variables are set before server starts
 */

export const validateEnvironment = () => {
  const required = {
    MONGO_URI: "MongoDB connection string",
    JWT_SECRET: "JWT signing secret (min 32 chars)",
    GROQ_API_KEY: "Groq API key for LLM",
    DISEASE_API_URL: "Disease prediction API URL",
    NODE_ENV: "Node environment (development/production)",
  };

  const missing = [];
  const weak = [];

  for (const [key, description] of Object.entries(required)) {
    if (!process.env[key]) {
      missing.push(`${key}: ${description}`);
    }
  }

  // JWT_SECRET strength check
  if (process.env.JWT_SECRET && process.env.JWT_SECRET.length < 32) {
    weak.push(`JWT_SECRET is ${process.env.JWT_SECRET.length} chars (min 32 recommended)`);
  }

  if (missing.length > 0) {
    const message =
      `\n\n❌ CRITICAL: Missing required environment variables:\n` +
      missing.map((m) => `  - ${m}`).join("\n") +
      `\n\nSet these in your deployment platform (Render/Vercel dashboard).\n` +
      `For local development, create a .env file in the server directory.\n\n`;
    throw new Error(message);
  }

  if (weak.length > 0) {
    console.warn("\n⚠️  WARNING: Weak environment variables:");
    weak.forEach((w) => console.warn(`  - ${w}`));
    console.warn("  Consider using stronger values\n");
  }
};

/**
 * Generate a secure JWT secret for development
 * Run: node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
 */
export const generateSecureJWTSecret = () => {
  return require("crypto").randomBytes(32).toString("hex");
};
