import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { Router } from '@angular/router';
import { CustomButton } from "@shared/components";
@Component({
  selector: 'app-title-and-searcher',
  imports: [NgOptimizedImage, CustomButton],
  template: `
    <section class="relative h-[408px] w-full overflow-hidden">
      <img
        ngSrc="https://www.zillowstatic.com/bedrock/app/uploads/sites/5/2024/07/image2-xl%401x.jpg"
        alt="Modern house exterior"
        fill
        priority
        class="absolute inset-0 h-full w-full object-cover"
      />
      <!-- <div class="absolute inset-0 bg-black/40"></div> -->

      <div class="relative z-10 flex max-w-7xl m-auto p-4 items-center h-full gap-6">
        <div class="flex-col w-full md:w-1/2">
          <h1 class="font-bold text-white">My Real State</h1>
          <h2 class="font-bold text-white">Your dream home is just a click away.</h2>
          <app-custom-button isSecondary (isButtonClicked)="onButtonClicked()">Find details</app-custom-button>
        </div>
      </div>
    </section>
  `,
  styleUrls: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TitleAndSearcherSection {
  private _router = inject(Router);

  onButtonClicked(): void {
    this._router.navigate(['/search']);
  }
}
