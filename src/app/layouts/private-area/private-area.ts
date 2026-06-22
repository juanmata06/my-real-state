import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CustomHeader } from '@shared/components';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-private-area',
  imports: [CustomHeader, RouterOutlet],
  template: `
    <app-custom-header />
    <router-outlet />
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class PrivateArea {}
