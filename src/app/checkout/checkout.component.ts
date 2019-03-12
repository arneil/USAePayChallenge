import { Component, OnInit } from '@angular/core';
import { Product, Card } from '../core/data-types';
import { CartService } from '../core/cart.service';
import { CheckoutService } from '../core/checkout.service';

export interface Transaction {
  item: string;
  cost: number;
}

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  cartContents: Product[];
  transactions: Transaction[];
  total: number = 0;
  displayedColumns: string[] = ['item', 'cost'];
  cards: Card[];
  selected: Card;

  constructor(
    private cartService: CartService,
    private checkoutService: CheckoutService
  ) { }

  ngOnInit() {
    this.transactions = [];
    this.total = 0;

    this.cards = this.checkoutService.getCards();

    this.cartContents = this.cartService.getCartContents();
    for(let product of this.cartContents) {
      this.total += product.price;
      this.transactions.push({
        item: product.title,
        cost: product.price
      });
    }

    this.transactions.push({
      item: "tax",
      cost: this.total * .09
    })
    this.total *= 1.09

    let shippingCost = 2.13 * this.cartContents.length;
    this.transactions.push({
      item: "shipping",
      cost: shippingCost
    });
    this.total += shippingCost;
  }

  getTotalCost() {
    return this.total;
  }

  makeSale(card) {
    var response;
    this.checkoutService.makeSale(card).subscribe( (data) => {
      console.log("VVV DATA VVV");
      console.log(data);
      response = data;
    });
  }

}
