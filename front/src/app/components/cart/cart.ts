import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartState } from '../../services/ui/cart-state';
import { Cart, CartItem } from '../../services/db/cart';
import { Theme } from '../../services/ui/theme';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cart.html',
  styleUrls: ['./cart.css']
})
export class CartComponent {
  cartState = inject(CartState);
  cartService = inject(Cart);
  themeService = inject(Theme);

  get items() {
    return this.cartService.getItems();
  }

  get total() {
    return this.cartService.getTotal();
  }

  updateQuantity(item: CartItem, quantity: number) {
    this.cartService.updateQuantity(item.id, quantity);
  }

  removeItem(id: number) {
    this.cartService.removeItem(id);
  }

  clearCart() {
    this.cartService.clearCart();
  }
}