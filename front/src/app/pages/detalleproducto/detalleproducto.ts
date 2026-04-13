import { Component, OnInit, signal, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SpaceApiService, SpaceImage } from '../../services/ui/space-api.service';
import { Cart, CartItem } from '../../services/db/cart';
import { ProductService, Product } from '../../services/db/product';

/* Página de detalle de producto que muestra información y permite agregar al carrito */
@Component({
  selector: 'app-detalleproducto',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './detalleproducto.html',
  styleUrls: ['./detalleproducto.css'],
})
export class Detalleproducto implements OnInit {
  /* Parámetros de la ruta actual */
  route = inject(ActivatedRoute);

  /* Servicio NASA para obtener imágenes relacionadas */
  spaceApiService = inject(SpaceApiService);

  /* Servicio de carrito para agregar el producto */
  cartService = inject(Cart);

  /* Servicio de productos para obtener el detalle del item */
  productService = inject(ProductService);

  /* Producto cargado actualmente */
  product = signal<Product | null>(null);

  /* Imágenes relacionadas obtenidas de la API de NASA */
  spaceImages = signal<SpaceImage[]>([]);

  /* Indicador de carga mientras se obtiene información */
  loading = signal(true);

  /* Mensaje de error mostrado al usuario en caso de fallo */
  error = signal<string>('');

  /* Carga el producto según el ID presente en la ruta */
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

  /* Solicita información de imagen adicional desde la API de NASA */
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

  /* Agrega el producto actual al carrito, verificando stock disponible */
  addToCart() {
    const p = this.product();
    if (!p) return;

    if (p.stock === 0 || p.disponibilidad === 0) {
      alert('No hay stock disponible para este artículo.');
      return;
    }

    const existing = this.cartService.getItems().find((item) => item.id === p.id);
    if (existing && existing.quantity >= p.stock) {
      alert('No puedes agregar más unidades de este artículo, no hay suficiente stock.');
      return;
    }

    const item: CartItem = {
      id: p.id!,
      name: p.nombre,
      price: p.precio,
      image: p.imagen,
      quantity: 1,
      stock: p.stock,
    };

    const added = this.cartService.addItem(item);
    if (!added) {
      alert('No puedes agregar más unidades de este artículo, no hay suficiente stock.');
    }
  }
}