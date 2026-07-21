import { inject } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { patchState, signalStore, withHooks, withMethods, withState } from '@ngrx/signals';
import { Property } from '@shared/models';
import { PropertiesService } from '@shared/services';

type PropertiesState = {
  properties: Property[];
  favoriteProperties: Property[];
  isLoading: boolean;
};

const initialState: PropertiesState = {
  properties: [],
  favoriteProperties: [],
  isLoading: false,
};

export const PropertiesStore = signalStore(
  { providedIn: 'root' },
  withState<PropertiesState>(initialState),
  withMethods(
    (
      store,
      propertiesService = inject(PropertiesService),
      destroy$ = new Subject<void>(),
    ) => ({
      destroySubject: () => destroy$,

      get(): void {
        patchState(store, { isLoading: true });
        propertiesService
          .getProperties()
          .pipe(takeUntil(destroy$))
          .subscribe({
            next: (properties) => {
              patchState(store, { properties, isLoading: false });
            },
            error: (err) => {
              console.error('Error fetching properties:', err);
              patchState(store, { isLoading: false });
            },
          });
      },

      getById(id: string): void {
        patchState(store, { isLoading: true });
        propertiesService
          .getPropertyById(id)
          .pipe(takeUntil(destroy$))
          .subscribe({
            next: (property) => {
              patchState(store, (state) => ({
                properties: state.properties.some((p) => p.id === property.id)
                  ? state.properties.map((p) => (p.id === property.id ? property : p))
                  : [...state.properties, property],
                isLoading: false,
              }));
            },
            error: (err) => {
              console.error('Error fetching property:', err);
              patchState(store, { isLoading: false });
            },
          });
      },

      create(property: Record<string, any>): void {
        patchState(store, { isLoading: true });
        propertiesService
          .createProperty(property)
          .pipe(takeUntil(destroy$))
          .subscribe({
            next: ({ data, error }) => {
              if (error) {
                console.error('Error creating property:', error);
                patchState(store, { isLoading: false });
                return;
              }
              if (data) {
                patchState(store, (state) => ({
                  properties: [...state.properties, data],
                  isLoading: false,
                }));
              }
            },
            error: (err) => {
              console.error('Error creating property:', err);
              patchState(store, { isLoading: false });
            },
          });
      },

      update(id: string, changes: Record<string, any>): void {
        patchState(store, { isLoading: true });
        propertiesService
          .updateProperty(id, changes)
          .pipe(takeUntil(destroy$))
          .subscribe({
            next: ({ data, error }) => {
              if (error) {
                console.error('Error updating property:', error);
                patchState(store, { isLoading: false });
                return;
              }
              if (data) {
                patchState(store, (state) => ({
                  properties: state.properties.map((p) => (p.id === id ? data : p)),
                  isLoading: false,
                }));
              }
            },
            error: (err) => {
              console.error('Error updating property:', err);
              patchState(store, { isLoading: false });
            },
          });
      },

      delete(id: string): void {
        patchState(store, { isLoading: true });
        propertiesService
          .deleteProperty(id)
          .pipe(takeUntil(destroy$))
          .subscribe({
            next: ({ error }) => {
              if (error) {
                console.error('Error deleting property:', error);
                patchState(store, { isLoading: false });
                return;
              }
              patchState(store, (state) => ({
                properties: state.properties.filter((p) => p.id !== id),
                isLoading: false,
              }));
            },
            error: (err) => {
              console.error('Error deleting property:', err);
              patchState(store, { isLoading: false });
            },
          });
      },
    }),
  ),
  withHooks({
    onDestroy(store) {
      store.destroySubject().next();
      store.destroySubject().complete();
    },
  }),
);
