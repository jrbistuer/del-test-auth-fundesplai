import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { IPedido } from '../../model/pedido.model';

@Injectable({
  providedIn: 'root'
})
export class PedidosService {

  private apiUrl = 'http://localhost:8000';

  constructor(private http: HttpClient) {}

  private getAuthHeaders(): HttpHeaders {
    const token = sessionStorage.getItem('tokenId');
    return new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
  }

  getPedidos(): Observable<IPedido[]> {
    return this.http.get<IPedido[]>(`${this.apiUrl}/pedidos`, {
      headers: this.getAuthHeaders()
    }).pipe(
      map(pedidos => pedidos ?? [])
    );
  }

  getPedido(id: number): Observable<IPedido> {
    return this.http.get<IPedido>(`${this.apiUrl}/pedidos/${id}`, {
      headers: this.getAuthHeaders()
    });
  }

  createPedido(pedido: IPedido): Observable<any> {
    return this.http.post(`${this.apiUrl}/pedidos`, pedido, {
      headers: this.getAuthHeaders()
    });
  }

  updatePedido(pedido: IPedido): Observable<any> {
    return this.http.put(`${this.apiUrl}/pedidos`, pedido, {
      headers: this.getAuthHeaders()
    });
  }

  deletePedido(pedidoId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/pedidos/${pedidoId}`, {
      headers: this.getAuthHeaders()
    });
  }

  getUserId(): Observable<{ id: string }> {
    return this.http.get<{ id: string }>(`${this.apiUrl}/userid`, {
      headers: this.getAuthHeaders()
    });
  }

}
