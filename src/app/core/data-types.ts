export class Product {
  constructor(
    public title: string,
    public price: number,
    public grade: string,
    public series: string,
    public img: string
  ) { }
}

export class Card {
  constructor(
    public cardholder: string,
    public number: string,
    public expiration: string,
    public cvc: string,
    public avs_street: string,
    public avs_zip: string
  ) { }
}

export class Transaction {
  constructor(
    public command: string,
    public amount: string,
    public amount_detail: AmountDetail,
    public creditcard: Card
  ) { }
}

export class AmountDetail {
  constructor(
    public tax: number,
    public shipping: number
  ) { }
}
