import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AgentInfo } from '@shared/models';
import { CustomButton } from '@shared/components';

@Component({
  selector: 'app-ask-section',
  imports: [ReactiveFormsModule, CustomButton],
  template: `
    <section class="border-t border-gray-200 pt-6">
      <h2 class="text-lg font-bold text-gray-900 mb-4">Ask a Question</h2>

      @if (agentInfo(); as agent) {
        <div class="flex items-center gap-3 mb-4">
          <img
            [src]="agent.photoUrl"
            [alt]="agent.name"
            class="w-12 h-12 rounded-full object-cover"
          />
          <div>
            <div class="font-semibold text-gray-900">{{ agent.name }}</div>
            <div class="text-sm text-gray-500">{{ agent.title }}</div>
          </div>
        </div>
      }

      <form [formGroup]="form">
        @if (!agentInfo()) {
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            <input
              type="text"
              formControlName="firstName"
              placeholder="First name"
              class="w-full border border-gray-300 rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
            />
            <input
              type="text"
              formControlName="lastName"
              placeholder="Last name"
              class="w-full border border-gray-300 rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
            />
            <input
              type="email"
              formControlName="email"
              placeholder="Email"
              class="w-full border border-gray-300 rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
            />
            <input
              type="tel"
              formControlName="phone"
              placeholder="Phone"
              class="w-full border border-gray-300 rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
            />
          </div>
        }

        <textarea
          formControlName="message"
          placeholder="Ask the agent for more information about this property..."
          class="w-full border border-gray-300 rounded-lg p-4 text-sm resize-none h-24 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
        ></textarea>

        <div class="mt-4">
          <app-custom-button isPrimary (isButtonClicked)="onSubmit()">
            Enviar
          </app-custom-button>
        </div>
      </form>
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AskSection {
  agentInfo = input<AgentInfo>();

  private readonly _formBuilder = inject(FormBuilder);

  readonly form = this._formBuilder.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    phone: ['', Validators.required],
    message: [''],
  });

  onSubmit(): void {
    console.log('Form valid:', this.form.valid);
    console.log('Form values:', this.form.value);
  }
}
