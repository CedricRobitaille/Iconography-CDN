import { defineStore } from "pinia";
import { ref } from "vue";
import type { Icon } from "../types/api/icon";
import { getIcons } from "../api/iconApi";

export const useLibraryResultsStore = defineStore("libraryResults", () => {
  const libraryResults = ref<Icon[]>([])
  const loading = ref(false)

  const fetchLibrary = async () => {
    if (loading.value === true) return;
    loading.value = true;

    try {
      libraryResults.value = await getIcons();
      console.log(libraryResults.value)
    } catch (err) {
      console.log("Failed to fetch filters:", err)
    } finally {
      loading.value = false;
    }
  }

  return {
    libraryResults,
    loading,
    fetchLibrary
  }
})