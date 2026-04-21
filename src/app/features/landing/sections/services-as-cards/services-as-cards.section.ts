import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CardServiceTemplate } from '@shared/components';
@Component({
  selector: 'app-services-as-cards',
  imports: [CardServiceTemplate],
  template: `
    <section class="py-16 px-4">
      <div class="max-w-6xl mx-auto">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <app-card-service-template />
          <app-card-service-template />
          <app-card-service-template />
        </div>
      </div>
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ServicesAsCardsSection {}
