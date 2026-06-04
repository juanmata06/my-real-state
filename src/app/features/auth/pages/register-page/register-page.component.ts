import { ChangeDetectionStrategy, Component, inject, type OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { CardComponent, RegisterFormComponent } from '@shared/components';
import { AuthStore } from '@shared/store';

@Component({
  standalone: true,
  selector: 'app-register-page',
  imports: [ReactiveFormsModule, CardComponent, RegisterFormComponent],
  template: `
    @if (_authStore.isAuthLoading()) {
      <p>Loading...</p>
    } @else {
      <div class="flex max-w-7xl m-auto p-4 items-center h-screen gap-6">
        <div class="flex flex-col md:flex-row items-center md:items-stretch w-full gap-8">
          <app-card class="flex-col w-full md:w-1/2">
            <div class="p-4">
              <div class="flex flex-col align-middle text-left">
                <h3 class="pb-4 select-none">
                  {{ 'My Learning' }}
                </h3>
                <h2>{{ 'Lorem ipsum dolor sit, amet consectetur adipisicing elit' }}.</h2>
              </div>
            </div>
            <div class="p-4">
              <!-- <mat-list>
              <mat-list-item>
                <fa-icon [icon]="faCheck" matListItemIcon />
                <div matListItemTitle class="pt-2">
                  {{ 'Completely free of charge' }}
                </div>
              </mat-list-item>
              <mat-list-item>
                <fa-icon [icon]="faCheck" matListItemIcon />
                <div matListItemTitle class="pt-2">
                  {{ 'Book the best suTable timeslot for you' }}
                </div>
              </mat-list-item>
              <mat-list-item>
                <fa-icon [icon]="faCheck" matListItemIcon />
                <div matListItemTitle class="pt-2">
                  {{ 'See Clerk in action with your own products' }}
                </div>
              </mat-list-item>
            </mat-list> -->
              holi
            </div>
          </app-card>
          <app-card isSecondary class="w-full md:w-1/2">
            <app-register-form class="p-4" (formSubmitted)="register($event)" />
          </app-card>
        </div>
      </div>
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class RegisterPageComponent {
  readonly _authStore = inject(AuthStore);
  faCheck = faCheck;

  register(formValue: any): void {
    console.log(formValue);
    this._authStore.registerUser({
      email: formValue.email,
      password: formValue.password,
    });
  }
}
