import { ComponentFixture, TestBed } from '@angular/core/testing';
import RentsList from './rents-list';

describe('RentsList', () => {
  let component: RentsList;
  let fixture: ComponentFixture<RentsList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RentsList],
    }).compileComponents();

    fixture = TestBed.createComponent(RentsList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});