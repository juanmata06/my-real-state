import { inject } from '@angular/core';
import { forkJoin, Subject, takeUntil } from 'rxjs';
import { patchState, signalStore, withHooks, withMethods, withState } from '@ngrx/signals';
import { ApiDataService } from '@shared/services';

export type CountyOption = {
  label: string;
  value: string;
};

export type CountyGroup = {
  label: string;
  items: CountyOption[];
};

const cataloniaCountyGroups: CountyGroup[] = [
  {
    label: 'Barcelona',
    items: [
      { label: 'Alt Penedes', value: 'alt-penedes' },
      { label: 'Anoia', value: 'anoia' },
      { label: 'Bages', value: 'bages' },
      { label: 'Baix Llobregat', value: 'baix-llobregat' },
      { label: 'Barcelones', value: 'barcelones' },
      { label: 'Bergueda', value: 'bergueda' },
      { label: 'Garraf', value: 'garraf' },
      { label: 'Maresme', value: 'maresme' },
      { label: 'Moianes', value: 'moianes' },
      { label: 'Osona', value: 'osona' },
      { label: 'Valles Occidental', value: 'valles-occidental' },
      { label: 'Valles Oriental', value: 'valles-oriental' },
    ],
  },
  {
    label: 'Girona',
    items: [
      { label: 'Alt Emporda', value: 'alt-emporda' },
      { label: 'Baix Emporda', value: 'baix-emporda' },
      { label: 'Cerdanya', value: 'cerdanya' },
      { label: 'Garrotxa', value: 'garrotxa' },
      { label: 'Girones', value: 'girones' },
      { label: 'Pla de l\'Estany', value: 'pla-de-l-estany' },
      { label: 'Ripolles', value: 'ripolles' },
      { label: 'Selva', value: 'selva' },
    ],
  },
  {
    label: 'Lleida',
    items: [
      { label: 'Alt Urgell', value: 'alt-urgell' },
      { label: 'Alta Ribagorca', value: 'alta-ribagorca' },
      { label: 'Garrigues', value: 'garrigues' },
      { label: 'Noguera', value: 'noguera' },
      { label: 'Pallars Jussa', value: 'pallars-jussa' },
      { label: 'Pallars Sobira', value: 'pallars-sobira' },
      { label: 'Pla d\'Urgell', value: 'pla-d-urgell' },
      { label: 'Segarra', value: 'segarra' },
      { label: 'Segria', value: 'segria' },
      { label: 'Solsones', value: 'solsones' },
      { label: 'Urgell', value: 'urgell' },
      { label: 'Val d\'Aran', value: 'val-d-aran' },
    ],
  },
  {
    label: 'Tarragona',
    items: [
      { label: 'Alt Camp', value: 'alt-camp' },
      { label: 'Baix Camp', value: 'baix-camp' },
      { label: 'Baix Ebre', value: 'baix-ebre' },
      { label: 'Baix Penedes', value: 'baix-penedes' },
      { label: 'Conca de Barbera', value: 'conca-de-barbera' },
      { label: 'Montsia', value: 'montsia' },
      { label: 'Priorat', value: 'priorat' },
      { label: 'Ribera d\'Ebre', value: 'ribera-d-ebre' },
      { label: 'Tarragones', value: 'tarragones' },
      { label: 'Terra Alta', value: 'terra-alta' },
    ],
  },
];

type ApiDataState = {
  propertyTypes: string[];
  marketTypes: string[];
  propertyFeatures: string[];
  marketTags: string[];
  cataloniaCountyGroups: CountyGroup[];
  isLoading: boolean;
};

const initialState: ApiDataState = {
  propertyTypes: [],
  marketTypes: [],
  propertyFeatures: [],
  marketTags: [],
  cataloniaCountyGroups,
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
