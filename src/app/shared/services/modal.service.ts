import { inject, Injectable, Type } from '@angular/core';
import { DynamicDialogConfig, DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { EMPTY, Observable } from 'rxjs';
import { DEFAULT_MODAL_CONFIG, ModalOptions } from '../models';
import { HouseImagesGalleryModal } from '@shared/components';

const MODAL_CONFIGS = new Map<Type<unknown>, Partial<DynamicDialogConfig>>([
  [
    HouseImagesGalleryModal,
    {
      style: { width: '100vw', height: '100vh', maxHeight: '100%', backgroundColor: 'white', color: 'black' },
      maximizable: false,
      breakpoints: undefined,
      resizable: false,
    },
  ],
]);

@Injectable({ providedIn: 'root' })
export class ModalService {
  private readonly dialogService = inject(DialogService);
  private ref: DynamicDialogRef | null = null;

  open<TComponent, TData = unknown, TResult = unknown>(
    component: Type<TComponent>,
    { data, config }: ModalOptions<TData> = {},
  ): Observable<TResult> {
    const componentConfig = MODAL_CONFIGS.get(component as Type<unknown>) ?? {};

    this.ref = this.dialogService.open(component, {
      ...DEFAULT_MODAL_CONFIG,
      ...componentConfig,
      ...config,
      data,
    });

    return (this.ref?.onClose ?? EMPTY) as Observable<TResult>;
  }

  close(result?: unknown): void {
    this.ref?.close(result);
  }
}
