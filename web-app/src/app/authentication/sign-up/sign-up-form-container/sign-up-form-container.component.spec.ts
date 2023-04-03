import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignUpFormContainerComponent } from './sign-up-form-container.component';

describe('SignUpFormContainerComponent', () => {
  let component: SignUpFormContainerComponent;
  let fixture: ComponentFixture<SignUpFormContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SignUpFormContainerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SignUpFormContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
