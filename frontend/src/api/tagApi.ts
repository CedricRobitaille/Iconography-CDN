import apiClient from "../services/apiClient";

import type {
  Filter,
} from "../types/ui/filter";

export const getFilters = async (): Promise<Filter[]> => {
  const response = await apiClient.get<Filter[]>("/tag/filters");
  return response.data;
}

export const getMyFilters = async (): Promise<Filter[]> => {
  const response = await apiClient.get<Filter[]>(`/tag/myfilters/${1}`);
  return response.data;
}
