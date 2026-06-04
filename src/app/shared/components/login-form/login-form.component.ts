import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
  output,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';

// import { MatCheckboxModule } from '@angular/material/checkbox';
import { RouterLink } from '@angular/router';
import { CustomButton } from '../custom-button/custom-button';

@Component({
  selector: 'app-login-form',
  imports: [ReactiveFormsModule, RouterLink, CustomButton],
  template: `
    <form [formGroup]="form" (submit)="submitForm()" class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <!-- Email -->
      <div class="flex flex-col col-span-full">
        <label for="companyEmail" class="mb-1"> Email* </label>
        <input
          type="email"
          id="email"
          formControlName="email"
          placeholder="company@email.com"
          class="p-3 rounded-lg bg-white"
        />
      </div>

      <!-- Password -->
      <div class="flex flex-col col-span-full">
        <label for="password" class="mb-1"> Password* </label>
        <input
          type="password"
          id="password"
          formControlName="password"
          placeholder="********"
          class="p-3 rounded-lg bg-white"
        />
      </div>

      <!-- Login (submit) -->
      <div class="flex flex-col col-span-full justify-center items-center">
        <app-custom-button id="submit-button" isPrimary type="submit"> Login </app-custom-button>
        <label for="submit-button" class="mt-6">
          ¿Don't have an account yet? You can
          <a [routerLink]="'/auth/register'" class="uppercase"><strong>Register</strong></a>.
        </label>
      </div>
    </form>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'w-full',
  },
})
export class LoginFormComponent implements OnInit {
  /**
   * ------------------------------------------------------------------------------------------------------------------------------
   * General vars
   * ------------------------------------------------------------------------------------------------------------------------------
   */
  form: FormGroup;
  private _formBuilder: FormBuilder = inject(FormBuilder);
  public formSubmitted = output<boolean>();

  /**
   * -----------------------------------------------------------------------------------------------------------------------------
   * LYFECYCLE METHODS
   * -----------------------------------------------------------------------------------------------------------------------------
   */
  ngOnInit(): void {
    this.createForm();
  }

  /**
   * ------------------------------------------------------------------------------------------------------------------------------
   * PRIVATE METHODS
   * ------------------------------------------------------------------------------------------------------------------------------
   */
  private createForm(): void {
    this.form = this._formBuilder.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  public emitFormValue(): void {
    console.log(this.form.value);
    
    this.formSubmitted.emit(this.form.value);
  }

  /**
   * ------------------------------------------------------------------------------------------------------------------------------
   * PRIVATE VALIDATION AND INTERNAL PROCESS METHODS
   * ------------------------------------------------------------------------------------------------------------------------------
   */

  /**
   * ------------------------------------------------------------------------------------------------------------------------------
   * PUBLIC METHODS
   * ------------------------------------------------------------------------------------------------------------------------------
   */
  submitForm() {
    //TODO: make her form validations and alert messages
    this.emitFormValue();
  }

  /**
   * ------------------------------------------------------------------------------------------------------------------------------
   * PUBLIC VALIDATION AND INTERNAL PROCESS METHODS
   * ------------------------------------------------------------------------------------------------------------------------------
   */
}
