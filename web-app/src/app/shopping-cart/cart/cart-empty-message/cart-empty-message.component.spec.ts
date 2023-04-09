import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartEmptyMessageComponent } from './cart-empty-message.component';

describe('CartEmptyMessageComponent', () => {
  let component: CartEmptyMessageComponent;
  let fixture: ComponentFixture<CartEmptyMessageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CartEmptyMessageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CartEmptyMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
