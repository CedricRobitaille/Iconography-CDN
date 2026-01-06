<script setup lang="ts">
  import type { Filter } from '../../../types';
  import { useLibraryResultsStore } from '../../../stores/library';
  
  const libraryStore = useLibraryResultsStore();

  const props = defineProps<{
    items: Filter[]
  }>()

  console.log(libraryStore)

</script>

<template>
  <ul class="filter-collection">
    <li 
      class="filter" 
      v-for="filter in props.items"
      :key="filter.name"
      :class="libraryStore.activeFilters.includes(filter.name) ? 'active' : ''" 
      @click="libraryStore.toggleFilter(filter.name)"
    >
      <img :src="filter.type" alt="">
      <p class="filter-name">{{ filter.name }}</p>
      <p class="filter-qty">{{ filter.iconCount }}</p>
    </li>
  </ul>
</template>

<style scoped>
  .filter-collection {
    display: flex;
    flex-direction: column;
    gap: .25rem;
  }

  .filter {
    display: grid;
    grid-template-columns: auto 1fr auto;
    gap: .75rem;
    padding: .25rem .75rem;
    border-radius: 4px;
    cursor: pointer;
    border: .5px solid transparent;
  }

  .filter:hover {
    background-color: var(--bg-30);
  }

  .active {
    background-color: var(--bg-40);
    border: .5px solid var(--border);
  }

  .active:hover {
    background-color: var(--border);
  }
</style>