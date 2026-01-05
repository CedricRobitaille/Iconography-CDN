<!-- Root SVG Wrapper -->

<script setup lang="ts">
  import { computed } from 'vue';
  import type { treeNode } from '../../types'; 
  import SvgNode from './SvgNode.vue';
  import { useEditorStore } from '../../stores/editorSvg';
  import { useCanvasPan } from '../../composables/canvasPan';
  import { useCanvasZoom } from '../../composables/canvasZoom';

  const canvas = useEditorStore();
  

  const props = defineProps<{
    nodes?: treeNode[];
    editorMode?: boolean;
    onNodeClick?: (node: treeNode) => void;
  }>();

  const {
    onWheel
  } = useCanvasZoom(canvas, computed (() => props.editorMode))

  const {
    onMouseDown,
    onMouseMove,
    onMouseUp
  } = useCanvasPan(canvas, computed(() => props.editorMode))


  // Only render visible nodes.
  // Rather than creating the node, than checking for visibility, we catch it before even attempting to render.
  const visibleNodes = computed(() => {
    console.log(props.nodes?.filter(n => n.visible) ?? [])
    return props.nodes?.filter(n => n.visible) ?? []
  });


  // Camera transform for Editor Mode
  const cameraTransform = computed(() => {
    if (!props.editorMode) return undefined;

    // Order: translate first, then scale
    const { offsetX, offsetY, zoom } = canvas;
    return `translate(${offsetX}, ${offsetY}) scale(${zoom})`;
  });


  // SVG width/height for editor mode
  const svgSize = computed(() => props.editorMode
    ? { width: canvas.width, height: canvas.height }
    : {}
  );

</script>

<template>
  <svg 
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    v-bind="svgSize"
    preserveAspectRatio="xMidYMid meet"
    @mousedown="onMouseDown"
    @mousemove="onMouseMove"
    @mouseup="onMouseUp"
    @mouseleave="onMouseUp"
    @wheel="onWheel"
  >
    <g id="camera" :transform="cameraTransform"  >
      <!-- Grid -->
      <g id="grid">

      </g>

      <!-- Artboard -->
      <g id="artboard" v-if="editorMode">
        <rect
          x="0" y="0"
          :width="canvas.width"
          :height="canvas.height"
          class="canvas"
        />
      </g>

      <!-- Nodes -->
      <g id="nodes">
        <SvgNode 
          v-for="node in visibleNodes"
          :key="node.id"
          :node="node"
          :editorMode="props.editorMode"
          :onNodeClick="props.onNodeClick"
        />
      </g>

      <!-- Overlays -->
      <g id="overlays">
        <!-- Bounding box for selected Node -->
        <rect
          v-for="node in visibleNodes.filter(n => props.editorMode && canvas.selectedNodeIds.includes(n.id))"
          :key="'overlay-'+node.id"
          :x="node.properties.x ?? 0"
          :y="node.properties.y ?? 0"
          :width="node.properties.w ?? node.properties.r*2 ?? 0"
          :height="node.properties.h ?? node.properties.r*2 ?? 0"
          fill="none"
          stroke="blue"
          stroke-dasharray="4 2"
        />
      </g>
    </g>
  </svg>
</template>

<style scoped>
  svg {
    width: 100%;
    height: 100%;
  }

  .canvas {
    fill: var(--bg-10);
  }
</style>