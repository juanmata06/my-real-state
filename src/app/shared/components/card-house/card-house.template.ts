import { ChangeDetectionStrategy, Component, input, signal } from '@angular/core';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { faHeart, faPhone } from '@fortawesome/free-solid-svg-icons';
import { GalleriaModule } from 'primeng/galleria';
import { CardComponent } from '../card/card.component';
import { CustomButton } from '../custom-button/custom-button';

@Component({
  selector: 'app-card-house-template',
  imports: [CardComponent, CustomButton, FaIconComponent, GalleriaModule],
  template: `
    <app-card>
      <div class="@container">
        <div class="flex flex-col @md:flex-row">
          <div class="w-full h-48 flex-shrink-0 overflow-hidden @md:w-64 @md:h-auto">
            <p-galleria
              [value]="houseImages()"
              [circular]="true"
              [showItemNavigators]="true"
              [showThumbnails]="false"
              [containerStyle]="{ width: '100%', height: '100%' }"
              [pt]="{
                root: { class: 'border-0 rounded-none! h-full' },
                content: { class: 'border-0 p-0 rounded-none! h-full' },
                itemsContainer: { class: 'h-full' },
                item: { class: 'h-full' },
              }"
            >
              <ng-template #item let-item>
                <img
                  [src]="item.itemImageSrc"
                  [alt]="item.alt"
                  class="w-full h-48 object-cover @md:h-full block"
                />
              </ng-template>
            </p-galleria>
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
    :host ::ng-deep p-galleria {
      .p-galleria-nav-button {
        top: 90%;
      }
      .p-galleria-prev-button,
      .p-galleria-next-button {
        background-color: rgba(255, 255, 255, 0.35);
        // background-color: transparent;
        svg {
          color: var(--white);
          width: 20px;
          height: 20px;
          filter: drop-shadow(0 2px 6px rgba(0, 0, 0, 0.15))
            drop-shadow(0 0px 3px rgba(0, 0, 0, 0.15));
        }
        &:hover {
          // svg {
          //   color: black;
          // }
        }
      }
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

  readonly houseImages = signal([
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
