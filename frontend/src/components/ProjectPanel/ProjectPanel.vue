<script setup lang="ts">
  import ActiveUser from '../../components/ActiveUser/ActiveUser.vue';
  import SectionCaption from '../../components/SectionCaption/SectionCaption.vue';
  import SearchBar from '../SearchBar/SearchBar.vue';

</script>



<template>
  <section id="project">
    
    <ul id="controls"> <!-- Controls -->
      <li>
        <button>File</button>
      </li>
      <li>
        <button>Edit</button>
      </li>
      <li>
        <button>View</button>
      </li>
    </ul>

    
    <ActiveUser /> <!-- Current User -->
    <SearchBar placeholder="Layer"/>

    <!-- Layers -->
    <section id="layers">
      <SectionCaption text="Layers" />
    </section>

  </section>
</template>



<style scoped>
  #project {
    max-width: 18rem;
    width: 100%;
    background-color: var(--bg-20);
    height: 100%;
    overflow-y: hidden;
    display: grid;
    grid-template-rows: auto auto auto 1fr auto;
    border-right: .5px solid var(--border);
  }

  #controls {
    display: flex;
    flex-direction: row;
    padding: .5rem .75rem;
    border-bottom: .5px solid var(--border)
  }

  #controls li {
    padding: .35rem .5rem .4rem .5rem;
  }

  #controls button {
    color: var(--text-20);
    transition: .0625s;
    font-weight: 500;
  }

  #controls li:hover button {
    color: var(--text)
  }

  #layers {
    height: 100%;
    overflow-y: scroll;
    padding: 1rem;
  }


</style>