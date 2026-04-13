import { Component, Input, Output, EventEmitter, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Theme } from '../../services/ui/theme';

@Component({
  selector: 'app-control-pagina',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './control-pagina.html',
  styleUrls: ['./control-pagina.css'],
})
export class ControlPagina {
  /* Servicio de tema para aplicar modo oscuro/claro */
  themeService = inject(Theme);

  /* Página actual que se está mostrando */
  @Input() currentPage = 1;

  /* Total de páginas disponibles */
  @Input() totalPages = 1;

  /* Lista de números de página para mostrar */
  @Input() pages: number[] = [];

  /* Evento que notifica el cambio de página */
  @Output() pageChange = new EventEmitter<number>();

  selectPage(page: number) {
    if (page < 1 || page > this.totalPages) {
      return;
    }
    this.pageChange.emit(page);
  }

  prevPage() {
    this.selectPage(this.currentPage - 1);
  }

  nextPage() {
    this.selectPage(this.currentPage + 1);
  }
}
