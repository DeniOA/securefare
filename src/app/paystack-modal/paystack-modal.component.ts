import { Component, ViewEncapsulation} from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-paystack-modal',
  templateUrl: './paystack-modal.component.html',



})

export class PaystackModalComponent  {
  public title = 'My app';
  public showEmbed = false;
  public results = {
    name: ''
  };
  tRef = '';
  result = '';
  constructor() {}

  toggleEmbed() {
    this.showEmbed = !this.showEmbed;
  }

  paymentDone(ref: any) {
    this.title = 'Payment successfull';
    console.log(this.title, ref);
  }

  paymentCancel() {
    this.title = 'Payment failed';
    console.log(this.title);
  }

  setRandomPaymentRef() {
    this.tRef = `${Math.random() * 10000000000000}`;
  }

  ngOnInit() {
    this.setRandomPaymentRef();
  }
}
