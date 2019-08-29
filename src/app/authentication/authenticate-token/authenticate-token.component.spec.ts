import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthenticateTokenComponent } from './authenticate-token.component';

describe('AuthenticateTokenComponent', () => {
  let component: AuthenticateTokenComponent;
  let fixture: ComponentFixture<AuthenticateTokenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AuthenticateTokenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthenticateTokenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
