<script setup lang="ts">

  import { computed } from 'vue';
  import { sanitizeHex, sanitizeOpacity } from '../../../composables/sanitizer';
  import { useEditorStore } from '../../../stores/editorSvg';
  
  const canvas = useEditorStore();

  // User Input on input forms.
  const fillInput = computed({
    get: () => {
      return canvas.activeStyle.fill.fill;
    },
    set: (value: string) => {
      let hex = sanitizeHex(value)
      canvas.activeStyle.fill.fill = hex;
    }
  });

  const opacityInput = computed({
    get: () => {
      return canvas.activeStyle.fill.fillOpacity * 100;
    },
    set: (value: number) => {
      canvas.activeStyle.fill.fillOpacity = sanitizeOpacity(value/100)
    }
  });

  const previewStyle = computed(() => ({
    backgroundColor: canvas.activeStyle.fill.fill
  }))
</script>

<template>
  <div class="input-field">
    <label for="">Color</label>
    <div class="input-collection">
      <div class="color-container">
        <div class="color-preview" :style="previewStyle"></div>
        <input type="text" class="color" v-model="fillInput">
      </div>
      <div class="opacity-container">
        <input type="number" class="opacity" v-model.number="opacityInput">
      </div>
    </div>
  </div>
</template>

<style scoped>
  .input-field {
    display: flex;
    flex-direction: column;
    gap: .5rem;
  }

  .input-collection {
    display: grid;
    grid-template-columns: 1fr auto;
    gap: 3px;
  }

  .input-collection input {
    border: none;
    padding: .5rem 1rem;
    font-size: .85rem;
  }

  .color-container {
    position: relative;
  }

  .color-preview {
    position: absolute;
    top: .4rem;
    left: .5rem;
    height: 1.125rem;
    width: 1.125rem;
    border-radius: .25rem;
    border: 1px solid var(--border);
    pointer-events: none;
  }

  .color {
    padding-left: 2.5rem !important;
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
  }

  .opacity {
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
    width: calc(2ch + 1ch + 1rem + 2rem);
  }
</style>
