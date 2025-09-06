import axios from "axios";

// Create axios instance with base configuration
const api = axios.create({
  baseURL: "http://localhost:5000/api",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    // Add any auth tokens or headers here if needed
    console.log(
      `Making ${config.method?.toUpperCase()} request to ${config.url}`
    );
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => {
    // Handle successful responses
    return response.data;
  },
  (error) => {
    // Handle errors consistently
    const errorMessage =
      error.response?.data?.message || error.message || "An error occurred";
    const statusCode = error.response?.status || 500;

    console.error(`API Error [${statusCode}]:`, errorMessage);

    return Promise.reject({
      message: errorMessage,
      status: statusCode,
      data: error.response?.data,
    });
  }
);

export default api;
