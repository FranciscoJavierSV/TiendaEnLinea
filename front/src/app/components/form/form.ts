import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { Contact, ContactForm } from '../../services/db/contact';

@Component({
  selector: 'app-form',
  imports: [FormsModule, CommonModule],
  templateUrl: './form.html',
  styleUrls: ['./form.css'],
})
export class Form {
  private contactService = inject(Contact);

  onSubmit(form: NgForm) {
    if (!form.valid) {
      return;
    }

    const payload: ContactForm = {
      Nombre: form.value.nombre,
      Correo: form.value.email,
      Asunto: form.value.asunto,
      Mensaje: form.value.comentario,
    };

    this.contactService.sendMessage(payload).subscribe({
      next: () => {
        alert('Mensaje enviado correctamente. Gracias por contactarnos.');
        form.resetForm();
      },
      error: (error) => {
        console.error('Error al enviar el formulario:', error);
        alert('No se pudo enviar el mensaje. Intenta nuevamente más tarde.');
      }
    });
  }
}
