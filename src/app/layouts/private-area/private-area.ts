import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavBar } from '@shared/components';

@Component({
  selector: 'app-private-area',
  imports: [RouterOutlet, NavBar],
  template: `
    <div class="flex flex-1 bg-gray-light">
      <app-nav-bar />
      <div class="p-4 ml-[250px] flex-1 h-screen">
        <router-outlet />
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class PrivateArea {}
