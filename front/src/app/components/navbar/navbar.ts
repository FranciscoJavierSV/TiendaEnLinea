import { Component } from '@angular/core';
import { RouterLink } from "@angular/router";
import { CommonModule } from '@angular/common';
import { Theme } from '../../services/ui/theme';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, CommonModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})

export class Navbar {
  menuActivo = false;
  constructor(public themeService: Theme) { }
  toggleTheme() {
    this.themeService.toggleTheme();
  }
  toggleMenu() {
    this.menuActivo = !this.menuActivo;
  }
}