import { Component, HostBinding, OnDestroy, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Navbar } from './components/navbar/navbar';
import { Footer } from './components/footer/footer';
import { CartButton } from './components/cart-button/cart-button';
import { CartComponent } from './components/cart/cart';
import { Theme } from './services/ui/theme';
import { CommonModule } from '@angular/common';

/* Componente raíz de la aplicación que renderiza la estructura principal */
@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Navbar, Footer, CartButton, CartComponent, CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnDestroy {
  /* Clase aplicada al host para activar el modo oscuro */
  @HostBinding('class.dark-theme') darkThemeClass = false;

  /* Suscripción al servicio de tema global */
  private themeSubscription: any;

  constructor(public themeService: Theme) {
    /* Suscribe el valor de tema global y actualiza la clase del host */
    this.themeSubscription = this.themeService.darkTheme$.subscribe(value => this.darkThemeClass = value);
  }

  ngOnDestroy() {
    /* Limpia la suscripción cuando el componente se destruye */
    this.themeSubscription.unsubscribe();
  }

  /* Título principal de la aplicación */
  protected readonly title = signal('TiendaOnline');
}
