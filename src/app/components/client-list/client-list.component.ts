import { Component, OnInit } from '@angular/core';
import { ClientService } from '../../services/client.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { toZonedTime } from 'date-fns-tz';

@Component({
  selector: 'app-client-list',
  templateUrl: './client-list.component.html',
  styleUrls: ['./client-list.component.css'],
  imports: [CommonModule, FormsModule],
})
export class ClientListComponent implements OnInit {
  clients: any[] = [];
  notification: { type: string; message: string } | null = null;
  showEditModal: boolean = false;
  showDeleteModal: boolean = false;
  clientToEdit: any = null;
  clientToDelete: any = null;

  constructor(private clientService: ClientService) {}

  ngOnInit() {
    this.loadClients();
  }
  formatDate(dateString: string): string {
    const timeZone = 'America/Argentina/Buenos_Aires';
    const zonedDate = toZonedTime(dateString, timeZone);
    return format(zonedDate, "d 'de' MMMM 'de' yyyy", {
      locale: es,
    });
  }

  loadClients() {
    this.clientService.getClientList().subscribe(
      (response) => {
        this.clients = response;
      },
      (error) => {
        this.showNotification(
          'error',
          'Error al obtener la lista de clientes.'
        );
        console.error('Error al obtener lista de clientes', error);
      }
    );
  }

  showNotification(type: string, message: string) {
    this.notification = { type, message };
    setTimeout(() => {
      this.notification = null;
    }, 3000);
  }

  openEditModal(client: any) {
    this.clientToEdit = {
      ...client,
      fechaNacimiento: client.fechaNacimiento.split('T')[0],
    };
    console.log('clientToEdit', this.clientToEdit);
    this.showEditModal = true;
  }

  openDeleteModal(client: any) {
    this.clientToDelete = client;
    this.showDeleteModal = true;
  }

  saveClientEdits() {
    if (this.clientToEdit) {
      this.clientService
        .updateClient(this.clientToEdit._id, this.clientToEdit)
        .subscribe(
          () => {
            this.showNotification('success', 'Cliente editado con éxito.');
            this.loadClients();
            this.closeModals();
          },
          (error) => {
            this.showNotification('error', 'Error al editar el cliente.');
            this.closeModals();
            console.error('Error al editar cliente', error);
          }
        );
    }
  }

  confirmDeleteClient() {
    if (this.clientToDelete) {
      this.clientService.deleteClient(this.clientToDelete._id).subscribe(
        () => {
          this.clients = this.clients.filter(
            (client) => client._id !== this.clientToDelete._id
          );
          this.showNotification('success', 'Cliente eliminado con éxito.');
          this.closeModals();
        },
        (error) => {
          this.showNotification('error', 'Error al eliminar el cliente.');
          console.error('Error al eliminar cliente', error);
        }
      );
    }
  }

  closeModals() {
    this.showEditModal = false;
    this.showDeleteModal = false;
    this.clientToEdit = null;
    this.clientToDelete = null;
  }
}
