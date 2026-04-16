import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CustomButton } from '../custom-button/custom-button';

@Component({
  selector: 'app-custom-header',
  imports: [CustomButton],
  templateUrl: './custom-header.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CustomHeader { }
