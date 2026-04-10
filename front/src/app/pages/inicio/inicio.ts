import { Component} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Form } from "../../components/form/form";

@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [ CommonModule, Form ],
  templateUrl: './inicio.html',
  styleUrl: './inicio.css',
})
export class Inicio {

}
