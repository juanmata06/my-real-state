import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SearchInputTemplate } from './search-input';

describe('SearchInputTemplate', () => {
  let component: SearchInputTemplate;
  let fixture: ComponentFixture<SearchInputTemplate>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchInputTemplate],
    }).compileComponents();

    fixture = TestBed.createComponent(SearchInputTemplate);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
