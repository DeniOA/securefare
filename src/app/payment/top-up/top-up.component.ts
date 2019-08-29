import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-top-up',
  templateUrl: './top-up.component.html',
  styleUrls: ['./top-up.component.css']
})
export class TopUpComponent implements OnInit {
  pk_test_c613fc7d428a64fd1e5daea22f8380551b28c78e;
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


