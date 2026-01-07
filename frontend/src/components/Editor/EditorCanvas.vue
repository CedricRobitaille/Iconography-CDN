<script setup lang="ts">
  import { computed } from 'vue';
  import IconSvg from '../Svg/IconSvg.vue';
  import { useEditorStore } from '../../stores/editorSvg';
  
  const canvas = useEditorStore();

  // SVG viewbox, computed to log changes to pos/size
  const viewBox = computed(() => {
    const w = canvas.width / canvas.zoom;
    const h = canvas.height / canvas.zoom;
    // SVG viewbox params = xPos, yPos, width, height
    return `${-canvas.offsetX} ${-canvas.offsetY} ${w} ${h}`
  })

  console.log(canvas.rootNode)

</script>

<template>
  <div class="editor-canvas">
    <IconSvg 
      :svg="canvas.rootNode"
      :viewBox?="viewBox"
      :editorMode="true"
      :onNodeClick?:="canvas.selectNode"
    />
  </div>
</template>

<style scoped>
  .editor-canvas {
    width: 100%;
    height: 100%;
    overflow: hidden;
  }
</style>