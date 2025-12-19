<script setup lang="ts">

</script>



<template>
  <main>
    <!-- Left Modal -->
    <section id="project">
      <ul id="controls">
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

      
    </section>

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

  #project, #properties {
    max-width: 18rem;
    width: 100%;
    background-color: var(--bg-20);
    height: 100%;
    overflow-y: hidden;
    
  }

  #project {
    display: grid;
    grid-template-rows: auto auto auto 1fr auto;
    border-right: .5px solid var(--border);
  }

  #project #controls {
    display: flex;
    flex-direction: row;
    padding: .5rem .75rem;
    border-bottom: .5px solid var(--border)
  }

  #project #controls li {
    padding: .35rem .5rem .4rem .5rem;
  }

  #project #controls button {
    color: var(--text-20);
    transition: .0625s;
    font-weight: 500;
  }

  #project #controls li:hover button {
    color: var(--text)
  }



  #project #layers {
    height: 100%;
    overflow-y: scroll;
  }


  #properties {
    display: grid;
    
    border-left: .5px solid var(--border);
  }

</style>