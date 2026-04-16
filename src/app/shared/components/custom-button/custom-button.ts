import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-custom-button',
  imports: [],
  templateUrl: './custom-button.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CustomButton { }
