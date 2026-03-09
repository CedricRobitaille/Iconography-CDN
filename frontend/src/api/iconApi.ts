import apiClient from "../services/apiClient";

import type { ApiResponse } from "../types/api/api";
import type {
  Icon,
} from "../types/api/icon";


/**
 * Query for all icons in DB
 * @returns {response.data} [{}] - array of icon objects
 */
export const getAllIcons = async (): Promise<Icon[]> => {
  const response = await apiClient.get<Icon[]>("/icon");
  return response.data;
}


/**
 * Query for all icons belonging to user
 * @returns {response.data} [{}] - array of icon objects
 */
export const getMyIcons = async (): Promise<Icon[]> => {
  const response = await apiClient.get<Icon[]>(`/myicons/${1}`);
  return response.data;
}


/**
 * Get single icon by ID
 * @param id: string | number - Icon ID number
 * @returns {response} {} - icon object
 */
export const getIconById = async (id: string | number) => {
  try {
    const response = apiClient.get<ApiResponse<Icon>>(`/icon/${id}`);
    return response;
  } catch (err) {
    console.log(err)
  }
}


/**
 * Query for icon by name
 * @param query:string - Name of icon 
 * @returns {response.data} [{}] - array of icon objects
 */
export const searchIcon = async (query: string): Promise<Icon[]> => {
  const response = await apiClient.get<Icon[]>(`/icon?name=${query}`);
  return response.data;
}