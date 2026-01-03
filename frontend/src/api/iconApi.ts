import apiClient from "../services/apiClient";

import type { ApiResponse } from "../types/api/api";
import type {
  Icon,
} from "../types/api/icon";

export const getIcons = async (): Promise<Icon[]> => {
  const response = await apiClient.get<Icon[]>("/icon");
  return response.data;
}

export const getIconById = async (id: string | number) => {
  try {
    const response = apiClient.get<ApiResponse<Icon>>(`/icon/${id}`);
    return response;
  } catch (err) {
    console.log(err)
  }
}

export const searchIcon = async (query: string): Promise<Icon[]> => {
  const response = await apiClient.get<Icon[]>(`/icon?name=${query}`);
  return response.data;
}