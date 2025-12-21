<script setup lang="ts">
  const props = defineProps<{
    text: string
  }>()
</script>

<template>
<h4>{{ text }}</h4>
</template>

<style scoped>
  h4 {
    color: var(--text-10);
    font-size: .85rem;
    font-weight: 600;
  }
</style>