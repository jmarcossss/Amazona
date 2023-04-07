import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SignUpFormAddressComponent } from './sign-up-form-address.component';
import { SignUpService } from '../sign-up.service';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from '../../../shared/shared.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('SignUpFormAddressComponent', () => {
  let component: SignUpFormAddressComponent;
  let fixture: ComponentFixture<SignUpFormAddressComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [BrowserAnimationsModule, HttpClientModule, SharedModule],
      declarations: [SignUpFormAddressComponent],
      providers: [SignUpService],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SignUpFormAddressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should set value for main address field', () => {
    const testValue = 'Rua 1, 123';
    const mainAddressInput = fixture.nativeElement.querySelector(
      '.main-address input'
    );

    mainAddressInput.value = testValue;
    mainAddressInput.dispatchEvent(new Event('input'));

    expect(component.signUpAddressForm.get('mainAddress')?.value).toEqual(
      testValue
    );
  });

  it('should set value for second address field', () => {
    const testValue = 'Rua 2, 456';
    const secondAddressInput =
      fixture.nativeElement.querySelector('.address2 input');

    secondAddressInput.value = testValue;
    secondAddressInput.dispatchEvent(new Event('input'));

    expect(component.signUpAddressForm.get('address2')?.value).toEqual(
      testValue
    );
  });

  it('should set value for third address field', () => {
    const testValue = 'Rua 3, 789';
    const thirdAddressInput =
      fixture.nativeElement.querySelector('.address3 input');

    thirdAddressInput.value = testValue;
    thirdAddressInput.dispatchEvent(new Event('input'));

    expect(component.signUpAddressForm.get('address3')?.value).toEqual(
      testValue
    );
  });

  it('should call onSubmit method when the "PRÓXIMO" button is clicked', () => {
    spyOn(component, 'onSubmit');
    const nextButton = fixture.nativeElement.querySelector(
      '.button-container > :last-child'
    );
    nextButton.click();
    expect(component.onSubmit).toHaveBeenCalled();
  });

  it('should call onBack method when the "VOLTAR" button is clicked', () => {
    spyOn(component, 'onBack');
    const backButton = fixture.nativeElement.querySelector(
      '.button-container > :first-child'
    );
    backButton.click();
    expect(component.onBack).toHaveBeenCalled();
  });
});
