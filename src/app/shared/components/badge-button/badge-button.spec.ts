import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BadgeButton } from './badge-button';

describe('BadgeButton', () => {
  let component: BadgeButton;
  let fixture: ComponentFixture<BadgeButton>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BadgeButton],
    }).compileComponents();

    fixture = TestBed.createComponent(BadgeButton);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
