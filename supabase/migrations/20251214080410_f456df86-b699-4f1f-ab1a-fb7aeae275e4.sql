-- Update the handle_new_user_profile function to get PAN from pan_email_tracking
CREATE OR REPLACE FUNCTION public.handle_new_user_profile()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  user_pan TEXT;
BEGIN
  -- Get PAN from tracking table
  SELECT pan_number INTO user_pan
  FROM public.pan_email_tracking
  WHERE LOWER(email) = LOWER(NEW.email);

  -- Insert profile with PAN
  INSERT INTO public.profiles (user_id, email, pan_number)
  VALUES (NEW.id, NEW.email, user_pan);
  
  -- Assign user role by default
  INSERT INTO public.user_roles (user_id, role)
  VALUES (NEW.id, 'user');
  
  RETURN NEW;
END;
$$;