import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { GalleriaModule } from 'primeng/galleria';
import { GalleryImage } from '@shared/models';

@Component({
  selector: 'app-custom-images-gallery',
  imports: [GalleriaModule],
  template: `
    <p-galleria
      [value]="value()"
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
  `,
  styles: `
    :host {
      display: block;
      width: 100%;
      height: 100%;
    }
    :host ::ng-deep p-galleria {
      .p-galleria-nav-button {
        top: 80%;
        width: 2.5rem;
        height: 2.5rem;
      }
      .p-galleria-prev-button,
      .p-galleria-next-button {
        background-color: rgba(0, 0, 0, 0.15);
        svg {
          color: var(--white);
          width: 20px;
          height: 20px;
          filter: drop-shadow(0 2px 6px rgba(0, 0, 0, 0.15))
            drop-shadow(0 0px 3px rgba(0, 0, 0, 0.15));
        }
      }
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CustomImagesGallery {
  value = input.required<GalleryImage[]>();
}
