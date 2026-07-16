import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-sales-list',
  imports: [],
  template: `SalesList works!`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class SalesList {}