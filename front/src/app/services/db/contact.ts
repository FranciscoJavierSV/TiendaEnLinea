import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

export interface ContactForm {
  Nombre: string;
  Correo: string;
  Asunto: string;
  Mensaje: string;
}

@Injectable({
  providedIn: 'root',
})
export class Contact {
  constructor(private http: HttpClient) {}

  sendMessage(payload: ContactForm) {
    return this.http.post(`${environment.apiUrl}/comments`, payload);
  }
}
