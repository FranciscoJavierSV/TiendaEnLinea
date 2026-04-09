import { Injectable, signal, computed } from '@angular/core';

export interface CartItem {
  id: number;
  name: string;
  price: number;
  image?: string;
  quantity: number;
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
    this.items.update(items => items.map(item =>
      item.id === id ? { ...item, quantity: Math.max(1, quantity) } : item
    ));
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
    if (existing) {
      this.items.set(current.map(i =>
        i.id === item.id ? { ...i, quantity: i.quantity + item.quantity } : i
      ));
    } else {
      this.items.set([...current, item]);
    }
  }
}
