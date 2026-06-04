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
import { CustomButton } from "../custom-button/custom-button";

@Component({
  selector: 'app-register-form',
  imports: [ReactiveFormsModule, RouterLink, CustomButton],
  template: `
    <form [formGroup]="form" (submit)="submitForm()" class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <!-- Name -->
      <div class="flex flex-col">
        <label for="fullName" class="mb-1"> Full name* </label>
        <input type="text" id="fullName" formControlName="name" placeholder="John Doe" class="p-3 rounded-lg bg-white" />
      </div>

      <!-- Email -->
      <div class="flex flex-col">
        <label for="companyEmail" class="mb-1">Email*</label>
        <input
          type="email"
          id="email"
          formControlName="email"
          placeholder="company@email.com"
          class="p-3 rounded-lg bg-white"
        />
      </div>

      <!-- Password -->
      <div class="flex flex-col">
        <label for="password" class="mb-1">Password*</label>
        <input
          type="password"
          id="password"
          formControlName="password"
          placeholder="********"
          class="p-3 rounded-lg bg-white"
        />
      </div>

      <!-- Password confirmation -->
      <div class="flex flex-col">
        <label for="passwordConfirmation" class="mb-1">Password confirmation*</label>
        <input
          type="password"
          id="passwordConfirmation"
          formControlName="passwordConfirmation"
          placeholder="********"
          class="p-3 rounded-lg bg-white"
        />
      </div>

      <!-- Communications -->
      <div class="flex flex-row md:col-span-2">
        <!-- <mat-checkbox id="communications">
          <label for="communications">
            {{ 'I agree to receive other communications from My Learning' }}.
          </label>
        </mat-checkbox> -->
      </div>

      <!-- Register (submit) -->
      <div class="flex flex-col col-span-full justify-center items-center">
        <app-custom-button id="submit-button" isPrimary type="submit"> Register </app-custom-button>
        <label for="submit-button" class="mt-6">
          ¿Already have an account? You can
          <a [routerLink]="'/auth/login'" class="uppercase"><strong>login</strong></a>.
        </label>
      </div>
    </form>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'w-full',
  },
})
export class RegisterFormComponent implements OnInit {
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
      name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
      email: ['', [Validators.required]],
      password: ['', [Validators.required]],
      passwordConfirmation: ['', [Validators.required]],
      communications: [false],
    });
  }

  public emitFormValue(): void {
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
