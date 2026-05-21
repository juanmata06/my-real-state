import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CustomHeader } from "@shared/components";
import { RouterOutlet } from "@angular/router";

@Component({
  selector: 'app-public-area',
  imports: [CustomHeader, RouterOutlet],
  templateUrl: './public-area.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class PublicArea { }
