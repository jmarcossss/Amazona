import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateOrderInfoItemComponent } from './create-order-info-item.component';

describe('CreateOrderInfoItemComponent', () => {
  let component: CreateOrderInfoItemComponent;
  let fixture: ComponentFixture<CreateOrderInfoItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateOrderInfoItemComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateOrderInfoItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
