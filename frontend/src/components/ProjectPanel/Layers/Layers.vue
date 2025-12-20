<script setup lang="ts">
import { ref } from 'vue';
import SectionCaption from '../../../components/SectionCaption/SectionCaption.vue';

type TreeNode = {
  id: number;
  name: string;

  type: "shape" | "path" | "folder";
  locked:  boolean;
  visible: boolean;
  properties?: {};
  expanded?: boolean;
  children?: TreeNode[];
}

const tree: TreeNode = {
  id: 1,
  name: "root",
  type: "folder",
  locked: false,
  visible: true,
  properties: {
    x: 0,
    y: 0,
  },
  expanded: true,
  children: [
    {
      id: 2,
      name: "src",
      type: "folder",
      locked: false,
      visible: true,
      properties: {
        x: 0,
        y: 0,
      },
      expanded: true,
      children: [
        { id: 3, name: "index.js", type: "path", locked: false,
          visible: true, properties: {
            x: 0,
            y: 0,
          }, },
        {
          id: 4,
          name: "components",
          type: "folder",
          locked: false,
          visible: true,
          properties: {
            x: 0,
            y: 0,
          },
          expanded: true,
          children: [
            {
              id: 5, name: "Button.js", type: "shape", locked: false,
              visible: true, properties: {
                x: 0,
                y: 0,
              },
            },
            {
              id: 5, name: "Button.js", type: "shape", locked: false,
              visible: true, properties: {
                x: 0,
                y: 0,
              },
            },
            {
              id: 5, name: "Button.js", type: "shape", locked: false,
              visible: true, properties: {
                x: 0,
                y: 0,
              },
            }
          ]
        }
      ]
    },
    { id: 6, name: "this_packager.json", type: "shape", locked: false,
      visible: true, properties: {
        x: 0,
        y: 0,
      }, }
  ]
};

function flattenTree(node: any, list = [], depth: number = 0) {
  
  list.push({ ...node, depth });

  if (node.type === "folder" && node.expanded) {
    node.children?.forEach(child =>
      flattenTree(child, list, depth + 1)
    );
  }

  return list;
}

const projectTree = ref(flattenTree(tree))
</script>


<template>
  <section id="layers">
    <SectionCaption text="Layers" />
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
  </section>
</template>


<style scoped>
  #layers {
    height: 100%;
    padding: 1rem;
    padding-right: 0;
    display: grid;
    grid-template-rows: auto 1fr;
    gap: 1rem;
  }

  ul {
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    padding-right: 1rem;
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