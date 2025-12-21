# Composables
## Reactive logic (Vue-aware)

### What goes here

- Uses Vue APIs: ref, reactive, computed, watch
- Encapsulates state + behavior
- Can be shared or instance-based
- Often replaces mixins

### Examples

```js
useSearch()
useAuth()
useTheme()
useForm()
```

### Characteristics

- Returns reactive state
- Tied to Vue’s reactivity system
- Can depend on lifecycle hooks
- May be global (singleton) or per-use

### Example

```js
// composables/useSearch.ts
import { ref } from 'vue'

const search = ref('')

export function useSearch() {
  function clear() {
    search.value = ''
  }

  return { search, clear }
}
```

---

- Vue-specific
- Reactive
- Reusable across components