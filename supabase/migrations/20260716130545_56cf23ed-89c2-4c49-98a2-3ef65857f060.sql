
-- Fix email_account_tracking enumeration: remove overly permissive SELECT policy.
-- Registration logic runs through SECURITY DEFINER functions (register_pan_for_email,
-- check_account_limit, decrement_account_count) which bypass RLS, so no client SELECT is needed.
DROP POLICY IF EXISTS "System can read email tracking for registration" ON public.email_account_tracking;

-- Harden user_assets against cross-user exposure: revoke anon access and add explicit
-- restrictive policy so no future permissive policy can accidentally widen access.
REVOKE ALL ON public.user_assets FROM anon;

CREATE POLICY "Restrict user_assets to owner only"
  ON public.user_assets
  AS RESTRICTIVE
  FOR ALL
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);
