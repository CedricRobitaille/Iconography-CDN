<script setup lang="ts">
  import { computed, ref } from 'vue';
  import { useCollectionStore } from '../../../stores/collections';
  import type { Collection } from '../../../types/api/collection';

  const collectionStore = useCollectionStore();

  const props = defineProps<{
    icon: any
    toggleModal: any
  }>();

  // List of collections owned by company
  const collections = computed(() => {
    return collectionStore.collections;
  })

  // List of all checked collections
  const checkedCollections = ref([])

  // Actions relating to the "ADD NEW COLLECTION" section

  // Expand/contract "New Collection" panel
  const expanded = ref<boolean>(false);
  const toggleExpand = () => {
    expanded.value = !expanded.value
  }

  // User inputted new collection's name
  const collectionName = ref("")

  // Actions when user creates a new collection
  const handleNewCollection = async () => {
    // POST new collection with collection Name
    const newCollection: null | Collection = await collectionStore.createCollection(collectionName.value)
    if (newCollection) { // Actions when the post was successfull.
      toggleExpand();
      // By default, Check the collection when it's added.
      checkedCollections.value.push(newCollection.id)
    }
  }

  // ------------
  // Save Actions
  // ------------

  const handleSave = async () => {
    if (checkedCollections.value.length !== 0) {
      const response: boolean = await collectionStore.addIcon(checkedCollections.value, props.icon.id);
      if (response) {
        props.toggleModal();
      }
    } else {
      console.log("No collections were selected.")
    }
  }

</script>


<template>
  <div class="collection-popup">
    <header>
      <h3>Add to Collections</h3>
      <p>Choose one or more collections for this icon</p>
    </header>

    <ul>
      <li v-if="collections.length < 1" class="warning-container">No Collections Found</li>
      <li v-for="collection in collections">
        <label :for="`${collection.id}`" class="input-container">
          <div>
            <input 
              type="checkbox" 
              :id="`${collection.id}`" 
              :value="`${collection.id}`"
              v-model="checkedCollections"
            >
            <p>{{ collection.name }}</p>
          </div>
          <p>{{ collection.iconCount }}</p>
        </label>
      </li>

      <li class="new-collection">
        <div class="new-header" @click="toggleExpand">
          <span>+</span>
          <p>Create new Collection</p>
        </div>
        
        <form 
          class="new-expanded" 
          v-if="expanded" 
          @submit.prevent="handleNewCollection"
        >
          <label for="name">New Collection's Name</label>
          <div class="new-inputs">
            <input 
              type="text" 
              id="collection-name" 
              placeholder="Collection Name" 
              v-model="collectionName"
              required
            >
            <button type="submit" class="create">Create</button>
          </div>
        </form>

      </li>
    </ul>

    <footer>
      <button id="save" @click="handleSave">Save</button>
      <button id="cancel" @click="toggleModal()">Cancel</button>
    </footer>
  </div>
</template>


<style scoped>

  .warning-container {
    padding: 1.25rem;
    text-align: center;
  }

  .new-header::after {
    content: "";
    height: 8px;
    width: 8px;
    border-bottom: 2px solid var(--text-40);
    border-right: 2px solid var(--text-40);
    position: absolute;
    top: calc(50% - 4px);
    right: 1rem;
    transform: translateY(-50%) rotate(45deg);
  }

  .new-header {
    position: relative;
    cursor: pointer;
  }

  #save:hover {
    background-color: var(--accent-50);
    border-color: var(--accent-50);
  }

  #save {
    background-color: var(--accent);
    color: var(--bg);
    border: 1px solid var(--accent);
  }

  #cancel:hover {
    background-color: var(--bg-10);
  }

  #cancel {
    background-color: var(--bg-40);
    border: 1px solid var(--border);
  }

  footer button {
    padding: .5rem 1rem;
    border-radius: .5rem;
    font-weight: 600;
  }

  footer {
    padding: .5rem 1rem;
    border-top: 1px solid var(--border);
    display: flex;
    justify-content: end;
    gap: 1rem;
  }

  .create:hover {
    background-color: var(--accent-50);
  }

  .create {
    padding: .5rem 1rem;
    background-color: var(--accent);
    color: var(--bg);
    font-weight: 700;
    border-radius: .5rem;
  }

  .new-inputs {
    display: grid;
    grid-template-columns: 1fr auto;
    gap: 1rem
  }

  .new-collection span {
    font-weight: 600;
    font-size: .85rem;
  }

  .new-expanded {
    display: flex;
    flex-direction: column;
    gap: .75rem;
  }

  .new-collection {
    display: flex;
    flex-direction: column;
    padding: 1.25rem 1rem;
    gap: 1.5rem;
  }

  label p {
    font-size: 1rem;
    font-weight: 400;
  }
  li div {
    display: grid;
    grid-template-columns: auto 1fr;
    gap: 1.25rem;
  }

  .input-container {
    display: grid;
    grid-template-columns: 1fr auto;
    gap: 1rem;
    cursor: pointer;
    padding: 1.25rem 1rem;
  }

  li:last-child {
    border-bottom: none;
  }

  li {
    display: grid;
    grid-template-columns: 1fr auto;
    border-bottom: 1px solid var(--border);
    gap: 1rem;
  }

  ul {
    display: flex;
    flex-direction: column;
    padding: 0 .75rem;
    height: min(26rem, 90vh);
    overflow-y: scroll;
  }

  header h3 {
    font-size: 1.5rem;;
  }

  header {
    padding: 1.25rem 1.5rem;
    border-bottom: 1px solid var(--border);
    display: flex;
    flex-direction: column;
    gap: .5rem;
  }
  .collection-popup {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    z-index: 10000;

    background-color: var(--bg-20);
    min-width: max(12rem, 33vw);
    max-width: max(90vw, 60rem);

    border: 1px solid var(--border);
    border-radius: 1rem;
  }
</style>