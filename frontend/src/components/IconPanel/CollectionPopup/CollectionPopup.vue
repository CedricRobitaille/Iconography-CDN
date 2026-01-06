<script setup lang="ts">
  const props = defineProps<{
    icon: any
  }>();

  console.log(props.icon)

</script>


<template>
  <div class="collection-popup">
    <header>
      <h3>Add to Collections</h3>
      <p>Choose one or more collections for this icon</p>
    </header>

    <ul>
      <li>
        <label for="collectionId" class="input-container">
          <div>
            <input type="checkbox" id="collectionId" value="collectionId">
            <p>CollectionName</p>
          </div>
          <p>123</p>
        </label>
      </li>

      <li class="new-collection">
        <div>
          <span>+</span>
          <p>Create new Collection</p>
        </div>
        
        <div class="new-expanded">
          <label for="name">New Collection's Name</label>
          <div class="new-inputs">
            <input type="text" id="collection-name" placeholder="Collection Name">
            <button class="create">Create</button>
          </div>
        </div>

      </li>
    </ul>

    <footer>
      <button id="save">Save</button>
      <button id="cancel">Cancel</button>
    </footer>
  </div>
</template>


<style scoped>

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

  .new-expanded {
    display: flex;
    flex-direction: column;
    gap: .75rem;
  }

  .new-collection {
    display: flex;
    flex-direction: column;
    padding: 1.25rem 1rem;
    gap: 1rem;
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