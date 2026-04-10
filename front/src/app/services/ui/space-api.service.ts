import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, map } from 'rxjs';
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
  private apiKey = environment.nasaApiKey;
  private baseUrl = 'https://images-api.nasa.gov';

  constructor(private http: HttpClient) {}

  getImageByNasaId(nasaId: string): Observable<SpaceImage> {
    const url = `${this.baseUrl}/search?nasa_id=${encodeURIComponent(nasaId)}&media_type=image`;
    return this.http.get<any>(url).pipe(
      map(response => {
        const item = response.collection?.items?.[0];
        if (!item) throw new Error('No se encontró la imagen NASA con ese ID');
        const data = item.data?.[0] || {};
        const imageUrl = item.links?.[0]?.href || '';
        return {
          title: data.title || 'Imagen NASA',
          description: data.description || 'Sin descripción disponible.',
          imageUrl,
          dateCreated: data.date_created || data.date || '',
          center: data.center || 'NASA',
          keywords: data.keywords || []
        };
      })
    );
  }
}
