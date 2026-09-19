import { useMemo, useState } from "react";
import Navbar from "@/components/Navbar";
import PageBackground from "@/components/PageBackground";
import { Card, CardContent } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { useTranslation } from "react-i18next";

const formatINR = (value: number) =>
  "₹" + Math.round(value).toLocaleString("en-IN");

const SipCalculator = () => {
  const { t } = useTranslation();
  const [monthly, setMonthly] = useState(10000);
  const [annualReturn, setAnnualReturn] = useState(12);
  const [years, setYears] = useState(10);

  const { invested, gain, futureValue } = useMemo(() => {
    const n = Math.round(years * 12);
    const investedAmount = monthly * n;
    if (annualReturn === 0) {
      return { invested: investedAmount, gain: 0, futureValue: investedAmount };
    }
    const r = annualReturn / 12 / 100;
    const fv = monthly * ((Math.pow(1 + r, n) - 1) / r) * (1 + r);
    return {
      invested: investedAmount,
      gain: Math.max(fv - investedAmount, 0),
      futureValue: fv,
    };
  }, [monthly, annualReturn, years]);

  const investedPct = futureValue > 0 ? Math.min((invested / futureValue) * 100, 100) : 0;
  const gainPct = futureValue > 0 ? Math.min((gain / futureValue) * 100, 100) : 0;

  const clamp = (val: number, min: number, max: number) =>
    Math.min(Math.max(val, min), max);

  return (
    <div className="min-h-screen">
      <PageBackground variant="resources" />
      <Navbar />
      <main className="container mx-auto px-4 py-12 max-w-4xl">
        <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4">SIP Calculator</h1>
        <p className="text-foreground/70 text-lg mb-10">
          Estimate how a monthly Systematic Investment Plan could grow over time.
        </p>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Inputs */}
          <Card className="border-primary/20">
            <CardContent className="pt-6 space-y-8">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <label className="font-medium text-foreground">Monthly SIP Amount (₹)</label>
                  <Input
                    type="number"
                    min={500}
                    value={monthly}
                    onChange={(e) => setMonthly(clamp(Number(e.target.value) || 500, 500, 10000000))}
                    className="w-32 text-right"
                  />
                </div>
                <Slider
                  value={[monthly]}
                  min={500}
                  max={100000}
                  step={500}
                  onValueChange={([v]) => setMonthly(v)}
                />
                <p className="text-xs text-foreground/50 mt-1">Minimum ₹500</p>
              </div>

              <div>
                <div className="flex items-center justify-between mb-3">
                  <label className="font-medium text-foreground">Expected Annual Return (%)</label>
                  <Input
                    type="number"
                    min={1}
                    max={30}
                    value={annualReturn}
                    onChange={(e) => setAnnualReturn(clamp(Number(e.target.value) || 1, 0, 30))}
                    className="w-24 text-right"
                  />
                </div>
                <Slider
                  value={[annualReturn]}
                  min={1}
                  max={30}
                  step={0.5}
                  onValueChange={([v]) => setAnnualReturn(v)}
                />
                <p className="text-xs text-foreground/50 mt-1">For illustration only · 1%–30%</p>
              </div>

              <div>
                <div className="flex items-center justify-between mb-3">
                  <label className="font-medium text-foreground">Investment Period (Years)</label>
                  <Input
                    type="number"
                    min={1}
                    max={40}
                    value={years}
                    onChange={(e) => setYears(clamp(Number(e.target.value) || 1, 1, 40))}
                    className="w-24 text-right"
                  />
                </div>
                <Slider
                  value={[years]}
                  min={1}
                  max={40}
                  step={1}
                  onValueChange={([v]) => setYears(v)}
                />
                <p className="text-xs text-foreground/50 mt-1">1–40 years</p>
              </div>
            </CardContent>
          </Card>

          {/* Results */}
          <Card className="border-primary/20">
            <CardContent className="pt-6 space-y-6">
              <div className="text-center pb-4 border-b border-border">
                <p className="text-sm text-foreground/60 mb-1">Estimated Future Value</p>
                <p className="text-4xl font-bold text-primary">{formatINR(futureValue)}</p>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-foreground/70">Amount Invested</span>
                  <span className="font-semibold text-foreground">{formatINR(invested)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-foreground/70">Estimated Gain</span>
                  <span className="font-semibold text-emerald-600">{formatINR(gain)}</span>
                </div>
                <div className="flex justify-between border-t border-border pt-3">
                  <span className="text-foreground/70">Estimated Future Value</span>
                  <span className="font-semibold text-foreground">{formatINR(futureValue)}</span>
                </div>
              </div>

              {/* Chart */}
              <div className="space-y-4 pt-2">
                <div>
                  <div className="flex justify-between text-xs text-foreground/60 mb-1">
                    <span>Amount Invested</span>
                    <span>{formatINR(invested)}</span>
                  </div>
                  <div className="h-4 w-full rounded bg-muted overflow-hidden">
                    <div
                      className="h-full bg-primary/70 transition-all duration-200"
                      style={{ width: `${investedPct}%` }}
                    />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-xs text-foreground/60 mb-1">
                    <span>Estimated Gain</span>
                    <span>{formatINR(gain)}</span>
                  </div>
                  <div className="h-4 w-full rounded bg-muted overflow-hidden">
                    <div
                      className="h-full bg-amber-500 transition-all duration-200"
                      style={{ width: `${gainPct}%` }}
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <p className="text-sm text-foreground/60 italic mt-8 leading-relaxed">
          This calculator is for illustration purposes only. The estimated values are based on the
          assumed rate of return you enter and are not guaranteed. Mutual fund investments are
          subject to market risks; actual returns may be higher or lower. Please read all
          scheme-related documents carefully before investing.
        </p>
      </main>
    </div>
  );
};

export default SipCalculator;
