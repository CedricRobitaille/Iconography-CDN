<script setup lang="ts">
import SectionCaption from '../../../components/SectionCaption/SectionCaption.vue';


type TreeNode = {
  id: string;
  name: string;
  type: "shape" | "path" | "folder";
  properties?: {};
  expanded?: boolean;
  children?: TreeNode[];
}
</script>


<template>
  <section id="layers">
    <SectionCaption text="Layers" />
  </section>
</template>


<style scoped>
  #layers {
    height: 100%;
    overflow-y: scroll;
    padding: 1rem;
  }
</style>