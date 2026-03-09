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


  /**
   * Source Icons for library
   * @returns libraryResults = [{}] - sets this.libraryResults.value to array of icon objs
   */
  const fetchLibrary = async () => {
    if (loading.value === true) return;
    loading.value = true;

    try {
      
      if (libraryMode.value) { // If in `All Icons`
        libraryResults.value = []
        await filters.fetchFilters();
        libraryResults.value = await getAllIcons();
      } else {  // In `My Icons`
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


  /**
   * Toggle the active filters (on/off) 
   * @param filter: string - filter name
   */
  const toggleFilter = (filter: string): void => {
    if (activeFilters.value.includes(filter)) {
      const index = activeFilters.value.indexOf(filter)
      activeFilters.value.splice(index, 1)
    } else {
      activeFilters.value.push(filter)
    }
  }


  /**
   * Resets all filters
   */
  const resetFilters = ():void => {
    activeFilters.value = [];
  }


  /**
   * Set page size, then loads elements
   * @param e: Event - Select Dropdown
   */
  const setPageSize = (e: Event):void => {
    pageSize.value = (e.target as HTMLSelectElement).value;
    console.log(pageSize.value)
  }


  /**
   * Load new library page
   * @param pageNum: number - Page Number
   */
  const handlePageChange = (pageNum: number): void => {
    pageCount.value = pageNum;
    console.log(pageCount.value)
  }


  /**
   * Set the mode (ownership) of the library page
   * true = All Icons
   * false = My Icons
   * @param mode: boolean 
   */
  const toggleLibaryMode = async (mode: boolean) => {
    libraryMode.value = mode;
    activeIcon.value = undefined;
    console.log(libraryMode.value)
    await fetchLibrary();
  }


  /**
   * Set or disable icon currently in selection
   * @param iconId: number | undefined - Icon ID to set (or undefined)
   */
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