import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignUpFormPersonalDataComponent } from './sign-up-form-personal-data.component';

describe('SignUpFormPersonalDataComponent', () => {
  let component: SignUpFormPersonalDataComponent;
  let fixture: ComponentFixture<SignUpFormPersonalDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SignUpFormPersonalDataComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SignUpFormPersonalDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
