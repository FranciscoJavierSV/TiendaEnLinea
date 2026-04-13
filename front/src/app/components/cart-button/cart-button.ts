import { Component, inject, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartState } from '../../services/ui/cart-state';
import { Cart } from '../../services/db/cart';
import { Theme } from '../../services/ui/theme';

@Component({
  selector: 'app-boton-carrito',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cart-button.html',
  styleUrls: ['./cart-button.css']
})

export class CartButton {
  /* Manejador del estado del carrito */
  cartState = inject(CartState);
  cartService = inject(Cart);
  themeService = inject(Theme);

  /* Cantidad total de ítems en el carrito */
  itemCount = computed(() => this.cartService.getItemCount());

  openCart() {
    this.cartState.open();
  }
}