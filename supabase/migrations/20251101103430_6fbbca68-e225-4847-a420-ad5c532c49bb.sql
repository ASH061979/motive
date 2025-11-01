-- Fix the function to include search_path
CREATE OR REPLACE FUNCTION public.update_amc_fund_performance_timestamp()
RETURNS TRIGGER 
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;