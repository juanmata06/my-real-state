import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HouseImagesGalleryModal } from './house-images-gallery-modal';

describe('HouseImagesGalleryModal', () => {
  let component: HouseImagesGalleryModal;
  let fixture: ComponentFixture<HouseImagesGalleryModal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HouseImagesGalleryModal],
    }).compileComponents();

    fixture = TestBed.createComponent(HouseImagesGalleryModal);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('houseInfo', { price: '500,000' });
    fixture.componentRef.setInput('images', []);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
