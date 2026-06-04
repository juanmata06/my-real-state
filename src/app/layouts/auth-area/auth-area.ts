import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AuthStore } from '@shared/store';


@Component({
  selector: 'app-auth-area',
  imports: [RouterOutlet],
  host: { class: 'flex flex-col h-screen' },
  template: `
    <div class="flex-1">
      @if (authStore.isAuthLoading()) {
        Loading...
      } @else {
        <router-outlet />
      }
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class AuthArea {
  protected readonly authStore = inject(AuthStore);
}
