import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CardComponent, CustomButton } from '@shared/components';

@Component({
  selector: 'app-houses-as-cards',
  imports: [CardComponent, CustomButton],
  template: `
    <section class="flex max-w-6xl m-auto py-16 px-4 gap-6">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 w-full gap-6">
        <!-- House 1 -->
        <app-card isShadow class="flex flex-col h-full overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1564013799919-ab600027ffc6?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="House"
            width="300"
            height="200"
            class="w-full h-48 object-cover"
          />
          <div class="flex flex-col gap-4 p-6 flex-grow justify-between">
            <div class="flex flex-col gap-2">
              <h3 class="font-bold text-lg">$450,000</h3>
              <p class="text-gray-600 text-sm">Beautiful home in prime location</p>
            </div>
            <app-custom-button>View Details</app-custom-button>
          </div>
        </app-card>

        <!-- House 2 -->
        <app-card isShadow class="flex flex-col h-full overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1564013799919-ab600027ffc6?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="House"
            width="300"
            height="200"
            class="w-full h-48 object-cover"
          />
          <div class="flex flex-col gap-4 p-6 flex-grow justify-between">
            <div class="flex flex-col gap-2">
              <h3 class="font-bold text-lg">$320,000</h3>
              <p class="text-gray-600 text-sm">Modern apartment downtown</p>
            </div>
            <app-custom-button>View Details</app-custom-button>
          </div>
        </app-card>

        <!-- House 3 -->
        <app-card isShadow class="flex flex-col h-full overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1564013799919-ab600027ffc6?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="House"
            width="300"
            height="200"
            class="w-full h-48 object-cover"
          />
          <div class="flex flex-col gap-4 p-6 flex-grow justify-between">
            <div class="flex flex-col gap-2">
              <h3 class="font-bold text-lg">$550,000</h3>
              <p class="text-gray-600 text-sm">Spacious family residence</p>
            </div>
            <app-custom-button>View Details</app-custom-button>
          </div>
        </app-card>

        <!-- House 4 -->
        <app-card isShadow class="flex flex-col h-full overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1564013799919-ab600027ffc6?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="House"
            width="300"
            height="200"
            class="w-full h-48 object-cover"
          />
          <div class="flex flex-col gap-4 p-6 flex-grow justify-between">
            <div class="flex flex-col gap-2">
              <h3 class="font-bold text-lg">$380,000</h3>
              <p class="text-gray-600 text-sm">Cozy townhouse with garden</p>
            </div>
            <app-custom-button>View Details</app-custom-button>
          </div>
        </app-card>
      </div>
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HousesAsCardsSection {}
