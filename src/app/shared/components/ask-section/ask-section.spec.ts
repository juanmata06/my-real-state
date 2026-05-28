import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AskSection } from './ask-section';

describe('AskSection', () => {
  let component: AskSection;
  let fixture: ComponentFixture<AskSection>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AskSection],
    }).compileComponents();

    fixture = TestBed.createComponent(AskSection);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
