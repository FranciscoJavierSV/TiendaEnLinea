import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Card } from '../card/card';

@Component({
  selector: 'app-featured',
  standalone: true,
  imports: [CommonModule, Card],
  templateUrl: './featured.html',
  styleUrl: './featured.css',
})
export class Featured {
  featuredCards = [
    {
      imgSrc: '/assets/carrusel/first.webp',
      title: 'Horizonte orbital',
      description: 'Un diseño que mezcla luz y sombra para una decoración con estilo espacial.',
    },
    {
      imgSrc: '/assets/carrusel/second.jpg',
      title: 'Nebulosa dorada',
      description: 'Un cuadro que invita a explorar el universo desde un punto de vista íntimo.',
    },
    {
      imgSrc: '/assets/carrusel/third.jpg',
      title: 'Ventana al espacio',
      description: 'Color y movimiento para una decoración impactante y moderna.',
    },
  ];
}
