# CodeArena

CodeArena is split into two independently runnable applications:

- `frontend/` contains the existing React + Vite product UI.
- `backend/` contains the Node.js HTTP API.

## Run locally

Start the API in one terminal:

```sh
cd backend
npm run dev
```

Start the frontend in another terminal:

```sh
cd frontend
npm install
npm run dev
```

Vite proxies `/api` requests to `http://localhost:4000`. The API currently provides
`GET /api/health`, `GET /api/questions`, and `POST /api/questions`. Question data
is in memory and resets when the API restarts; the frontend continues to use the
existing mock data until its screens are connected to these endpoints.

## Build the frontend

```sh
cd frontend
npm run build
```
