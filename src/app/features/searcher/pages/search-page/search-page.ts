import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CardHouseTemplate } from "@shared/components";

@Component({
  selector: 'app-search-page',
  imports: [CardHouseTemplate],
  template: `
    <div class="py-16 px-4">
      <div class="max-w-6xl mx-auto">
        <header class="mb-8">
          <h1 class="text-3xl font-bold">Search results</h1>
        </header>

        <div class="flex flex-col md:flex-row gap-8">
          <aside class="w-full md:w-64 shrink-0">
            <div class="p-4 bg-gray-50 rounded-lg border border-gray-200">
              <h2 class="font-semibold mb-4">Filters</h2>
              <!-- Filter content will go here -->
              <p class="text-sm text-gray-600">Filter options coming soon...</p>
            </div>
          </aside>

          <main class="flex-1">
            <div class="grid grid-cols-1 gap-6 mb-8">
              <app-card-house-template />
              <app-card-house-template />
              <app-card-house-template />
              <app-card-house-template />
            </div>
          </main>
        </div>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class SearchPage {}
