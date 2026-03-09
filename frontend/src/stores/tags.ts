import { defineStore } from "pinia";
import { ref } from "vue";
import type { Filter } from "../types";
import { getFilters, getMyFilters } from "../api/tagApi";

export const useFilterStore = defineStore("filters", () => {
  const filters = ref<Filter[]>([])
  const loading = ref(false);


  /**
   * Get all filters in DB
   * @returns filters.value = [{}]
   */
  const fetchFilters = async () => {
    if (loading.value === true) return; // Already fetched, no need to refetch
    loading.value = true;

    try {
      filters.value = await getFilters();
      console.log("All Filters:", filters.value)
    } catch (err) {
      console.log("Failed to fetch filters:", err);
    } finally {
      loading.value = false;
    }
  }


  /**
   * Get all filters belonging to user's icons
   * @returns filters.value = [{}]
   */
  const fetchMyFilters = async () => {
    loading.value = true;

    try {
      filters.value = await getMyFilters();
      console.log(filters.value)
    } catch (err) {
      console.log("My Filters:", "Failed to fetch filters:", err);
    } finally {
      loading.value = false;
    }
  }

  return {filters, loading, fetchFilters, fetchMyFilters}
})