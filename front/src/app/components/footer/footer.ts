import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Theme } from '../../services/ui/theme';

@Component({
  selector: 'app-pie-pagina',
  imports: [ CommonModule ],
  templateUrl: './footer.html',
  styleUrl: './footer.css',
})
export class Footer {
  /* Componente que maneja el pie de página global */
  constructor(public themeService: Theme) { }
}

