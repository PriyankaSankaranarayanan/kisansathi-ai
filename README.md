# KisanSathi AI 🌾

Hackathon-ready smart farming web app for **crop disease detection**, **weather advisory**, and an **AI farming assistant**.

## Tech Stack

| Layer    | Technologies                          |
| -------- | ------------------------------------- |
| Frontend | React (Vite), Tailwind CSS, Axios     |
| Backend  | Node.js, Express.js                   |
| Database | MongoDB (Mongoose)                    |
| APIs     | OpenWeather (optional), Mock AI       |

## Project Structure

```
FARMING/
├── backend/
│   ├── config/          # Database connection
│   ├── controllers/     # Request handlers
│   ├── data/            # Mock JSON for AI responses
│   ├── middleware/      # Upload, error handling
│   ├── models/          # MongoDB schemas
│   ├── routes/          # API routes
│   ├── services/        # Weather + mock AI (swap for real ML/LLM)
│   ├── uploads/         # Uploaded crop images
│   └── server.js
├── frontend/
│   └── src/
│       ├── components/  # Reusable UI modules
│       ├── context/     # Dark mode theme
│       ├── pages/       # Landing + Dashboard
│       └── services/    # Axios API client
└── README.md
```

## API Endpoints

| Method | Endpoint              | Description                    |
| ------ | --------------------- | ------------------------------ |
| POST   | `/api/disease-detect` | Upload image, get diagnosis    |
| GET    | `/api/reports`        | Recent disease reports         |
| POST   | `/api/chat`           | Ask farming question           |
| GET    | `/api/chat/history`   | Recent chat history            |
| GET    | `/api/weather?city=`  | Weather + advisory             |
| GET    | `/api/stats`          | Dashboard statistics           |
| GET    | `/api/health`         | Health check                   |

## MongoDB Schemas

**ChatHistory**
- `question`, `answer`, `timestamp`

**DiseaseReport**
- `imageUrl`, `disease`, `confidence`, `description`, `treatment`, `timestamp`

## Prerequisites

- [Node.js](https://nodejs.org/) 18+
- [MongoDB](https://www.mongodb.com/try/download/community) running locally (or MongoDB Atlas URI)
- (Optional) [OpenWeather API key](https://openweathermap.org/api)

## Setup (5 minutes)

### 1. Clone / open project

```bash
cd FARMING
```

### 2. Backend

```bash
cd backend
npm install
cp .env.example .env
```

Edit `backend/.env`:

```env
PORT=5000
MONGODB_URI=mongodb://127.0.0.1:27017/kisansathi
OPENWEATHER_API_KEY=your_key_here
CLIENT_URL=http://localhost:5173
```

Start MongoDB, then:

```bash
npm run dev
```

### 3. Frontend

```bash
cd ../frontend
npm install
cp .env.example .env
```

`frontend/.env` (optional — Vite proxy works without it in dev):

```env
VITE_API_URL=
```

Leave empty to use Vite proxy to `http://localhost:5000`.

```bash
npm run dev
```

Open **http://localhost:5173**

## Demo Script for Judges

1. **Landing page** — Show hero, features, CTA.
2. **Dashboard → Disease Detection** — Upload any crop/leaf image → see disease, confidence, treatment.
3. **Weather** — Enter `Mumbai` or `Delhi` → temperature, humidity, advisory.
4. **AI Chat** — Click suggestion chips or ask custom questions.
5. **Sidebar** — Recent reports and chat history (persisted in MongoDB).
6. **Dark mode** — Toggle in navbar.

## Connecting Real AI Later

| Feature  | Current                         | Replace in                          |
| -------- | ------------------------------- | ----------------------------------- |
| Disease  | `services/mockAI.js`            | Call TensorFlow / PlantVillage API  |
| Chat     | `getChatResponseMock()`         | OpenAI, Gemini, or local LLM        |
| Weather  | OpenWeather (with demo fallback)| Already production-ready with key   |

## Production Build

```bash
# Frontend
cd frontend && npm run build

# Backend
cd backend && npm start
```

Serve `frontend/dist` via nginx or set `CLIENT_URL` to your deployed frontend URL.

## Deploy Online (Free)

See **[DEPLOY.md](./DEPLOY.md)** for step-by-step instructions to deploy on **Render + MongoDB Atlas** (free tier, ~15 minutes).

Quick summary:
1. Create MongoDB Atlas cluster → copy connection string  
2. Push `FARMING` folder to a new GitHub repo  
3. Connect repo on [Render.com](https://render.com) → uses `render.yaml`  
4. Set env vars: `MONGODB_URI`, `CLIENT_URL`, `OPENWEATHER_API_KEY`  
5. Your live URL: `https://your-app.onrender.com`


## Team Split (3 students, 24h)

| Member   | Focus                                      |
| -------- | ------------------------------------------ |
| Student 1| Backend routes, MongoDB, mock AI service   |
| Student 2| Dashboard modules (disease, weather, chat) |
| Student 3| Landing page, styling, demo script, README |

## Troubleshooting

| Issue                    | Fix                                              |
| ------------------------ | ------------------------------------------------ |
| MongoDB connection error | Start `mongod` or use Atlas URI in `.env`        |
| CORS errors              | Set `CLIENT_URL` in backend `.env`               |
| Weather shows demo mode  | Add valid `OPENWEATHER_API_KEY`                  |
| Images not loading       | Ensure backend runs on port 5000                 |

## License

MIT — Built for hackathon/education purposes.
