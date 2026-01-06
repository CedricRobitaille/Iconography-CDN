<script setup lang="ts">
  import { useLibraryResultsStore } from '../../../stores/library';

  const library = useLibraryResultsStore();

</script>



<template>
  <div class="paginator">
    <button 
      :class="library.libraryMode ? 'active' : ''"
      @click="library.toggleLibaryMode(true)"
    >
      All Icons
    </button>
    <button 
      :class="!library.libraryMode ? 'active' : ''"
      @click="library.toggleLibaryMode(false)"
    >
      My Icons
    </button>
  </div>
</template>



<style scoped>
  .paginator {
    display: flex;
    flex-direction: row;
    gap: .5rem;
  }

  button {
    padding: .5rem 1rem;
    border-radius: .5rem;
    border: 1px solid transparent;
    transition: .125s;
  }

  button:hover {
    background-color: var(--bg-40);
    color: var(--text);
  }

  .active {
    background-color: var(--bg-30);
    border: 1px solid var(--border);
    color: var(--text);
    cursor: default;
  }

  .active:hover {
    background-color: var(--bg-30);
  }

</style>