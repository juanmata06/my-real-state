import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { faHouse } from '@fortawesome/free-solid-svg-icons';
import { CustomChipComponent } from '@shared/components';
import { ApiDataStore } from '@shared/store';

@Component({
  selector: 'app-property-type-filter',
  imports: [CustomChipComponent],
  template: `
    <div class="py-2">
      <h4 class="font-semibold mb-4">Property Type:</h4>
      <div class="flex flex-wrap items-start gap-4">
        @for (propertyType of propertyTypes(); track propertyType.label) {
          <app-custom-chip
            [icon]="chipIcon"
            [label]="propertyType.label"
            [isFocus]="propertyType.isFocus"
            (chipClicked)="toggleType(propertyType.label)"
          />
        }
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PropertyTypeFilterComponent {
  private readonly apiDataStore = inject(ApiDataStore);
  private readonly selectedTypes = signal<Record<string, boolean>>({});
  public readonly chipIcon = faHouse;

  public readonly propertyTypes = computed(() =>
    this.apiDataStore.propertyTypes().map((propertyType) => ({
      label: propertyType,
      isFocus: this.selectedTypes()[propertyType] ?? false,
    })),
  );

  public toggleType(type: string): void {
    this.selectedTypes.update((types) => ({
      ...types,
      [type]: !types[type],
    }));
  }
}
