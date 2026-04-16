import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { TitleAndSearcherSection, ServicesAsCardsSection, HousesAsCardsSection } from '@features/landing';
import { CardComponent } from '@shared/components';

@Component({
  selector: 'app-landing-page',
  imports: [TitleAndSearcherSection, ServicesAsCardsSection, HousesAsCardsSection],
  template: ` 
    <app-title-and-searcher />
    <app-services-as-cards />
    <app-houses-as-cards />
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class LandingPage {
  private title = inject(Title);
}
