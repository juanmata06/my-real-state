import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'app-title-and-searcher',
  imports: [NgOptimizedImage],
  templateUrl: './title-and-searcher.section.html',
  styleUrls: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TitleAndSearcherSection {}
