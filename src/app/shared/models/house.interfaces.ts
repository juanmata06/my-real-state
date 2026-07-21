import { Agent } from './agent.interfaces';

export interface HouseInfo {
  title?: string;
  price: string;
  currency?: string;
  status?: string;
  isFeatured?: boolean;
  isReady?: boolean;
}

// Supabase (flat schema — matches the properties table):
export interface PropertyFromSupabase {
  id?: string;
  title?: string;
  url?: string;
  property_type?: string;
  market_type?: string;
  realtor_id?: string;
  created_by?: string;
  description?: string;
  community_description?: string;
  price_amount?: number;
  price_currency?: string;
  location_community?: string;
  location_cluster?: string;
  location_city?: string;
  location_country?: string;
  location_zip_code?: string;
  details_bedrooms?: number;
  details_bathrooms?: number;
  details_built_up_area_sqft?: number;
  details_plot_area_sqft?: number;
  details_vacant_on_transfer?: boolean;
  features?: string[];
  market_tags?: string[];
  created_at?: string;
  updated_at?: string;
}

// .TS:
export interface Price {
  amount: number;
  currency: string;
}

export interface Location {
  community: string;
  cluster: string;
  city: string;
  country: string;
  zipCode: string;
}

export interface Details {
  bedrooms: number;
  bathrooms: number;
  builtUpAreaSqft: number;
  plotAreaSqft: number;
  vacantOnTransfer: boolean;
}

export interface Property {
  id: string;
  title: string;
  url: string;
  propertyType: string;
  marketType: string;
  price: Price;
  location: Location;
  details: Details;
  description: string;
  features: string[];
  agent?: Agent;
  communityDescription: string;
  listingTags: string[];
}