# Stores
## Application state (Pinia / Vuex)

### What goes here

- App-wide state=
- Business logic
- Cross-feature coordination
- Persistence / caching

### Examples

```js
useAuthStore()
useCartStore()
useSettingsStore()
```

### Characteristics

- Opinionated structure
- Devtools support
- SSR-safe
- Centralized state

### Example

```js
// stores/search.ts
import { defineStore } from 'pinia'

export const useSearchStore = defineStore('search', {
  state: () => ({
    search: ''
  })
})
```

---

- True global state
- Scales well
- Debuggable