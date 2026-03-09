import apiClient from "../services/apiClient";
import type { Collection, CollectionIconResponse, CollectionResponse } from "../types/api/collection";
import type { Icon } from "../types/api/icon";

/**
 * Return Collections belonging to Company
 * @returns {response.data} 
 */
export const getCollections = async (): Promise<Collection[]> => {
  const response = await apiClient.get<Collection[]>(`/mycollections/${1}`);
  return response.data;
}


/**
 * Create a new collection
 * Collection is added to company by companyId
 * @param name: string - Collection Name
 * @returns 
 */
export const postCollection = async (name: string): Promise<Collection> => {
  const response = await apiClient.post<CollectionResponse>(`/collection`, {
    Name: name,
    CompanyId: 1
  })
  console.log("Collection Post Response:", response);
  return response.data.collection;
}


/**
 * Adds an icon to a collection
 * @param collectionId: number - Collection ID number
 * @param iconId:number - Icon ID number
 * @returns {response.data.collection_Icon.collection}
 */
export const postCollectionIcon = async (collectionId: number, iconId: number): Promise<Collection> => {
  const response = await apiClient.post<CollectionIconResponse>(`/collection/${collectionId}`, {
    IconId: iconId
  })

  console.log("Collection Icon Post Response:", response)
  return response.data.collection_Icon.collection;
}


/**
 * Get all icons belonging to a collection
 * @param collectionId: number - Collection ID number
 * @returns {response.data} array of icon objs
 */
export const getCollectionIcons = async (collectionId: number): Promise<Icon[]> => {
  console.log(collectionId)
  const response = await apiClient.get<Icon[]>(`/collection/${collectionId}/icons`)

  return response.data;
}