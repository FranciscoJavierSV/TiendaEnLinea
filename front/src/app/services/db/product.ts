import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

export interface Product {
  id?: number;
  nombre: string;
  categoria: string;
  marca: string;
  precio: number;
  stock: number;
  imagen?: string;
  descripcion?: string;
  disponibilidad: number;
  nasaId?: string;
}

export interface ProductPage {
  products: Product[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private apiUrl = environment.apiUrl;
  private imgUrl = environment.imgUrl;

  constructor(private http: HttpClient) { }

  private mapProduct(p: any): Product {
    return {
      id: Number(p.Id),
      nombre: p.Nombre,
      categoria: p.Categoria,
      marca: p.Marca,
      precio: Number(p.Precio),
      stock: Number(p.Stock),
      imagen: p.Imagen ? `${this.imgUrl}/${p.Imagen}` : '',
      descripcion: p.Descripcion,
      disponibilidad: Number(p.Disponibilidad),
      nasaId: p.NasaId,
    };
  }

  getAllProducts(page = 1, limit = 8): Observable<ProductPage> {
    return this.http.get<{ ok: boolean; products: any[]; total?: number; page?: number; limit?: number; totalPages?: number }>(
      `${this.apiUrl}/products?page=${page}&limit=${limit}`
    ).pipe(
      map((res) => {
        const products = res.products.map((p) => this.mapProduct(p));
        const pageNumber = Number(res.page) || 1;
        const limitNumber = Number(res.limit) || limit;
        const totalNumber = Number(res.total) || products.length;
        const totalPagesNumber = Number(res.totalPages) || Math.max(1, Math.ceil(totalNumber / limitNumber));

        return {
          products,
          total: totalNumber,
          page: pageNumber,
          limit: limitNumber,
          totalPages: totalPagesNumber,
        };
      })
    );
  }

  getProductById(id: number): Observable<Product> {
    return this.http.get<{ ok: boolean; product: any }>(`${this.apiUrl}/products/${id}`)
      .pipe(map((res) => this.mapProduct(res.product)));
  }

  getProductsByCategory(categoria: string): Observable<Product[]> {
    return this.http.get<{ ok: boolean; products: any[] }>(
        `${this.apiUrl}/products/producto/${categoria}`
      )
      .pipe(map((res) => res.products.map((p) => this.mapProduct(p))));
  }

  createProduct(formData: FormData): Observable<any> {
    return this.http.post(`${this.apiUrl}/products`, formData);
  }

  updateProduct(id: number, formData: FormData): Observable<any> {
    return this.http.put(`${this.apiUrl}/products/${id}`, formData);
  }

  deleteProduct(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/products/${id}`);
  }

  sellProducts(items: { id: number; quantity: number }[]): Observable<any> {
    return this.http.post(`${this.apiUrl}/products/sell`, { items });
  }
}