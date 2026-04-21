import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CardHouseTemplate } from '@shared/components';
@Component({
  selector: 'app-houses-as-cards',
  imports: [CardHouseTemplate],
  template: `
    <section class="py-16 px-4">
      <div class="max-w-6xl mx-auto">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <app-card-house-template />
          <app-card-house-template />
          <app-card-house-template />
          <app-card-house-template />
        </div>
      </div>
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HousesAsCardsSection {}
