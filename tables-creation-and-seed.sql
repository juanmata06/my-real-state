-- =====================================================================================================================
-- ROLES ENUM
DROP TYPE IF EXISTS public.user_roles CASCADE;
CREATE TYPE public.user_roles AS ENUM (
  'admin',
  'realtor',
  'seller'
);
-- =====================================================================================================================

-- =====================================================================================================================
-- PERMISSIONS ENUM
DROP TYPE IF EXISTS public.role_permissions CASCADE;
CREATE TYPE public.role_permissions AS ENUM (
  'create_house',
  'update_house',
  'delete_house',
  'manage_users'
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
  ('admin'::public.user_roles, 'create_house'::public.role_permissions),
  ('admin'::public.user_roles, 'update_house'::public.role_permissions),
  ('admin'::public.user_roles, 'delete_house'::public.role_permissions),
  ('admin'::public.user_roles, 'manage_users'::public.role_permissions),
  ('realtor'::public.user_roles, 'create_house'::public.role_permissions),
  ('realtor'::public.user_roles, 'update_house'::public.role_permissions),
  ('realtor'::public.user_roles, 'delete_house'::public.role_permissions)
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
-- PROPERTY TYPE ENUM
DROP TYPE IF EXISTS public.property_type CASCADE;
CREATE TYPE public.property_type AS ENUM (
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
-- MARKET TYPE ENUM
DROP TYPE IF EXISTS public.market_type CASCADE;
CREATE TYPE public.market_type AS ENUM (
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
-- PROPERTY
DROP TABLE IF EXISTS public.property CASCADE;
CREATE TABLE public.property (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  url text,
  property_type public.property_type,
  market_type public.market_type,
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

-- PROPERTY SEED:
INSERT INTO public.property (
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
  'House'::public.property_type,
  'Sale'::public.market_type,
  'b853a96d-2131-4a3b-bd49-5c32e354b998',
  'b853a96d-2131-4a3b-bd49-5c32e354b998',
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
-- ACCESS TOKEN CLAIMS ENRICHMENT
-- =====================================================================================================================

-- Create the auth hook function
CREATE OR REPLACE FUNCTION public.custom_access_token_hook(event jsonb)
RETURNS jsonb
LANGUAGE plpgsql
STABLE
AS $$
  DECLARE
    claims jsonb;
    user_role public.user_roles;
  BEGIN
    -- Fetch the user role in the user_to_roles table
    SELECT role INTO user_role FROM public.user_to_roles WHERE user_id = (event->>'user_id')::uuid;

    claims := event->'claims';

    IF user_role IS NOT NULL THEN
      -- Set the claim
      claims := jsonb_set(claims, '{user_role}', to_jsonb(user_role));
    ELSE
      claims := jsonb_set(claims, '{user_role}', 'null');
    END IF;

    -- Update the 'claims' object in the original event
    event := jsonb_set(event, '{claims}', claims);

    -- Return the modified or original event
    RETURN event;
  END;
$$;

GRANT USAGE ON SCHEMA public TO supabase_auth_admin;

GRANT EXECUTE
  ON FUNCTION public.custom_access_token_hook
  TO supabase_auth_admin;

REVOKE EXECUTE
  ON FUNCTION public.custom_access_token_hook
  FROM authenticated, anon, public;

GRANT ALL
  ON TABLE public.user_to_roles
  TO supabase_auth_admin;

REVOKE ALL
  ON TABLE public.user_to_roles
  FROM authenticated, anon, public;

CREATE POLICY "Allow auth admin to read user roles" ON public.user_to_roles
AS PERMISSIVE FOR SELECT
TO supabase_auth_admin
USING (true);

-- =====================================================================================================================
-- AUTHORIZE PERMISSION BY USER ROLE
-- =====================================================================================================================

CREATE OR REPLACE FUNCTION public.authorize(
  requested_permission public.role_permissions
)
RETURNS boolean AS $$
DECLARE
  bind_permissions int;
  user_role public.user_roles;
BEGIN
  -- Fetch user role once and store it to reduce number of calls
  SELECT (auth.jwt() ->> 'user_role')::public.user_roles INTO user_role;

  SELECT COUNT(*)
  INTO bind_permissions
  FROM public.role_to_permissions
  WHERE role_to_permissions.permission = requested_permission
    AND role_to_permissions.role = user_role;

  RETURN bind_permissions > 0;
END;
$$ LANGUAGE plpgsql STABLE SECURITY DEFINER SET search_path = '';

-- =====================================================================================================================
-- AUTHORIZE PROPERTY OPERATIONS
-- =====================================================================================================================

CREATE POLICY "Allow authorized insert access"
ON public.property
FOR INSERT
TO authenticated
WITH CHECK (
  (SELECT public.authorize('create_house'::public.role_permissions))
);

CREATE POLICY "Allow authorized update access"
ON public.property
FOR UPDATE
TO authenticated
USING (
  (SELECT public.authorize('update_house'::public.role_permissions))
);

CREATE POLICY "Allow authorized delete access"
ON public.property
FOR DELETE
TO authenticated
USING (
  (SELECT public.authorize('delete_house'::public.role_permissions))
);

-- =====================================================================================================================