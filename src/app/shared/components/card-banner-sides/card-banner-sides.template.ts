import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CardComponent } from '../card/card.component';

@Component({
  selector: 'app-card-banner-sides',
  imports: [CardComponent],
  template: `
    <!-- <div class="flex flex-col md:flex-row rounded-3xl overflow-hidden shadow-2xl max-w-6xl mx-auto">
      <div class="bg-[#002868] text-white p-8 md:p-12 flex-1">
        <h2 class="text-3xl md:text-4xl font-bold mb-6">
          Get a <span class="text-cyan-400">cash offer</span>
        </h2>
        <div class="space-y-4 mb-6">
          <div class="flex gap-3">
            <svg
              class="w-6 h-6 text-white flex-shrink-0 mt-0.5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M5 13l4 4L19 7"
              />
            </svg>
            <p class="text-sm md:text-base">
              Get an all cash offer in select markets when you sell directly to our trusted partner,
              Opendoor.
            </p>
          </div>
          <div class="flex gap-3">
            <svg
              class="w-6 h-6 text-white flex-shrink-0 mt-0.5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M5 13l4 4L19 7"
              />
            </svg>
            <p class="text-sm md:text-base">
              Sell your home as-is and avoid the hassle of showings and repairs.
            </p>
          </div>
          <div class="flex gap-3">
            <svg
              class="w-6 h-6 text-white flex-shrink-0 mt-0.5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M5 13l4 4L19 7"
              />
            </svg>
            <p class="text-sm md:text-base">
              Sell your home on your timeline and choose your closing day.
            </p>
          </div>
        </div>

        <p class="text-xs md:text-sm mb-6 opacity-90">
          Take 3 minutes to check your eligibility. No commitment needed.
        </p>

        <button
          class="bg-white text-[#002868] font-semibold px-6 py-3 rounded-lg hover:bg-gray-100 transition-colors flex items-center gap-2 group"
        >
          Get a cash offer
          <svg
            class="w-5 h-5 transform group-hover:translate-x-1 transition-transform"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M17 8l4 4m0 0l-4 4m4-4H3"
            />
          </svg>
        </button>
      </div>
      <div class="flex-1 min-h-[300px] md:min-h-[400px]">
        <img
          src="https://images.unsplash.com/photo-1556761175-b413da4baf72?w=800&auto=format&fit=crop"
          alt="Two people working together"
          class="w-full h-full object-cover"
        />
      </div>
    </div> -->

    <app-card>
      <div class="bg-[#002868] text-white p-8 md:p-12 flex-1">
        <h2 class="text-3xl md:text-4xl font-bold mb-6">
          Get a <span class="text-cyan-400">cash offer</span>
        </h2>

        <div class="space-y-4 mb-6">
          <!-- First Benefit -->
          <div class="flex gap-3">
            <svg
              class="w-6 h-6 text-white flex-shrink-0 mt-0.5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M5 13l4 4L19 7"
              />
            </svg>
            <p class="text-sm md:text-base">
              Get an all cash offer in select markets when you sell directly to our trusted partner,
              Opendoor.
            </p>
          </div>

          <!-- Second Benefit -->
          <div class="flex gap-3">
            <svg
              class="w-6 h-6 text-white flex-shrink-0 mt-0.5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M5 13l4 4L19 7"
              />
            </svg>
            <p class="text-sm md:text-base">
              Sell your home as-is and avoid the hassle of showings and repairs.
            </p>
          </div>

          <!-- Third Benefit -->
          <div class="flex gap-3">
            <svg
              class="w-6 h-6 text-white flex-shrink-0 mt-0.5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M5 13l4 4L19 7"
              />
            </svg>
            <p class="text-sm md:text-base">
              Sell your home on your timeline and choose your closing day.
            </p>
          </div>
        </div>

        <p class="text-xs md:text-sm mb-6 opacity-90">
          Take 3 minutes to check your eligibility. No commitment needed.
        </p>

        <button
          class="bg-white text-[#002868] font-semibold px-6 py-3 rounded-lg hover:bg-gray-100 transition-colors flex items-center gap-2 group"
        >
          Get a cash offer
          <svg
            class="w-5 h-5 transform group-hover:translate-x-1 transition-transform"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M17 8l4 4m0 0l-4 4m4-4H3"
            />
          </svg>
        </button>
      </div>

      <div class="flex-1 min-h-[300px] md:min-h-[400px]">
        <img
          src="https://images.unsplash.com/photo-1556761175-b413da4baf72?w=800&auto=format&fit=crop"
          alt="Two people working together"
          class="w-full h-full object-cover"
        />
      </div>
    </app-card>
  `,
  styles: `
    :host ::ng-deep app-card p-card {
      .p-card-body {
        padding: 0;
      }
      .p-card-content {
        display: flex;
        flex-direction: column;
        @media (min-width: 768px) {
          flex-direction: row;
        }

      }
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardBannerSidesTemplate {}
