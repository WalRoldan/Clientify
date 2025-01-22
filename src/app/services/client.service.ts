import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ClientService {
  private apiUrl = 'http://localhost:4000/api';

  constructor(private http: HttpClient) {}

  createClient(client: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/crear-cliente`, client);
  }

  getStatistics(): Observable<any> {
    return this.http.get(`${this.apiUrl}/kpi-clientes`);
  }

  getClientList(): Observable<any> {
    return this.http.get(`${this.apiUrl}/list-clientes`);
  }

  deleteClient(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/eliminar-cliente/${id}`);
  }

  updateClient(id: string, client: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/editar-cliente/${id}`, client);
  }
}
