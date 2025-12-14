-- Create a table to track PAN numbers linked to emails
CREATE TABLE public.pan_email_tracking (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  pan_number TEXT NOT NULL,
  email TEXT NOT NULL,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  CONSTRAINT unique_pan_number UNIQUE (pan_number),
  CONSTRAINT unique_email_pan UNIQUE (email)
);

-- Enable RLS
ALTER TABLE public.pan_email_tracking ENABLE ROW LEVEL SECURITY;

-- Policy for service role to manage
CREATE POLICY "Service role can manage pan tracking"
ON public.pan_email_tracking
FOR ALL
USING (true)
WITH CHECK (true);

-- Policy for users to read their own PAN
CREATE POLICY "Users can view their own PAN"
ON public.pan_email_tracking
FOR SELECT
USING (auth.uid() = user_id);

-- Function to validate and register PAN during signup
CREATE OR REPLACE FUNCTION public.register_pan_for_email(
  p_email TEXT,
  p_pan TEXT
)
RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  normalized_pan TEXT;
  existing_pan_email TEXT;
  existing_email_pan TEXT;
BEGIN
  -- Normalize PAN to uppercase
  normalized_pan := UPPER(TRIM(p_pan));
  
  -- Check if PAN is already registered to another email
  SELECT email INTO existing_pan_email
  FROM public.pan_email_tracking
  WHERE pan_number = normalized_pan;
  
  IF existing_pan_email IS NOT NULL AND LOWER(existing_pan_email) != LOWER(TRIM(p_email)) THEN
    RAISE EXCEPTION 'This PAN number is already registered with another email address';
  END IF;
  
  -- Check if email already has a PAN registered
  SELECT pan_number INTO existing_email_pan
  FROM public.pan_email_tracking
  WHERE LOWER(email) = LOWER(TRIM(p_email));
  
  IF existing_email_pan IS NOT NULL AND existing_email_pan != normalized_pan THEN
    RAISE EXCEPTION 'This email already has a different PAN number registered';
  END IF;
  
  -- If both checks pass and no existing record, insert new record
  IF existing_pan_email IS NULL AND existing_email_pan IS NULL THEN
    INSERT INTO public.pan_email_tracking (pan_number, email)
    VALUES (normalized_pan, LOWER(TRIM(p_email)));
  END IF;
  
  RETURN TRUE;
END;
$$;

-- Function to link user_id after successful signup
CREATE OR REPLACE FUNCTION public.link_pan_to_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  UPDATE public.pan_email_tracking
  SET user_id = NEW.id
  WHERE LOWER(email) = LOWER(NEW.email);
  
  RETURN NEW;
END;
$$;

-- Trigger to link user after signup
CREATE TRIGGER on_auth_user_created_link_pan
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.link_pan_to_user();