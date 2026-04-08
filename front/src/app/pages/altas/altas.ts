import { Component } from '@angular/core';
import { ReactiveForm } from '../../components/reactive-form/reactive-form';
import { Theme } from '../../services/ui/theme';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-altas',
  standalone: true,
  imports: [ReactiveForm, CommonModule],
  templateUrl: './altas.html',
  styleUrls: ['./altas.css'],
})
export class Altas {
    constructor(public themeService: Theme) { }
}
