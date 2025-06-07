import { Component, OnInit } from '@angular/core';
import { CatalogService, Product } from '../../../services/catalog.service';
import { AsyncPipe, NgFor } from '@angular/common';
import { CartService, CartItem } from '../../../services/cart.service';


@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [NgFor, AsyncPipe],
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];

  constructor(private catalogService: CatalogService, private cartService : CartService) {}

  ngOnInit() {
    this.catalogService.getProducts().subscribe((data) => {
      this.products = data;
    });
  }

  addToCart(productId: string, productName : string, productQuantity: number, productPrice: number) {
    const item: CartItem = {
      productId: productId,
      productName: productName,       // tutaj możesz podać nazwę, jeśli masz ją dostępną
      quantity: productQuantity,
      unitPrice: productPrice        // lub podaj prawdziwą cenę jeśli jest dostępna
    };
    
    this.cartService.addToCart(item).subscribe({
      next: (res) => {
        console.log('Dodano do koszyka:', res);
      },
      error: (err) => {
        console.error('Błąd dodawania do koszyka:', err);
      }
    });
  }

}
