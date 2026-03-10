import apiClient from "../services/apiClient";

import type { ApiResponse } from "../types/api/api";
import type {
  User,
  CreatedUserPayload,
  UpdatedUserPayload
} from "../types/api/user";


/**
 * Gets all users in DB
 * @returns 
 */
export const getUsers = () => {
  const response = apiClient.get<ApiResponse<User>>("/user");
  return response;
}


/**
 * Gets user by ID
 * @param id 
 * @returns 
 */
export const getUserById = async (id: string | number) => {
  let userId = 0
  if (typeof(id) == "string") {
    userId = parseInt(id)
  } else {
    userId = id;
  }

  try {
    const response = apiClient.get<ApiResponse<User>>(`/user/${userId}`);
    return response;
  } catch (err) {
    console.log(err)
  }
}