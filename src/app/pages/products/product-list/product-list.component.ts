import { Component, OnInit } from '@angular/core';
import { CatalogService, Product } from '../../../services/catalog.service';
import { AsyncPipe, NgFor } from '@angular/common';
import { CartService, CartItem } from '../../../services/cart.service';
import { UserService } from '../../../services/user.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [NgFor, CommonModule, FormsModule],
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];

  constructor(private catalogService: CatalogService, private cartService : CartService, private userService : UserService) {}

  isUserAdmin$! : Observable<boolean>;
  loadProducts() {
    this.catalogService.getProducts().subscribe((data) => {
      this.products = data;
    });
  }

  ngOnInit() {
    this.loadProducts();
    this.userService.getProfile().subscribe(profile => {
      this.isUserAdmin$ = new BehaviorSubject<boolean>(profile?.role === 'Admin');
      console.log(this.isUserAdmin$);
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

  deleteItem(productId: string)
  {
    this.catalogService.deleteItemById(productId).subscribe({
      next: (res) => {
        console.log('Usunięto pomyślnie:', res);
        // np. odśwież listę lub pokaż komunikat
        this.loadProducts();
        
      },
      error: (err) => {
        console.error('Błąd podczas usuwania:', err);
        // np. pokaż alert lub komunikat o błędzie
      }
    });

  }

  newProduct = {
  name: '',
  ean: '',
  price: 0,
  stock: 0,
  country: '',
  sku: '',
  categoryId: 0
};

addProduct() {
  this.catalogService.addProduct(this.newProduct).subscribe({
    next: (response) => {
      console.log('Product added:', response);
      this.products.push(response); // lub odśwież listę produktów
      this.resetForm();
    },
    error: (err) => console.error('Add product error:', err)
  });
}

resetForm() {
  this.newProduct = {
    name: '',
    ean: '',
    price: 0,
    stock: 0,
    country: '',
    sku: '',
    categoryId: 0
  };
}
}
