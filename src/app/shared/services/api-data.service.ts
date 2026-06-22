import { inject, Injectable } from '@angular/core';
import { from, Observable } from 'rxjs';
import { SupabaseService } from './supabase.service';

@Injectable({
  providedIn: 'root',
})
export class ApiDataService {
  private readonly supabase = inject(SupabaseService).supabase;

  public getRolePermissionsByRole(requestedRole: string): Observable<any> {
    return from(
      this.supabase.rpc('get_role_permissions_by_role', {
        requested_role: requestedRole,
      }),
    );
  }

  public getPropertyTypes(): Observable<any> {
    return from(this.supabase.rpc('get_property_types'));
  }

  public getMarketTypes(): Observable<any> {
    return from(this.supabase.rpc('get_market_types'));
  }

  public getPropertyFeatures(): Observable<any> {
    return from(this.supabase.rpc('get_property_features'));
  }

  public getMarketTags(): Observable<any> {
    return from(this.supabase.rpc('get_market_tags'));
  }
}
