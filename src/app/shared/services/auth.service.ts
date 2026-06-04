import { inject, Injectable } from '@angular/core';
import { from, map, Observable } from 'rxjs';
import { AuthResponse, User } from '@supabase/supabase-js';
import { SupabaseService } from './supabase.service';
import { UserLogin, UserRegister } from '@shared/models';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly supabase = inject(SupabaseService).supabase;

  public registerUser(userRegister: UserRegister): Observable<AuthResponse> {
    return from(
      this.supabase.auth.signUp({
        email: userRegister.email,
        password: userRegister.password,
        options: {
          data: {
            full_name: userRegister.fullName,
          },
        },
      }),
    );
  }

  public loginUser(userLogin: UserLogin): Observable<AuthResponse> {
    return from(
      this.supabase.auth.signInWithPassword({
        email: userLogin.email,
        password: userLogin.password,
      }),
    );
  }

  public getUser(token?: string): Observable<User | null> {
    return from(this.supabase.auth.getUser(token)).pipe(
      map(({ data, error }) => (error ? null : data.user)),
    );
  }

  public signOut(): Observable<void> {
    return from(this.supabase.auth.signOut()).pipe(
      map(({ error }) => {
        if (error) throw error;
      }),
    );
  }
}
