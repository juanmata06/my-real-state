import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-properties-list',
  imports: [],
  template: `<p>properties-list works!</p>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class PropertiesList {}
