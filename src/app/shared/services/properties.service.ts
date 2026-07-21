import { inject, Injectable } from '@angular/core';
import { from, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Property, PropertyFromSupabase } from '../models/house.interfaces';
import { PropertyMapper } from '../mappers';
import { SupabaseService } from './supabase.service';

@Injectable({
  providedIn: 'root',
})
export class PropertiesService {
  private readonly supabase = inject(SupabaseService).supabase;
  private readonly mapper = new PropertyMapper();

  public getProperties(): Observable<Property[]> {
    return from(this.supabase.from('properties').select('*')).pipe(
      map(({ data }) => (data as PropertyFromSupabase[]).map((row) => this.mapper.from(row))),
    );
  }

  public getPropertiesByType(
    propertyTypes: NonNullable<PropertyFromSupabase['property_type']>[],
  ): Observable<Property[]> {
    return from(this.supabase.from('properties').select('*').in('property_type', propertyTypes)).pipe(
      map(({ data }) => (data as PropertyFromSupabase[]).map((row) => this.mapper.from(row))),
    );
  }

  public getPropertyById(id: string): Observable<Property> {
    return from(this.supabase.from('properties').select('*').eq('id', id).single()).pipe(
      map(({ data }) => this.mapper.from(data as PropertyFromSupabase)),
    );
  }

  public createProperty(property: Record<string, any>): Observable<any> {
    return from(this.supabase.from('properties').insert(property).select().single());
  }

  public updateProperty(id: string, changes: Record<string, any>): Observable<any> {
    return from(
      this.supabase.from('properties').update(changes).eq('id', id).select().single(),
    );
  }

  public deleteProperty(id: string): Observable<any> {
    return from(this.supabase.from('properties').delete().eq('id', id));
  }
}
