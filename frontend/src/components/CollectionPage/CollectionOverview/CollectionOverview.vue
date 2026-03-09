<script setup lang="ts">

  import { computed, onMounted } from 'vue';
  import { useCollectionStore } from '../../../stores/collections';
  import SvgToDom from '../../Svg/SvgToDom.vue';

  const collections = useCollectionStore()

  /**
   * Gets array of all icons
   */
  const icons = computed(() => {
    console.log(collections.currentIcons)
    return collections.currentIcons
  })

  onMounted(async () => {
    collections.getCurrentIcons();
  })


</script>


<template>

  <div class="header-block">
    <header>
      <button class="back" @click="collections.toggleCurrentCollection()"></button>
      <h1>{{ collections.currentCollection?.name }}</h1>
      <p>{{ collections.currentCollection?.iconCount }} Icons</p>
    </header>
    <div class="page-controls">
      <button>Icons</button>
      <button class="inactive">Installation</button>
      <button class="inactive">Download</button>
      <button class="inactive">Settings</button>
    </div>
  </div>
  

  <ul class="icon-list">
    <li 
      v-for="icon in icons" 
      :key="icon.id" 
      class="icon-container"
    >
      <div class="icon">
        <SvgToDom :svg="icon.svg" />
      </div>
      <p class="icon-name">{{ icon.name }}</p>
    </li>
  </ul>


</template>


<style scoped>  

  .back {
    width: 2rem;
    height: 2.25rem;
    position: relative;
  }

  .back::after {
    content: "";
    position: absolute;
    width: .75rem;
    height: .75rem;
    border-bottom: 2px solid var(--text-10);
    border-left: 2px solid var(--text-10);
    top: 50%;
    left: .5rem;
    transform: translateY(-50%) rotate(45deg);
    transition: .25s;
  }

  .back:hover::after {
    border-bottom: 3px solid var(--text);
    border-left: 3px solid var(--text);
    animation: backWobble 2s infinite ease-out;
  }

  @keyframes backWobble {
    0% {
      left: .5rem;
    }
    50% {
      left: 1rem;
    }
    100% {
      left: .5rem;
    }
  }

  .page-controls button:hover {
    border-color: var(--border);
    color: var(--text)
  }

  .page-controls button {
    padding: .5rem 1.25rem;
    background-color: var(--bg-30);
    border: 1px solid var(--bg-30);
    border-radius: 2rem;
    transition: .125s;
  }

  .inactive {
    background-color: var(--bg-10) !important;
    border: 1px solid var(--bg-10) !important;
    cursor: default;
  }

  .page-controls {
    display: flex;
    flex-direction: row;
    gap: 1.5rem;
  }

  .icon-list {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(7.5rem, 1fr));
    gap: 1.5rem 2rem;
  }

  .icon-container {
    display: flex;
    flex-direction: column;
    gap: .5rem;
    align-items: center;
    cursor: pointer;
  }

  .icon {
    border: 1px solid var(--bg-30);
    border-radius: .5rem;
    height: 7.5rem;
    width: 7.5rem;
    position: relative;
    background-color: transparent;
    transition: .25s;
    padding: 1rem;
  }

  .icon-container:hover .icon {
    background-color: var(--bg-10);
    color: #fff;
  }

  .icon-name {
    color: var(--text-40);
    transition: .25s;
  }

  .icon-container:hover .icon-name {
    color: var(--text);
  }


  header {
    display: grid;
    grid-template-columns: auto 1fr auto;
    padding-bottom: 1rem;
    border-bottom: 1.5px solid var(--bg-30);
    align-items: end;
    gap: 2rem;
  }
  header div {
    display: flex;
    flex-direction: row;
    gap: 1.5rem;
  }

  h1 {
    font-size: 2.25rem;
  }

  header p {
    font-size: 1.125rem;
    color: var(--text-30)
  }

  .header-block {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
</style>