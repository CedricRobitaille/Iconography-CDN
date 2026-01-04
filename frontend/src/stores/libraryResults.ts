import { defineStore } from "pinia";
import { ref } from "vue";
import type { Icon } from "../types/api/icon";
import { getIcons } from "../api/iconApi";

export const useLibraryResultsStore = defineStore("libraryResults", () => {
  const libraryResults = ref<Icon[]>([])
  const loading = ref(false)
  const pageCount = ref(0)
  const pageSize = ref<any>(50)
  const activeFilters = ref<string[]>(["Regular"])

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

  // toggle the active filters
  const toggleFilter = (filter: string): void => {
    if (activeFilters.value.includes(filter)) {
      const index = activeFilters.value.indexOf(filter)
      activeFilters.value.splice(index, 1)
    } else {
      activeFilters.value.push(filter)
    }
  }

  const resetFilters = ():void => {
    activeFilters.value = [];
  }

  const setPageSize = (e: Event):void => {
    pageSize.value = (e.target as HTMLSelectElement).value;
    console.log(pageSize.value)
  }

  const handlePageChange = (pageNum: number): void => {
    pageCount.value = pageNum;
    console.log(pageCount.value)
  }

  return {
    libraryResults,
    loading,
    pageCount,
    pageSize,
    activeFilters,
    fetchLibrary,
    toggleFilter,
    resetFilters,
    setPageSize,
    handlePageChange,
  }
})