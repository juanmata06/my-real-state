-- =====================================================================================================================
-- CREATE AUTH HOOK TO APPLY USER ROLE ON JWT CLAIMS
CREATE OR REPLACE FUNCTION public.custom_access_token_hook(event jsonb)
RETURNS jsonb
LANGUAGE plpgsql
STABLE
AS $$
  DECLARE
    claims jsonb;
    user_role public.user_roles;
  BEGIN
    -- Fetch the user role in the user_roles table
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
  FROM authenticated, anon, PUBLIC;

GRANT ALL
  ON TABLE public.user_to_roles
TO supabase_auth_admin;

REVOKE ALL
  ON TABLE public.user_to_roles
  FROM authenticated, anon, PUBLIC;

DROP POLICY IF EXISTS "Allow auth admin to read user roles" ON public.user_to_roles;
CREATE POLICY "Allow auth admin to read user roles" ON public.user_to_roles
AS PERMISSIVE FOR SELECT
TO supabase_auth_admin
USING (true);
-- =====================================================================================================================

-- =====================================================================================================================
-- TODO: ENABLE THE HOOK [AUTHENTICATION > HOOKS (BETA)] 
-- =====================================================================================================================

-- =====================================================================================================================
-- STEP 3: CREATE USER'S PERMISSIONS FROM JWT CLAIMS
CREATE OR REPLACE FUNCTION public.authorize(
  requested_permission role_permissions
)
RETURNS BOOLEAN AS $$
DECLARE
  bind_permissions INT;
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

-- =====================================================================================================================
-- CREATE RLS POLICIES FOR TABLES USING THE AUTHORIZE FUNCTION

-- PROPERTIES POLICIES
ALTER TABLE public.properties ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Allow anyone to read properties" ON public.properties;
CREATE POLICY "Allow anyone to read properties" ON public.properties FOR SELECT USING (true);
DROP POLICY IF EXISTS "Allow only authorized to create properties" ON public.properties;
CREATE POLICY "Allow only authorized to create properties" ON public.properties FOR INSERT TO authenticated WITH CHECK ( (SELECT authorize('property.create')) );
DROP POLICY IF EXISTS "Allow only authorized to update properties" ON public.properties;
CREATE POLICY "Allow only authorized to update properties" ON public.properties FOR UPDATE TO authenticated USING ( (SELECT authorize('property.update')) ) WITH CHECK ( (SELECT authorize('property.update')) );
DROP POLICY IF EXISTS "Allow only authorized to delete properties" ON public.properties;
CREATE POLICY "Allow only authorized to delete properties" ON public.properties FOR DELETE TO authenticated USING ( (SELECT authorize('property.delete')) );

-- ROLE_TO_PERMISSIONS POLICIES
ALTER TABLE public.role_to_permissions ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Allow anyone to read role permissions" ON public.role_to_permissions;
CREATE POLICY "Allow anyone to read role permissions" ON public.role_to_permissions FOR SELECT USING (true);
DROP POLICY IF EXISTS "Allow only authorized to create role permissions" ON public.role_to_permissions;
CREATE POLICY "Allow only authorized to create role permissions" ON public.role_to_permissions FOR INSERT TO authenticated WITH CHECK ( (SELECT authorize('user.manage')) );
DROP POLICY IF EXISTS "Allow only authorized to update role permissions" ON public.role_to_permissions;
CREATE POLICY "Allow only authorized to update role permissions" ON public.role_to_permissions FOR UPDATE TO authenticated USING ( (SELECT authorize('user.manage')) ) WITH CHECK ( (SELECT authorize('user.manage')) );
DROP POLICY IF EXISTS "Allow only authorized to delete role permissions" ON public.role_to_permissions;
CREATE POLICY "Allow only authorized to delete role permissions" ON public.role_to_permissions FOR DELETE TO authenticated USING ( (SELECT authorize('user.manage')) );

-- USER_TO_ROLES POLICIES
ALTER TABLE public.user_to_roles ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Allow anyone to read user roles" ON public.user_to_roles;
CREATE POLICY "Allow anyone to read user roles" ON public.user_to_roles FOR SELECT USING (true);
DROP POLICY IF EXISTS "Allow only authorized to create user roles" ON public.user_to_roles;
CREATE POLICY "Allow only authorized to create user roles" ON public.user_to_roles FOR INSERT TO authenticated WITH CHECK ( (SELECT authorize('user.manage')) );
DROP POLICY IF EXISTS "Allow only authorized to update user roles" ON public.user_to_roles;
CREATE POLICY "Allow only authorized to update user roles" ON public.user_to_roles FOR UPDATE TO authenticated USING ( (SELECT authorize('user.manage')) ) WITH CHECK ( (SELECT authorize('user.manage')) );
DROP POLICY IF EXISTS "Allow only authorized to delete user roles" ON public.user_to_roles;
CREATE POLICY "Allow only authorized to delete user roles" ON public.user_to_roles FOR DELETE TO authenticated USING ( (SELECT authorize('user.manage')) );

