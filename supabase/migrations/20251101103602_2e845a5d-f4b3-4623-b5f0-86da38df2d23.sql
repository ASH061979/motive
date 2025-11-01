-- Add unique constraint on scheme_code for upsert functionality
ALTER TABLE public.amc_fund_performance
ADD CONSTRAINT amc_fund_performance_scheme_code_key UNIQUE (scheme_code);