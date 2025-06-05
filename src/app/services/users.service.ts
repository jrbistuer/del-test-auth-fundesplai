import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { IUser } from '../../model/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl = 'http://localhost:8000';

  constructor(private http: HttpClient) {}

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('tokenId');
    return new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
  }

  getUsers(): Observable<IUser[]> {
    return this.http.get<IUser[]>(`${this.apiUrl}/users`).pipe(
      map(users => users ?? [])
    );
  }

  getUser(id: number): Observable<IUser> {
    return this.http.get<IUser>(`${this.apiUrl}/users/${id}`);
  }

  createUser(user: IUser): Observable<any> {
    return this.http.post(`${this.apiUrl}/users/create`, user);
  }

  updateUser(user: IUser): Observable<any> {
    return this.http.put(`${this.apiUrl}/users/update`, user);
  }

  deleteUser(userId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/users/delete/${userId}`);
  }

  getUserId(): Observable<{ id: string }> {
    return this.http.get<{ id: string }>(`${this.apiUrl}/userid`, {
      headers: this.getAuthHeaders()
    });
  }

  selectByParams(id: number): Observable<IUser> {
    return this.http.get<IUser>(`${this.apiUrl}/selectbyparams/users?id=${id}`);
  }
}
