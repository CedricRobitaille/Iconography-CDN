<script setup lang="ts">
  import PanelContainer from '../PanelContainer/PanelContainer.vue';
  import ActiveUser from '../ActiveUser/ActiveUser.vue';
  import SearchBar from '../SearchBar/SearchBar.vue';
  import Filters from './Filters/Filters.vue';
  import { useFilterStore } from '../../stores/tags';
  import { computed, onMounted } from 'vue';
import Paginator from './Paginator/Paginator.vue';

  const filterStore = useFilterStore();

  onMounted(() => {
    filterStore.fetchFilters();
  })

  const props = defineProps({
    currentPage: String,
  })

  // Filters come in as 
  // { id: 1, name: 'Regular', type: 'Style', iconCount: 2 },
  // { id: 2, name: 'Line', type: 'Type', iconCount: 1 },
  // { id: 3, name: 'Animals', type: 'Category', iconCount: 2 },
  // { id: 8, name: 'Filled', type: 'Type', iconCount: 1 },

  // We need to group all filters together by type
  const groupedFilters = computed(() => { // Computed -> updates on reactive update
    const map: Record<string, typeof filterStore.filters> = {};

    filterStore.filters.forEach(filter => {
      if (!map[filter.type]) map[filter.type] = [];
      map[filter.type].push(filter);
    });

    // Convert to array for v-for
    return Object.entries(map).map(([type, items]) => ({ type, items }));
  });

</script>

<template>
  <section id="filter-panel">
    <PanelContainer 
      :component="ActiveUser" 
    />
    <PanelContainer
      :component="Paginator"
      :context="{ currentPage }"
    />

    <PanelContainer 
      title="Search" 
      :component="SearchBar" 
      :context="{ placeholder: 'Icon Name'}"
    />

    <PanelContainer 
      :component="Filters" 
      v-for="theme in groupedFilters"
      :key="theme.type"
      :title="theme.type" 
      :context="{ items: theme.items}" 
    />
  </section>
  
</template>

<style scoped>
  #filter-panel {
    background-color: var(--bg-20);
    border-right: .5px solid var(--border)
  }
</style>