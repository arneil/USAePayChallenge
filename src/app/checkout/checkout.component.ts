import { Component, OnInit } from '@angular/core';
import { Product, Card, AmountDetail } from '../core/data-types';
import { CartService } from '../core/cart.service';
import { CheckoutService } from '../core/checkout.service';
import { Router } from "@angular/router";

export interface ReceiptItem {
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
  receiptItems: ReceiptItem[];
  purchaseTotal: number;
  sumTotal: number;
  details: AmountDetail;
  displayedColumns: string[] = ['item', 'cost'];
  cards: Card[];
  selected: Card;

  resultData: any = {};
  dialogVisible: boolean;
  approved: boolean;

  cheatsheetEnabled: boolean;
  displayError: boolean;
  error: any;


  constructor(
    private cartService: CartService,
    private checkoutService: CheckoutService,
    private router: Router
  ) { }

  ngOnInit() {
    this.dialogVisible = false;
    this.receiptItems = [];
    this.sumTotal = 0;
    this.purchaseTotal = 0;
    this.cheatsheetEnabled = false;
    this.displayError = false;
    this.error = null;

    this.cards = this.checkoutService.getCards();

    this.cartContents = this.cartService.getCartContents();
    for(let product of this.cartContents) {
      this.purchaseTotal += product.price;
      this.receiptItems.push({
        item: product.title,
        cost: product.price
      });
    }

    //TODO: Don't use magic numbers
    let tax = this.purchaseTotal * .09;
    let shipping = this.cartContents.length * 3.14

    this.receiptItems.push({
      item: "tax",
      cost: tax
    });

    this.receiptItems.push({
      item: "shipping",
      cost: shipping
    });

    this.details = {
      tax: tax,
      shipping: shipping
    };

    this.sumTotal = this.purchaseTotal + tax + shipping;
  }

  getTotalCost() {
    return this.sumTotal;
  }

  makeSale(card) {
    this.checkoutService.makeSale(card, this.sumTotal, this.details).subscribe(
      (data) => {
        this.resultData = data;
        console.log(this.resultData);
        this.approved = this.resultData.result == "Approved";
        this.dialogVisible = true;
      },
      (err) => {
        this.showError(err);
      }
    );
  }

  serverError(card) {
    this.checkoutService.serverError(card, this.sumTotal, this.details).subscribe(
      (data) => {
        this.resultData = data;
        console.log(this.resultData);
        this.approved = this.resultData.result == "Approved";
        this.dialogVisible = true;
      },
      (err) => {
        this.showError(err);
      }
    );
  }

  showError(err) {
    this.error = err;
    this.displayError = true;
  }

  dismissError(err) {
    this.error = null;
    this.displayError = false;
  }

  dismiss() {
    this.dialogVisible = false;
  }

  completeTransaction() {
    this.dialogVisible = false;
    this.cartService.emptyCart();
    this.router.navigate(['/']);
  }

  toggleCheatsheet() {
    this.cheatsheetEnabled = !this.cheatsheetEnabled;
  }

}
