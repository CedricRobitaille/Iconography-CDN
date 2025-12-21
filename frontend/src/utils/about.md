# Utils
## Pure functions (framework-agnostic)

### What goes here

- No Vue imports
- No reactivity
- Stateless helpers
- Easily testable
- Reusable outside Vue

### Examples

```js
formatDate()
debounce()
slugify()
calculatePrice()
```

### Characteristics

- Input → Output
- No side effects (ideally)
- No knowledge of Vue

### Example

```js
// utils/debounce.ts
export function debounce<T extends (...args: any[]) => void>(
  fn: T,
  delay = 300
) {
  let timer: number
  return (...args: Parameters<T>) => {
    clearTimeout(timer)
    timer = window.setTimeout(() => fn(...args), delay)
  }
}
```

---

- Framework-agnostic
- Easy unit testing
- Safe to use anywhere