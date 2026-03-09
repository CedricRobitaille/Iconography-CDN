import apiClient from "../services/apiClient";

import type {
  Filter,
} from "../types/ui/filter";

/**
 * Get all filters found in DB
 * @returns {response.data} [{}] - array of filter objects
 */
export const getFilters = async (): Promise<Filter[]> => {
  const response = await apiClient.get<Filter[]>("/tag/filters");
  console.log(response.data)
  return response.data;
}


/**
 * Get all filters belonging to user's icons
 * @returns {response.data} [{}] - array of filter objects
 */
export const getMyFilters = async (): Promise<Filter[]> => {
  const response = await apiClient.get<Filter[]>(`/tag/myfilters/${1}`);
  return response.data;
}
