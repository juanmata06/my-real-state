import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { TitleAndSearcherSection, ServicesAsCardsSection, HousesAsCardsSection, ZillowPartnerSection, SellingOptionsSection } from '@features/landing';

@Component({
  selector: 'app-landing-page',
  imports: [
    TitleAndSearcherSection,
    ServicesAsCardsSection,
    HousesAsCardsSection,
    ZillowPartnerSection,
    SellingOptionsSection
],
  template: `
    <app-title-and-searcher />
    <app-services-as-cards />
    <app-zillow-partner />
    <app-selling-options />
    <app-houses-as-cards />
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class LandingPage {
  private title = inject(Title);
}
