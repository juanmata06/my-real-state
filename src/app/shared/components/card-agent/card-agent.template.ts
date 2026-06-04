import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { CardComponent } from '../card/card.component';
import { CustomButton } from '../custom-button/custom-button';
import { AgentInfo, Property } from '@shared/models';

@Component({
  selector: 'app-card-agent-template',
  imports: [CardComponent, CustomButton],
  template: `
    <app-card>
      <div class="p-6">
        @if (houseInfo()) {
          <!-- Status Badges -->
          <div class="flex items-center gap-2 text-sm text-gray-600 mb-2">
            @if (houseInfo()?.marketType) {
              <span>{{ houseInfo().marketType }}</span>
            }
            <!-- @if (houseInfo()!.isFeatured) {
              <span>·</span>
              <span>Featured</span>
            }
            @if (houseInfo()!.isReady) {
              <span>·</span>
              <span>Ready</span>
            } -->
          </div>

          <!-- Price -->
          <div class="text-2xl font-bold text-gray-900 mb-6">
            {{ houseInfo().price.currency }} {{ houseInfo().price.amount }}
          </div>
        }

        <!-- Agent Info -->
        <div class="flex items-center gap-3 mb-4">
          <img
            [src]="agentInfo().photoUrl"
            [alt]="agentInfo().name"
            class="w-12 h-12 rounded-full object-cover"
          />
          <div>
            <div class="font-semibold text-gray-900">{{ agentInfo().name }}</div>
            <div class="text-sm text-gray-500">{{ agentInfo().title }}</div>
          </div>
        </div>

        <!-- Contact Buttons -->
        <div class="flex gap-3 mb-4">
          <app-custom-button isPrimary class="block flex-1">
            Email
          </app-custom-button>
          <app-custom-button isSecondary class="block flex-1">
            Whatsapp
          </app-custom-button>
        </div>

        <!-- Presented By -->
        <div class="flex items-center gap-3 pt-4 border-t border-gray-200">
          <img
            [src]="'...'"
            [alt]="'My Real Estate'"
            class="w-12 h-12 rounded-full object-cover"
          />
          <a href="#" class="text-sm text-black hover:underline">
            Presented by <strong>My Real Estate</strong>
          </a>
        </div>
      </div>
    </app-card>
  `,
  styles: `

    :host ::ng-deep app-custom-button button {
      width: 100%;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardAgentTemplate {
  agentInfo = input.required<AgentInfo>();
  houseInfo = input<Property>();
}
