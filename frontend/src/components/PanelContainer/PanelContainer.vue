<script setup lang="ts">

  import type { Component } from 'vue';
  import SectionCaption from './SectionCaption/SectionCaption.vue';
  
  const {title, component, context, compact} = defineProps<{
    title?: string;
    component: Component;
    context?: Record<string, any>;
    compact?: boolean;
  }>();
</script>

<template>
  <section class="panel-container" :class="[compact ? 'compact' : '']">
    <SectionCaption v-if="title" :text="title" />
    <component :is="component" v-bind="context" />
  </section>
</template>

<style scoped>
  .panel-container {
    padding : 1rem .75rem;
    border-bottom: .5px solid var(--border);

    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
  .compact {
    padding: .5rem .5rem;
  }
</style>