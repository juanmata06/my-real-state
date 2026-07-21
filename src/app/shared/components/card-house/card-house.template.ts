import { CurrencyPipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  InputSignal,
  WritableSignal,
  input,
  signal,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { faHeart, faPhone } from '@fortawesome/free-solid-svg-icons';
import { GalleryImage, Property } from '@shared/models';
import { CardComponent } from '../card/card.component';
import { CustomButton } from '../custom-button/custom-button';
import { CustomImagesGallery } from '../custom-images-gallery/custom-images-gallery';

@Component({
  selector: 'app-card-house-template',
  imports: [CurrencyPipe, CardComponent, CustomButton, FaIconComponent, CustomImagesGallery, RouterLink],
  template: `
    <app-card isNotShadow class="cursor-pointer" [routerLink]="['/search', property().id]">
      <div class="@container">
        <div class="flex flex-col @md:flex-row">
          <div class="w-full h-48 flex-shrink-0 overflow-hidden @md:w-64 @md:h-auto">
            <app-custom-images-gallery [value]="houseImages()" />
          </div>
          <div class="flex flex-col gap-y-2 p-3 flex-1">
            <h3 class="font-bold">{{ property().price.amount | currency: 'USD' : 'symbol' : '1.0-0' }}</h3>
            <h4 class="font-medium text-lg">{{ property().title }}</h4>
            <p class="hidden @md:line-clamp-2">
              {{ property().description }}
            </p>
            <div class="flex justify-between items-end gap-3 mt-auto">
              <div class="gap-1 flex-1">
                <ul class="flex gap-x-3 whitespace-nowrap overflow-hidden text-ellipsis">
                  <li>{{ property().details.bedrooms }} bds</li>
                  <li>{{ property().details.bathrooms }} ba</li>
                  <li>{{ property().details.builtUpAreaSqft }} m²</li>
                </ul>
                <p class="whitespace-nowrap overflow-hidden text-ellipsis">
                  Address:
                  {{ property().location.community }}{{ property().location.cluster ? (property().location.community ? ', ' : '') + property().location.cluster : '' }}{{ property().location.city ? (property().location.community || property().location.cluster ? ', ' : '') + property().location.city : '' }}
                </p>
              </div>
              <div class="hidden @md:flex gap-2">
                <app-custom-button isTransparent><fa-icon [icon]="faHeart" /></app-custom-button>
                <app-custom-button isTransparent><fa-icon [icon]="faPhone" /></app-custom-button>
              </div>
            </div>
          </div>
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
  readonly faHeart: IconDefinition = faHeart;
  readonly faPhone: IconDefinition = faPhone;
  readonly property: InputSignal<Property> = input.required<Property>();

  readonly houseImages: WritableSignal<GalleryImage[]> = signal<GalleryImage[]>([
    {
      itemImageSrc:
        'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=600&auto=format&fit=crop',
      alt: 'Modern house with pool',
    },
    {
      itemImageSrc:
        'https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=600&auto=format&fit=crop',
      alt: 'Suburban house',
    },
    {
      itemImageSrc:
        'https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=600&auto=format&fit=crop',
      alt: 'House with garden',
    },
    {
      itemImageSrc:
        'https://images.unsplash.com/photo-1480074568708-e7b720bb3f09?w=600&auto=format&fit=crop',
      alt: 'Family home',
    },
    {
      itemImageSrc:
        'https://images.unsplash.com/photo-1449844908441-8829872d2607?w=600&auto=format&fit=crop',
      alt: 'Cozy home',
    },
  ]);
}
