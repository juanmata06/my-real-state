import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CustomImagesGallery } from './custom-images-gallery';

describe('CustomImagesGallery', () => {
  let component: CustomImagesGallery;
  let fixture: ComponentFixture<CustomImagesGallery>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomImagesGallery],
    }).compileComponents();

    fixture = TestBed.createComponent(CustomImagesGallery);
    fixture.componentRef.setInput('value', []);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
