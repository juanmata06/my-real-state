import { ChangeDetectionStrategy, Component, inject, OnInit, Signal } from '@angular/core';
import { CardHouseTemplate, SearchFiltersComponent } from '@shared/components';
import { CardComponent } from '@shared/components/card/card.component';
import { Property } from '@shared/models';
import { PropertiesStore } from '@shared/store';

@Component({
  selector: 'app-search-page',
  imports: [CardHouseTemplate, SearchFiltersComponent, CardComponent],
  template: `
    <div class="bg-gray-light p-4">
      <section class="sticky top-0 z-10 bg-gray-light">
        <div class="max-w-6xl mx-auto pb-4">
          <app-search-filters />
        </div>
      </section>

      <main class="max-w-6xl mx-auto">
        <app-card isNotShadow>
          <div class="grid grid-cols-1 gap-6">
            @for (property of properties(); track property.id) {
              <app-card-house-template [property]="property" />
            }
          </div>
        </app-card>
      </main>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class SearchPage implements OnInit {
  private readonly propertiesStore: InstanceType<typeof PropertiesStore> = inject(PropertiesStore);
  protected readonly properties: Signal<Property[]> = this.propertiesStore.properties;

  ngOnInit(): void {
    this.propertiesStore.get();
  }
}
