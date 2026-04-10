import { Component, OnInit, ChangeDetectorRef, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
//import { CourseService } from '../../services/course';    Este era el servicio para bd
import { RouterLink } from "@angular/router";
import { Cart, CartItem } from '../../services/db/cart';

@Component({
  selector: 'app-productos',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './productos.html',
  styleUrl: './productos.css',
})

export class Productos implements OnInit {
  cartService = inject(Cart);
  courses = signal<any[]>([]);

  ngOnInit(): void {
    const mockCourses = [
      {
        categoria: 'Espacio', marca: 'NASA', precio: 29.99, stock: 15, imagen: 'https://picsum.photos/200/300?random=1', descripcionCorta: 'Poster de la Vía Láctea', disponibilidad: true, nombre: 'Vía Láctea', nasaId: 'PIA13444'
      }, {
        categoria: 'Espacio', marca: 'ESA', precio: 24.99, stock: 10, imagen: 'https://picsum.photos/200/300?random=2', descripcionCorta: 'Poster del planeta Júpiter', disponibilidad: true, nombre: 'Júpiter', nasaId: 'PIA21954'
      }, {
        categoria: 'Espacio', marca: 'NASA', precio: 34.99, stock: 8, imagen: 'https://picsum.photos/200/300?random=3', descripcionCorta: 'Poster de la nebulosa de Orión', disponibilidad: true, nombre: 'Nebulosa Orión', nasaId: 'PIA04391'
      }, {
        categoria: 'Espacio', marca: 'ESA', precio: 19.99, stock: 20, imagen: 'https://picsum.photos/200/300?random=4', descripcionCorta: 'Poster de la Tierra desde el espacio', disponibilidad: true, nombre: 'Tierra Espacial', nasaId: 'ISS045-E-54645'
      }, {
        categoria: 'Espacio', marca: 'NASA', precio: 39.99, stock: 5, imagen: 'https://picsum.photos/200/300?random=5', descripcionCorta: 'Poster de la luna llena', disponibilidad: true, nombre: 'Luna Llena', nasaId: 'PIA00949'
      }, {
        categoria: 'Espacio', marca: 'ESA', precio: 27.99, stock: 12, imagen: 'https://picsum.photos/200/300?random=6', descripcionCorta: 'Poster de Saturno con anillos', disponibilidad: true, nombre: 'Saturno', nasaId: 'PIA02151'
      }, {
        categoria: 'Espacio', marca: 'NASA', precio: 22.99, stock: 18, imagen: 'https://picsum.photos/200/300?random=7', descripcionCorta: 'Poster de la Estación Espacial Internacional', disponibilidad: true, nombre: 'ISS', nasaId: 'ISS005-E-8782'
      }, {
        categoria: 'Espacio', marca: 'ESA', precio: 31.99, stock: 7, imagen: 'https://picsum.photos/200/300?random=8', descripcionCorta: 'Poster de la galaxia Andrómeda', disponibilidad: true, nombre: 'Andrómeda', nasaId: 'PIA00956'
      }, {
        categoria: 'Espacio', marca: 'NASA', precio: 25.99, stock: 14, imagen: 'https://picsum.photos/200/300?random=9', descripcionCorta: 'Poster de Marte', disponibilidad: true, nombre: 'Marte', nasaId: 'PIA23499'
      }, {
        categoria: 'Espacio', marca: 'ESA', precio: 35.99, stock: 6, imagen: 'https://picsum.photos/200/300?random=10', descripcionCorta: 'Poster de la nebulosa del Cangrejo', disponibilidad: true, nombre: 'Nebulosa Cangrejo', nasaId: 'PIA12048'
      }, {
        categoria: 'Espacio', marca: 'NASA', precio: 28.99, stock: 11, imagen: 'https://picsum.photos/200/300?random=11', descripcionCorta: 'Poster de Venus', disponibilidad: true, nombre: 'Venus', nasaId: 'PIA00103'
      }, {
        categoria: 'Espacio', marca: 'ESA', precio: 32.99, stock: 9, imagen: 'https://picsum.photos/200/300?random=12', descripcionCorta: 'Poster de la constelación de Orión', disponibilidad: true, nombre: 'Orión', nasaId: 'PIA11316'
      }, {
        categoria: 'Espacio', marca: 'NASA', precio: 26.99, stock: 16, imagen: 'https://picsum.photos/200/300?random=13', descripcionCorta: 'Poster de la aurora boreal', disponibilidad: true, nombre: 'Aurora Boreal', nasaId: 'PIA03085'
      }, {
        categoria: 'Espacio', marca: 'ESA', precio: 33.99, stock: 4, imagen: 'https://picsum.photos/200/300?random=14', descripcionCorta: 'Poster de la galaxia del Sombrero', disponibilidad: true, nombre: 'Galaxia Sombrero', nasaId: 'PIA13776'
      }, {
        categoria: 'Espacio', marca: 'NASA', precio: 30.99, stock: 13, imagen: 'https://picsum.photos/200/300?random=15', descripcionCorta: 'Poster de la luna de Júpiter, Europa', disponibilidad: true, nombre: 'Europa', nasaId: 'PIA19040'
      }
    ];
    this.courses.set(mockCourses.map((course, index) => ({ ...course, id: index + 1 })));
  }

  addToCart(course: any) {
    const item: CartItem = {
      id: course.id,
      name: course.nombre,
      price: course.precio,
      image: course.imagen,
      quantity: 1
    };

    this.cartService.addItem(item);
  }


  // Esto conectaba la bd en la pagina de prueba del profe
 /*bre,
      price: course.precio,
      image: course.imagen
    });
  }
 constructor(private courseService: CourseService,
              private cdr: ChangeDetectorRef
  ){}

  ngOnInit(){
    this.courseService.getCourses().subscribe(data => {
      this.courses.set(data);
      this.cdr.detectChanges();
    })
  }*/

}