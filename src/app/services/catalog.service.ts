import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
}

@Injectable({
  providedIn: 'root', // 👈 makes it available app-wide
})
export class CatalogService {
  private apiUrl = 'http://localhost:8080/catalog'; // Replace with your actual API URL

  constructor(private http: HttpClient) {}

  getProducts(): Observable<Product[]> 
  {
      return this.http.get<Product[]>(`${this.apiUrl}/Products`);
  }

  getProductById(id: string): Observable<Product> 
  {
      return this.http.get<Product>(`${this.apiUrl}/${id}`);
  }
}
