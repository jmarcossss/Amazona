import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignUpHeaderStepComponent } from './sign-up-header-step.component';

describe('SignUpHeaderStepComponent', () => {
  let component: SignUpHeaderStepComponent;
  let fixture: ComponentFixture<SignUpHeaderStepComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SignUpHeaderStepComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SignUpHeaderStepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
