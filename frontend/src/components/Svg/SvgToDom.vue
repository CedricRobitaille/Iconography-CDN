<script setup lang="ts">
  import { computed } from 'vue';

  const props = defineProps<{
    svg: string,
  }>();

  const processedSvg = computed(() => {
    let result = props.svg


    result = result.replace(
      '<svg',
      `<svg width="100%"`
    )

    result = result.replace(
      '<svg',
      `<svg height="100%"`
    )

    result = result.replace(
      /stroke\s*:\s*[^;"]+/g,
      "stroke:var(--text-10)"
    )
    return result;
  })

</script>


<template>

  <div v-html="processedSvg"></div>

</template>


<style scoped>

</style>