import { Injectable } from '@angular/core';
import { Item } from '../cart/classes/item';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor() { }

  addProductToCart(item: Item) {
    localStorage.setItem('cart', JSON.stringify(item));
  }

  getProductFromCart() {
    return JSON.parse(localStorage.getItem('cart'));
  }

  removeAllProductFromCart() {
    return localStorage.removeItem('cart');
  }
}
