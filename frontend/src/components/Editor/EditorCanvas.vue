<script setup lang="ts">
  import { ref } from 'vue';

  const svgRef = ref<SVGElement | null>(null)

  const onPointerDown = (event: PointerEvent) => {
    const svg = svgRef.value;
    if (!svg) return;
  }
  

</script>

<template>
  <div class="editor-canvas">
    <svg
      ref="svgRef"
      class="svg-canvas"
      @pointerdown="onPointerDown"
    >
      <!-- Shape Render -->
    </svg>
  </div>
</template>

<style scoped>

</style>