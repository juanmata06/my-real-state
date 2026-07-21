import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { IconDefinition } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-custom-chip',
  imports: [FaIconComponent],
  template: `
    <button
      type="button"
      class="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg border px-2 py-1 text-base font-bold transition-colors cursor-pointer hover:opacity-90"
      [class.bg-white]="true"
      [class.border-2]="isFocus()"
      [class.border]="!isFocus()"
      [class.border-slate-900]="isFocus()"
      [class.border-slate-300]="!isFocus()"
      [class.text-slate-800]="true"
      [class.font-semibold]="isFocus()"
      (click)="chipClicked.emit()"
    >
      @if (icon()) {
        <fa-icon
          [icon]="icon()!"
          size="lg"
          class="text-slate-700"
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