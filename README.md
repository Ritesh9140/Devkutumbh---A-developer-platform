<h1 align="center">✨ DevKutumbh - Collaborative Developer Platform ✨</h1>

![Demo App](/frontend/public/screenshot-for-readme.png)

**Code Together, Build Together** - DevKutumbh is a real-time collaborative platform built for developers to code, design, and build together.

## 🚀 Features:

### 💻 Core Collaboration Tools
- � **Real-time Code Editor** - Monaco Editor (VS Code) with syntax highlighting
- 📝 **Interactive Whiteboard** - Draw, sketch, and explain concepts visually
- ⚡ **Integrated Terminal** - Execute code in multiple languages (JavaScript, Python, C++, Java, Go, Rust)
- 📹 **HD Video Calls** - 1-on-1 and group calls with screen sharing & recording

### 🎯 Developer-Focused
- 🌐 **Real-time Synchronization** - All changes instantly visible to both users
- 💬 **Built-in Chat** - Message while coding
- 🔐 **JWT Authentication** - Secure login and protected routes
- � **10 Developer Themes** - Dark themes inspired by popular IDEs (Dracula, Synthwave, GitHub Dark, etc.)

### ⚙️ Tech Stack
- **Frontend**: React 19 + Vite + TailwindCSS + DaisyUI
- **Backend**: Express.js + MongoDB + Node.js
- **Real-time**: Stream.io (Video & Chat)
- **Code Editor**: Monaco Editor (VS Code)
- **State Management**: Zustand + TanStack Query
- **Authentication**: JWT

---

## 🧪 .env Setup

### Backend (`/backend`)

```
PORT=5001
MONGO_URI=your_mongo_uri
STEAM_API_KEY=your_steam_api_key
STEAM_API_SECRET=your_steam_api_secret
JWT_SECRET_KEY=your_jwt_secret
NODE_ENV=development
```

## DevKutumbh — Collaborative Developer Platform (Dev + Video + Chat)

This repository contains a full-stack collaborative developer platform: a React + Vite frontend and an Express + Node backend. It includes real-time chat, video calls (via Stream), a Monaco-based code editor, and JWT-based authentication.

This README documents the architecture, development workflow, environment variables, setup and run commands, troubleshooting tips, and deployment notes.

## Table of contents
- Project overview
- Architecture & data flow
- Folder structure
- Environment variables
- Development setup (install & run)
- Common workflows (auth, chat, video call, file storage)
- Troubleshooting
- Tests & linting
- Deployment notes
- Contribution guide

## Project overview

DevKutumbh is designed for real-time collaboration between developers. Key capabilities:
- Real-time code editing with Monaco Editor
- Chat and presence with Stream Chat (or socket.io fallback)
- Video calls and screen-share using Stream Video SDK
- JWT authentication and protected backend APIs

This repo contains two main parts:
- `backend/` — Express server, controllers, models, and WebSocket/socket.io handlers
- `frontend/` — Vite React app, UI components, pages, and client-side services

## Architecture & data flow

High-level components:

- Frontend (React + Vite)
	- Provides UI: editor, chat, video, auth flows
	- Uses REST for auth and user APIs
	- Uses WebSocket/socket.io for real-time editor syncing & presence (where applicable)
	- Uses Stream SDK for chat and video integration

- Backend (Express)
	- Exposes REST endpoints: auth, users, friend requests, chat metadata
	- Auth with JWT (issue tokens on login/signup)
	- Integrates with MongoDB for persistence
	- May broker some Stream REST calls (server-side tokens) for secure operations

Data flow (primary flows):

1. Authentication
	 - Client posts credentials to `/api/auth/login` or `/api/auth/register`
	 - Backend validates, creates/reads user in MongoDB, returns a JWT
	 - Client stores JWT (memory or secure storage) and uses it for protected APIs

2. Chat & Presence
	 - Client connects to Stream Chat using client-side API key and user token (may be minted server-side)
	 - Messages flow via Stream; backend stores minimal metadata if needed

3. Video Calls
	 - Signaling/rooms handled via Stream Video or socket server
	 - Clients connect to video rooms using keys/tokens

4. Real-time Editor
	 - Editor operations sync via socket.io (or a CRDT/OT service if implemented)
	 - Server relays events or uses a shared state store

## Folder structure

