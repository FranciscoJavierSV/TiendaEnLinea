import { Component, OnInit, ChangeDetectorRef, computed, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from "@angular/router";
import { Cart, CartItem } from '../../services/db/cart';
import { ProductService, Product } from '../../services/db/product'; 
import { ControlPagina } from '../../components/control-pagina/control-pagina';

/* Componente que muestra la lista de productos y controla la paginación */
@Component({
  selector: 'app-productos',
  standalone: true,
  imports: [CommonModule, RouterLink, ControlPagina],
  templateUrl: './productos.html',
  styleUrl: './productos.css',
})
export class Productos implements OnInit {
  /* Servicio de carrito inyectado para agregar productos */
  cartService = inject(Cart);

  /* Servicio que obtiene productos desde el backend */
  productService = inject(ProductService);

  /* Lista de productos cargados desde el servicio */
  courses = signal<Product[]>([]);

  /* Página actual del listado */
  currentPage = signal(1);

  /* Total de páginas disponibles */
  totalPages = signal(1);

  /* Indicador de carga mientras se obtienen productos */
  loading = signal(false);

  /* Cantidad de productos por página */
  pageSize = 10;

  /* Genera los números de página para el control de paginación */
  pages = computed(() => Array.from({ length: this.totalPages() }, (_, i) => i + 1));

  /* Productos que se muestran actualmente en la vista */
  shownCourses = computed(() => this.courses());

  constructor(private cdr: ChangeDetectorRef) {}

  /* Inicializa la carga de productos al montar el componente */
  ngOnInit(): void {
    this.loadProducts();
  }

  /* Solicita productos al backend según la página solicitada */
  loadProducts(page: number = 1): void {
    this.loading.set(true);
    this.productService.getAllProducts(page, this.pageSize).subscribe({
      next: (data) => {
        const pageNumber = Number(data.page) || 1;
        const totalPagesNumber = Number(data.totalPages) || Math.max(1, Math.ceil(data.products.length / this.pageSize));

        this.courses.set(data.products);
        this.currentPage.set(pageNumber);
        this.totalPages.set(totalPagesNumber);
        this.loading.set(false);
        this.cdr.detectChanges();
      },
      error: (err) => {
        this.loading.set(false);
        console.error("Error cargando productos:", err);
      }
    });
  }

  /* Cambia a una página diferente dentro del listado */
  changePage(page: number): void {
    if (page < 1 || page > this.totalPages()) {
      return;
    }
    this.loadProducts(page);
  }

  /* Navegación a la página anterior */
  prevPage(): void {
    this.changePage(this.currentPage() - 1);
  }

  /* Navegación a la página siguiente */
  nextPage(): void {
    this.changePage(this.currentPage() + 1);
  }

  /* Agrega un producto al carrito si hay stock disponible */
  addToCart(product: Product) {
    if (product.stock === 0 || product.disponibilidad === 0) {
      alert('No hay stock disponible para este artículo.');
      return;
    }

    const existing = this.cartService.getItems().find((item) => item.id === product.id);
    if (existing && existing.quantity >= product.stock) {
      alert('No puedes agregar más unidades de este artículo, no hay suficiente stock.');
      return;
    }

    const item: CartItem = {
      id: product.id!,
      name: product.nombre,
      price: product.precio,
      image: product.imagen,
      quantity: 1,
      stock: product.stock,
    };

    const added = this.cartService.addItem(item);
    if (!added) {
      alert('No puedes agregar más unidades de este artículo, no hay suficiente stock.');
    }
  }
}
