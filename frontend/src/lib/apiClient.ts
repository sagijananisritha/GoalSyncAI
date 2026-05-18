const API_BASE_URL = "http://localhost:8080/api";

function getAuthToken() {
  if (typeof window !== "undefined") {
    return localStorage.getItem("token");
  }
  return null;
}

export async function fetchApi(endpoint: string, options: RequestInit = {}) {
  const token = getAuthToken();
  const headers = new Headers(options.headers);

  if (token) {
    headers.set("Authorization", `Bearer ${token}`);
  }

  headers.set("Content-Type", "application/json");

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    if (response.status === 401) {
      // Handle logout or token refresh here
      console.error("Unauthorized! Redirect to login.");
    }
    throw new Error(`API Error: ${response.statusText}`);
  }

  // Handle empty responses
  const text = await response.text();
  return text ? JSON.parse(text) : {};
}

// Example Helper functions
export const authApi = {
  login: (data: any) => fetchApi("/auth/login", { method: "POST", body: JSON.stringify(data) }),
};

export const goalApi = {
  getGoals: () => fetchApi("/goals"),
  createGoal: (data: any) => fetchApi("/goals", { method: "POST", body: JSON.stringify(data) }),
  submitGoals: () => fetchApi("/goals/submit", { method: "POST" }),
};

export const aiApi = {
  generateGoal: (prompt: string) => fetchApi("/ai/generate", { method: "POST", body: JSON.stringify({ prompt }) }),
};

export const analyticsApi = {
  getDashboard: () => fetchApi("/analytics/dashboard"),
};
