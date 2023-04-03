import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignUpFormAddressComponent } from './sign-up-form-address.component';

describe('SignUpFormAddressComponent', () => {
  let component: SignUpFormAddressComponent;
  let fixture: ComponentFixture<SignUpFormAddressComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SignUpFormAddressComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SignUpFormAddressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
