import { ChangeDetectionStrategy, Component, inject, OnInit, Signal } from '@angular/core';
import { CardHouseTemplate, SearchFiltersComponent } from '@shared/components';
import { CardComponent } from '@shared/components/card/card.component';
import { Property } from '@shared/models';
import { PropertiesStore } from '@shared/store';

@Component({
  selector: 'app-search-page',
  imports: [CardHouseTemplate, SearchFiltersComponent, CardComponent],
  template: `
    <div class="flex bg-gray-light">
      <aside class="sticky top-[64px] h-[calc(100vh-64px)] w-[250px] shrink-0 flex flex-col p-4 overflow-y-auto">
        <app-search-filters />
      </aside>

      <main class="p-4 flex-1">
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
