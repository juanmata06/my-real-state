import { SupabaseAgent, Agent } from './agent.interfaces';

export interface HouseInfo {
  title?: string;
  price: string;
  currency?: string;
  status?: string;
  isFeatured?: boolean;
  isReady?: boolean;
}

// Enums
export enum PropertyType {
  House = 1,
  Apartment = 2,
  Building = 3,
  Land = 4,
  Commercial = 5,
  Condo = 6,
  Loft = 7,
  Penthouse = 8,
  Villa = 9
}

export enum MarketType {
  Sale = 1,
  Rent = 2,
}

export enum PropertyFeatures {
  BuiltInWardrobes = 1,
  Gym = 2,
  Jacuzzi = 3,
  LakeViews = 4,
  ParkViews = 5,
  PrivateGym = 6,
  PrivateJacuzzi = 7,
  PrivateSauna = 8,
  Sauna = 9,
  SeaViews = 10,
  Security = 11,
  SkylineViews = 12,
}

export enum MarketTags {
  Featured = 1,
  Ready = 2,
  Luxury = 3,
  Waterfront = 4,
  LakeView = 5,
  NewConstruction = 6,
  Renovated = 7,
  Investment = 8,
  Foreclosure = 9,
  ShortSale = 10,
  OpenHouse = 11,
  Exclusive = 12,
  Gated = 13,
  SmartHome = 14,
  EnergyEfficient = 15,
}

// Supabase:
export interface SupabasePrice {
  amount?: number;
  currency?: string;
}

export interface SupabaseLocation {
  community?: string;
  cluster?: string;
  city?: string;
  country?: string;
  zip_code?: string;
}

export interface SupabaseDetails {
  bedrooms?: number;
  bathrooms?: number;
  built_up_area_sqft?: number;
  plot_area_sqft?: number;
  vacant_on_transfer?: boolean;
}

export interface PropertyFromSupabase {
  id?: number;
  title?: string;
  url?: string;
  property_type?: number;
  market_type?: number;
  price?: SupabasePrice;
  location?: SupabaseLocation;
  details?: SupabaseDetails;
  description?: string;
  features?: string[];
  agent?: SupabaseAgent;
  community_description?: string;
  market_tags?: string[];
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
  id: number;
  title: string;
  url: string;
  propertyType: string;
  marketType: string;
  price: Price;
  location: Location;
  details: Details;
  description: string;
  features: string[];
  agent: Agent;
  communityDescription: string;
  listingTags: string[];
}