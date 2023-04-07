import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignUpHeaderStepComponent } from './sign-up-header-step.component';
import { SharedModule } from '../../../shared/shared.module';
import { HttpClientModule } from '@angular/common/http';

describe('SignUpHeaderStepComponent', () => {
  let component: SignUpHeaderStepComponent;
  let fixture: ComponentFixture<SignUpHeaderStepComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientModule, SharedModule],
      declarations: [SignUpHeaderStepComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SignUpHeaderStepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
