import { Component, OnInit, ChangeDetectorRef, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from "@angular/router";
import { Cart, CartItem } from '../../services/db/cart';
import { ProductService, Product } from '../../services/db/product'; 
@Component({
  selector: 'app-productos',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './productos.html',
  styleUrl: './productos.css',
})
export class Productos implements OnInit {
  cartService = inject(Cart);
  productService = inject(ProductService);
  courses = signal<Product[]>([]);

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    // Llamada real al backend
    this.productService.getAllProducts().subscribe({
      next: (data) => {
        this.courses.set(data);
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error("Error cargando productos:", err);
      }
    });
  }

  addToCart(product: Product) {
    const item: CartItem = {
      id: product.id!,
      name: product.nombre,
      price: product.precio,
      image: product.imagen,
      quantity: 1
    };
    this.cartService.addItem(item);
  }
}
