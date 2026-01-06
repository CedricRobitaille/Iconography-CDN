import { defineStore } from "pinia";
import { ref } from "vue";
import type { Icon } from "../types/api/icon";
import { getAllIcons, getMyIcons } from "../api/iconApi";
import { useFilterStore } from "./tags";



export const useLibraryResultsStore = defineStore("libraryResults", () => {
  const filters = useFilterStore();

  const libraryResults = ref<Icon[]>([])
  const loading = ref(false)
  const pageCount = ref(0)
  const pageSize = ref<any>(50)
  const activeFilters = ref<string[]>(["Regular"])
  const libraryMode = ref(true)
  const activeIcon = ref<Number | undefined>(undefined)

  const fetchLibrary = async () => {
    if (loading.value === true) return;
    loading.value = true;

    try {
      if (libraryMode.value) {
        libraryResults.value = []
        await filters.fetchFilters();
        libraryResults.value = await getAllIcons();
      } else {
        libraryResults.value = []
        await filters.fetchMyFilters();
        libraryResults.value = await getMyIcons();
      }
      
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

  const toggleLibaryMode = async (mode: boolean) => {
    libraryMode.value = mode;
    await fetchLibrary();
  }

  const setActiveIcon = (iconId: Number | undefined) => {
    activeIcon.value = iconId;
  }

  return {
    libraryResults,
    loading,
    pageCount,
    pageSize,
    activeFilters,
    libraryMode,
    activeIcon,
    fetchLibrary,
    toggleFilter,
    resetFilters,
    setPageSize,
    handlePageChange,
    toggleLibaryMode,
    setActiveIcon
  }
})