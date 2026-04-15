import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { environment } from '../../../environments/environment';

export interface SpaceImage {
  title: string;
  description: string;
  imageUrl: string;
  dateCreated: string;
  center: string;
  keywords: string[];
  mediaType?: string;
  mediaUrl?: string;
}

@Injectable({
  providedIn: 'root',
})
export class SpaceApiService {
  private baseUrl = `${environment.apiUrl}/nasa`;

  constructor(private http: HttpClient) {}

  getImageByNasaId(nasaId: number): Observable<SpaceImage> {
    const url = `${this.baseUrl}?nasa_id=${encodeURIComponent(String(nasaId))}`;

    return this.http.get<any>(url).pipe(
      map(response => {
        const image = response?.image;

        if (!image) {
          throw new Error('No se encontró la imagen NASA con ese ID');
        }

        return {
          title: image.title || 'Imagen NASA',
          description: image.description || 'Sin descripción disponible.',
          imageUrl: image.imageUrl || '',
          dateCreated: image.dateCreated || '',
          center: image.center || 'NASA',
          keywords: image.keywords || []
        };
      })
    );
  }
}