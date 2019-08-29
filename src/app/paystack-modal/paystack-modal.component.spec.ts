import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaystackModalComponent } from './paystack-modal.component';

describe('PaystackModalComponent', () => {
  let component: PaystackModalComponent;
  let fixture: ComponentFixture<PaystackModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaystackModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaystackModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
