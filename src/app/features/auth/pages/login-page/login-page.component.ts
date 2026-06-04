import { ChangeDetectionStrategy, Component, inject, type OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { Credentials } from '@shared/models/credentials.interface';
import { CardComponent, LoginFormComponent } from '@shared/components';
import { AuthStore } from '@shared/store';

// import { AuthService } from '@auth/services/auth.service';

@Component({
  standalone: true,
  selector: 'app-login-page',
  imports: [ReactiveFormsModule, CommonModule, CardComponent, LoginFormComponent],
  template: `
    @if (_authStore.isAuthLoading()) {
      <p>Loading...</p>
    } @else {
      <div class="flex max-w-7xl m-auto p-4 items-center h-screen gap-6">
        <div class="flex items-center justify-center w-full">
          <app-card isSecondary class="w-full md:w-1/2">
            <app-login-form class="p-4" (formSubmitted)="login($event)" />
          </app-card>
        </div>
      </div>
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class LoginPageComponent {
  readonly _authStore = inject(AuthStore);

  login(formValue: any): void {
    console.log(formValue);

    this._authStore.loginUser({
      email: formValue.email,
      password: formValue.password,
    });
  }
}
