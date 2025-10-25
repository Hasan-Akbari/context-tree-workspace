# @hasan-akbari/context-tree

> 🧠 A fully standalone, reactive, and generic context service for Angular component trees.  
> Supports context inheritance, dynamic updates, local overrides, and optional persistence.

---

## 📦 Features

- ✅ Fully **standalone** (no `NgModule` required)
- 🪴 Context **inheritance** down the component tree
- 🌀 Reactive with Angular **signals**
- 🔧 Built-in `mergeContext()`, `clearContext()`, and `effectiveContext()`
- 💾 Optional **localStorage/sessionStorage** persistence
- 📜 Fully typed and generic (`ContextTreeService<T>`)

---

## 📥 Installation

```bash
npm install @hasan-akbari/context-tree
```

> Requires Angular `^17.0.0` or higher.

---

## 🛠️ Usage Examples

### 1. Define your context interface and service

```ts
import { Injectable } from '@angular/core';
import { ContextTreeService } from '@hasan-akbari/context-tree';

export interface UserContext {
  id: string;
  name: string;
  role?: string;
}

@Injectable()
export class UserContextService extends ContextTreeService<UserContext> {}
```

### 2. Provide context service in a parent component and set context

```ts
import { Component } from '@angular/core';
import { UserContextService } from './user-context.service';

@Component({
  selector: 'app-user-container',
  standalone: true,
  template: `<app-user-detail></app-user-detail>`,
  providers: [UserContextService],
})
export class UserContainerComponent {
  constructor(private userCtx: UserContextService) {
    this.userCtx.setContext({ id: '123', name: 'Ali' });
  }
}
```

### 3. Access context reactively in a child component

```ts
import { Component } from '@angular/core';
import { UserContextService } from './user-context.service';

@Component({
  selector: 'app-user-detail',
  standalone: true,
  template: `
    <p>User ID: {{ userContext.effectiveContext()?.id }}</p>
    <p>Name: {{ userContext.effectiveContext()?.name }}</p>
  `,
})
export class UserDetailComponent {
  constructor(public userContext: UserContextService) {}
}
```

### 4. Update part of the context (merge)

```ts
this.userCtx.mergeContext({ role: 'admin' });
```

### 5. Clear the local context

```ts
this.userCtx.clearContext();
```

### 6. Optional: Persist context to localStorage or sessionStorage

```ts
this.userCtx.persistContext('myUserContextKey', localStorage);
```

---

## 🧠 API Summary

| Method                     | Description                               |
|----------------------------|-------------------------------------------|
| `setContext(value: T)`     | Set the local context                      |
| `clearContext()`           | Clear the local context                    |
| `mergeContext(partial: Partial<T>)` | Merge partial values into current context |
| `effectiveContext()`       | Get the context considering parent context |
| `isLocalContextDefined()`  | Check if local context is defined          |
| `persistContext(key: string, storage?: Storage)` | Persist context to storage              |
| `effectLogger(label: string)` | Debug logs on context changes           |

---

## 🛡 License

MIT

---

## 👤 Author

**Hasan Akbari**  
📦 [npm profile](https://www.npmjs.com/~hasan-akbari)

---

## 🤝 Contributing

Pull requests welcome! Please open issues for discussions on major changes.
