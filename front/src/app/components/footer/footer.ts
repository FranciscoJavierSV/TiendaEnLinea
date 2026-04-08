import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Theme } from '../../services/ui/theme';


@Component({
  selector: 'app-footer',
  imports: [ CommonModule ],
  templateUrl: './footer.html',
  styleUrl: './footer.css',
})
export class Footer {
    constructor(public themeService: Theme) { }

}
