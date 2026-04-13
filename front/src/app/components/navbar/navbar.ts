import { Component } from '@angular/core';
import { RouterLink } from "@angular/router";
import { CommonModule } from '@angular/common';
import { Theme } from '../../services/ui/theme';

@Component({
  selector: 'app-barra-navegacion',
  imports: [RouterLink, CommonModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})

export class Navbar {
  /* Estado del menú desplegable en dispositivos móviles */
  menuActivo = false;

  constructor(public themeService: Theme) { }

  /* Cambia el tema entre claro y oscuro */
  toggleTheme() {
    this.themeService.toggleTheme();
  }

  /* Alterna la visibilidad del menú de navegación */
  toggleMenu() {
    this.menuActivo = !this.menuActivo;
  }
}