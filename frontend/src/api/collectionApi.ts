import apiClient from "../services/apiClient";
import type { Collection, CollectionIconResponse, CollectionResponse } from "../types/api/collection";

export const getCollections = async (): Promise<Collection[]> => {
  const response = await apiClient.get<Collection[]>(`/mycollections/${1}`);
  return response.data;
}

export const postCollection = async (name: string): Promise<Collection> => {
  const response = await apiClient.post<CollectionResponse>(`/collection`, {
    Name: name,
    CompanyId: 1
  })
  console.log("Collection Post Response:", response);
  return response.data.collection;
}

export const postCollectionIcon = async (collectionId: number, iconId: number): Promise<Collection> => {
  const response = await apiClient.post<CollectionIconResponse>(`/collection/${collectionId}`, {
    IconId: iconId
  })

  console.log("Collection Icon Post Response:", response)
  return response.data.collection_Icon.collection;
}