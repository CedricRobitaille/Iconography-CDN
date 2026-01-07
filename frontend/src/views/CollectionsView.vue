<script setup lang="ts">

  import AllCollections from '../components/CollectionPage/AllCollections/AllCollections.vue';
  import CollectionOverview from '../components/CollectionPage/CollectionOverview/CollectionOverview.vue';
  import CollectionPanel from '../components/CollectionPage/CollectionPanel/CollectionPanel.vue';

  import { useCollectionStore } from '../stores/collections';

  const collections = useCollectionStore();


</script>

<template>

  <main>

    <CollectionPanel />

    <section class="collection">
      <AllCollections v-if="!collections.currentCollection" />
      <CollectionOverview v-else />
    </section>

  </main>
</template>

<style>

  main {
    display: grid;
    grid-template-columns: minmax(100px, 18rem) 1fr;
    height: 100%;
    overflow: hidden;
  }

  .collection {
    display: grid;
    grid-template-rows: auto auto 1fr;
    gap: 3rem;
    height: 100%;
    max-width: 75rem;
    width: 100%;
    padding: 2rem;
    margin: 0 auto;
    padding-bottom: 5rem;
  }

</style>