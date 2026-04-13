import { Injectable, signal, computed } from '@angular/core';

export interface CartItem {
  id: number;
  name: string;
  price: number;
  image?: string;
  quantity: number;
  stock?: number;
}

@Injectable({
  providedIn: 'root',
})
export class Cart {
  private items = signal<CartItem[]>([]);

  getItemCount() {
    return this.items().reduce((sum, item) => sum + item.quantity, 0);
  }

  getItems() {
    return this.items();
  }

  getTotal() {
    return this.items().reduce((sum, item) => sum + item.price * item.quantity, 0);
  }

  updateQuantity(id: number, quantity: number) {
    this.items.update(items => items.map(item => {
      if (item.id !== id) {
        return item;
      }

      const clampedQuantity = item.stock
        ? Math.min(Math.max(1, quantity), item.stock)
        : Math.max(1, quantity);

      return { ...item, quantity: clampedQuantity };
    }));
  }

  removeItem(id: number) {
    this.items.update(items => items.filter(item => item.id !== id));
  }

  clearCart() {
    this.items.set([]);
  }

  addItem(item: CartItem) {
    const current = this.items();
    const existing = current.find(i => i.id === item.id);
    const maxStock = existing?.stock ?? item.stock;

    if (existing) {
      const nextQuantity = existing.quantity + item.quantity;
      if (maxStock !== undefined && nextQuantity > maxStock) {
        return false;
      }

      this.items.set(current.map(i =>
        i.id === item.id ? { ...i, quantity: nextQuantity, stock: maxStock } : i
      ));
      return true;
    }

    if (maxStock !== undefined && item.quantity > maxStock) {
      return false;
    }

    this.items.set([...current, item]);
    return true;
  }
}
