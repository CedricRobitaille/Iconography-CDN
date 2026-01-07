<script setup lang="ts">
  import { computed, ref } from 'vue';
  import PanelContainer from '../../PanelContainer/PanelContainer.vue';
  import ActiveUser from '../../ActiveUser/ActiveUser.vue';
  import SearchBar from '../../SearchBar/SearchBar.vue'
  import Paginator from './Paginator/Paginator.vue';
import CollectionList from './CollectionList/CollectionList.vue';


</script>


<template>
  <section id="collection-panel">

    <PanelContainer 
      :component="ActiveUser"
    />
    <PanelContainer
      :component="Paginator"
    />
    <PanelContainer 
      title="Search"
      :component="SearchBar"
      :context="{ placeholder: 'Collection Name' }"
    />
    <PanelContainer
      title="Collections"
      :component="CollectionList"
    />

  </section>
</template>


<style scoped>
  #collection-panel {
    background-color: var(--bg-20);
    border-right: .5px solid var(--border);
    display: grid;
    grid-template-rows: auto auto auto 1fr;
  }
</style>