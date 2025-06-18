import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CartService, CartItem } from '../../services/cart.service';
import { CartComponent } from '../cart/cart.component';


@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule],
})
export class CheckoutComponent implements OnInit {
  cartItems: CartItem[] = [];
  deliveryMethod = 'standard';
  paymentMethod = 'card';

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.cartService.getCart().subscribe({
      next: (response) => {
        this.cartItems = response.items;
      },
      error: () => {
        this.cartItems = [];
      }
    });
  }

  getTotal(): number {
    const deliveryCost = this.deliveryMethod === 'express' ? 15 : 0;
    const itemsTotal = this.cartItems.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0);
    return itemsTotal + deliveryCost;
  }

  placeOrder() {
    // Logika składania zamówienia
    console.log('Placed an order:', {
      items: this.cartItems,
      delivery: this.deliveryMethod,
      payment: this.paymentMethod
    });
  }
}