- backend/
	- src/
		- server.js (app entry)
		- controllers/
			- auth.controller.js
			- chat.controller.js
			- user.controller.js
		- middleware/
			- auth.middleware.js
		- models/
			- User.js
			- FriendRequest.js
		- lib/
			- db.js (Mongo connection)
			- stream.js (Stream SDK helpers)
		- routes/
			- auth.route.js
			- chat.route.js
			- user.route.js
	- package.json

- frontend/
	- index.html
	- src/ (React app entry: main.jsx, App.jsx, pages, components, services)
	- vite.config.js
	- package.json

## Environment Variables

Create `.env` files in both `backend/` and `frontend/` as below. Do not commit secrets.

Backend (`backend/.env`):

PORT=5001
MONGO_URI=your_mongo_uri
STREAM_API_KEY=your_stream_api_key
STREAM_API_SECRET=your_stream_api_secret
JWT_SECRET_KEY=your_jwt_secret
NODE_ENV=development

Frontend (`frontend/.env`):

VITE_STREAM_API_KEY=your_stream_api_key
VITE_API_BASE_URL=http://localhost:5001

Notes:
- Replace `your_stream_api_key` and secrets with real Stream credentials for video/chat.
- If you run Mongo locally, use `mongodb://localhost:27017/devkutumbh` for `MONGO_URI`.

## Development setup (install & run)

Make sure Node.js (>=18) and npm are installed. From the repo root open two terminals — one for backend and one for frontend.

Backend

```powershell
cd backend
npm install
npm run dev
```

Frontend

```powershell
cd frontend
npm install
npm run dev
```

If you run into PowerShell script restrictions on Windows (npm script execution blocked), run the npm CLI using the Node executable as a workaround:

```powershell
& "C:\Program Files\nodejs\node.exe" "C:\Program Files\nodejs\node_modules\npm\bin\npm-cli.js" run dev
```

Open the frontend URL printed by Vite (typically http://localhost:5173) and test flows.

## Common workflows and endpoints

Authentication
- POST /api/auth/register — register new user (body: { name, email, password })
- POST /api/auth/login — login (body: { email, password }) -> returns JWT

Users
- GET /api/users/me — get current user's profile (requires Authorization: Bearer <token>)

Chat
- The app uses Stream Chat SDK:
	- Client initializes Stream with VITE_STREAM_API_KEY
	- For private operations, backend mints server tokens using STREAM_API_SECRET

Video calls
- Video rooms are created/connected either via Stream Video SDK or via socket-based room id exchange

Editor sync
- Editor state syncs via socket.io (emit events like 'editor:update' and 'editor:cursor')

## Troubleshooting

- Missing frontend `src` or `main.jsx` error
	- Ensure `frontend/src/main.jsx` exists and is the Vite entry. If missing, check out the correct branch or restore files from the original repo.

- PowerShell execution policy
	- If you get: "running scripts is disabled on this system", either run PowerShell as Administrator and set execution policy or use the Node CLI workaround shown above.

- Dependency peer warnings
	- Warnings about React peer dependencies can appear (React 19 vs packages expecting v18). Usually you can run despite warnings; if run-time issues occur, consider downgrading React to a supported version or upgrading the dependent package.

- MongoDB connection errors
	- Ensure `MONGO_URI` is correct and MongoDB is running. For local development use the default local URL.

## Tests & linting

Backend

```powershell
cd backend
npm test
npm run lint
```

Frontend

```powershell
cd frontend
npm run lint
```

Note: If no tests are present, add basic unit tests for controllers and API routes.

## Deployment notes

- Environment variables must be set in your host (e.g., Vercel, Netlify for frontend; Heroku, Render, DigitalOcean for backend).
- For production, ensure HTTPS and secure storage of STREAM_API_SECRET and JWT secret.
- Consider using Docker for reproducible deployments. A sample Dockerfile for backend and a Dockerfile for frontend + docker-compose is a good next step.

## Contribution

1. Fork the repo
2. Create a feature branch
3. Run tests and linting locally
4. Open a PR with a clear description and screenshots if relevant

## Next steps & suggestions

- Add e2e tests for the full collaboration flow (two browsers connecting to same room).
- Add CI pipeline (GitHub Actions) to run lint and tests.
- Add Dockerfiles and a docker-compose with MongoDB for local dev convenience.

---

If you'd like, I can also:
- Add a small `docker-compose.yml` for local development (backend + MongoDB)
- Create a minimal `frontend/src/main.jsx` entry if your copy is missing it (but you said files are correct — I won't alter files unless you ask)
- Add GitHub Actions CI config

Tell me which of those you'd like next.
