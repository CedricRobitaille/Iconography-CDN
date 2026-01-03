import axios from "axios";

import type { AxiosInstance } from "axios";
import type { AxiosRequestConfig } from "axios";
import type { AxiosResponse } from "axios";

const apiClient: AxiosInstance = axios.create({
  baseURL: "/api",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json"
  }
});

// !INTERCEPTOR FOR OAUTH TOKEN

// !INTERCEPTOR FOR GLOBAL ERROR HANDLING

export default apiClient;