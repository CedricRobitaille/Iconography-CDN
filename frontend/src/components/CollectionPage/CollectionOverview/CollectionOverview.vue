<script setup lang="ts">

  import { useCollectionStore } from '../../../stores/collections';

  const collections = useCollectionStore()


</script>


<template>

  <header>
    <h1>{{ collections.currentCollection?.name }}</h1>
  </header>

</template>


<style scoped>

</style>