import { DynamicDialogConfig } from 'primeng/dynamicdialog';

export interface ModalOptions<TData = unknown> {
  data?: TData;
  config?: Partial<DynamicDialogConfig<TData>>;
}

export const DEFAULT_MODAL_CONFIG: DynamicDialogConfig = {
  modal: true,
  maximizable: true,
  closable: true,
  dismissableMask: true,
  style: { width: '50rem', backgroundColor: 'white', color: 'black' },
  // contentStyle: { backgroundColor: 'white' },
  breakpoints: { '1199px': '75vw', '575px': '90vw' },
};
