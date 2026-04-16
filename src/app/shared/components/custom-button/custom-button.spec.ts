import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CustomButton } from './custom-button';

describe('CustomButton', () => {

  let fixture: ComponentFixture<CustomButton>;
  let compiled: HTMLElement;
  let component: CustomButton;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomButton],
    }).compileComponents();

    fixture = TestBed.createComponent(CustomButton);
    compiled = fixture.nativeElement as HTMLElement;
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });
});