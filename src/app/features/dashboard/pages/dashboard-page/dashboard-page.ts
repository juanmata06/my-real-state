import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-dashboard-page',
  imports: [],
  template: `
    <h1>Hello World</h1>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class DashboardPage {}
