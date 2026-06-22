import { inject } from '@angular/core';
import { forkJoin, Subject, takeUntil } from 'rxjs';
import { patchState, signalStore, withHooks, withMethods, withState } from '@ngrx/signals';
import { ApiDataService } from '@shared/services';

type ApiDataState = {

  propertyTypes: string[];
  marketTypes: string[];
  propertyFeatures: string[];
  marketTags: string[];
  isLoading: boolean;
};

const initialState: ApiDataState = {
  propertyTypes: [],
  marketTypes: [],
  propertyFeatures: [],
  marketTags: [],
  isLoading: false,
};

export const ApiDataStore = signalStore(
  { providedIn: 'root' },
  withState<ApiDataState>(initialState),
  withMethods((store, apiDataService = inject(ApiDataService), destroy$ = new Subject<void>()) => ({
    destroySubject: () => destroy$,
    loadApiData(): void {
      patchState(store, { isLoading: true });
      forkJoin({
        propertyTypes: apiDataService.getPropertyTypes(),
        marketTypes: apiDataService.getMarketTypes(),
        propertyFeatures: apiDataService.getPropertyFeatures(),
        marketTags: apiDataService.getMarketTags(),
      })
        .pipe(takeUntil(destroy$))
        .subscribe({
          next: (responses) => {
            patchState(store, {
              propertyTypes: responses.propertyTypes.data || [],
              marketTypes: responses.marketTypes.data || [],
              propertyFeatures: responses.propertyFeatures.data || [],
              marketTags: responses.marketTags.data || [],
              isLoading: false,
            });
            console.log('Current API Data State:', {
              propertyTypes: store.propertyTypes(),
              marketTypes: store.marketTypes(),
              propertyFeatures: store.propertyFeatures(),
              marketTags: store.marketTags(),
              isLoading: store.isLoading(),
            });
          },
          error: (error) => {
            console.error('Error loading API enum data:', error);
            patchState(store, { isLoading: false });
          },
        });
    },
  })),
  withHooks({
    onInit(store) {
      store.loadApiData();
    },
    onDestroy(store) {
      store.destroySubject().next();
      store.destroySubject().complete();
    },
  }),
);
