import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface CartItem {
  productId: string;
  productName: string;
  quantity: number;
  unitPrice: number;
}

interface CartResponse {
  userId: string;
  items: CartItem[];
}

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private apiUrl = 'https://teashop-apigateway.lemondune-a54c7cc6.northeurope.azurecontainerapps.io/carts';

  constructor(private http: HttpClient) {}

  getCart(): Observable<CartResponse> {
    return this.http.get<CartResponse>(`${this.apiUrl}/mycart`);
  }

  addToCart(item: CartItem): Observable<any> {
    console.log(item);
    return this.http.post(`${this.apiUrl}/item`, item);
  }

  removeFromCart(productId: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/remove/${productId}`);
  }

  clearCart(): Observable<any> {
    return this.http.delete(`${this.apiUrl}/clear`);
  }
}
