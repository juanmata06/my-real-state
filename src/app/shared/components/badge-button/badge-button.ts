import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  input,
  Input,
  output,
  viewChild,
} from '@angular/core';
import { CardComponent } from '../card/card.component';
import { IconDefinition, FaIconComponent } from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'app-badge-button',
  imports: [CardComponent, FaIconComponent],
  template: `
    <button #button (click)="emitButtonValue()" class="w-full cursor-pointer">
      <app-card [isTransparent]="!isOnFocus()" [isNotBordered]="!isOnFocus()" isNotShadow>
        <div class="flex flex-1 items-center">
          <fa-icon [icon]="icon" [size]="'xs'" class="px-2" />
          <div class="w-full px-2 text-left">
            <span [class.font-bold]="isOnFocus()">
              <ng-content />
            </span>
          </div>
        </div>
      </app-card>
    </button>
  `,
  styles: `
    :host ::ng-deep app-card p-card .p-card-body {
      padding: 0.25rem;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BadgeButton {
  @Input() icon: IconDefinition;
  public isOnFocus = input(false, {
    transform: (value: boolean | string) => (typeof value == 'string' ? value == '' : value),
  });
  public onClickButton = output<boolean>();
  private _buttonValue = viewChild<ElementRef<HTMLButtonElement>>('button');

  public emitButtonValue(): void {
    if (!this._buttonValue()?.nativeElement) {
      return;
    }
    this.onClickButton.emit(true);
  }
}
