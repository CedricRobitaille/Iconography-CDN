<script setup lang="ts">
  import PanelContainer from '../PanelContainer/PanelContainer.vue';
  import ActiveUser from '../ActiveUser/ActiveUser.vue';
  import SearchBar from '../SearchBar/SearchBar.vue';
  import Filters from './Filters/Filters.vue';
  import type { FilterGroup } from '../../types';


  const filters: FilterGroup[] = [
    {
      theme: "Style",
      items: [
        { icon: "solid.svg", name: "Solid", qty: 4232 },
        { icon: "regular.svg", name: "Regular", qty: 2354 },
      ]
    },
    {
      theme: "Type",
      items: [
        { icon: "filled.svg", name: "Filled", qty: 2345 },
        { icon: "line.svg", name: "Line", qty: 6543 },
      ]
    },
  ]
</script>

<template>
  <section id="filter-panel">
    <PanelContainer :component="ActiveUser" />
    <PanelContainer title="Search" :component="SearchBar" :context="{ placeholder: 'Icon Name'}"/>
    <PanelContainer :component="Filters" v-for="theme in filters" :title="theme.theme" :context="{ items: theme.items}" />
  </section>
  
</template>

<style scoped>
  #filter-panel {
    background-color: var(--bg-20);
    border-right: .5px solid var(--border)
  }
</style>