import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { BadgeButton } from '../badge-button/badge-button';
import {
  faDoorOpen,
  faGraduationCap,
  faHouse,
  faUserGraduate,
} from '@fortawesome/free-solid-svg-icons';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthStore } from '@shared/store';

@Component({
  selector: 'app-nav-bar',
  imports: [RouterLink, RouterLinkActive, BadgeButton],
  template: `
    <nav class="fixed top-0 left-0 h-screen w-[250px] flex flex-col p-4">
      <div class="flex flex-col h-full !p-0">
        <h3 card-header class="font-black tracking-tight select-none px-3 pb-2">
          {{ 'My Learning' }}
        </h3>
        <!-- <app-shared-nav-content card-body isColumn class="hidden sm:block" /> -->
        <!-- TODO: crear un array de un type usado para el listado de nav disponible y almacenado en un store de ui  -->
        <ul class="flex-1 flex flex-col gap-2 list-none m-0 p-0 text-size-body">
          <li>
            <a
              [routerLink]="'/private-area/dashboard'"
              routerLinkActive
              #link="routerLinkActive"
              [routerLinkActiveOptions]="{ exact: true }"
            >
              <app-badge-button
                [icon]="faHouse"
                [isOnFocus]="link.isActive"
                (onClickButton)="(null)"
              >
                Dashboard
              </app-badge-button>
            </a>
          </li>
          <li>
            <a
              [routerLink]="'/students'"
              routerLinkActive
              #link2="routerLinkActive"
              [routerLinkActiveOptions]="{ exact: true }"
            >
              <app-badge-button
                [icon]="faUserGraduate"
                [isOnFocus]="link2.isActive"
                (onClickButton)="(null)"
              >
                Students
              </app-badge-button>
            </a>
          </li>
        </ul>
        <app-badge-button [icon]="faDoorOpen" [isOnFocus]="false" (onClickButton)="logout()">
          Logout
        </app-badge-button>
      </div>
    </nav>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavBar {
  public readonly authStore = inject(AuthStore);

  public readonly faHouse = faHouse;
  public readonly faGraduationCap = faGraduationCap;
  public readonly faDoorOpen = faDoorOpen;
  public readonly faUserGraduate = faUserGraduate;

  logout(): void {
    this.authStore.logOutUser();
  }
}
