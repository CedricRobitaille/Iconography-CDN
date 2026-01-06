import { defineStore } from "pinia";
import type { Collection } from "../types/api/collection";
import { ref } from "vue";
import { getCollections, postCollection, postCollectionIcon } from "../api/collectionApi";

export const useCollectionStore = defineStore("collections" ,() => {
  const collections = ref<Collection[]>([])
  const loading = ref(false)

  const fetchCollections = async () => {
    if (loading.value === true) return;
    loading.value = true;

    try {
      collections.value = await getCollections();
      console.log("Collections:",collections.value);
    } catch (err) {
      console.log("Failed to fetch collections:",err)
    } finally {
      loading.value = false;
    }
  }

  const createCollection = async (name: string, icon?: number): Promise<Collection | null> => {
    let newCollection = await postCollection(name);
    if (newCollection) {
      collections.value.push(newCollection)
      console.log("Updated Collection Arr:",collections.value)
      return newCollection
    }
    return null
  }

  const addIcon = async (collectionIds: number[], iconId: number): Promise<boolean> => {
    if (loading.value === true) return false;
    loading.value = true;

    try {
      
      let updatedCollections = []

      for (let colId of collectionIds) {
        const updatedCollection = await postCollectionIcon(colId, iconId)
        updatedCollections.push(updatedCollection)
      }
      
      // Merge updated back into master array
      collections.value.forEach((collection, index) => {
        // Find matching collection in updatedCollections by id
        const updated = updatedCollections.find(u => u.id === collection.id);

        if (updated) {
          // Merge updated properties into master
          collections.value[index] = { ...collection, ...updated };
        }
      });

      console.log("Revised Collections:", collections.value)

      return true;

    } catch (err) {
      console.log(err)
    } finally {
      loading.value = false;
    }
    return false;
  }




  return {
    collections,
    fetchCollections,
    createCollection,
    addIcon
  }
})