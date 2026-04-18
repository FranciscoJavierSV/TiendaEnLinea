import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../services/db/product';

@Component({
  selector: 'app-reactive-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './reactive-form.html',
  styleUrls: ['./reactive-form.css'],
})
export class ReactiveForm implements OnInit {
  /* Formulario reactivo para registrar un producto nuevo */
  productForm!: FormGroup;
  selectedFile: File | null = null;

  constructor(private fb: FormBuilder, private productService: ProductService) { }

  ngOnInit(): void {
    this.productForm = this.fb.group({
      nombre: ['', Validators.required],
      categoria: ['', Validators.required],
      marca: ['', Validators.required],
      precio: [0, [Validators.required, Validators.min(0)]],
      stock: [0, [Validators.required, Validators.min(0)]],
      descripcion: ['', Validators.required],
      disponibilidad: [true, Validators.required],
      nasaId: ['', Validators.required]
    });
  }

  /* Al seleccionar un archivo, se guarda en el estado del componente */
  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
  }

  /* Enviar el formulario al servicio para guardar el producto */
  onSubmit(): void {
    if (this.productForm.valid && this.selectedFile) {
      const formData = new FormData();
      formData.append('Nombre', this.productForm.get('nombre')?.value);
      formData.append('Categoria', this.productForm.get('categoria')?.value);
      formData.append('Marca', this.productForm.get('marca')?.value);
      formData.append('Precio', String(this.productForm.get('precio')?.value));
      formData.append('Stock', String(this.productForm.get('stock')?.value));
      formData.append('Descripcion', this.productForm.get('descripcion')?.value);
      formData.append('Disponibilidad', this.productForm.get('disponibilidad')?.value ? '1' : '0');
      formData.append('NasaId', this.productForm.get('nasaId')?.value);
      formData.append('Imagen', this.selectedFile);

      this.productService.createProduct(formData).subscribe({
        next: (res) => {
          console.log('Producto registrado:', res);
          this.productForm.reset({
            nombre: '',
            categoria: '',
            marca: '',
            precio: 0,
            stock: 0,
            descripcion: '',
            disponibilidad: true,
            nasaId: ''
          });
          this.selectedFile = null;
        },
        error: (err) => console.error('Error al registrar producto:', err)
      });
    }
  }

}