import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-customers-list',
  imports: [],
  template: `CustomersList works!`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class CustomersList {}