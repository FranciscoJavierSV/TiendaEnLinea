import { Component } from '@angular/core';
import { Theme } from '../../services/ui/theme';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-footer',
  imports: [ CommonModule ],
  templateUrl: './footer.html',
  styleUrl: './footer.css',
})
export class Footer {
      constructor(public themeService: Theme) {}
}
