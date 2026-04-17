import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Form } from "../../components/form/form";
import { Featured } from '../../components/featured/featured';

/* Página de inicio con formulario de contacto y bienvenida */
@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [ CommonModule, RouterLink, Form, Featured ],
  templateUrl: './inicio.html',
  styleUrl: './inicio.css',
})
export class Inicio {
}
