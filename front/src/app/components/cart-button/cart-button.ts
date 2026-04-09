import { Component, inject, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartState } from '../../services/ui/cart-state';
import { Cart } from '../../services/db/cart';
import { Theme } from '../../services/ui/theme';

@Component({
  selector: 'app-cart-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cart-button.html',
  styleUrls: ['./cart-button.css']
})

export class CartButton {
  cartState = inject(CartState);
  cartService = inject(Cart);
  themeService = inject(Theme);

  itemCount = computed(() => this.cartService.getItemCount());

  openCart() {
    this.cartState.open();
  }
}