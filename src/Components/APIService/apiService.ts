import axios, { AxiosResponse, InternalAxiosRequestConfig } from "axios";

// Define the base API instance
const api = axios.create({
  baseURL:
    "https://bookmywarehouse-cwd2a3hgejevh8ht.eastus-01.azurewebsites.net/api/v1", // API base URL
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000, // Timeout after 10 seconds
});

// Automatically attach the token to all outgoing requests
api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem("token");
    if (token) {
      // Use the `set` method to properly add the Authorization header
      config.headers.set("Authorization", `Bearer ${token}`);
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Helper function to handle errors
const handleApiError = (error: any) => {
  if (error.response) {
    console.error("API error:", error.response.data);
    throw new Error(error.response.data.message || "API request failed");
  } else if (error.request) {
    console.error("Network error:", error.request);
    throw new Error("Network error. Please check your internet connection.");
  } else {
    console.error("Error:", error.message);
    throw new Error("An unknown error occurred.");
  }
};

// Common API service interface for response and data
interface ApiService {
  get<T>(url: string, params?: object): Promise<T | undefined>;
  post<T>(url: string, data: object): Promise<T | undefined>;
  put<T>(url: string, data: object): Promise<T | undefined>;
  delete<T>(url: string): Promise<T | undefined>;
}

// API service implementation
const apiService: ApiService = {
  get: async <T>(url: string, params = {}): Promise<T | undefined> => {
    try {
      const response: AxiosResponse<T> = await api.get<T>(url, { params });
      return response.data;
    } catch (error: any) {
      handleApiError(error);
      return undefined;
    }
  },
  post: async <T>(url: string, data: object): Promise<T | undefined> => {
    try {
      const response: AxiosResponse<T> = await api.post<T>(url, data);
      return response.data;
    } catch (error: any) {
      handleApiError(error);
      return undefined;
    }
  },
  put: async <T>(url: string, data: object): Promise<T | undefined> => {
    try {
      const response: AxiosResponse<T> = await api.put<T>(url, data);
      return response.data;
    } catch (error: any) {
      handleApiError(error);
      return undefined;
    }
  },
  delete: async <T>(url: string): Promise<T | undefined> => {
    try {
      const response: AxiosResponse<T> = await api.delete<T>(url);
      return response.data;
    } catch (error: any) {
      handleApiError(error);
      return undefined;
    }
  },
};

export default apiService;
