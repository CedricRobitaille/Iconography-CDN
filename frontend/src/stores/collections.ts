import { defineStore } from "pinia";
import type { Collection } from "../types/api/collection";
import { ref } from "vue";
import { getCollectionIcons, getCollections, postCollection, postCollectionIcon } from "../api/collectionApi";
import type { Icon } from "../types/api/icon";

export const useCollectionStore = defineStore("collections" ,() => {
  const collections = ref<Collection[]>([])
  const loading = ref(false)
  const currentCollection = ref<Collection | null>()
  const currentIcons = ref<Icon[]>()

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


  const toggleCurrentCollection = (collection?: Collection) => {
    if (collection) {
      currentCollection.value = collection;
    } else {
      currentCollection.value = null;
    }
  }


  const getCurrentIcons = async () => {
    // GET ICONS
    if (currentCollection.value) {
      const iconsArr = await getCollectionIcons(currentCollection.value.id)
      currentIcons.value = iconsArr
      console.log("Collection Icons: ",currentIcons.value)
    }
  }





  return {
    collections,
    currentCollection,
    currentIcons,
    fetchCollections,
    createCollection,
    addIcon,
    toggleCurrentCollection,
    getCurrentIcons
  }
})