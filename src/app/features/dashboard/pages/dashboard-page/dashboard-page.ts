import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CardComponent } from '@shared/components/card/card.component';

@Component({
  selector: 'app-dashboard-page',
  imports: [CardComponent],
  template: `
    <app-card isNotShadow>
      <h2>Hello World</h2>
    </app-card>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class DashboardPage {}
