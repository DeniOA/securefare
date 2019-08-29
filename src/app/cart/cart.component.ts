import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as $ from 'jquery';
import { Schedule } from '../schedule/classes/schedule';
import { Item } from '../cart/classes/item';
import { homeApiService } from '../home/services/homeapi.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import {PaystackModalComponent} from '../paystack-modal/paystack-modal.component';
import { CartService } from '../services/cart.service';

@Component({
  templateUrl: 'cart.component.html',
  styleUrls: ['cart.component.css', '../ticket-list/ticket-list.component.css'],
  encapsulation: ViewEncapsulation.None,
})

export class CartComponent implements OnInit {


  closeResult: string;

  defaultQuantity: number = 1;
  productAddedTocart: [Schedule];
  allTotal:number;
  reservation: {};
  products: any;



	constructor(
    private _homeApiService : homeApiService,
    private router: Router,
    private route: ActivatedRoute,
    private modalService: NgbModal,
    private cartService: CartService
    ) { }

    ngOnInit() {

      this. products = this.cartService.getProductFromCart();

    this.productAddedTocart = this._homeApiService.getProductFromCart();
    console.log(this.productAddedTocart);
    for(let i in this.productAddedTocart) {
      this.productAddedTocart[i].Quantity=1;
    }

    this._homeApiService.removeAllProductFromCart();
    this._homeApiService.addProductToCart(this.productAddedTocart);
    this.calculateAllTotal(this.productAddedTocart);
  }

  openVerticallyCentered(content) {
    this.modalService.open(content, { centered: true });
  }

  onAddQuantity(lstSchedule: Schedule) {
    this.productAddedTocart = this._homeApiService.getProductFromCart();
    this.productAddedTocart.find(p => p.id==lstSchedule.id).Quantity = lstSchedule.Quantity+1;
    this._homeApiService.removeAllProductFromCart();
    this._homeApiService.addProductToCart(this.productAddedTocart);
    this.calculateAllTotal(this.productAddedTocart);
  }

  onRemoveQuantity(lstSchedule: Schedule) {
    this.productAddedTocart = this._homeApiService.getProductFromCart();
    this.productAddedTocart.find(p => p.id==lstSchedule.id).Quantity = lstSchedule.Quantity-1;
    this._homeApiService.removeAllProductFromCart();
    this._homeApiService.addProductToCart(this.productAddedTocart);
    this.calculateAllTotal(this.productAddedTocart);
  }

  calculateAllTotal(allItems: Schedule[]) {
    let total = 0;
    for (let i in allItems) {
      total = total + (allItems[i].Quantity *allItems[i].amount);
}
    this.allTotal = total;
  }

  onBack(): void {
    this.router.navigate([`/`]);
  }
}

