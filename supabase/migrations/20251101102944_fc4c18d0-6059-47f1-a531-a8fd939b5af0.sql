-- Create table for AMC fund performance data
CREATE TABLE IF NOT EXISTS public.amc_fund_performance (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  scheme_name TEXT NOT NULL,
  scheme_code TEXT,
  amc_name TEXT NOT NULL,
  category TEXT,
  sub_category TEXT,
  benchmark TEXT,
  latest_nav DECIMAL(10,2),
  previous_nav DECIMAL(10,2),
  one_year_return DECIMAL(10,2),
  three_year_return DECIMAL(10,2),
  five_year_return DECIMAL(10,2),
  ten_year_return DECIMAL(10,2),
  daily_aum DECIMAL(15,2),
  risk_level TEXT,
  nav_date DATE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.amc_fund_performance ENABLE ROW LEVEL SECURITY;

-- Create policy for public read access
CREATE POLICY "Public read access for AMC fund performance"
ON public.amc_fund_performance
FOR SELECT
TO public
USING (true);

-- Create index on scheme_name for faster lookups
CREATE INDEX idx_amc_fund_performance_scheme_name ON public.amc_fund_performance(scheme_name);

-- Create index on amc_name for filtering
CREATE INDEX idx_amc_fund_performance_amc_name ON public.amc_fund_performance(amc_name);

-- Create index on updated_at for tracking latest updates
CREATE INDEX idx_amc_fund_performance_updated_at ON public.amc_fund_performance(updated_at DESC);

-- Create trigger for automatic timestamp updates
CREATE OR REPLACE FUNCTION public.update_amc_fund_performance_timestamp()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_amc_fund_performance_updated_at
BEFORE UPDATE ON public.amc_fund_performance
FOR EACH ROW
EXECUTE FUNCTION public.update_amc_fund_performance_timestamp();