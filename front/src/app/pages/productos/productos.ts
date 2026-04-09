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
        categoria: 'Programación', marca: 'Udemy', precio: 199.99, stock: 20, imagen: 'https://picsum.photos/200/300?random=1', descripcionCorta: 'Curso básico de Angular', disponibilidad: true, nombre: 'Angular desde cero'
      }, {
        categoria: 'Programación', marca: 'Udemy', precio: 199.99, stock: 20, imagen: 'https://picsum.photos/200/300?random=1', descripcionCorta: 'Curso básico de Angular', disponibilidad: true, nombre: 'Angular desde cero'
      }, {
        categoria: 'Programación', marca: 'Udemy', precio: 199.99, stock: 20, imagen: 'https://picsum.photos/200/300?random=1', descripcionCorta: 'Curso básico de Angular', disponibilidad: true, nombre: 'Angular desde cero'
      }, {
        categoria: 'Programación', marca: 'Udemy', precio: 199.99, stock: 20, imagen: 'https://picsum.photos/200/300?random=1', descripcionCorta: 'Curso básico de Angular', disponibilidad: true, nombre: 'Angular desde cero'
      }, {
        categoria: 'Programación', marca: 'Udemy', precio: 199.99, stock: 20, imagen: 'https://picsum.photos/200/300?random=1', descripcionCorta: 'Curso básico de Angular', disponibilidad: true, nombre: 'Angular desde cero'
      }, {
        categoria: 'Programación', marca: 'Udemy', precio: 199.99, stock: 20, imagen: 'https://picsum.photos/200/300?random=1', descripcionCorta: 'Curso básico de Angular', disponibilidad: true, nombre: 'Angular desde cero'
      }, {
        categoria: 'Programación', marca: 'Udemy', precio: 199.99, stock: 20, imagen: 'https://picsum.photos/200/300?random=1', descripcionCorta: 'Curso básico de Angular', disponibilidad: true, nombre: 'Angular desde cero'
      }, {
        categoria: 'Programación', marca: 'Udemy', precio: 199.99, stock: 20, imagen: 'https://picsum.photos/200/300?random=1', descripcionCorta: 'Curso básico de Angular', disponibilidad: true, nombre: 'Angular desde cero'
      }, {
        categoria: 'Programación', marca: 'Udemy', precio: 199.99, stock: 20, imagen: 'https://picsum.photos/200/300?random=1', descripcionCorta: 'Curso básico de Angular', disponibilidad: true, nombre: 'Angular desde cero'
      }, {
        categoria: 'Programación', marca: 'Udemy', precio: 199.99, stock: 20, imagen: 'https://picsum.photos/200/300?random=1', descripcionCorta: 'Curso básico de Angular', disponibilidad: true, nombre: 'Angular desde cero'
      }, {
        categoria: 'Programación', marca: 'Udemy', precio: 199.99, stock: 20, imagen: 'https://picsum.photos/200/300?random=1', descripcionCorta: 'Curso básico de Angular', disponibilidad: true, nombre: 'Angular desde cero'
      }, {
        categoria: 'Programación', marca: 'Udemy', precio: 199.99, stock: 20, imagen: 'https://picsum.photos/200/300?random=1', descripcionCorta: 'Curso básico de Angular', disponibilidad: true, nombre: 'Angular desde cero'
      }, {
        categoria: 'Programación', marca: 'Udemy', precio: 199.99, stock: 20, imagen: 'https://picsum.photos/200/300?random=1', descripcionCorta: 'Curso básico de Angular', disponibilidad: true, nombre: 'Angular desde cero'
      }, {
        categoria: 'Programación', marca: 'Udemy', precio: 199.99, stock: 20, imagen: 'https://picsum.photos/200/300?random=1', descripcionCorta: 'Curso básico de Angular', disponibilidad: true, nombre: 'Angular desde cero'
      }, {
        categoria: 'Programación', marca: 'Udemy', precio: 199.99, stock: 20, imagen: 'https://picsum.photos/200/300?random=1', descripcionCorta: 'Curso básico de Angular', disponibilidad: true, nombre: 'Angular desde cero'
      }, {
        categoria: 'Programación', marca: 'Udemy', precio: 199.99, stock: 20, imagen: 'https://picsum.photos/200/300?random=1', descripcionCorta: 'Curso básico de Angular', disponibilidad: true, nombre: 'Angular desde cero'
      }, {
        categoria: 'Programación', marca: 'Udemy', precio: 199.99, stock: 20, imagen: 'https://picsum.photos/200/300?random=1', descripcionCorta: 'Curso básico de Angular', disponibilidad: true, nombre: 'Angular desde cero'
      }, {
        categoria: 'Programación', marca: 'Udemy', precio: 199.99, stock: 20, imagen: 'https://picsum.photos/200/300?random=1', descripcionCorta: 'Curso básico de Angular', disponibilidad: true, nombre: 'Angular desde cero'
      }, {
        categoria: 'Programación', marca: 'Udemy', precio: 199.99, stock: 20, imagen: 'https://picsum.photos/200/300?random=1', descripcionCorta: 'Curso básico de Angular', disponibilidad: true, nombre: 'Angular desde cero'
      }, {
        categoria: 'Programación', marca: 'Udemy', precio: 199.99, stock: 20, imagen: 'https://picsum.photos/200/300?random=1', descripcionCorta: 'Curso básico de Angular', disponibilidad: true, nombre: 'Angular desde cero'
      }, {
        categoria: 'Programación', marca: 'Udemy', precio: 199.99, stock: 20, imagen: 'https://picsum.photos/200/300?random=1', descripcionCorta: 'Curso básico de Angular', disponibilidad: true, nombre: 'Angular desde cero'
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