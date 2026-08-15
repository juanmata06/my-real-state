import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Select } from 'primeng/select';
import { ApiDataStore } from '@shared/store';

@Component({
  selector: 'app-county-filter',
  imports: [FormsModule, Select],
  template: `
      <p-select
        inputId="county-filter"
        [options]="countyGroups()"
        [ngModel]="selectedCounty()"
        (ngModelChange)="selectedCounty.set($event)"
        [group]="true"
        optionLabel="label"
        optionValue="value"
        optionGroupLabel="label"
        optionGroupChildren="items"
        placeholder="Selecciona una comarca"
        [filter]="true"
        filterBy="label"
        [showClear]="true"
        ariaLabel="County filter"
      >
        <ng-template
          #group
          let-group
        >
          <span class="text-sm font-semibold text-gray-strong">{{ group.label }}</span>
        </ng-template>
      </p-select>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CountyFilterComponent {
  private readonly apiDataStore = inject(ApiDataStore);

  protected readonly selectedCounty = signal<string | null>(null);
  protected readonly countyGroups = this.apiDataStore.cataloniaCountyGroups;
}