-- Create a trigger to automatically make meghna@motivewealth.in an admin on signup
CREATE OR REPLACE FUNCTION public.auto_assign_admin_role()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  -- If the new user is Meghna, update their role to admin
  IF LOWER(NEW.email) = 'meghna@motivewealth.in' THEN
    UPDATE public.user_roles
    SET role = 'admin'
    WHERE user_id = NEW.id;
  END IF;
  
  RETURN NEW;
END;
$$;

-- Create trigger that runs after handle_new_user_profile (which creates the user_roles entry)
CREATE TRIGGER on_auth_user_created_admin_check
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.auto_assign_admin_role();