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

export interface NewProduct {
  name: string;
  ean: string;
  price: number;
  stock: number;
  country: string;
  sku: string;
  categoryId: number;
}

@Injectable({
  providedIn: 'root',
})
export class CatalogService {
  private apiUrl = 'http://localhost:8080/catalog'; // Replace with your actual API URL

  constructor(private http: HttpClient) {}

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.apiUrl}/Products`);
  }

  getProductById(id: string): Observable<Product> {
    return this.http.get<Product>(`${this.apiUrl}/${id}`);
  }

  deleteItemById(id: string): Observable<any> {
    console.log(`${this.apiUrl}/Products/${id}`);
    return this.http.delete<Product>(`${this.apiUrl}/Products/${id}`);
  }

  addProduct(product: NewProduct): Observable<any> {
    return this.http.post(`${this.apiUrl}/Products`, product);
  }
}
