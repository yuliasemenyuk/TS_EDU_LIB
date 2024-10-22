import { Product } from "./product.model";
// import 'reflect-metadata';
import { plainToClass } from "class-transformer";

const products = [
  { title: "A Carpet", price: 34.99 },
  { title: "A Book", price: 23.99 },
];

// const loadedProducts = products.map(prod => {
//     return new Product(prod.title, prod.price);
// });

const loadedProducts = plainToClass(Product, products)

for (const prod of loadedProducts) {
    console.log(prod.getInformation())
}


