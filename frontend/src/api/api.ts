import {ref} from 'vue';

export function useFetch(url: string) {
  const data = ref<{} | null>(null);
  const error = ref<any>(null);
  const isLoading = ref<boolean>(true);

  const fetchData = async () => {
    isLoading.value = true;
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP Error! Status: ${response.status}`);
      }
      const result = await response.json();
      data.value = result;
    } catch (err) {
      error.value = err;
      console.error("Fetch Error:", err);
    } finally {
      isLoading.value = false;
    }
  }

  fetchData();

  return {
    data,
    error,
    isLoading,
    fetchData
  };
}