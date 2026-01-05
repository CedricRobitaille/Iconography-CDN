<script setup lang="ts">
  import { computed } from 'vue';
  import { useEditorStore } from '../../../stores/editorSvg';
  import type { treeNode } from '../../../types';

  const icon = useEditorStore();

  const flattenTree = (nodes: treeNode[] | treeNode, list: any[] = [], depth = 0) => {
    if (!Array.isArray(nodes)) {
      nodes = [nodes];
    }

    nodes.forEach(node => {
      list.push({ ...node, depth });

      if (node.type === "folder" && node.expanded && node.children?.length) {
        flattenTree(node.children, list, depth + 1);
      }
    });

    return list;
  };

  const projectTree = computed(() => {
    let tree = null;
    if (icon.rootNode) {
      tree = flattenTree(icon.rootNode)
    }
    return tree;
  })
</script>


<template>
  <ul>
    <li v-for="(value, index) in projectTree" :key="index" :class="{ [value.depth]: true }">
      <!-- Icon -->
      <p v-if="value.type === 'folder'">Folder</p>
      <p v-if="value.type === 'shape'">Shape</p>
      <p v-if="value.type === 'path'">Path</p>

      <!-- Name -->
      <p class="title">{{ value.name }}</p> 

      <!-- Lock Button -->
      <button>
        {{ value.locked }}
      </button>

      <!-- Visibility Button -->
      <button>
        {{ value.visible }}
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
</style>