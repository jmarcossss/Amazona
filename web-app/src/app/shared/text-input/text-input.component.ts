import { Component, Input } from '@angular/core';
import { AbstractControl, FormControl } from '@angular/forms';

@Component({
  selector: 'app-text-input',
  templateUrl: './text-input.component.html',
  styleUrls: ['./text-input.component.css'],
})
export class TextInputComponent {
  @Input() control?: AbstractControl | null = new FormControl();
  @Input() pattern: RegExp | string = '';
  @Input() mask?: string;
  @Input() type: string = 'text';
  @Input() label: string = '';
  @Input() hint: string = '';
  @Input() placeholder: string = '';
  @Input() errorMessage: string = '';

  constructor() {
    this.control = this.control
      ? (this.control as FormControl)
      : new FormControl();
  }

  get formControll(): FormControl {
    return this.control as FormControl;
  }

  public formControllHasError(): boolean {
    const formControl = this.control;

    return (
      (formControl?.invalid && (formControl?.dirty || formControl?.touched)) ??
      false
    );
  }

  public getErrorMessages(): string {
    let messages: string[] = [];

    if (this.control?.errors) {
      for (const errorName in this.control.errors) {
        let errorMsg = '';
        switch (errorName) {
          case 'required':
            if (typeof this.control.errors[errorName] === 'string') {
              errorMsg = this.control.errors[errorName];
            } else {
              errorMsg = 'Campo obrigatório!';
            }
            break;
          case 'minlength':
            errorMsg = `Mínimo de ${this.control.errors['minlength'].requiredLength} caracteres`;
            break;
          case 'maxlength':
            errorMsg = `Máximo de ${this.control.errors['maxlength'].requiredLength} caracteres`;
            break;
          case 'email':
            errorMsg = 'E-mail inválido!';
            break;
          case 'pattern':
          case 'mask':
            errorMsg = 'Formato inválido!';
            break;
          default:
            errorMsg = `Erro desconhecido!`;
            break;
        }

        if (!messages.includes(errorMsg)) {
          messages.push(errorMsg);
        }
      }
    }

    return !!this.errorMessage ? this.errorMessage : messages.join(' | ');
  }
}
