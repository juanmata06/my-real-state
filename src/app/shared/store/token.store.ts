import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';

type TokenState = {
  value: string | undefined;
};

const initialState: TokenState = {
  value: undefined,
};

export const TokenStore = signalStore(
  { providedIn: 'root' },
  withState<TokenState>(initialState),
  withMethods((store) => ({
    setToken(token: string) {
      patchState(store, { value: token });
    },
  })),
);
