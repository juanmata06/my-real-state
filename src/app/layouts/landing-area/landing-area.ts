import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CustomHeader } from "@shared/components";
import { RouterOutlet } from "@angular/router";

@Component({
  selector: 'app-landing-area',
  imports: [CustomHeader, RouterOutlet],
  templateUrl: './landing-area.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class LandingArea { }
