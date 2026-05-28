import { ChangeDetectionStrategy, Component, input, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { faHeart, faPhone } from '@fortawesome/free-solid-svg-icons';
import { CardComponent } from '../card/card.component';
import { CustomButton } from '../custom-button/custom-button';
import { CustomImagesGallery } from '../custom-images-gallery/custom-images-gallery';
import { GalleryImage } from '@shared/models';

@Component({
  selector: 'app-card-house-template',
  imports: [CardComponent, CustomButton, FaIconComponent, CustomImagesGallery, RouterLink],
  template: `
    <app-card class="cursor-pointer" routerLink="/search/1">
      <div class="@container">
        <div class="flex flex-col @md:flex-row">
          <div class="w-full h-48 flex-shrink-0 overflow-hidden @md:w-64 @md:h-auto">
            <app-custom-images-gallery [value]="houseImages()" />
          </div>
          <div class="flex flex-col gap-y-2 p-3">
            <h3 class="font-bold">$450,000</h3>
            <p class="hidden @md:line-clamp-2">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quisquam dicta itaque, aut
              nobis illum obcaecati minima expedita, repellat accusamus tempora possimus nisi. Vel
              vitae fugit, ea nihil laboriosam reprehenderit minus!
            </p>
            <div class="flex justify-between items-end gap-3">
              <div class="gap-1 flex-1">
                <ul class="flex gap-x-3 whitespace-nowrap overflow-hidden text-ellipsis">
                  <li>3 bds</li>
                  <li>2 ba</li>
                  <li>120 m²</li>
                </ul>
                <p class="whitespace-nowrap overflow-hidden text-ellipsis">
                  Address: 123 Main St, City
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
  readonly faHeart = faHeart;
  readonly faPhone = faPhone;
  id = input<string>();
  price = input<number>();
  bedrooms = input<number>();
  bathrooms = input<number>();
  squareMeters = input<number>();
  address = input<string>();

  readonly houseImages = signal<GalleryImage[]>([
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
