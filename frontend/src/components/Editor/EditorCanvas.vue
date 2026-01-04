<script setup lang="ts">
  import { computed } from 'vue';
  import SvgNode from './SvgNode/SvgNode.vue';
  import { useEditorStore } from '../../stores/editorSvg';
  
  const canvas = useEditorStore();

  // SVG viewbox, computed to log changes to pos/size
  const viewBox = computed(() => {
    const w = canvas.width / canvas.zoom;
    const h = canvas.height / canvas.zoom;
    // SVG viewbox params = xPos, yPos, width, height
    return `${-canvas.offsetX} ${-canvas.offsetY} ${w} ${h}`
  })

  // MouseDown listener
  const onCanvasMouseDown = (event: MouseEvent) => {
    // If mousedown on BG, de-select all nodes
    if ((event.target as SVGElement).tagName === "svg") {
      canvas.clearSelection();
    }
  } 

</script>

<template>
  <div class="editor-canvas">
    <svg
      :width="canvas.width"
      :height="canvas.height"
      :view-box="viewBox"
      @mousedown="onCanvasMouseDown"
    >
      <!-- Make a node featuring the rootNode (If Exists) -->
      <SvgNode 
        v-if="canvas.rootNode"
          :node="canvas.rootNode"
      />
    </svg>
  </div>
</template>

<style scoped>
  .editor-canvas {
    width: 100%;
    height: 100%;
    overflow: hidden;
  }
  
  svg {
    user-select: none;
  }
</style>