import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CardComponent } from '../card/card.component';
import { CustomButton } from '../custom-button/custom-button';

@Component({
  selector: 'app-card-service-template',
  imports: [CardComponent, CustomButton],
  template: `
    <app-card isShadow>
      <div class="flex flex-col items-center">
        <img
          src="assets/edificio.png"
          alt="Buy a home"
          width="120"
          height="120"
          class="object-contain mb-2"
        />
        <div class="flex flex-col mb-6 items-center">
          <h3 class="font-bold">Buy a home</h3>
          <p class="leading-relaxed text-center">
            A real estate agent can provide you with a clear breakdown of costs so that you
            can avoid surprise expenses.
          </p>
        </div>
        <app-custom-button>Find details</app-custom-button>
      </div>
    </app-card>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardServiceTemplate {}
