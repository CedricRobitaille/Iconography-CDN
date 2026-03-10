<!-- Root SVG Wrapper -->

<script setup lang="ts">
  import { computed } from 'vue';
  import type { treeNode } from '../../types'; 
  import SvgNode from './SvgNode.vue';
  import { useEditorStore } from '../../stores/editorSvg';
  import { useDefaultCanvasInteractions } from '../../composables/defaultActions';
  import { useToolManager } from '../../composables/toolManager';

  const canvas = useEditorStore();
  
  const defaultAction = useDefaultCanvasInteractions(computed(() => props.editorMode));
  const toolManager = useToolManager();

  const props = defineProps<{
    svg?: treeNode[];
    editorMode?: boolean;
    onNodeClick?: (node: treeNode) => void;
  }>();


  // Only render visible nodes.
  // Rather than creating the node, than checking for visibility, we catch it before even attempting to render.
  const visibleNodes = computed(() => {
    console.log(props.svg)
    return props.svg?.filter(n => n.visible) ?? []
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


  const handleMouseDown = (e: MouseEvent) => {
    defaultAction.onMouseDown(e); 
    toolManager.handleMouseDown(e);
  }

  const handleMouseMove = (e: MouseEvent) => {
    defaultAction.onMouseMove(e); 
    toolManager.handleMouseMove(e);
  }

  const handleMouseUp = (e: MouseEvent) => {
    defaultAction.onMouseUp(e); 
    toolManager.handleMouseUp(e);
  }

  const handleWheel = (e: WheelEvent) => {
    defaultAction.onWheel(e); 
    toolManager.handleWheel(e);
  }

  console.log(visibleNodes.value)

</script>

<template>
  <svg 
  tabindex="0"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    v-bind="svgSize"
    preserveAspectRatio="xMidYMid meet"
    @mousedown="handleMouseDown"
    @mousemove="handleMouseMove"
    @mouseup="handleMouseUp"
    @mouseleave="handleMouseUp"
    @wheel.prevent="handleWheel"
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
          @click="useEditorStore().clearSelection()"
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
        <!-- Bounding box encompasing all selected nodes -->
        <rect
          v-for="node in visibleNodes.filter(n => props.editorMode && canvas.selectedNodeIds.includes(n))"
          :key="'overlay-'+node.id"
          :x="node.properties.x ?? 0"
          :y="node.properties.y ?? 0"
          :width="node.properties.w ?? node.properties.r*2 ?? 0"
          :height="node.properties.h ?? node.properties.r*2 ?? 0"
          fill="none"
          stroke-width=".5"
          stroke="cyan"
          vector-effect="non-scaling-stroke"
        />

        <!-- Key Line for selected Nodes -->
        <SvgNode 
          v-for="node in visibleNodes.filter(n => props.editorMode && canvas.selectedNodeIds.includes(n))"
          :key="node.id"
          :node="node"
          :keyLine="true"
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