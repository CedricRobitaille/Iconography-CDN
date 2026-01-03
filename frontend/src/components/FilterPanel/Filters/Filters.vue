<script setup lang="ts">
  import { ref } from 'vue';
  import type { Filter } from '../../../types';

  const activeFilters = ref<string[]>([])

  const props = defineProps<{
    items: Filter[]
  }>()

  const toggleFilter = (name: string): void => {
    if (activeFilters.value.includes(name)) {
      const index = activeFilters.value.indexOf(name)
      activeFilters.value.splice(index, 1)
    } else {
      activeFilters.value.push(name)
    }
  }
</script>

<template>
  <ul class="filter-collection">
    <li 
      class="filter" 
      v-for="filter in props.items"
      :key="filter.name"
      :class="activeFilters.includes(filter.name) ? 'active' : ''" 
      @click="toggleFilter(filter.name)"
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