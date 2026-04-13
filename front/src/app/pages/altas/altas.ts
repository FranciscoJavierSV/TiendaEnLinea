import { Component } from '@angular/core';
import { ReactiveForm } from '../../components/reactive-form/reactive-form';
import { Theme } from '../../services/ui/theme';
import { CommonModule } from '@angular/common';

/* Página para dar de alta nuevos productos utilizando un formulario reactivo */
@Component({
  selector: 'app-altas',
  standalone: true,
  imports: [ReactiveForm, CommonModule],
  templateUrl: './altas.html',
  styleUrls: ['./altas.css'],
})
export class Altas {
    /* Servicio de tema para aplicar el modo oscuro si está activado */
    constructor(public themeService: Theme) { }
}
