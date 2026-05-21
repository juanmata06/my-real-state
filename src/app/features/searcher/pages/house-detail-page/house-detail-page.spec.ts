import { ComponentFixture, TestBed } from '@angular/core/testing';
import HouseDetailPage from './house-detail-page';

describe('HouseDetailPage', () => {
  let component: HouseDetailPage;
  let fixture: ComponentFixture<HouseDetailPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HouseDetailPage],
    }).compileComponents();

    fixture = TestBed.createComponent(HouseDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
