# KisanSathi AI — Deployment Guide

Deploy the full app (frontend + backend) on **Render** with **MongoDB Atlas** — both have free tiers, ideal for hackathons.

**Live URL after deploy:** `https://kisansathi-ai.onrender.com` (or your chosen name)

---

## What you need (15–20 minutes)

1. [GitHub](https://github.com) account  
2. [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) free cluster  
3. [Render](https://render.com) account  
4. (Optional) [OpenWeather API key](https://openweathermap.org/api)

---

## Step 1 — MongoDB Atlas (cloud database)

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas/register) and sign up.
2. Create a **free M0 cluster** (any cloud region close to you).
3. **Database Access** → Add user → username + password → save credentials.
4. **Network Access** → **Add IP Address** → choose **Allow Access from Anywhere** (`0.0.0.0/0`) for hackathon demo.
5. **Database** → **Connect** → **Drivers** → copy connection string:
   ```
   mongodb+srv://USERNAME:PASSWORD@cluster0.xxxxx.mongodb.net/kisansathi
   ```
6. Replace `USERNAME` and `PASSWORD` with your DB user. Keep `/kisansathi` at the end.

---

## Step 2 — Push code to GitHub

Your project must be in its **own GitHub repo** (not mixed with other folders).

### Option A — GitHub website

1. Create a new repo: `kisansathi-ai` (empty, no README).
2. Open PowerShell in the FARMING folder:

```powershell
cd "c:\Users\spriy\OneDrive\文档\New folder\FARMING"
git init
git add .
git commit -m "KisanSathi AI hackathon MVP"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/kisansathi-ai.git
git push -u origin main
```

### Option B — GitHub Desktop

1. **File → Add local repository** → select the `FARMING` folder.
2. Commit all files → **Publish repository**.

---

## Step 3 — Deploy on Render

1. Go to [render.com](https://render.com) → Sign up (use GitHub login).
2. **New +** → **Blueprint** (or **Web Service**).
3. Connect your `kisansathi-ai` GitHub repo.
4. Render detects `render.yaml` automatically. If using manual setup:

| Setting        | Value              |
| -------------- | ------------------ |
| Root Directory | *(leave empty)*    |
| Build Command  | `npm install && npm run build` |
| Start Command  | `npm start`        |
| Instance Type  | **Free**           |

5. Add **Environment Variables**:

| Key                 | Value |
| ------------------- | ----- |
| `NODE_ENV`          | `production` |
| `MONGODB_URI`       | Your Atlas connection string |
| `OPENWEATHER_API_KEY` | Your key (or leave placeholder for demo weather) |
| `CLIENT_URL`        | `https://YOUR-APP-NAME.onrender.com` *(update after first deploy)* |

6. Click **Create Web Service** / **Apply**.
7. Wait 5–10 minutes for the first build.
8. When deploy finishes, copy your URL (e.g. `https://kisansathi-ai.onrender.com`).
9. Go to **Environment** → set `CLIENT_URL` to that exact URL → **Save** (triggers redeploy).

---

## Step 4 — Verify

Open in browser:

- `https://YOUR-APP.onrender.com` → Landing page  
- `https://YOUR-APP.onrender.com/dashboard` → Dashboard  
- `https://YOUR-APP.onrender.com/api/health` → `{"success":true,...}`

Try disease upload, weather, and chat — data saves to Atlas.

---

## Free tier notes (for judges)

| Topic | Note |
| ----- | ---- |
| Cold start | Render free tier sleeps after ~15 min idle; first visit may take 30–60 sec |
| Uploads | Images stored on server disk; reset on redeploy (OK for demo) |
| Weather | Works with OpenWeather key; otherwise shows demo data |

---

## Alternative: Frontend on Vercel + Backend on Render

If you prefer split deploy:

**Backend (Render)** — same as above but only deploy `backend/` folder:
- Root Directory: `backend`
- Build: `npm install`
- Start: `npm start`

**Frontend (Vercel)**:
1. Import repo at [vercel.com](https://vercel.com)
2. Root Directory: `frontend`
3. Environment variable: `VITE_API_URL=https://YOUR-BACKEND.onrender.com`
4. Deploy

Update backend `CLIENT_URL` to your Vercel URL.

---

## Troubleshooting

| Problem | Fix |
| ------- | --- |
| Build fails on Render | Check build logs; ensure `npm run build` works locally |
| `MongoServerSelectionError` | Check Atlas IP whitelist and `MONGODB_URI` password (URL-encode special chars) |
| CORS error | Set `CLIENT_URL` to exact frontend URL (no trailing slash) |
| Blank page | Ensure `NODE_ENV=production` and build completed |
| 502 on first load | Free tier waking up — wait and refresh |

---

## Local production test (before deploy)

```powershell
cd "c:\Users\spriy\OneDrive\文档\New folder\FARMING"
$env:NODE_ENV="production"
npm run build
npm start
```

Open **http://localhost:5000** — same as production on Render.
