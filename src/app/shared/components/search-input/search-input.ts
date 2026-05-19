import { ChangeDetectionStrategy, Component, output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-search-input',
  imports: [FormsModule],
  template: `
    <div
      class="flex items-center bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200 transition-colors focus-within:border-primary focus-within:ring-2 focus-within:ring-primary"
    >
      <input
        type="text"
        [(ngModel)]="searchValue"
        (keyup.enter)="handleSearch()"
        placeholder="Enter an address, neighborhood, city, or ZIP code"
        class="flex-1 p-5! border-0! outline-none"
      />
      <button
        (click)="handleSearch()"
        class="p-4 px-6 bg-transparent border-0 cursor-pointer hover:bg-gray-100 transition-colors"
        aria-label="Search"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="2.5"
          stroke="currentColor"
          class="w-8 h-8 text-gray-700"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
          />
        </svg>
      </button>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchInput {
  searchValue = signal('');
  searchSubmitted = output<string>();

  handleSearch(): void {
    const value = this.searchValue() || '';
    this.searchSubmitted.emit(this.searchValue()?.trim());
  }
}
