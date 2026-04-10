import { Component, OnInit, signal, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SpaceApiService, SpaceImage } from '../../services/ui/space-api.service';
import { Cart, CartItem } from '../../services/db/cart';
import { ProductService, Product } from '../../services/db/product';

@Component({
  selector: 'app-detalleproducto',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './detalleproducto.html',
  styleUrls: ['./detalleproducto.css'],
})
export class Detalleproducto implements OnInit {
  route = inject(ActivatedRoute);
  spaceApiService = inject(SpaceApiService);
  cartService = inject(Cart);
  productService = inject(ProductService);

  product = signal<Product | null>(null);
  spaceImages = signal<SpaceImage[]>([]);
  loading = signal(true);
  error = signal<string>('');

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      const productId = Number(id);

      if (isNaN(productId)) {
        this.error.set('ID inválido');
        this.loading.set(false);
        return;
      }

      this.productService.getProductById(productId).subscribe({
        next: (prod) => {
          this.product.set(prod);
          this.loadSpaceData(prod);
        },
        error: (err) => {
          console.error('Error cargando producto:', err);
          this.error.set('Producto no encontrado.');
          this.loading.set(false);
        }
      });
    }
  }

  private loadSpaceData(product: Product) {
    this.loading.set(true);
    this.error.set('');

    const nasaId = product?.nasaId;

    if (product?.nasaId) {
      this.spaceApiService.getImageByNasaId(product.nasaId as any).subscribe({
        next: (image) => {
          this.spaceImages.set([image]);
          this.loading.set(false);
        },
        error: (err) => {
          console.error('Error cargando imagen por nasaId:', err);
          this.error.set('Detalles de NASA no disponibles para este poster.');
          this.spaceImages.set([]);
          this.loading.set(false);
        }
      });
    } else {
      this.error.set('No se encontró NASA ID para este poster.');
      this.spaceImages.set([]);
      this.loading.set(false);
    }
  }

  addToCart() {
    const p = this.product();
    if (!p) return;

    const item: CartItem = {
      id: p.id!,
      name: p.nombre,
      price: p.precio,
      image: p.imagen,
      quantity: 1
    };

    this.cartService.addItem(item);
  }
}