import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = 'https://teashop-apigateway.lemondune-a54c7cc6.northeurope.azurecontainerapps.io';
  private tokenKey = 'auth_token';

  constructor(private http: HttpClient) {}

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  register(data: { username: string; email: string; password: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/users/register`, data);
  }

  login(credentials: { email: string; password: string }): Observable<{ token: string }> {
    if (!credentials.email || !credentials.password) {
      throw new Error('Email i hasło są wymagane.');
    }

    console.log('Wysyłanie danych logowania:', JSON.stringify(credentials));

    return this.http.post<{ token: string }>(`${this.apiUrl}/users/login`, credentials).pipe(
      tap((response) => {
        if (response?.token) {
          localStorage.setItem(this.tokenKey, response.token);
          console.log('Token zapisany w localStorage:', response.token);
        } else {
          console.warn('Brak tokena w odpowiedzi serwera:', response);
        }
      }),
      catchError((error: HttpErrorResponse) => {
        console.error('Błąd podczas logowania:', error);
        return throwError(() => error);
      })
    );
  }



  getProfile(): Observable<any> {
    const token = localStorage.getItem(this.tokenKey);
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.http.get(`${this.apiUrl}/users/me`, { headers });
  }

  logout(): void {
    localStorage.removeItem(this.tokenKey);
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem(this.tokenKey);
  }
}
