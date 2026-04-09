import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-form',
  imports: [ FormsModule,CommonModule ],
  templateUrl: './form.html',
  styleUrl: './form.css',
})
export class Form {
  onSubmit(form : any){
    // Aqui es para guardar la info en la bd del formulario
  }
}
