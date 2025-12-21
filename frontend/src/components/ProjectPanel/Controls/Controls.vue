<script setup lang="ts">

</script>


<template>
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
</template>


<style scoped>
#controls {
  display: flex;
  flex-direction: row;
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
</style>