import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { ButtonModule } from 'primeng/button';
@Component({
  selector: 'app-custom-button',
  imports: [ButtonModule],
  template: `
    <button
      pButton
      class="px-3 py-1 font-bold border-1 rounded-lg cursor-pointer hover:opacity-90"
      [class.bg-primary]="isPrimary() || (!isSecondary() && !isTransparent())"
      [class.bg-secondary]="isSecondary()"
      [class.bg-transparent]="isTransparent()"
      [class.border-primary]="isPrimary() || isSecondary() || !isTransparent()"
      [class.border-transparent]="isTransparent()"
      [class.text-white]="isPrimary() || (!isSecondary() && !isTransparent())"
      [class.text-primary]="isSecondary()"
      [class.rounded-full!]="isRounded()"
      (click)="emitButtonValue()"
    >
      <ng-content />
    </button>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CustomButton {
  public isPrimary = input(false, {
    transform: (value: boolean | string) => (typeof value == 'string' ? value == '' : value),
  });
  public isSecondary = input(false, {
    transform: (value: boolean | string) => (typeof value == 'string' ? value == '' : value),
  });
  public isTransparent = input(false, {
    transform: (value: boolean | string) => (typeof value == 'string' ? value == '' : value),
  });
  public isRounded = input(false, {
    transform: (value: boolean | string) => (typeof value == 'string' ? value == '' : value),
  });

  public isButtonClicked = output<boolean>();
  public emitButtonValue(): void {
    this.isButtonClicked.emit(true);
  }
}
