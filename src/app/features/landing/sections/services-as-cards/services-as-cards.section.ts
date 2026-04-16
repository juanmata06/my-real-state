import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CardComponent, CustomButton } from '@shared/components';

@Component({
  selector: 'app-services-as-cards',
  imports: [CardComponent, CustomButton],
  template: `
    <section class="flex max-w-5xl m-auto py-16 px-4 gap-6">
      <div class="flex flex-col md:flex-row w-full gap-8 items-stretch">
        <!-- Buy a home -->
        <app-card
          isShadow
          class="flex-col w-full md:w-1/3 h-full p-8 justify-between items-center gap-6 text-center"
        >
          <img
            src="assets/edificio.png"
            alt="Buy a home"
            width="120"
            height="120"
            class="object-contain"
          />
          <div class="flex flex-col gap-3">
            <h3 class="font-bold">Buy a home</h3>
            <p class="text-gray-600">
              A real estate agent can provide you with a clear breakdown of costs so that you can
              avoid surprise expenses.
            </p>
          </div>
          <app-custom-button>Find a local agent</app-custom-button>
        </app-card>

        <!-- Rent a home -->
        <app-card
          isShadow
          class="flex-col w-full md:w-1/3 h-full p-8 justify-between items-center gap-6 text-center"
        >
          <img
            src="assets/buzon.png"
            alt="Rent a home"
            width="120"
            height="120"
            class="object-contain"
          />
          <div class="flex flex-col gap-3">
            <h3 class="font-bold">Rent a home</h3>
            <p class="text-gray-600">
              We're creating a seamless online experience – from shopping on the largest rental
              network, to applying, to paying rent.
            </p>
          </div>
          <app-custom-button>Find rentals</app-custom-button>
        </app-card>

        <!-- Sell a home -->
        <app-card
          isShadow
          class="flex-col w-full md:w-1/3 h-full p-8 justify-between items-center gap-6 text-center"
        >
          <img
            src="assets/personas.png"
            alt="Sell a home"
            width="120"
            height="120"
            class="object-contain"
          />
          <div class="flex flex-col gap-3">
            <h3 class="font-bold">Sell a home</h3>
            <p class="text-gray-600">
              No matter what path you take to sell your home, we can help you navigate a successful
              sale.
            </p>
          </div>
          <app-custom-button>See your options</app-custom-button>
        </app-card>
      </div>
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ServicesAsCardsSection {}
