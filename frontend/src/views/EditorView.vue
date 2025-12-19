<script setup lang="ts">


import ProjectPanel from '../components/ProjectPanel/ProjectPanel.vue';


</script>



<template>
  <main>
    
    <ProjectPanel />
    <!-- Main Artboard -->
    <section id="artboard">

    </section>

    <!-- Right Modal -->
    <section id="properties">

    </section>
  </main>

</template>





<style scoped>

  main {
    display: grid;
    grid-template-columns: minmax(100px, 18rem) 1fr minmax(100px, 18rem);
    height: 100%;
    overflow: hidden;
  }

  #properties {
    max-width: 18rem;
    width: 100%;
    background-color: var(--bg-20);
    height: 100%;
    overflow-y: hidden;
    display: grid;
    
    border-left: .5px solid var(--border);
    
  }
  
</style>