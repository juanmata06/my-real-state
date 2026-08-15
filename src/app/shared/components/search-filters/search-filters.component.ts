import { ChangeDetectionStrategy, Component } from '@angular/core';
import { PropertyTypeFilterComponent, CountyFilterComponent } from "./components";

@Component({
  selector: 'app-search-filters',
  imports: [CountyFilterComponent, PropertyTypeFilterComponent],
  template: `
    <div class="flex flex-row gap-4">
      <app-county-filter />
      <app-property-type-filter/>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchFiltersComponent { }
