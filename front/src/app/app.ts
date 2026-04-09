import { Component, HostBinding, OnDestroy, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Navbar } from './components/navbar/navbar';
import { Footer } from './components/footer/footer';
import { CartButton } from './components/cart-button/cart-button';
import { CartComponent } from './components/cart/cart';
import { Theme } from './services/ui/theme';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Navbar, Footer, CartButton, CartComponent, CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnDestroy {
  @HostBinding('class.dark-theme') darkThemeClass = false;

  private themeSubscription: any;

  constructor(public themeService: Theme) {
    this.themeSubscription = this.themeService.darkTheme$.subscribe(value => this.darkThemeClass = value);
  }

  ngOnDestroy() {
    this.themeSubscription.unsubscribe();
  }

  protected readonly title = signal('TiendaOnline');
}
