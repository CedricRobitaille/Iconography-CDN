<script setup lang="ts">
  import { computed } from 'vue';
  import { useEditorStore } from '../../../stores/editorSvg';
  import type { treeNode } from '../../../types';

  const icon = useEditorStore();

  const projectTree = computed(() => {
    if (!icon.rootNode) return [];
    return icon.flattenTree(icon.rootNode);
  })
</script>


<template>
  <ul>
    <li v-for="(node, id) in projectTree" :key="id" :class="'depth-' + node.depth">
      <!-- Icon -->
      <svg id="rect" viewBox="0 0 24 24" width="1rem" height="1rem" class="icon">

        <g v-if="node.type === 'rect'">
          <rect width="14" height="14" x="4" y="4" class="cls-1" rx="2" ry="2" />
        </g>

        <g v-if="node.type === 'circle' || node.type === 'ellipse'">
          <circle cx="12" cy="12" r="8" />
        </g>

        <g v-if="node.type === 'line'">
          <line x1="4" x2="20" y1="20" y2="4" />
        </g>

        <g v-if="node.type === 'polygon'">
          <polygon points="12 3.38 14.33 8.98 20.37 9.47 15.77 13.41 17.17 19.31 12 16.15 6.83 19.31 8.23 13.41 3.63 9.47 9.67 8.98 12 3.38"/>
        </g>

        <g v-if="node.type === 'path' || node.type === 'polyline'">
          <line x1="21.54" x2="37.54" y1="32.94" y2="16.94" />
          <path d="M4.49 5.56l3.22 11.8c.17.62.74 1.06 1.38 1.06h4.12l1.77 1.77c.36.36.95.36 1.31 0l3.89-3.89c.37-.37.36-.96 0-1.32l-1.77-1.75V9.1c.01-.65-.42-1.22-1.04-1.39L5.58 4.49A.877.877 0 0 0 4.5 5.57z"/>
          <line x1="13.21" x2="18.4" y1="18.42" y2="13.22" />
          <line x1="4.71" x2="12.45" y1="4.71" y2="12.45" />
        </g>
        
      </svg>
      
      <!-- Name -->
      <p class="title">{{ node.name }}</p> 

      <!-- Lock Button -->
      <button @click="icon.toggleNodeLock(node)">
        {{ node.locked }}
      </button>

      <!-- Visibility Button -->
      <button @click="icon.toggleNodeVisibility(node)">
        {{ node.visible }}
      </button>
    </li>
  </ul>
</template>


<style scoped>
  #layers {
    height: 100%;
    display: grid;
    grid-template-rows: auto 1fr;
    gap: 1rem;
  }

  ul {
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  li {
    display: grid;
    grid-template-columns: auto 1fr auto auto;
    gap: .5rem;
    align-items: center;
  }

  .title {

    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .icon {
    fill: none;
    stroke: var(--text-30);
    stroke-linecap: round;
    stroke-linejoin: round;
    stroke-width: 1.5px
  }
  .depth-0 {
    padding-left: 0;
  }
  .depth-1 {
    padding-left: .5rem;
  }
  .depth-2 {
    padding-left: 1rem;
  }
  .depth-3 {
    padding-left: 1.5rem;
  }
  .depth-4
  .depth-5
  .depth-6
  .depth-7
  .depth-8
  .depth-9 {
    padding-left: 2rem;
  }
</style>