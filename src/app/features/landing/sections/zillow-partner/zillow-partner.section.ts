import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-zillow-partner',
  imports: [],
  template: `
    <section class="bg-teal-700 py-16 px-4">
      <div class="max-w-6xl mx-auto">
        <!-- Title -->
        <h2 class="text-center text-4xl md:text-5xl font-bold text-white mb-12">
          Sell with a <span class="text-lime-300">Zillow partner agent</span>
        </h2>

        <!-- Cards Container -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <!-- Card 1: Sell for more with Showcase -->
          <div class="bg-white rounded-2xl p-8 shadow-lg">
            <div class="flex justify-center mb-6">
              <div class="w-32 h-32 bg-orange-50 rounded-full flex items-center justify-center">
                <!-- Icon placeholder - Contract & Pen -->
                <svg
                  class="w-16 h-16 text-teal-700"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
              </div>
            </div>
            <h3 class="text-2xl font-bold text-gray-900 text-center mb-4">
              Sell for more with Showcase
            </h3>
            <p class="text-gray-700 text-center leading-relaxed">
              Select partner agents offer
              <a href="#" class="text-blue-600 hover:underline">Showcase</a> — a premium listing
              experience with 3D tours and interactive floor plans — at no extra cost. Showcase
              listings sell for $7K more on average.<sup class="text-xs">1</sup>
            </p>
          </div>

          <!-- Card 2: Maximize your home's visibility -->
          <div class="bg-white rounded-2xl p-8 shadow-lg">
            <div class="flex justify-center mb-6">
              <div class="w-32 h-32 bg-orange-50 rounded-full flex items-center justify-center">
                <!-- Icon placeholder - Magnifying glass with houses -->
                <svg
                  class="w-16 h-16 text-teal-700"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
            </div>
            <h3 class="text-2xl font-bold text-gray-900 text-center mb-4">
              Maximize your home's visibility
            </h3>
            <p class="text-gray-700 text-center leading-relaxed">
              Zillow helps you
              <a href="#" class="text-blue-600 hover:underline">sell your home</a> with partner
              agents to reach the largest audience of buyers through public listings.
            </p>
          </div>
        </div>

        <!-- Bottom text -->
        <p class="text-white text-center mb-8 max-w-4xl mx-auto">
          Answer a few questions to connect with a Zillow partner agent who offers Showcase or
          explore other selling options — all in 3 minutes with no commitment.
        </p>

        <!-- CTA Button -->
        <div class="flex justify-center">
          <button
            class="bg-white text-blue-600 font-semibold px-8 py-3 rounded-lg hover:bg-gray-50 transition-colors shadow-md"
          >
            Get started
          </button>
        </div>
      </div>
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ZillowPartnerSection {}
