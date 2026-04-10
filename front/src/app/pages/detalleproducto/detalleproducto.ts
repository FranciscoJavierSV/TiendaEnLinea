import { Component, OnInit, signal, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SpaceApiService, SpaceImage } from '../../services/ui/space-api.service';
import { Cart, CartItem } from '../../services/db/cart';

@Component({
  selector: 'app-detalleproducto',
  imports: [RouterLink, CommonModule],
  templateUrl: './detalleproducto.html',
  styleUrl: './detalleproducto.css',
})
export class Detalleproducto implements OnInit {
  route = inject(ActivatedRoute);
  spaceApiService = inject(SpaceApiService);
  cartService = inject(Cart);

  product = signal<any>(null);
  spaceImages = signal<SpaceImage[]>([]);
  loading = signal(true);
  error = signal<string>('');

  // Mock products data (same as in productos.ts)
  private mockProducts = [
    {
      id: 1, categoria: 'Espacio', marca: 'NASA', precio: 29.99, stock: 15, imagen: 'https://picsum.photos/200/300?random=1', descripcionCorta: 'Poster de la Vía Láctea', disponibilidad: true, nombre: 'Vía Láctea', nasaId: 'PIA13444'
    }, {
      id: 2, categoria: 'Espacio', marca: 'ESA', precio: 24.99, stock: 10, imagen: 'https://picsum.photos/200/300?random=2', descripcionCorta: 'Poster del planeta Júpiter', disponibilidad: true, nombre: 'Júpiter', nasaId: 'PIA21954'
    }, {
      id: 3, categoria: 'Espacio', marca: 'NASA', precio: 34.99, stock: 8, imagen: 'https://picsum.photos/200/300?random=3', descripcionCorta: 'Poster de la nebulosa de Orión', disponibilidad: true, nombre: 'Nebulosa Orión', nasaId: 'PIA04391'
    }, {
      id: 4, categoria: 'Espacio', marca: 'ESA', precio: 19.99, stock: 20, imagen: 'https://picsum.photos/200/300?random=4', descripcionCorta: 'Poster de la Tierra desde el espacio', disponibilidad: true, nombre: 'Tierra Espacial', nasaId: 'ISS045-E-54645'
    }, {
      id: 5, categoria: 'Espacio', marca: 'NASA', precio: 39.99, stock: 5, imagen: 'https://picsum.photos/200/300?random=5', descripcionCorta: 'Poster de la luna llena', disponibilidad: true, nombre: 'Luna Llena', nasaId: 'PIA00949'
    }, {
      id: 6, categoria: 'Espacio', marca: 'ESA', precio: 27.99, stock: 12, imagen: 'https://picsum.photos/200/300?random=6', descripcionCorta: 'Poster de Saturno con anillos', disponibilidad: true, nombre: 'Saturno', nasaId: 'PIA02151'
    }, {
      id: 7, categoria: 'Espacio', marca: 'NASA', precio: 22.99, stock: 18, imagen: 'https://picsum.photos/200/300?random=7', descripcionCorta: 'Poster de la Estación Espacial Internacional', disponibilidad: true, nombre: 'ISS', nasaId: 'ISS005-E-8782'
    }, {
      id: 8, categoria: 'Espacio', marca: 'ESA', precio: 31.99, stock: 7, imagen: 'https://picsum.photos/200/300?random=8', descripcionCorta: 'Poster de la galaxia Andrómeda', disponibilidad: true, nombre: 'Andrómeda', nasaId: 'PIA00956'
    }, {
      id: 9, categoria: 'Espacio', marca: 'NASA', precio: 25.99, stock: 14, imagen: 'https://picsum.photos/200/300?random=9', descripcionCorta: 'Poster de Marte', disponibilidad: true, nombre: 'Marte', nasaId: 'PIA23499'
    }, {
      id: 10, categoria: 'Espacio', marca: 'ESA', precio: 35.99, stock: 6, imagen: 'https://picsum.photos/200/300?random=10', descripcionCorta: 'Poster de la nebulosa del Cangrejo', disponibilidad: true, nombre: 'Nebulosa Cangrejo', nasaId: 'PIA12048'
    }, {
      id: 11, categoria: 'Espacio', marca: 'NASA', precio: 28.99, stock: 11, imagen: 'https://picsum.photos/200/300?random=11', descripcionCorta: 'Poster de Venus', disponibilidad: true, nombre: 'Venus', nasaId: 'PIA00103'
    }, {
      id: 12, categoria: 'Espacio', marca: 'ESA', precio: 32.99, stock: 9, imagen: 'https://picsum.photos/200/300?random=12', descripcionCorta: 'Poster de la constelación de Orión', disponibilidad: true, nombre: 'Orión', nasaId: 'PIA11316'
    }, {
      id: 13, categoria: 'Espacio', marca: 'NASA', precio: 26.99, stock: 16, imagen: 'https://picsum.photos/200/300?random=13', descripcionCorta: 'Poster de la aurora boreal', disponibilidad: true, nombre: 'Aurora Boreal', nasaId: 'PIA03085'
    }, {
      id: 14, categoria: 'Espacio', marca: 'ESA', precio: 33.99, stock: 4, imagen: 'https://picsum.photos/200/300?random=14', descripcionCorta: 'Poster de la galaxia del Sombrero', disponibilidad: true, nombre: 'Galaxia Sombrero', nasaId: 'PIA13776'
    }, {
      id: 15, categoria: 'Espacio', marca: 'NASA', precio: 30.99, stock: 13, imagen: 'https://picsum.photos/200/300?random=15', descripcionCorta: 'Poster de la luna de Júpiter, Europa', disponibilidad: true, nombre: 'Europa', nasaId: 'PIA19040'
    }
  ];

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      const productId = parseInt(id, 10);
      const foundProduct = this.mockProducts.find(p => p.id === productId);
      if (foundProduct) {
        this.product.set(foundProduct);
        this.loadSpaceData(foundProduct);
      }
    }
  }

  private loadSpaceData(product: any) {
    this.loading.set(true);
    this.error.set('');

    if (product.nasaId) {
      this.spaceApiService.getImageByNasaId(product.nasaId).subscribe({
        next: (image) => {
          this.spaceImages.set([image]);
          this.loading.set(false);
        },
        error: (err) => {
          console.error('Error cargando imagen por nasa_id:', err);
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
    if (this.product()) {
      const item: CartItem = {
        id: this.product().id,
        name: this.product().nombre,
        price: this.product().precio,
        image: this.product().imagen,
        quantity: 1
      };
      this.cartService.addItem(item);
    }
  }
}
