import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ClientService } from '../../services/client.service';

@Component({
  imports: [FormsModule, CommonModule],
  selector: 'app-create-client',
  templateUrl: './create-client.component.html',
  styleUrls: ['./create-client.component.css'],
})
export class CreateClientComponent {
  client = { nombre: '', apellido: '', edad: '', fechaNacimiento: '' };
  notification: { type: string; message: string } | null = null;
  isSubmitting: boolean = false;

  constructor(private clientService: ClientService, private router: Router) {}

  onSubmit() {
    if (
      this.client.nombre.trim() &&
      this.client.apellido.trim() &&
      this.client.edad &&
      this.client.fechaNacimiento
    ) {
      this.createClient();
    } else {
      this.showNotification('error', 'Por favor, completa todos los campos.');
    }
  }

  createClient() {
    this.isSubmitting = true;
    this.clientService.createClient(this.client).subscribe(
      (response) => {
        this.showNotification('success', 'Cliente creado con éxito.');
      },
      (error) => {
        console.error('Error al crear el cliente:', error);
        this.showNotification(
          'error',
          'Error al crear el cliente. Inténtalo nuevamente.'
        );
        this.isSubmitting = false;
      }
    );
  }

  showNotification(type: string, message: string) {
    this.notification = { type, message };
    setTimeout(() => {
      this.notification = null;
    }, 3000);
  }
}
