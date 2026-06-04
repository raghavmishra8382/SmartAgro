# Deployment Setup Guide - How to Get & Replace All Values

This guide shows **exactly** how to obtain each value needed for production deployment and where to replace them.

---

## 🔑 Required Values & How to Get Them

### 1. Groq API Key

**What it is:** LLM API key for AI chat features  
**Cost:** FREE (free tier available)  
**Time to get:** 2 minutes

**Steps:**
1. Go to https://console.groq.com
2. Click "Sign in" or "Sign up" (free)
3. Go to API Keys section (or https://console.groq.com/keys)
4. Click "Create API Key"
5. Copy the key (starts with `gsk_`)
6. **Keep this safe - treat it like a password**

**Example:** `gsk_eAbCdEfGhIjKlMnOpQrStUvWxYz1234567890`

**Where to use it:**
```bash
# Backend (Render):
GROQ_API_KEY=gsk_eAbCdEfGhIjKlMnOpQrStUvWxYz1234567890

# Frontend (Vercel):
VITE_GROQ_API_KEY=gsk_eAbCdEfGhIjKlMnOpQrStUvWxYz1234567890
```

---

### 2. OpenWeather API Key

**What it is:** Weather data API for weather widget  
**Cost:** FREE (free tier: 60 calls/min)  
**Time to get:** 5 minutes

**Steps:**
1. Go to https://openweathermap.org/api
2. Scroll down, find "Current Weather Data"
3. Click "Subscribe" under Free
4. Click "Sign Up" (or log in if you have account)
5. Create account with email
6. Check email, click verification link
7. Go back to https://openweathermap.org/api/one-call-3
8. Find your API key (or go to Account → API Keys)
9. Copy the Default key

**Example:** `7f8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e`

**Where to use it:**
```bash
# Frontend (Vercel):
VITE_WEATHER_API_KEY=7f8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e
```

---

### 3. MongoDB Atlas Connection String

**What it is:** Database connection URL  
**Cost:** FREE (512MB storage)  
**Time to get:** 5 minutes

**Steps:**
1. Go to https://www.mongodb.com/cloud/atlas
2. Sign up (free) or log in
3. Create a project (any name)
4. Click "Build a Database"
5. Select **M0 Sandbox** (free tier)
6. Choose your region (closest to you)
7. Click "Create" (takes 1-2 min)
8. Click "Security" → "Database Access"
9. Click "Add New Database User"
10. Create user:
    - **Username:** `smartagro_user`
    - **Password:** Generate and copy (or create strong one)
    - Click "Add User"
11. Go back to Databases, click "Connect"
12. Select "Drivers" → Node.js
13. Copy the connection string
14. **Replace placeholders:**
    - `<username>` → `smartagro_user`
    - `<password>` → Your password (URL-encode if special chars)
    - `<database>` → `smartagro`

**Example URL:**
```
mongodb+srv://smartagro_user:MyP%40ssw0rd123@cluster0.abc123.mongodb.net/smartagro?retryWrites=true&w=majority
```

**Password URL Encoding:**
- `@` → `%40`
- `:` → `%3A` (inside password only, not before username)
- `?` → `%3F`
- `/` → `%2F`
- `#` → `%23`

**Where to use it:**
```bash
# Backend (Render):
MONGO_URI=mongodb+srv://smartagro_user:MyP%40ssw0rd123@cluster0.abc123.mongodb.net/smartagro?retryWrites=true&w=majority
```

---

### 4. JWT Secret (Generate One)

**What it is:** Secret key for signing authentication tokens  
**Cost:** FREE (generate yourself)  
**Time to get:** 1 minute

**How to generate:**

**Option A: Using Node.js (easiest)**
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```
Output example: `7a8f9c3e1d5b2a8f4c7e3a1d9b5f2e8c3a7b1d4f9a2e5c8b1d4a7e9f2c5a8`

**Option B: Using PowerShell**
```powershell
[Convert]::ToBase64String((1..32 | ForEach-Object {Get-Random -Maximum 256}) -as [byte[]])
```

**Option C: Generate online (less secure)**
Visit https://www.uuidgenerator.net/uuid4 and refresh multiple times to get random string

**Where to use it:**
```bash
# Backend (Render):
JWT_SECRET=7a8f9c3e1d5b2a8f4c7e3a1d9b5f2e8c3a7b1d4f9a2e5c8b1d4a7e9f2c5a8
```

---

### 5. Vapi AI Keys (Optional - for voice features)

**What it is:** Voice AI for voice assistant widget  
**Cost:** FREE tier available  
**Time to get:** 10 minutes (if needed)

**Only if you want voice features. Otherwise, skip.**

**Steps:**
1. Go to https://vapi.ai
2. Sign up (free)
3. Go to Dashboard → API Keys
4. Create new key
5. Copy API Key
6. Go to Assistants
7. Create new assistant
8. Copy Assistant ID

**Where to use it:**
```bash
# Frontend (Vercel):
VITE_VAPI_API_KEY=your_vapi_key_here
VITE_VAPI_ASSISTANT_ID=your_assistant_id_here
```

---

## 📋 Complete Checklist

Before deployment, collect all values:

- [ ] Groq API Key (required)
- [ ] OpenWeather API Key (required for weather widget)
- [ ] MongoDB connection string (required)
- [ ] JWT Secret (required)
- [ ] Vapi API Key (optional - only if using voice)
- [ ] Vapi Assistant ID (optional - only if using voice)

---

## 🚀 Step-by-Step Deployment

### Step 1: Create MongoDB Atlas Cluster

1. Go to https://www.mongodb.com/cloud/atlas
2. Create free M0 cluster (see section 3 above)
3. Get your connection string
4. **Copy and save:** MongoDB connection string

---

### Step 2: Deploy Backend to Render

1. Go to https://render.com
2. Sign up / Sign in with GitHub
3. Click "New" → "Web Service"
4. Connect your GitHub repo (raghavmishra8382/SmartAgro)
5. Configuration:
   - **Name:** `smartagro-backend`
   - **Branch:** agents/repo-update-check-clone-or-not
   - **Runtime:** Node
   - **Build command:** `cd server && npm install`
   - **Start command:** `cd server && npm start`
   - **Plan:** Free

6. Click "Advanced" and add Environment Variables:

| Key | Value |
|-----|-------|
| `PORT` | `5000` |
| `NODE_ENV` | `production` |
| `MONGO_URI` | Your MongoDB connection string |
| `JWT_SECRET` | Your generated JWT secret |
| `GROQ_API_KEY` | Your Groq API key |
| `DISEASE_API_URL` | `https://smartagro-ml.onrender.com` |
| `FRONTEND_URL` | `https://your-vercel-domain.vercel.app` |

7. Click "Deploy"
8. Wait 3-5 minutes
9. **Copy the URL:** `https://smartagro-backend.onrender.com`

---

### Step 3: Deploy ML Service to Render

1. In Render dashboard, click "New" → "Web Service"
2. Connect same GitHub repo
3. Configuration:
   - **Name:** `smartagro-ml`
   - **Branch:** agents/repo-update-check-clone-or-not
   - **Runtime:** Python
   - **Build command:** `pip install -r backend/requirements.txt`
   - **Start command:** `cd backend && python app.py`
   - **Plan:** Free

4. Add Environment Variables:

| Key | Value |
|-----|-------|
| `PORT` | `5001` |
| `HOST` | `0.0.0.0` |

5. Click "Deploy"
6. Wait 3-5 minutes
7. **Copy the URL:** `https://smartagro-ml.onrender.com`

---

### Step 4: Deploy Frontend to Vercel

1. Go to https://vercel.com
2. Sign up / Sign in with GitHub
3. Click "Add New" → "Project"
4. Import GitHub repo (raghavmishra8382/SmartAgro)
5. Configuration:
   - **Framework Preset:** React
   - **Root Directory:** `frontend`
   - **Build Command:** (keep default)
   - **Output Directory:** `dist`

6. Click "Environment Variables" and add:

| Key | Value |
|-----|-------|
| `VITE_API_URL` | `https://smartagro-backend.onrender.com` |
| `VITE_DISEASE_API_URL` | `https://smartagro-ml.onrender.com` |
| `VITE_GROQ_API_KEY` | Your Groq API key |
| `VITE_WEATHER_API_KEY` | Your OpenWeather API key |

7. Click "Deploy"
8. Wait 1-2 minutes
9. **Copy your Vercel URL:** `https://smartagro-xxxxxx.vercel.app`

---

### Step 5: Update Backend with Frontend URL

Now that you have your Vercel URL, go back to Render:

1. Go to Render dashboard
2. Click on `smartagro-backend` service
3. Go to "Settings" → "Environment"
4. Find `FRONTEND_URL`
5. Change it from placeholder to your actual Vercel URL
   - **Example:** `https://smartagro-12345.vercel.app`
6. Click "Save"
7. Render auto-redeploys (takes 1-2 min)

---

## ✅ Verify Deployment

Test each service:

```bash
# Backend health
curl https://smartagro-backend.onrender.com/api/health
# Expected: {"status":"ok"}

# ML service health
curl https://smartagro-ml.onrender.com/health
# Expected: {"status":"ok","model_loaded":true or false}

# Frontend
Open: https://smartagro-xxxxxx.vercel.app
```

---

## 🆘 Troubleshooting

### "Cannot connect to API" error
1. Check browser DevTools (F12) → Console
2. Verify VITE_API_URL is set correctly in Vercel
3. Verify backend Render URL is correct
4. Trigger Vercel redeploy: Dashboard → Redeploy

### Backend won't start
1. Check Render Logs: Dashboard → Service → Logs
2. Verify MONGO_URI is correct (check for typos)
3. Verify JWT_SECRET is set
4. Verify GROQ_API_KEY is set

### ML service shows "Model is not loaded"
1. This is OK - model file not in repo (too large)
2. You need to either:
   - Add model.h5 file to `model/` directory
   - Or contact admin for model file
3. For now, disease prediction feature will not work

### First request takes 30+ seconds
1. This is normal on Render free tier
2. Services sleep after 15 minutes of inactivity
3. First request "wakes them up" (cold start)
4. Subsequent requests are fast

---

## 📝 Summary of Environment Variables

**Backend (Render):**
```
PORT=5000
NODE_ENV=production
MONGO_URI=<your MongoDB connection string>
JWT_SECRET=<your 32+ char secret>
GROQ_API_KEY=<your Groq key>
DISEASE_API_URL=https://smartagro-ml.onrender.com
FRONTEND_URL=https://your-vercel-domain.vercel.app
```

**ML Service (Render):**
```
PORT=5001
HOST=0.0.0.0
```

**Frontend (Vercel):**
```
VITE_API_URL=https://smartagro-backend.onrender.com
VITE_DISEASE_API_URL=https://smartagro-ml.onrender.com
VITE_GROQ_API_KEY=<your Groq key>
VITE_WEATHER_API_KEY=<your OpenWeather key>
```

---

**All set!** Your SmartAgro app is now deployed and ready to use! 🎉
