import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { CardAgentTemplate } from '@shared/components';
import { AgentInfo, HouseInfo } from '@shared/models';

@Component({
  selector: 'app-house-detail-page',
  imports: [CardAgentTemplate],
  template: `
    <div class="min-h-screen bg-white">
      <!-- Breadcrumb -->
      <nav class="px-4 py-3 text-sm text-gray-500 max-w-7xl mx-auto">
        <span class="hover:text-primary cursor-pointer">Dubai</span>
        <span class="mx-1">›</span>
        <span class="hover:text-primary cursor-pointer">Jumeirah Islands</span>
        <span class="mx-1">›</span>
        <span>Cluster 29</span>
      </nav>

      <div class="max-w-7xl mx-auto px-4 pb-16">
        <div class="flex flex-col lg:flex-row gap-8">
          <!-- Main Content -->
          <div class="flex-1">
            <!-- ==================== SECTION 1: Main Image, Title & Info ==================== -->
            <section class="mb-8">
              <!-- Main Hero Image -->
              <div class="relative rounded-lg overflow-hidden mb-4">
                <img
                  src="https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&q=80"
                  alt="Jumeirah Islands Villa"
                  class="w-full h-[400px] object-cover"
                />
                <!-- Image Overlay Buttons -->
                <div class="absolute bottom-4 left-4 flex gap-2">
                  <button class="bg-white px-4 py-2 rounded-full text-sm font-medium shadow-md hover:bg-gray-50 flex items-center gap-2">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    Show all photos
                  </button>
                  <button class="bg-white px-4 py-2 rounded-full text-sm font-medium shadow-md hover:bg-gray-50 flex items-center gap-2">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Video
                  </button>
                </div>
                <!-- Views & Followers -->
                <div class="absolute top-4 right-4 flex items-center gap-4 text-sm">
                  <span class="bg-white/90 px-3 py-1 rounded-full">564 Views</span>
                  <span class="bg-white/90 px-3 py-1 rounded-full">0 Followers</span>
                  <button class="bg-white/90 px-3 py-1 rounded-full hover:bg-white">Follow</button>
                </div>
              </div>

              <!-- Title & Property Info -->
              <div>
                <h1 class="text-2xl font-bold text-gray-900 mb-2">Jumeirah Islands Villa for Sale</h1>
                <div class="flex flex-wrap items-center gap-2 text-sm text-gray-600 mb-4">
                  <a href="#" class="text-primary underline">Villa</a>
                  <span>·</span>
                  <span>4 beds</span>
                  <span>·</span>
                  <span>6 baths</span>
                  <span>·</span>
                  <span>5,500 sq. ft.</span>
                  <span>·</span>
                  <span>12,693 sq. ft. plot</span>
                </div>
                <p class="text-gray-700 leading-relaxed">
                  Engel and Voelkers is pleased to present this stunning 4-bedroom villa in Jumeirah
                  Islands. Boasting one of the largest plots on the lake, this villa offers a generous built-up
                  area of 5,500 sq. ft. on a 12,693 sq. ft. plot, complemented by breathtaking full lake
                  and...
                </p>
              </div>
            </section>

            <!-- ==================== SECTION 2: Photo Collage & Detailed Info ==================== -->
            <section class="mb-8">
              <!-- Photo Collage Grid -->
              <div class="grid grid-cols-2 gap-2 mb-6 rounded-lg overflow-hidden">
                <!-- Left Column - 2 stacked images -->
                <div class="flex flex-col gap-2">
                  <img
                    src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600&q=80"
                    alt="Villa exterior view"
                    class="w-full h-[200px] object-cover"
                  />
                  <img
                    src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=600&q=80"
                    alt="Villa pool area"
                    class="w-full h-[200px] object-cover"
                  />
                </div>
                <!-- Right Column - 2 stacked images -->
                <div class="flex flex-col gap-2">
                  <img
                    src="https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=600&q=80"
                    alt="Villa interior living room"
                    class="w-full h-[200px] object-cover"
                  />
                  <img
                    src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&q=80"
                    alt="Villa interior design"
                    class="w-full h-[200px] object-cover"
                  />
                </div>
              </div>

              <!-- Action Buttons -->
              <div class="flex gap-3 mb-8">
                <button class="px-5 py-2.5 border border-gray-300 rounded-full text-sm font-medium hover:bg-gray-50">
                  Show all photos
                </button>
                <button class="px-5 py-2.5 border border-gray-300 rounded-full text-sm font-medium hover:bg-gray-50">
                  Request floor plan
                </button>
              </div>

              <!-- Features Section -->
              <div class="mb-8">
                <h2 class="text-lg font-bold text-gray-900 mb-4">Features</h2>
                <div class="grid grid-cols-2 md:grid-cols-3 gap-y-3 gap-x-8 text-sm text-gray-700">
                  <span>Built-in wardrobes</span>
                  <span>Gym</span>
                  <span>Jacuzzi</span>
                  <span>Lake views</span>
                  <span>Park views</span>
                  <span>Private gym</span>
                  <span>Private jacuzzi</span>
                  <span>Private sauna</span>
                  <span>Sauna</span>
                  <span>Sea views</span>
                  <span>Security</span>
                  <span>Skyline views</span>
                </div>
              </div>

              <!-- Location Section -->
              <div class="border-t border-gray-200 pt-6">
                <h2 class="text-lg font-bold text-gray-900 mb-4">Location</h2>
                <div class="flex items-start justify-between">
                  <div class="flex flex-col gap-1">
                    <a href="#" class="text-primary text-sm hover:underline">Cluster 29</a>
                    <a href="#" class="text-primary text-sm hover:underline">Jumeirah Islands</a>
                    <a href="#" class="text-primary text-sm hover:underline">Dubai</a>
                  </div>
                  <button class="flex flex-col items-center text-gray-500 hover:text-gray-700">
                    <svg class="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                    </svg>
                    <span class="text-sm">View map</span>
                  </button>
                </div>
                <button class="mt-4 px-5 py-2.5 border border-gray-300 rounded-full text-sm font-medium hover:bg-gray-50">
                  Request location information
                </button>
              </div>
            </section>

            <!-- ==================== SECTION 3: Video Tour, PDF Brochure & Ask Question ==================== -->
            <section>
              <!-- Video Tour -->
              <div class="border-t border-gray-200 pt-6 mb-8">
                <h2 class="text-lg font-bold text-gray-900 mb-4">Video tour</h2>
                <div class="relative rounded-lg overflow-hidden bg-gray-900">
                  <img
                    src="https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&q=80"
                    alt="Video thumbnail"
                    class="w-full h-[300px] object-cover opacity-90"
                  />
                  <!-- Play Button Overlay -->
                  <div class="absolute inset-0 flex items-center justify-center">
                    <button class="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center hover:bg-white transition-colors shadow-lg">
                      <svg class="w-8 h-8 text-gray-900 ml-1" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>

              <!-- PDF Brochure -->
              <div class="border-t border-gray-200 pt-6 mb-8">
                <h2 class="text-lg font-bold text-gray-900 mb-2">PDF brochure</h2>
                <p class="text-sm text-gray-600 mb-4">
                  All you need to know about your favourite property, neatly packaged in a handy file.
                </p>
                <div class="flex items-start gap-4">
                  <div class="w-32 h-40 bg-gray-100 rounded border border-gray-200 p-2 flex flex-col">
                    <div class="bg-white rounded p-2 mb-2 flex-1">
                      <div class="text-xs font-bold text-gray-700 mb-1">Your property brochure</div>
                      <div class="h-1 bg-gray-200 w-3/4 mb-1"></div>
                      <div class="h-1 bg-gray-200 w-1/2"></div>
                    </div>
                    <div class="h-12 bg-gray-200 rounded"></div>
                  </div>
                </div>
                <a href="#" class="inline-block mt-4 text-primary text-sm hover:underline">
                  Request brochure
                </a>
              </div>

              <!-- Ask a Question -->
              <div class="border-t border-gray-200 pt-6">
                <h2 class="text-lg font-bold text-gray-900 mb-4">Ask a Question</h2>
                <div class="flex items-center gap-3 mb-4">
                  <img
                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&q=80"
                    alt="Mohammed Fares"
                    class="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <div class="font-semibold text-gray-900">Mohammed Fares</div>
                    <div class="text-sm text-gray-500">Private Office Advisor</div>
                  </div>
                </div>
                <textarea
                  placeholder="Ask the agent for more information about this property..."
                  class="w-full border border-gray-300 rounded-lg p-4 text-sm resize-none h-24 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                ></textarea>
              </div>
            </section>
          </div>

          <!-- ==================== STICKY SIDEBAR - Agent Contact Card ==================== -->
          <aside class="lg:w-80 shrink-0">
            <div class="lg:sticky lg:top-4">
              <app-card-agent-template
                [agentInfo]="agentInfo()"
                [houseInfo]="houseInfo()"
              />
            </div>
          </aside>
        </div>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class HouseDetailPage {
  readonly agentInfo = signal<AgentInfo>({
    name: 'Mohammed Fares',
    title: 'Private Office Advisor',
    photoUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&q=80',
  });

  readonly houseInfo = signal<HouseInfo>({
    price: '28,000,000',
    currency: 'AED',
    status: 'For sale',
    isFeatured: true,
    isReady: true,
  });
}
