import { Injectable } from '@angular/core';
import { Product } from './data-types';

declare var require: any;
const data: any = require('../product.json');

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  products: Product[];

  constructor() {
    this.products = [];
    for(let selector of Object.keys(data)) {
      this.products = this.products.concat(data[selector]);
    }
  }

  getProducts() {
    return this.products;
  }
}
