import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-reactive-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './reactive-form.html',
  styleUrls: ['./reactive-form.css'],
})
export class ReactiveForm implements OnInit {

  productForm!: FormGroup;

  constructor(private fb: FormBuilder) {}


  ngOnInit(): void {
    this.productForm = this.fb.group({
      nombre: ['', Validators.required],
      categoria: ['', Validators.required],
      marca: ['', Validators.required],
      precio: [0, [Validators.required, Validators.min(0)]],
      stock: [0, [Validators.required, Validators.min(0)]],
      imagen: ['', Validators.required],
      descripcionCorta: ['', Validators.required],
      disponibilidad: [true, Validators.required]
    });
  }

  onSubmit(): void {
    if (this.productForm.valid) {
      console.log('Producto registrado:', this.productForm.value);
    }
  }
}