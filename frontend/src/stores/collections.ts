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


  /**
   * Fetches collections belonging to company
   * @returns this.collection.value - array of collections
   */
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


  /**
   * 
   * @param name: string - Collection Name
   * @param icon?: number - Optional Icon ID if created with icon.
   * @returns {newCollection} - New collection
   */
  const createCollection = async (name: string, icon?: number): Promise<Collection | null> => {
    let newCollection = await postCollection(name);
    if (newCollection) {
      collections.value.push(newCollection)
      console.log("Updated Collection Arr:",collections.value)
      return newCollection
    }
    return null
  }


  /**
   * Add an icon to collection(s)
   * @param collectionIds: number[] - Array of CollectionIds: number
   * @param iconId: number - Icon ID to add to collection(s)
   * @returns {boolean} - True for success, False for fail
   */
  const addIcon = async (collectionIds: number[], iconId: number): Promise<boolean> => {
    if (loading.value === true) return false;
    loading.value = true;

    try {
      let updatedCollections = []

      // For each collection in the array
      // Attach the icon into the collection list
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


  /**
   * Sets chosen collection as 'currentCollection'
   * @param collection: Collection - The collection in question
   */
  const toggleCurrentCollection = (collection?: Collection) => {
    if (collection) {
      currentCollection.value = collection;
    } else {
      currentCollection.value = null;
    }
  }


  /**
   * Get the icons currently in the collection
   * Sets the data in currentIcons.value
   */
  const getCurrentIcons = async () => {
    if (currentCollection.value) { // If a collection is selected / active
      const iconsArr = await getCollectionIcons(currentCollection.value.id) // Gets all icons belonging to current collection
      currentIcons.value = iconsArr // Seys the current collection icons to the retrieved icons.
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