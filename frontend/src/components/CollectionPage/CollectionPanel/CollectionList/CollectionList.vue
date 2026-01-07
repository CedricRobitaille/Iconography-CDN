<script setup lang="ts">
  import { useCollectionStore } from '../../../../stores/collections';

  const collections = useCollectionStore();
</script>


<template>
  <ul class="collection-collection">
    <li 
      v-for="collection in collections.collections"
      class="collection-container"
    >

      <p>{{ collection.name }}</p>
      <p>{{ collection.iconCount }}</p>  
      
    </li>
  </ul>
</template>


<style scoped>
  .collection-collection {
    display: flex;
    flex-direction: column;
    gap: .25rem;
  }
  .collection-container {
    display: grid;
    grid-template-columns: 1fr auto;
    gap: .75rem;
    padding: .75rem .75rem;
    border-radius: 4px;
    cursor: pointer;
    border: .5px solid transparent;
  }
  .collection-container:hover {
    background-color: var(--bg-30);
  }
</style>