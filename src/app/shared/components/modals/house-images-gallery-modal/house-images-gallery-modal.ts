import { ChangeDetectionStrategy, Component, input, InputSignal } from '@angular/core';
import { GalleryImage, HouseInfo } from '@shared/models';

@Component({
  selector: 'app-house-images-gallery-modal',
  imports: [],
  template: `
    <div class="flex h-full overflow-hidden">
      <!-- Left: sticky title panel -->
      <div class="w-1/3 shrink-0 sticky top-0 self-start p-6">
        <h2 class="text-2xl font-semibold leading-snug text-gray-900">
          {{ houseInfo().title }}
        </h2>
        @if (houseInfo().status) {
          <span class="mt-3 inline-block text-sm font-medium text-primary uppercase tracking-wide">
            {{ houseInfo().status }}
          </span>
        }
        <p class="mt-2 text-xl font-bold text-gray-800">
          {{ houseInfo().currency ?? '$' }}{{ houseInfo().price }}
        </p>
      </div>

      <!-- Right: scrollable images stacked vertically -->
      <div class="flex-1 overflow-y-auto flex flex-col gap-4 pr-2">
        @for (image of images(); track image.itemImageSrc) {
          <img
            [src]="image.itemImageSrc"
            [alt]="image.alt"
            class="w-full object-cover rounded-lg"
          />
        }
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HouseImagesGalleryModal {
  readonly houseInfo: InputSignal<HouseInfo> = input.required<HouseInfo>();
  readonly images: InputSignal<GalleryImage[]> = input.required<GalleryImage[]>();
}
