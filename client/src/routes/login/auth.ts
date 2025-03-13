import axios from "axios";
import jQuery from "jquery";
import { Router } from "vue-router";
const $ = jQuery;

// Create axios instance with improved configuration
const api = axios.create({
  baseURL: "http://localhost:5173",
  timeout: 5000, // 5 second timeout
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  withCredentials: true, // Enable if using cookies/sessions
});

// Add request interceptor for debugging
api.interceptors.request.use(
  (config) => {
    console.log("Request:", config.method?.toUpperCase(), config.url);
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

export async function logout(router) {
  try {
    const refreshToken = localStorage.getItem("token");
    if (refreshToken) {
      const response = await api.post("/logout", {
        refresh_token: refreshToken,
      });

      if (response.status === 200 || response.status === 401) {
        localStorage.removeItem("token");
        router.push({ name: "login" });
      }

      localStorage.removeItem("token");
      router.push({ name: "login" });
    }
  } catch {
    localStorage.removeItem("token");
    router.push({ name: "login" });
  }
}

export async function authenticate(router: Router) {
  try {
    const response = await api.post("/auth", {
      login: $("#login").val(),
      password: $("#password").val(),
      remember_me: $("#gridCheck").is(":checked"),
    });

    if (response.status === 200) {
      const data: Record<string, string> = response.data as Record<string, string>;
      localStorage.setItem("token", data.token);
      router.push({ name: "index", query: { message: "You are logged in!" } });
      if ($("#app").hasClass("bg-indigo")) {
        $("#app").removeClass("bg-indigo");
        $("#app").addClass("bg-purple");
      }
    }
  } catch (error) {
    console.error("Login failed:", {
      message: error.message,
      status: error.response?.status,
      data: error.response?.data,
    });
    // Handle specific error cases
    if (error.code === "ERR_NETWORK") {
      alert("Cannot connect to server. Please check if the backend is running.");
    }
  }
}
