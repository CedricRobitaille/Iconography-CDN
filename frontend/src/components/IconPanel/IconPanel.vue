<script setup lang="ts">
  import { useLibraryResultsStore } from '../../stores/library';
  import { useFilterStore } from '../../stores/tags';
  import { computed, ref } from 'vue';

  const library = useLibraryResultsStore();
  const filters = useFilterStore();
  
  // Current Icon
  const icon = computed(() => {
    return library.libraryResults.find(i => i.id === library.activeIcon)
  })

  // List of all tags
  const tags = computed(() => {
    if (!icon.value) return [];

    // Gorup filters by their types
    // ie: category [reg, bold]
    //     style [lined]
    const map: Record<string, typeof filters.filters> = {};

    filters.filters.forEach(filter => {
      if (!map[filter.type]) map[filter.type] = [];
      map[filter.type].push(filter);
    });

    // Convert grouped filters into array
    const groupedFilters = Object.entries(map).map(([type, items]) => ({
      type,
      items
    }));

    // Lookup set of all valid names
    // Set because it's fast.
    const validTagNames = new Set(
      groupedFilters.flatMap(group =>
        group.items.map(item => item.name)
      )
    );

    // Finally, filter out icon tags that are styles
    return icon.value.tags
      .filter(tag => !validTagNames.has(tag.name))
      .map(tag => tag.name);
  });

</script>


<template>
  <section id="icon-page">

    <!-- primary Content -->
    <div class="header-container">
      <!-- Header -->
      <header id="page-header">
        <h1 class="icon-name">{{ icon?.name }}</h1>
        <button>Download</button>
      </header>

      <!-- Icon Tags -->
      <ul class="filter-list">
        <li v-for="tag in tags" class="filter">{{ tag }}</li>
      </ul>
    </div>
     

    <!-- Current Icon Details -->
    <section id="icon-details">
      <div class="icon-container">
        <!-- <svg></svg> -->
      </div>

      <div class="panels">

        <div class="filters">
          <div class="category">
            <!-- <svg></svg> -->
            <p>{{ icon?.category }}</p>
          </div>

          <div class="options">
            <select id="style">
              <option value="">Style</option>
            </select>
            <select id="type">
              <option value="">Type</option>
            </select>
          </div>
        </div>

        <div class="code-block">
          <header>
            <button>HTML</button>
            <button>SVG</button>
            <button>REACT</button>
            <button>VUE</button>
          </header>

          <pre class="code">
<code>{{ 'code' }}</code>
        </pre>

          <div class="actions">
            <button>Copy</button>
            <button>Save</button>
          </div>
        </div>

        <div class="utilities">
          <button class="collection">Add to Collection</button>
          <button>Edit</button>
        </div>

      </div>
    </section>

    <section id="similar-icons">
      <header>
        <h3>Similar Icons</h3>
        <hr>
      </header>

      <ul class="icon-list">
        <li
          @click="library.setActiveIcon(icon?.id)"
          class="icon-elem"
        >
          <div class="icon-wrapper">
            <svg class="icon-svg">

            </svg>
          </div>
          <p class="icon-name">{{ icon.name }}</p>
        </li>
      </ul>
    </section>

  </section>
</template>


