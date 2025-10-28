-- Create a function to normalize email addresses (handle gmail plus addressing)
CREATE OR REPLACE FUNCTION public.normalize_email(email TEXT)
RETURNS TEXT
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  local_part TEXT;
  domain TEXT;
  normalized TEXT;
BEGIN
  -- Split email into local part and domain
  local_part := split_part(email, '@', 1);
  domain := split_part(email, '@', 2);
  
  -- For Gmail, remove dots and plus addressing
  IF domain ILIKE '%gmail.com%' OR domain ILIKE '%googlemail.com%' THEN
    -- Remove everything after + and all dots
    local_part := split_part(local_part, '+', 1);
    local_part := replace(local_part, '.', '');
  END IF;
  
  normalized := lower(local_part || '@' || lower(domain));
  RETURN normalized;
END;
$$;

-- Create table to track account limits
CREATE TABLE public.email_account_tracking (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  normalized_email TEXT NOT NULL UNIQUE,
  account_count INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.email_account_tracking ENABLE ROW LEVEL SECURITY;

-- Only allow service role to manage this table
CREATE POLICY "Service role can manage email tracking"
ON public.email_account_tracking
FOR ALL
TO service_role
USING (true)
WITH CHECK (true);

-- Create function to check and increment account count
CREATE OR REPLACE FUNCTION public.check_account_limit()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  normalized TEXT;
  current_count INTEGER;
BEGIN
  -- Normalize the email
  normalized := public.normalize_email(NEW.email);
  
  -- Get current count
  SELECT account_count INTO current_count
  FROM public.email_account_tracking
  WHERE normalized_email = normalized;
  
  -- If record doesn't exist, create it
  IF current_count IS NULL THEN
    INSERT INTO public.email_account_tracking (normalized_email, account_count)
    VALUES (normalized, 1);
    RETURN NEW;
  END IF;
  
  -- Check if limit exceeded (max 2 accounts)
  IF current_count >= 2 THEN
    RAISE EXCEPTION 'Account limit reached for this email address'
      USING HINT = 'Maximum 2 accounts allowed per email';
  END IF;
  
  -- Increment count
  UPDATE public.email_account_tracking
  SET account_count = account_count + 1,
      updated_at = now()
  WHERE normalized_email = normalized;
  
  RETURN NEW;
END;
$$;

-- Create trigger to check account limit on user creation
CREATE TRIGGER check_account_limit_trigger
  BEFORE INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.check_account_limit();

-- Create function to decrement count on user deletion
CREATE OR REPLACE FUNCTION public.decrement_account_count()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  normalized TEXT;
BEGIN
  normalized := public.normalize_email(OLD.email);
  
  UPDATE public.email_account_tracking
  SET account_count = GREATEST(account_count - 1, 0),
      updated_at = now()
  WHERE normalized_email = normalized;
  
  RETURN OLD;
END;
$$;

-- Create trigger to decrement on user deletion
CREATE TRIGGER decrement_account_count_trigger
  AFTER DELETE ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.decrement_account_count();