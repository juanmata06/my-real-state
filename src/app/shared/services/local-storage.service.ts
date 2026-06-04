import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  private readonly USER_TOKEN_KEY = 'user_token';

  saveUserToken(token: string): void {
    console.log('LocalStorageService - saveUserToken');
    localStorage.setItem(this.USER_TOKEN_KEY, token);
  }

  getUserToken(): string | null {
    console.log('LocalStorageService - getUserToken');
    return localStorage.getItem(this.USER_TOKEN_KEY);
  }

  deleteUserToken(): void {
    console.log('LocalStorageService - deleteUserToken');
    localStorage.removeItem(this.USER_TOKEN_KEY);
  }

  clearLocalStorage(): void {
    console.log('LocalStorageService - clearLocalStorage');
    localStorage.clear();
  }
}
