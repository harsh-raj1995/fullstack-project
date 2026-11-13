const API_BASE_URL = import.meta.env.VITE_API_URL || "/api";

export async function apiRequest(path, options = {}) {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    headers: {
      ...(options.body ? { "Content-Type": "application/json" } : {}),
      ...options.headers,
    },
  });
  const payload = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(payload.error || `Request failed (${response.status})`);
  return payload;
}

export const getQuestions = () => apiRequest("/questions");
export const createQuestion = (question) => apiRequest("/questions", {
  method: "POST",
  body: JSON.stringify(question),
});
