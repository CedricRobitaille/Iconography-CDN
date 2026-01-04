<script setup lang="ts">
  import { onMounted } from 'vue';
  import { useLibraryResultsStore } from '../../stores/libraryResults';

  const libraryStore = useLibraryResultsStore();

  onMounted(() => { 
    libraryStore.fetchLibrary();
    console.log(libraryStore.libraryResults)
  })

</script>

<template>
  <!-- Icon Count / Pages -->
   <header>
    <h2 class="icon-count">{{ libraryStore.libraryResults.length }} Icons</h2>
    <p class="page-count">Page {{ libraryStore.pageCount+1 }} of {{ Math.ceil(libraryStore.libraryResults.length / libraryStore.pageSize) }}</p>
   </header>

  <div class="settings">
    <ul class="filters">
      <!--  All active filters -->
      <li v-for="filter in libraryStore.activeFilters" :key="filter">
        <button class="filter btn" @click="libraryStore.toggleFilter(filter)">{{ filter }}</button>
      </li>
      <!-- Reset button IF filters exist -->
      <li v-if="libraryStore.activeFilters.length > 0">
        <button class="reset btn" @click="libraryStore.resetFilters()">Reset</button>
      </li>
    </ul>
    <!-- Icon Count -->
    <div class="select-wrapper">
      <select name="iconCount" class="count btn" @change="libraryStore.setPageSize">
        <option :value="50">50 Icons</option>
        <option :value="100">100 Icons</option>
        <option :value="250">250 Icons</option>
      </select>
    </div>
    
  </div>

  <!-- Icon Pages -->
  <section class="library">
    <ul class="icon-list">
      <li v-for="icon in libraryStore.libraryResults" :key="icon.id" class="icon-container">
        <div class="icon">
          <svg class="library-icon">

          </svg>
        </div>
        <p class="icon-name">{{ icon.name }}</p>
      </li>
    </ul>
  </section>
</template>

<style scoped>

  header {
    display: grid;
    grid-template-columns: 1fr auto;
    padding-bottom: 1rem;
    border-bottom: 1.5px solid var(--bg-30);
    align-items: end;
  }

  .icon-count {
    font-size: 1.5rem;
    font-weight: 700;
  }

  .page-count {
    font-size: .85rem;
    color: var(--text-30);
  }

  .settings {
    display: grid;
    grid-template-columns: 1fr auto;
    align-items: start;
    gap: 2rem;
    margin-bottom: 2rem;
  }

  .filters {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
  }

  .btn {
    padding: .5rem 1rem;
    border: 1.5px solid;
    border-radius: 1.5rem;
    font-size: .85rem;
    transition: .125s;
  }

  .filter {
    color: var(--text);
    background-color: var(--bg-30);
    border-color: var(--bg-30);
  }
  .filter:hover {
    background-color: var(--bg-40);
    border-color: var(--border);
  }

  .reset, .count {
    color: var(--text-40);
    border-color: var(--bg-40);
  }

  .reset:hover, .count:hover {
    background-color: var(--bg-10);
    color: var(--text);
    border-color: var(--border);
  }

  .count {
    padding-right: 2rem;
    background-color: var(--bg);
    font-size: .85rem;
  }

  .select-wrapper {
    position: relative;
    transition: .125s;
  }

  .select-wrapper::after {
    content: "";
    display: block;
    position: absolute;
    right: 1rem;
    top: calc(50% - 6px);
    height: 6px;
    width: 6px;
    border-bottom: 1.5px solid var(--text-20);
    border-right: 1.5px solid var(--text-20);
    transform: rotate(45deg);
    transition: .125s;
    pointer-events: none;
  }

  .select-wrapper:hover::after {
    border-color: var(--text);
  }

  select option {
    background-color: var(--bg-10);
    color: var(--text-40); 
  }

  select option:hover {
    background-color: var(--bg-20);
    color: var(--text);
  }


  select option:checked {
    background-color: var(--bg-40);
  }

  .icon-list {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(7.5rem, 1fr));
    gap: 1.5rem 2rem;
  }

  .icon-container {
    display: flex;
    flex-direction: column;
    gap: .5rem;
    align-items: center;
  }

  .icon {
    border: 1px solid var(--bg-30);
    border-radius: .5rem;
    height: 7.5rem;
    width: 7.5rem;
    position: relative;
  }

  .library-icon {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    height: 3rem;
    width: 3rem;
  }

  .library {
    height: 100%;
    overflow-y: auto;
  }


</style>