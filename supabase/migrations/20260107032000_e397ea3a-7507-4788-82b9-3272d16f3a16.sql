-- Fix RLS policies for pan_email_tracking table
-- Drop overly permissive policy that allows public access
DROP POLICY IF EXISTS "Service role can manage pan tracking" ON public.pan_email_tracking;

-- Create proper policy that requires authentication
CREATE POLICY "Authenticated users can manage their own PAN tracking"
ON public.pan_email_tracking
FOR ALL
USING (auth.uid() IS NOT NULL AND auth.uid() = user_id)
WITH CHECK (auth.uid() IS NOT NULL AND auth.uid() = user_id);

-- Fix RLS policies for email_account_tracking table  
DROP POLICY IF EXISTS "Service role can manage email tracking" ON public.email_account_tracking;

-- Create proper policy for email account tracking (admin only for management)
CREATE POLICY "Admins can manage email tracking"
ON public.email_account_tracking
FOR ALL
USING (has_role(auth.uid(), 'admin'::app_role))
WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

-- Add policy to allow the system function to access email tracking (for registration validation)
CREATE POLICY "System can read email tracking for registration"
ON public.email_account_tracking
FOR SELECT
USING (auth.uid() IS NOT NULL);

-- Fix profiles table to ensure unauthenticated users cannot read
-- First verify the existing policies are strict enough
-- The existing policies require auth.uid() = user_id which should block anon access
-- But we need to ensure there's no public SELECT

-- Add explicit INSERT policy for profiles
CREATE POLICY "Users can insert their own profile"
ON public.profiles
FOR INSERT
WITH CHECK (auth.uid() = user_id);

-- Fix function search_path for has_role function
CREATE OR REPLACE FUNCTION public.has_role(_role public.app_role, _user_id uuid)
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = _user_id AND role = _role
  );
END;
$$;

-- Fix function search_path for normalize_email function
CREATE OR REPLACE FUNCTION public.normalize_email(email text)
RETURNS text
LANGUAGE plpgsql
SET search_path = public
AS $$
BEGIN
  RETURN lower(trim(email));
END;
$$;

-- Fix function search_path for register_pan_for_email function
CREATE OR REPLACE FUNCTION public.register_pan_for_email(p_email text, p_pan text)
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_normalized_email text;
  v_current_count int;
BEGIN
  v_normalized_email := lower(trim(p_email));
  
  -- Get current account count for this email
  SELECT account_count INTO v_current_count
  FROM public.email_account_tracking
  WHERE normalized_email = v_normalized_email;
  
  -- If no record exists, create one
  IF v_current_count IS NULL THEN
    INSERT INTO public.email_account_tracking (normalized_email, account_count)
    VALUES (v_normalized_email, 1);
    v_current_count := 1;
  ELSE
    -- Check if limit reached (max 3 accounts per email)
    IF v_current_count >= 3 THEN
      RETURN false;
    END IF;
    
    -- Increment counter
    UPDATE public.email_account_tracking
    SET account_count = account_count + 1, updated_at = now()
    WHERE normalized_email = v_normalized_email;
  END IF;
  
  RETURN true;
END;
$$;

-- Fix function search_path for update_updated_at_column trigger function
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER
LANGUAGE plpgsql
SET search_path = public
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;