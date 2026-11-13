import { createServer } from "node:http";

const port = Number(process.env.PORT || 4000);
const allowedOrigin = process.env.FRONTEND_ORIGIN || "http://localhost:5173";
// Temporary in-memory data keeps the API usable while a database is being selected.
const questions = [];

const sendJson = (response, status,  body) => {
  response.writeHead(status, {
    "Content-Type": "application/json; charset=utf-8",
    "Access-Control-Allow-Origin": allowedOrigin,
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
  });
  response.end(JSON.stringify(body));
};

const readJson = (request) => new Promise((resolve, reject) => {
  let body = "";
  request.on("data", (chunk) => { body += chunk; });
  request.on("end", () => {
    try { resolve(body ? JSON.parse(body) : {}); }
    catch { reject(new Error("Request body must be valid JSON.")); }
  });
  request.on("error", reject);
});

const server = createServer(async (request, response) => {
  const url = new URL(request.url || "/", `http://${request.headers.host || "localhost"}`);
  if (request.method === "OPTIONS") {
    response.writeHead(204, {
      "Access-Control-Allow-Origin": allowedOrigin,
      "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
    });
    response.end();
    return;
  }

  if (request.method === "GET" && url.pathname === "/api/health") {
    sendJson(response, 200, { status: "ok", service: "codearena-api" });
    return;
  }
  if (request.method === "GET" && url.pathname === "/api/questions") {
    sendJson(response, 200, { data: questions });
    return;
  }
  if (request.method === "POST" && url.pathname === "/api/questions") {
    try {
      const input = await readJson(request);
      if (typeof input.title !== "string" || !input.title.trim()) {
        sendJson(response, 400, { error: "Question title is required." });
        return;
      }
      const question = {
        id: `q-${Date.now()}`,
        title: input.title.trim(),
        platform: input.platform || "Manual",
        difficulty: input.difficulty || "Medium",
        topic: input.topic || "Arrays",
        status: input.status || "Solved",
        createdAt: new Date().toISOString(),
      };
      questions.unshift(question);
      sendJson(response, 201, { data: question });
    } catch (error) {
      sendJson(response, 400, { error: error.message });
    }
    return;
  }
  sendJson(response, 404, { error: "Route not found." });
});

server.listen(port, () => console.log(`CodeArena API listening on http://localhost:${port}`));
