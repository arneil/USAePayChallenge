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
