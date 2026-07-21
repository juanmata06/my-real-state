import { ChangeDetectionStrategy, Component } from '@angular/core';
import { PropertyTypeFilterComponent } from "./components";

@Component({
  selector: 'app-search-filters',
  imports: [PropertyTypeFilterComponent],
  template: `
    <app-property-type-filter/>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchFiltersComponent { }
