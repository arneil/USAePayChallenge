import { Injectable } from '@angular/core';
import { Product } from './data-types';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  cartContents: Product[];

  constructor() {
    this.cartContents = [];
  }

  addToCart(product) {
    this.cartContents.push(product);
  }

  remove(product) {
    let index: number = this.cartContents.findIndex(p => p === product);
    this.cartContents = this.cartContents.slice(0, index).concat(this.cartContents.slice(index+1, this.cartContents.length));
    return this.cartContents;
  }

  getCartContents() {
    return this.cartContents;
  }

  emptyCart() {
    this.cartContents = [];
  }

  getNumItems() {
    return this.cartContents.length;
  }
}
