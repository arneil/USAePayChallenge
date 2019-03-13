import { Injectable } from '@angular/core';
import { Card, Transaction, AmountDetail } from './data-types';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { environment } from '../../environments/environment';

declare var require: any;
const data: any = require('../cards.json');
// Using a proxy service in dev environment requires the /api uri prefix - see proxy.conf.json.
// Production environment requires no such prefix.
var uriPrefix = environment.production ? '' : '/api';

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {

  cards: Card[];

  constructor(private http: HttpClient) {
    this.cards = [];
    for(let selector of Object.keys(data)){
      this.cards = this.cards.concat(data[selector]);
    }
  }

  getCards() {
    return this.cards;
  }

  makeSale(card, amount, details) {
    var t: Transaction = {
      command: "cc:sale",
      amount: amount,
      amount_detail: details,
      creditcard: card
    };
    return this.http.post(uriPrefix + '/transactions/sale', t);
  }
}
