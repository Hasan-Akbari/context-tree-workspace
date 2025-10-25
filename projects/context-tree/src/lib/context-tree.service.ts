import { inject, Injectable, signal, Signal, computed, effect } from '@angular/core';

@Injectable({ providedIn: 'any' })
export class ContextTreeService<T> {
  private readonly _context = signal<T | null>(null);
  readonly context: Signal<T | null> = this._context.asReadonly();

  private readonly parentContext = inject<ContextTreeService<T> | null>(
    ContextTreeService as any,
    { optional: true, skipSelf: true }
  );

  readonly effectiveContext: Signal<T | null> = computed(() => {
    return this._context() ?? this.parentContext?.effectiveContext() ?? null;
  });


  setContext(context: T): void {
    this._context.set(context);
  }

  clearContext(): void {
    this._context.set(null);
  }

  isLocalContextDefined(): boolean {
    return this._context() !== null;
  }

  mergeContext(partial: Partial<T>): void {
    const current = this._context();
    if (!current) {
      this._context.set(partial as T);
      return;
    }
    this._context.set({ ...current, ...partial });
  }

  persistContext(key: string, storage: Storage = localStorage): void {
    const saved = storage.getItem(key);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        this._context.set(parsed);
      } catch {}
    }

    effect(() => {
      const ctx = this._context();
      if (ctx) {
        storage.setItem(key, JSON.stringify(ctx));
      } else {
        storage.removeItem(key);
      }
    });
  }

  effectLogger(label: string): void {
    effect(() => {
      console.log(`[${label}]`, this.effectiveContext());
    });
  }
}
