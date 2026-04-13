import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { firstValueFrom } from 'rxjs';
import { CartState } from '../../services/ui/cart-state';
import { Cart, CartItem } from '../../services/db/cart';
import { ProductService } from '../../services/db/product';
import { Theme } from '../../services/ui/theme';

@Component({
  selector: 'app-carrito',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cart.html',
  styleUrls: ['./cart.css']
})
export class CartComponent {
  /* Estado global del carrito mostrado por la aplicación */
  cartState = inject(CartState);
  cartService = inject(Cart);
  productService = inject(ProductService);
  themeService = inject(Theme);

  /* Elementos actuales del carrito */
  get items() {
    return this.cartService.getItems();
  }

  /* Total calculado del carrito */
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

  async purchase() {
    const items = this.items;

    if (items.length === 0) {
      return;
    }

    try {
      for (const item of items) {
        const product = await firstValueFrom(this.productService.getProductById(item.id));
        const remainingStock = product.stock - item.quantity;

        if (remainingStock < 0) {
          throw new Error(`Stock insuficiente para ${product.nombre}`);
        }

        const formData = new FormData();
        formData.append('Nombre', product.nombre);
        formData.append('Categoria', product.categoria);
        formData.append('Marca', product.marca);
        formData.append('Precio', String(product.precio));
        formData.append('Stock', String(remainingStock));
        formData.append('Descripcion', product.descripcion || '');
        formData.append('Disponibilidad', String(remainingStock > 0 ? 1 : 0));
        formData.append('NasaId', product.nasaId || '');

        await firstValueFrom(this.productService.updateProduct(item.id, formData));
      }

      alert('¡Venta realizada! Gracias por tu compra.');
      this.cartService.clearCart();
      this.cartState.close();
      window.location.reload();
    } catch (error: any) {
      console.error('Error al procesar la venta:', error);
      alert(error?.message || 'No se pudo procesar la compra. Verifica el stock e intenta de nuevo.');
    }
  }
}