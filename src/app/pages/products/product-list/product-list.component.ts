import { Component, OnInit } from '@angular/core';
import { CatalogService, Product } from '../../../services/catalog.service';
import { AsyncPipe, NgFor } from '@angular/common';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [NgFor, AsyncPipe],
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];

  constructor(private catalogService: CatalogService) {}

  ngOnInit() {
    this.catalogService.getProducts().subscribe((data) => {
      this.products = data;
    });
  }
}
