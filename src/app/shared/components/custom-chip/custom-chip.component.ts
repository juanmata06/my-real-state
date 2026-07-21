import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { IconDefinition } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-custom-chip',
  imports: [FaIconComponent],
  template: `
    <button
      type="button"
      class="inline-flex items-center justify-center gap-2 rounded-lg border px-2 py-1 cursor-pointer"
      [class.bg-white]="isFocus()"
      [class.font-bold]="isFocus()"
      [class.border-2]="isFocus()"
      [class.font-bold]="isFocus()"
      (click)="chipClicked.emit()"
    >
      @if (icon()) {
        <fa-icon
          [icon]="icon()!"
          size="xs"
        />
      }
      <span>{{ label() }}</span>
    </button>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CustomChipComponent {
  public label = input.required<string>();
  public icon = input<IconDefinition | null>(null);
  public isFocus = input(false, {
    transform: (value: boolean | string) => (typeof value === 'string' ? value === '' : value),
  });

  public chipClicked = output<void>();
}