import { HttpContext, HttpContextToken } from '@angular/common/http';

export const SKIP_AUTH = new HttpContextToken<boolean>(() => false);
export const TOKEN_TYPE = new HttpContextToken<'access' | 'refresh'>(() => 'access');

export const SKIP_AUTH_CONTEXT = {
  context: new HttpContext().set(SKIP_AUTH, true),
};