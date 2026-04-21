import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { CardComponent } from '../card/card.component';

@Component({
  selector: 'app-card-house-template',
  imports: [CardComponent],
  template: `
    <app-card>
      <img
        src="https://images.unsplash.com/photo-1564013799919-ab600027ffc6?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        alt="House"
        width="300"
        height="200"
        class="w-full h-48 object-cover"
      />
      <div class="flex flex-col gap-y-2 p-3">
        <h3 class="font-bold">$450,000</h3>
        <div class="gap-1">
          <ul class="flex gap-x-3 whitespace-nowrap overflow-hidden text-ellipsis">
            <li>3 bds</li>
            <li>2 ba</li>
            <li>120 m²</li>
          </ul>
          <p class="whitespace-nowrap overflow-hidden text-ellipsis">
            Address: 123 Main St, City
          </p>
        </div>
      </div>
    </app-card>
  `,
  styles: `
    :host ::ng-deep app-card p-card .p-card-body {
      padding: 0;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardHouseTemplate {
  id = input<string>();
  price = input<number>();
  bedrooms = input<number>();
  bathrooms = input<number>();
  squareMeters = input<number>();
  address = input<string>();
}
