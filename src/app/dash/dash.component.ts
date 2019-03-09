import { Component, OnInit } from '@angular/core';
import { ProductService } from '../core/product.service';
import { CartService } from '../core/cart.service';
import { Product } from '../core/data-types';
import {MatSnackBar} from '@angular/material';

@Component({
  selector: 'app-dash',
  templateUrl: './dash.component.html',
  styleUrls: ['./dash.component.css']
})
export class DashComponent implements OnInit {

  products: Product[];
  numItems: number;

  constructor(
    private productService: ProductService,
    private cartService: CartService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.products = this.productService.getProducts();
  }

  addToCart(product) {
    this.cartService.addToCart(product);
    this.snackBar.open("Added to cart!", "OK", {
      duration: 2000,
    });
    this.numItems = this.cartService.getNumItems();
  }

}
