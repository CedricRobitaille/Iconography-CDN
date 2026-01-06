<script setup lang="ts">
  const {currentPage} = defineProps<{
    currentPage: string
  }>();


</script>



<template>
  <div class="paginator">
    <RouterLink id="all-icons" to="/library">
      <button :class="currentPage === 'allicons' ? 'active' : ''">All Icons</button>
    </RouterLink>
    <RouterLink id="my-icons" to="/library/myicons">
      <button :class="currentPage === 'myicons' ? 'active' : ''">My Icons</button>
    </RouterLink>
  </div>
</template>



<style scoped>
  .paginator {
    display: flex;
    flex-direction: row;
    gap: .5rem;
  }

  .active {
    background-color: var(--bg-30);
    border: 1px solid var(--border);
    color: var(--text)
  }

  button {
    padding: .5rem 1rem;
    border-radius: .5rem;
    border: 1px solid transparent;
  }

</style>