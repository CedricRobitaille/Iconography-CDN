# Types
## Reactive logic (Vue-aware)

### What goes here

- Only TypeScript
- No Vue imports
- Interfaces, types, enums
- Shared across the app

### Examples

```ts
// types/models/User.ts
export interface User {
  id: string
  name: string
  email: string
}
```

```ts
// types/ui/SelectOption.ts
export interface SelectOption {
  label: string
  value: string | number
}
```