-- USER_PROFILES POLICIES
ALTER TABLE public.user_profiles ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Allow authorized or owner to read user profiles" ON public.user_profiles;
CREATE POLICY "Allow authorized or owner to read user profiles" ON public.user_profiles FOR SELECT TO authenticated USING ( auth.uid() = user_id OR (SELECT authorize('user.manage')) );
DROP POLICY IF EXISTS "Allow authorized or owner to create user profiles" ON public.user_profiles;
CREATE POLICY "Allow authorized or owner to create user profiles" ON public.user_profiles FOR INSERT TO authenticated WITH CHECK ( auth.uid() = user_id OR (SELECT authorize('user.manage')) );
DROP POLICY IF EXISTS "Allow authorized or owner to update user profiles" ON public.user_profiles;
CREATE POLICY "Allow authorized or owner to update user profiles" ON public.user_profiles FOR UPDATE TO authenticated USING ( auth.uid() = user_id OR (SELECT authorize('user.manage')) ) WITH CHECK ( auth.uid() = user_id OR (SELECT authorize('user.manage')) );
DROP POLICY IF EXISTS "Allow authorized or owner to delete user profiles" ON public.user_profiles;
CREATE POLICY "Allow authorized or owner to delete user profiles" ON public.user_profiles FOR DELETE TO authenticated USING ( auth.uid() = user_id OR (SELECT authorize('user.manage')) );

-- EMPLOYEE_PROFILES POLICIES
ALTER TABLE public.employee_profiles ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Allow authorized or owner to read employee profiles" ON public.employee_profiles;
CREATE POLICY "Allow authorized or owner to read employee profiles" ON public.employee_profiles FOR SELECT TO authenticated USING ( auth.uid() = user_id OR (SELECT authorize('user.manage')) );
DROP POLICY IF EXISTS "Allow authorized or owner to create employee profiles" ON public.employee_profiles;
CREATE POLICY "Allow authorized or owner to create employee profiles" ON public.employee_profiles FOR INSERT TO authenticated WITH CHECK ( auth.uid() = user_id OR (SELECT authorize('user.manage')) );
DROP POLICY IF EXISTS "Allow authorized or owner to update employee profiles" ON public.employee_profiles;
CREATE POLICY "Allow authorized or owner to update employee profiles" ON public.employee_profiles FOR UPDATE TO authenticated USING ( auth.uid() = user_id OR (SELECT authorize('user.manage')) ) WITH CHECK ( auth.uid() = user_id OR (SELECT authorize('user.manage')) );
DROP POLICY IF EXISTS "Allow authorized or owner to delete employee profiles" ON public.employee_profiles;
CREATE POLICY "Allow authorized or owner to delete employee profiles" ON public.employee_profiles FOR DELETE TO authenticated USING ( auth.uid() = user_id OR (SELECT authorize('user.manage')) );
-- =====================================================================================================================

-- =====================================================================================================================
-- ENUM GETTER FUNCTIONS
CREATE OR REPLACE FUNCTION public.get_user_roles()
RETURNS text[]
LANGUAGE sql
AS $$
  SELECT enum_range(NULL::public.user_roles)::text[];
$$;

CREATE OR REPLACE FUNCTION public.get_role_permissions()
RETURNS text[]
LANGUAGE sql
AS $$
  SELECT enum_range(NULL::public.role_permissions)::text[];
$$;

CREATE OR REPLACE FUNCTION public.get_property_types()
RETURNS text[]
LANGUAGE sql
AS $$
  SELECT enum_range(NULL::public.property_types)::text[];
$$;

CREATE OR REPLACE FUNCTION public.get_market_types()
RETURNS text[]
LANGUAGE sql
AS $$
  SELECT enum_range(NULL::public.market_types)::text[];
$$;

CREATE OR REPLACE FUNCTION public.get_property_features()
RETURNS text[]
LANGUAGE sql
AS $$
  SELECT enum_range(NULL::public.property_features)::text[];
$$;

CREATE OR REPLACE FUNCTION public.get_market_tags()
RETURNS text[]
LANGUAGE sql
AS $$
  SELECT enum_range(NULL::public.market_tags)::text[];
$$;
-- =====================================================================================================================

