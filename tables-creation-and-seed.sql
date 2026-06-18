-- =====================================================================================================================
-- ROLES ENUM
DROP TYPE IF EXISTS public.user_roles CASCADE;
CREATE TYPE public.user_roles AS ENUM (
  'admin',
  'realtor',
  'seller',
  'customer'
);
-- =====================================================================================================================

-- =====================================================================================================================
-- PERMISSIONS ENUM
DROP TYPE IF EXISTS public.role_permissions CASCADE;
CREATE TYPE public.role_permissions AS ENUM (
  'property.create',
  'property.update',
  'property.delete',
  'user.manage'
);
-- =====================================================================================================================

-- =====================================================================================================================
-- ROLE TO PERMISSIONS RELATION
DROP TABLE IF EXISTS public.role_to_permissions CASCADE;
CREATE TABLE public.role_to_permissions (
  role public.user_roles NOT NULL,
  permission public.role_permissions NOT NULL,
  PRIMARY KEY (role, permission)
);

-- ROLE TO PERMISSIONS SEED:
INSERT INTO public.role_to_permissions (role, permission)
VALUES
  ('admin'::public.user_roles, 'property.create'::public.role_permissions),
  ('admin'::public.user_roles, 'property.update'::public.role_permissions),
  ('admin'::public.user_roles, 'property.delete'::public.role_permissions),
  ('admin'::public.user_roles, 'user.manage'::public.role_permissions),
  ('realtor'::public.user_roles, 'property.create'::public.role_permissions),
  ('realtor'::public.user_roles, 'property.update'::public.role_permissions),
  ('realtor'::public.user_roles, 'property.delete'::public.role_permissions)
ON CONFLICT DO NOTHING;
-- =====================================================================================================================

-- =====================================================================================================================
-- USERS AND ROLES RELATIONS
DROP TABLE IF EXISTS public.user_to_roles CASCADE;
CREATE TABLE public.user_to_roles (
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  role public.user_roles,
  PRIMARY KEY (user_id, role)
);

-- USERS AND ROLES SEED:
INSERT INTO public.user_to_roles (user_id, role)
VALUES (
  '', -- ADMIN USER ID HERE
  'admin'::public.user_roles
)
ON CONFLICT DO NOTHING;
-- =====================================================================================================================

-- =====================================================================================================================
-- PROPERTY TYPES ENUM
DROP TYPE IF EXISTS public.property_types CASCADE;
CREATE TYPE public.property_types AS ENUM (
  'House',
  'Apartment',
  'Building',
  'Land',
  'Commercial',
  'Condo',
  'Loft',
  'Penthouse',
  'Villa'
);
-- =====================================================================================================================

-- =====================================================================================================================
-- MARKET TYPES ENUM
DROP TYPE IF EXISTS public.market_types CASCADE;
CREATE TYPE public.market_types AS ENUM (
  'Sale',
  'Rent'
);
-- =====================================================================================================================

-- =====================================================================================================================
-- PROPERTY FEATURES ENUM
DROP TYPE IF EXISTS public.property_features CASCADE;
CREATE TYPE public.property_features AS ENUM (
  'BuiltInWardrobes',
  'Gym',
  'Jacuzzi',
  'LakeViews',
  'ParkViews',
  'PrivateGym',
  'PrivateJacuzzi',
  'PrivateSauna',
  'Sauna',
  'SeaViews',
  'Security',
  'SkylineViews'
);
-- =====================================================================================================================

-- =====================================================================================================================
-- MARKET TAGS ENUM
DROP TYPE IF EXISTS public.market_tags CASCADE;
CREATE TYPE public.market_tags AS ENUM (
  'Featured',
  'Ready',
  'Luxury',
  'Waterfront',
  'LakeView',
  'NewConstruction',
  'Renovated',
  'Investment',
  'Foreclosure',
  'ShortSale',
  'OpenHouse',
  'Exclusive',
  'Gated',
  'SmartHome',
  'EnergyEfficient'
);
-- =====================================================================================================================

-- =====================================================================================================================
-- PROPERTIES
DROP TABLE IF EXISTS public.properties CASCADE;
CREATE TABLE public.properties (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  url text,
  property_type public.property_types,
  market_type public.market_types,
  realtor_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  created_by uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  description text,
  community_description text,
  price_amount NUMERIC,
  price_currency text,
  location_community text,
  location_cluster text,
  location_city text,
  location_country text,
  location_zip_code text,
  details_bedrooms INTEGER,
  details_bathrooms INTEGER,
  details_built_up_area_sqft NUMERIC,
  details_plot_area_sqft NUMERIC,
  details_vacant_on_transfer BOOLEAN,
  features public.property_features[],
  market_tags public.market_tags[],
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- PROPERTIES SEED:
INSERT INTO public.properties (
  title,
  url,
  property_type,
  market_type,
  realtor_id,
  created_by,
  description,
  community_description,
  price_amount,
  price_currency,
  location_community,
  location_cluster,
  location_city,
  location_country,
  location_zip_code,
  details_bedrooms,
  details_bathrooms,
  details_built_up_area_sqft,
  details_plot_area_sqft,
  details_vacant_on_transfer,
  features,
  market_tags
) VALUES (
  'Beautiful Modern House',
  'https://example.com/property-1',
  'House'::public.property_types,
  'Sale'::public.market_types,
  '', -- ADMIN USER ID HERE
  '', -- ADMIN USER ID HERE
  'A stunning modern house with all amenities',
  'Located in a quiet and safe neighborhood',
  450000,
  'USD',
  'Downtown',
  'Financial District',
  'New York',
  'USA',
  '10001',
  4,
  3,
  3500,
  5000,
  FALSE,
  ARRAY['Security'::public.property_features, 'Gym'::public.property_features],
  ARRAY['Featured'::public.market_tags, 'Luxury'::public.market_tags, 'NewConstruction'::public.market_tags]
);
-- =====================================================================================================================

-- =====================================================================================================================
-- USER PROFILES
DROP TABLE IF EXISTS public.user_profiles CASCADE;
CREATE TABLE public.user_profiles (
  user_id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  first_name text,
  last_name text,
  city text,
  state text,
  country text,
  zip_code text,
  birth_date DATE,
  profile_image_url text,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- USER PROFILES SEED:
INSERT INTO public.user_profiles (
  user_id,
  first_name,
  last_name,
  city,
  state,
  country,
  zip_code,
  birth_date,
  profile_image_url
) VALUES (
  '', -- USER ID HERE
  'Juan',
  'Mata',
  'Pampatar',
  'Nueva Esparta',
  'Venezuela',
  '00000',
  '2001-01-06',
  NULL
)
ON CONFLICT DO NOTHING;
-- =====================================================================================================================

-- =====================================================================================================================
-- EMPLOYEE PROFILES
DROP TABLE IF EXISTS public.employee_profiles CASCADE;
CREATE TABLE public.employee_profiles (
  user_id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  agency text,
  hire_date DATE,
  manager_id uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  linkedin_url text,
  driving_license BOOLEAN DEFAULT FALSE,
  own_car BOOLEAN DEFAULT FALSE,
  company_car BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- EMPLOYEE PROFILES SEED:
INSERT INTO public.employee_profiles (
  user_id,
  agency,
  hire_date,
  manager_id,
  linkedin_url,
  driving_license,
  own_car,
  company_car
) VALUES (
  '', -- USER ID HERE
  'My Real Estate Agency',
  '2024-01-15',
  '', -- USER ID HERE
  NULL,
  TRUE,
  TRUE,
  FALSE
)
ON CONFLICT DO NOTHING;
-- =====================================================================================================================

