export class Product {
  constructor(
    public _id: string,
    public title: string,
    public price: number,
    public grade: string,
    public series: string,
    public img: string
  ) { }
}