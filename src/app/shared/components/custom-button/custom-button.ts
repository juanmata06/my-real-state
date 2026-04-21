import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
@Component({
  selector: 'app-custom-button',
  imports: [ButtonModule],
  template: `
    <button
      pButton
      class="px-3 py-1 bg-primary text-white font-bold border-0 rounded-lg cursor-pointer hover:opacity-90"
    >
      <ng-content />
    </button>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CustomButton {}
