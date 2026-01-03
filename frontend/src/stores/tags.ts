import { defineStore } from "pinia";
import { ref } from "vue";
import type { Filter } from "../types";
import { getFilters } from "../api/tagApi";

export const useFilterStore = defineStore("filters", () => {
  const filters = ref<Filter[]>([])
  const loading = ref(false);

  const fetchFilters = async () => {
    if (filters.value.length) return; // Already fetched, no need to refetch
    loading.value = true;

    try {
      filters.value = await getFilters();
      console.log(await getFilters())
    } catch (err) {
      console.log("Failed to fetch filters:", err);
    } finally {
      loading.value = false;
    }
  }
  return {filters, loading, fetchFilters}
})