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

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private apiUrl = environment.apiUrl;
  private imgUrl = environment.imgUrl;

  constructor(private http: HttpClient) { }

  getAllProducts(): Observable<Product[]> {
    return this.http
      .get<{ ok: boolean; products: any[] }>(`${this.apiUrl}/products`)
      .pipe(
        map((res) =>
          res.products.map((p) => ({
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
          }))
        )
      );
  }

  getProductById(id: number): Observable<Product> {
    return this.http
      .get<{ ok: boolean; product: any }>(`${this.apiUrl}/products/${id}`)
      .pipe(
        map((res) => ({
          id: Number(res.product.Id),
          nombre: res.product.Nombre,
          categoria: res.product.Categoria,
          marca: res.product.Marca,
          precio: Number(res.product.Precio),
          stock: Number(res.product.Stock),
          imagen: res.product.Imagen
            ? `${this.imgUrl}/${res.product.Imagen}`
            : '',
          descripcion: res.product.Descripcion,
          disponibilidad: Number(res.product.Disponibilidad),
          nasaId: res.product.NasaId,
        }))
      );
  }

  getProductsByCategory(categoria: string): Observable<Product[]> {
    return this.http
      .get<{ ok: boolean; products: any[] }>(
        `${this.apiUrl}/products/producto/${categoria}`
      )
      .pipe(
        map((res) =>
          res.products.map((p) => ({
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
          }))
        )
      );
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
}