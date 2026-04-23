import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CardBannerSidesTemplate, CustomButton } from '@shared/components';

@Component({
  selector: 'app-selling-options',
  imports: [CardBannerSidesTemplate, CustomButton],
  template: `
    <section class="py-16 px-4 bg-white">
      <div class="max-w-6xl mx-auto">
        <div class="grid grid-cols-1 gap-10 mb-8">
          <div class="text-center gap-6">
            <h2>Lorem ipsum dolor</h2>
            <h5>Exercitationem qui, eligendi libero similique incidunt minima.</h5>
          </div>
          <app-card-banner-sides-template imagePosition="right">
            <ng-content content>
              <div class="min-h-[400px] p-6 md:p-10 flex flex-col justify-between text-white">
                <h2>Lorem ipsum dolor sit</h2>
                <ul class="grid gap-3">
                  <li>Lorem ipsum dolor, sit amet consectetur adipisicing elit.</li>
                  <li>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit, a voluptatem excepturi
                    et necessitatibus asperiores quas esse impedit.
                  </li>
                  <li>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit, a voluptatem excepturi
                    et necessitatibus asperiores quas esse impedit. Sapiente aliquid consequuntur
                    mollitia laboriosam excepturi.
                  </li>
                </ul>
                <app-custom-button isSecondary>Get offer</app-custom-button>
              </div>
            </ng-content>
            <ng-content image>
              <img
                src="https://images.unsplash.com/photo-1556761175-b413da4baf72?w=800&auto=format&fit=crop"
                alt="Two people working together"
                class="w-full h-full object-cover"
              />
            </ng-content>
          </app-card-banner-sides-template>
          <app-card-banner-sides-template imagePosition="left" isSecondary>
            <ng-content content>
              <div class="min-h-[400px] p-6 md:p-10 flex flex-col justify-between">
                <h2>Lorem ipsum dolor sit</h2>
                <ul class="grid gap-3">
                  <li>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit, a voluptatem excepturi
                    et necessitatibus asperiores quas esse impedit.
                  </li>
                </ul>
                <app-custom-button>Get offer</app-custom-button>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae enim nihil
                  dignissimos saepe deserunt doloribus blanditiis porro voluptatum eaque, dolore
                  amet autem, ipsum dicta ad nobis quisquam <a href="" class="text-primary">excepturi</a> quibusdam repellat!
                </p>
              </div>
            </ng-content>
            <ng-content image>
              <img
                src="https://images.unsplash.com/photo-1531973576160-7125cd663d86?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="Two people working together"
                class="w-full h-full object-cover"
              />
            </ng-content>
          </app-card-banner-sides-template>
        </div>
      </div>
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SellingOptionsSection {}
