import { Property, PropertyFromSupabase } from '../models/house.interfaces';

export class PropertyMapper {
  /**
   * Converts a PropertyFromSupabase (flat Supabase row) to a Property object
   */
  from(raw: PropertyFromSupabase): Property {
    return {
      id: raw.id ?? '',
      title: raw.title ?? '',
      url: raw.url ?? '',
      propertyType: raw.property_type ?? '',
      marketType: raw.market_type ?? '',
      description: raw.description ?? '',
      communityDescription: raw.community_description ?? '',
      features: raw.features ?? [],
      listingTags: raw.market_tags ?? [],
      price: {
        amount: raw.price_amount ?? 0,
        currency: raw.price_currency ?? '',
      },
      location: {
        community: raw.location_community ?? '',
        cluster: raw.location_cluster ?? '',
        city: raw.location_city ?? '',
        country: raw.location_country ?? '',
        zipCode: raw.location_zip_code ?? '',
      },
      details: {
        bedrooms: raw.details_bedrooms ?? 0,
        bathrooms: raw.details_bathrooms ?? 0,
        builtUpAreaSqft: raw.details_built_up_area_sqft ?? 0,
        plotAreaSqft: raw.details_plot_area_sqft ?? 0,
        vacantOnTransfer: raw.details_vacant_on_transfer ?? false,
      },
    };
  }

  /**
   * Converts a Property object to a flat Supabase-compatible insert/update payload
   */
  to(property: Property): Omit<PropertyFromSupabase, 'id' | 'realtor_id' | 'created_by' | 'created_at' | 'updated_at'> {
    return {
      title: property.title,
      url: property.url,
      property_type: property.propertyType,
      market_type: property.marketType,
      description: property.description,
      community_description: property.communityDescription,
      features: property.features,
      market_tags: property.listingTags,
      price_amount: property.price.amount,
      price_currency: property.price.currency,
      location_community: property.location.community,
      location_cluster: property.location.cluster,
      location_city: property.location.city,
      location_country: property.location.country,
      location_zip_code: property.location.zipCode,
      details_bedrooms: property.details.bedrooms,
      details_bathrooms: property.details.bathrooms,
      details_built_up_area_sqft: property.details.builtUpAreaSqft,
      details_plot_area_sqft: property.details.plotAreaSqft,
      details_vacant_on_transfer: property.details.vacantOnTransfer,
    };
  }
}
