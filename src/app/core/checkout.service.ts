import { Injectable } from '@angular/core';
import { sha256 } from 'js-sha256';
import { Buffer } from 'buffer';
import { Card } from './data-types';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';

declare var require: any;
const data: any = require('../cards.json');

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {

  authKey: string;
  cards: Card[];

  constructor(private http: HttpClient) {
    let seed = Math.random();
    let apikey = "_1cn3Tg85kxwZQ1Olic34myGa3neK7qU";
    let apipin = "1234";
    let prehash = apikey + seed + apipin;
    let apihash = 's2/' + seed + '/' + sha256(prehash);
    this.authKey = new Buffer(apikey + ":" + apihash).toString('base64');

    this.cards = [];
    for(let selector of Object.keys(data)){
      this.cards = this.cards.concat(data[selector]);
    }
  }

  getCards() {
    return this.cards;
  }

  makeSale(card) {
    var body = {
      "command": "cc:sale",
      "amount": "5.00",
      "amount_detail": {
          "tax": "1.00",
          "tip": "0.50"
      },
      "creditcard": {
          "cardholder": "John Doe",
          "number": "4000100011112224",
          "expiration": "0919",
          "cvc": "123",
          "avs_street": "1234 Main",
          "avs_zip": "12345"
      },
      "invoice": "12356"
    };
    return this.http.post('/transactions/sale', body);
  }
}
