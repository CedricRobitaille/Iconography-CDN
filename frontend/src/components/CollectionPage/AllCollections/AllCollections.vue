<script setup lang='ts'>

  import { computed } from 'vue';
  import { useCollectionStore } from '../../../stores/collections';

  /**
   * Store for collections
   */
  const collections = useCollectionStore();


  /**
   * Tallies all icons for header
   * @returns {count}
   */
  const iconCount = computed(() => {
    let count = 0;

    // Sums iconCount for each collection
    collections.collections.forEach(collection => {
      count += collection.iconCount;
    })
    return count;
  })


  /**
   * Tallies the monthly uses from all collections
   * @returns {count}
   */ 
  const pageViews = computed(() => {
    let count = 0;

    // sums monthlyUses for each collection
    collections.collections.forEach(collection => {
      count += collection.monthlyUses;
    })
    return count;
  })


  /**
   * Compares collections to find the most used collection
   * @returns {topQty, collection}
   */
  const mostAccessed = computed(() => {
    let topQty = 0
    let collection: string | undefined = undefined;

    // Logs top collection with highest uses
    collections.collections.forEach(col => {
      if (col.monthlyUses >= topQty) {
        topQty = col.monthlyUses;
        collection = col.name;
      }
    })
    return {
      topQty,
      collection
    };
  })


  /**
   * Compares collections to find the least used collection
   * @returns {minQty, collection} 
   */
  const leastAccessed = computed(() => {
    let minQty: undefined | number = collections.collections[0]?.monthlyUses;
    let collection: string | undefined = undefined;

    // Logs top collection with least uses
    if (collections.collections.length) {
      collections.collections.forEach(col => {
        if (col.monthlyUses <= minQty) {
          minQty = col.monthlyUses;
          collection = col.name;
        }
      })
    }
    return {
      minQty,
      collection
    };
  })

</script>


<template>

  <header>
    <h1>Your Collections</h1>
    <div>
      <!-- Collection Count -->
      <p>{{ collections.collections.length }} Collections</p>
      <!-- Icon Count -->
      <p>{{ iconCount }} Icons</p>
    </div>
  </header>

  <section id="all-collections">
    
    <ul>
      <li 
        v-for="collection in collections.collections" 
        @click="collections.toggleCurrentCollection(collection)"
        class="collection-collection"
      >

        <div class="icon-container">
          <svg id="collection-icon" fill="none" viewBox="0 0 48 48">
            <rect width="46" height="46" x="1" y="1" stroke="#fff" stroke-width="2" rx="23" />
            <path fill="#fff" stroke="#fff" stroke-width="2"
              d="M26.192 19.982l.225.692h7.82l-5.739 4.17-.588.426.225.692 2.192 6.746-5.74-4.17-.587-.427-.588.427-5.74 4.17 2.193-6.746.225-.692-.588-.426-5.738-4.17h7.819l.225-.692L24 13.235l2.192 6.747z" />
          </svg>
        </div>

        <div class="collection-details">
          <h2>{{ collection.name }}</h2>
          <p>Last edited 0 days ago.</p>
        </div>

        <div class="collection-stats">
          <div>
            <h5>{{ collection.monthlyUses }}</h5>
            <p>Views</p>
          </div>
          <div>
            <h5>{{ collection.iconCount }}</h5>
            <p>Icons</p>
          </div>
        </div>
        
      </li>
      
      <li>
        <button class="new-collection">Create a New Collection</button>
      </li>
    </ul>

  </section>

  <section id="collection-stats">

    <div class="stat-container">
      <h3>{{ pageViews }}</h3>
      <p>Total Page Views This Month</p>
    </div>

    <div class="stat-container">
      <h3>{{ mostAccessed.topQty }}</h3>
      <p>{{ mostAccessed.collection}} Was The Most Popular</p>
    </div>

    <div class="stat-container">
      <h3>{{ leastAccessed.minQty }}</h3>
      <p>{{ leastAccessed.collection }} Was The Least Popular</p>
    </div>

  </section>

</template>


<style scoped>

  .new-collection:hover {
    background-color: var(--bg-40);
    color: var(--text)
  }

  .new-collection {
    padding: 1rem;
    background-color: var(--bg-20);
    width: 100%;
    border-radius: .5rem;
    border: 1px solid var(--border);
    transition: .125s;
  }

  .collection-details p {
    font-size: .85rem;
    color: var(--text-30);
  }

  h5 {
    font-size: 1rem;
  }

  h2 {
    font-size: 1.5rem;
  }

  .collection-details {
    display: flex;
    flex-direction: column;
    gap: .5rem;
  }

  .collection-collection p {
    font-size: .75rem;
    color: var(--text-30);
  }

  .collection-stats div {
    display: flex;
    align-items: center;
    flex-direction: column;
    gap: .5rem;
  }

  .collection-stats {
    display: flex;
    gap: 1rem;
    padding-right: 1.5rem;
  }

  .icon-container {
    padding: 2rem;
    background-color: var(--bg-30);
    transition: .125s;
  }

  .collection-collection:hover .icon-container {
    background-color: var(--bg-40);
  }

  .collection-collection:hover {
    background-color: var(--bg-30);
  }

  .collection-collection {
    display: grid;
    grid-template-columns: auto 1fr auto;
    align-items: center;
    gap: 1.5rem;
    background-color: var(--bg-20);
    border: 1px solid var(--border);
    border-radius: .5rem;
    overflow: hidden;
    cursor: pointer;
    transition: .125s;
  }

  ul {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }

  #collection-icon {
    height: 2rem;
    width: 2rem;
  }

  .stat-container h3 {
    font-size: 2rem;
  }

  .stat-container p {
    font-size: .85rem;
  }

  .stat-container {
    display: flex;
    flex-direction: column;
    gap: .5rem;
    align-items: center;
    padding: 2rem 3rem;
    border-radius: 1rem;
    border: 1px solid var(--border);
    
  }

  #collection-stats {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(8rem, 1fr));
    gap: 1.25rem;
    align-items: center;
    height: fit-content;
    justify-content: stretch;
    text-align: center;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  header {
    display: grid;
    grid-template-columns: 1fr auto;
    padding-bottom: 1rem;
    border-bottom: 1.5px solid var(--bg-30);
    align-items: end;
  }
  header div {
    display: flex;
    flex-direction: row;
    gap: 1.5rem;
  }

  h1 {
    font-size: 2.25rem;
  }

  header div p {
    font-size: 1.125rem;
    color: var(--text-30)
  }

</style>








