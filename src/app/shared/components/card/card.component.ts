import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { CardModule } from 'primeng/card';
@Component({
  selector: 'app-card',
  imports: [CardModule],
  template: `
    <p-card
      [class.bg-white]="!isPrimary() && !isSecondary() && !isTransparent()"
      [class.bg-primary]="isPrimary()"
      [class.bg-secondary]="isSecondary()"
      [class.bg-transparent]="isTransparent()"
      [class.border-transparent]="isNotBordered()"
      [class.shadow-xl]="isShadow()"
      class="w-full h-full text-black border-[1.5px] border-gray-medium rounded-2xl overflow-hidden shadow-lg"
    >
      <ng-content />
    </p-card>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {

  },
})
export class CardComponent {
  public isPrimary = input(false, {
    transform: (value: boolean | string) => (typeof value == 'string' ? value == '' : value),
  });
  public isSecondary = input(false, {
    transform: (value: boolean | string) => (typeof value == 'string' ? value == '' : value),
  });
  public isTransparent = input(false, {
    transform: (value: boolean | string) => (typeof value == 'string' ? value == '' : value),
  });
  public isNotBordered = input(false, {
    transform: (value: boolean | string) => (typeof value == 'string' ? value == '' : value),
  });
  public isNotShadow = input(false, {
    transform: (value: boolean | string) => (typeof value == 'string' ? value == '' : value),
  });
  public isShadow = input(false, {
    transform: (value: boolean | string) => (typeof value == 'string' ? value == '' : value),
  });
}
