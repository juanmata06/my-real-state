import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CardBannerSidesTemplate } from '@shared/components';

@Component({
  selector: 'app-selling-options',
  imports: [CardBannerSidesTemplate],
  template: `
    <section class="py-16 px-4">
      <div class="max-w-6xl mx-auto">
        <div class="grid grid-cols-1 gap-6 mb-8">
          <app-card-banner-sides></app-card-banner-sides>
        </div>
      </div>
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SellingOptionsSection {}