<style scoped>

  .icon-svg {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    height: 3rem;
    width: 3rem;
  }

  .icon-wrapper {
    border: 1px solid var(--bg-30);
    border-radius: .5rem;
    height: 7.5rem;
    width: 7.5rem;
    position: relative;
    background-color: transparent;
    transition: .25s;
  }

  .icon-elem:hover .icon-wrapper {
    background-color: var(--bg-10);
    color: #fff;
  }

  .icon-elem {
    display: flex;
    flex-direction: column;
    gap: .5rem;
    align-items: center;
    cursor: pointer;
  }

  .icon-list {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(7.5rem, 1fr));
    gap: 1.5rem 2rem;
  }

  #similar-icons header h3 {
    font-size: .85rem;
    font-weight: 600;
    color: var(--text-30)
  }

  #similar-icons header {
    display: grid;
    grid-template-columns: auto 1fr;
    align-items: center;
    gap: 1rem;
  }

  #similar-icons {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }

  .collection:hover {
    background-color: var(--accent-50) !important;
  }

  .collection {
    background-color: var(--accent) !important;
    color: var(--bg);
    transition: .125s;
  }

  .utilities button {
    background-color: var(--bg-30);
    padding: .865rem;
    border-radius: .5rem;
    border: 1px solid var(--bg-30);
    font-weight: 600;
    font-size: 1rem;;
  }

  .utilities {
    display: grid;
    grid-template-columns: 1fr auto;
    gap: 1.5rem;
  }

  .actions button:hover {
    background-color: var(--bg-40);
    color: var(--text)
  }

  .actions button:first-child {
    border-right: 1px solid var(--border);
  }

  .actions button {
    padding: .75rem;
    font-weight: 600;
    border-top: 1px solid var(--border);
    transition: .125s;
  }

  .actions {
    display: grid;
    grid-template-columns: 1fr 1fr;
  }

  .code {
    min-height: 10rem;
    max-height: 16rem;
    padding: 1.5rem;

    max-width: 48rem;

    font-family: monospace;

    white-space: pre;
    overflow-x: auto;
    overflow-y: auto;
  }

  #active-code:hover {
    background-color: var(--border);
  }

  #active-code {
    background-color: var(--bg-40);
    border: 1px solid var(--border);
    color: #fff;
  }

  .code-block header button:hover {
    background-color: var(--border);
    color: var(--text)
  }

  .code-block header button {
    padding: .75rem 1.5rem;
    background-color: transparent;
    font-weight: 600;
    text-transform: uppercase;
    color: var(--text-50);
    transition: .125s;
  }

  .code-block header {
    display: flex;
    background-color: var(--bg-30);
    border-bottom: 1px solid var(--border);
  }

  .code-block {
    display: flex;
    flex-direction: column;
    width: 100%;
    background-color: var(--bg-20);
    border-radius: .5rem;
    border: 1px solid var(--border);
    overflow: hidden;
  }

  .options select {
    padding: .75rem 1.25rem;
    background-color: var(--bg-10);
    border-radius: .5rem;
    display: flex;
    flex-direction: row;
    gap: .75rem;
    font-size: 1rem;
    border-width: 1px;
    color: var(--text);
  }

  .options {
    display: flex;
    flex-direction: row;
    gap: 1.5rem;
  }

  .category p {
    font-weight: 600;
    color: var(--text)
  }

  .category {
    padding: .75rem 1.25rem;
    background-color: var(--bg-10);
    border-radius: .5rem;
    border: 1px solid var(--bg-30);
    display: flex;
    flex-direction: row;
    gap: .75rem;
  }

  .filters {
    display: grid;
    grid-template-columns: 1fr auto auto;
    gap: 1.5rem;
    align-items: center;
  }

  .panels {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    height: fit-content;
  }

  .icon-container {
    aspect-ratio: 1/1;
    background-color: var(--bg-20);
    border: 1px solid var(--border);
    border-radius: .5rem;
    padding: 2rem;
    max-width: 24rem;
    min-width: 12rem;
  }

  #icon-details {
    display: grid;
    grid-template-columns: auto 1fr;
    height: fit-content;
    gap: 1.5rem;
  }

  #page-header {
    display: grid;
    grid-template-columns: 1fr auto;
    align-items: end;
    padding-bottom: 1rem;
    border-bottom: 1.5px solid var(--bg-30);
  }
  h1 {
    font-size: 2rem;
  }

  .filter-list {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
  }

  .filter {
    color: var(--text);
    background-color: var(--bg-30);
    border-color: var(--bg-30);

    padding: .5rem 1rem;
    border: 1.5px solid var(--border);
    border-radius: 1.5rem;
    font-size: .85rem;
    transition: .125s;
  }

  .header-container {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  #icon-page {
    display: flex;
    flex-direction: column;
    gap: 3rem;
  }
</style>