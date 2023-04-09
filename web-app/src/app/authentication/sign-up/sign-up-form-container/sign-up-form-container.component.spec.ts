import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignUpFormContainerComponent } from './sign-up-form-container.component';
import { SharedModule } from '../../../shared/shared.module';
import { HttpClientModule } from '@angular/common/http';

describe('SignUpFormContainerComponent', () => {
  let component: SignUpFormContainerComponent;
  let fixture: ComponentFixture<SignUpFormContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientModule, SharedModule],
      declarations: [SignUpFormContainerComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SignUpFormContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
