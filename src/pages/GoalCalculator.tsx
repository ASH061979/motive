import { useMemo, useState } from "react";
import Navbar from "@/components/Navbar";
import PageBackground from "@/components/PageBackground";
import { Card, CardContent } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";

const formatINR = (value: number) =>
  "₹" + Math.round(value).toLocaleString("en-IN");

const GoalCalculator = () => {
  const [targetAmount, setTargetAmount] = useState(5000000);
  const [years, setYears] = useState(10);
  const [annualReturn, setAnnualReturn] = useState(12);

  const { monthlySip, contributions, growth } = useMemo(() => {
    const n = Math.round(years * 12);
    let sip: number;
    if (annualReturn === 0) {
      sip = targetAmount / n;
    } else {
      const r = annualReturn / 12 / 100;
      sip = targetAmount / (((Math.pow(1 + r, n) - 1) / r) * (1 + r));
    }
    const totalContributions = sip * n;
    return {
      monthlySip: sip,
      contributions: totalContributions,
      growth: Math.max(targetAmount - totalContributions, 0),
    };
  }, [targetAmount, annualReturn, years]);

  const maxValue = Math.max(contributions, growth);

  const clamp = (val: number, min: number, max: number) =>
    Math.min(Math.max(val, min), max);

  return (
    <div className="min-h-screen">
      <PageBackground variant="resources" />
      <Navbar />
      <main className="container mx-auto px-4 py-12 max-w-4xl">
        <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4">Goal Calculator</h1>
        <p className="text-foreground/70 text-lg mb-10">
          Estimate the monthly SIP that could work towards a financial goal.
        </p>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Inputs */}
          <Card className="border-primary/20">
            <CardContent className="pt-6 space-y-8">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <label className="font-medium text-foreground">Target Amount (₹)</label>
                  <Input
                    type="number"
                    min={100000}
                    value={targetAmount}
                    onChange={(e) => setTargetAmount(clamp(Number(e.target.value) || 100000, 100000, 1000000000))}
                    className="w-36 text-right"
                  />
                </div>
                <Slider
                  value={[targetAmount]}
                  min={100000}
                  max={50000000}
                  step={100000}
                  onValueChange={([v]) => setTargetAmount(v)}
                />
                <p className="text-xs text-foreground/50 mt-1">Minimum ₹1,00,000</p>
              </div>

              <div>
                <div className="flex items-center justify-between mb-3">
                  <label className="font-medium text-foreground">Time to Goal (Years)</label>
                  <Input
                    type="number"
                    min={1}
                    max={50}
                    value={years}
                    onChange={(e) => setYears(clamp(Number(e.target.value) || 1, 1, 50))}
                    className="w-24 text-right"
                  />
                </div>
                <Slider
                  value={[years]}
                  min={1}
                  max={50}
                  step={1}
                  onValueChange={([v]) => setYears(v)}
                />
                <p className="text-xs text-foreground/50 mt-1">1–50 years</p>
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
            </CardContent>
          </Card>

          {/* Results */}
          <Card className="border-primary/20">
            <CardContent className="pt-6 space-y-6">
              <div className="text-center pb-4 border-b border-border">
                <p className="text-sm text-foreground/60 mb-1">Estimated Monthly SIP Required</p>
                <p className="text-4xl font-bold text-primary">{formatINR(monthlySip)}</p>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-foreground/70">Target Amount</span>
                  <span className="font-semibold text-foreground">{formatINR(targetAmount)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-foreground/70">Time to Goal</span>
                  <span className="font-semibold text-foreground">{years} {years === 1 ? "year" : "years"}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-foreground/70">Total Estimated Contributions</span>
                  <span className="font-semibold text-foreground">{formatINR(contributions)}</span>
                </div>
                <div className="flex justify-between border-t border-border pt-3">
                  <span className="text-foreground/70">Estimated Growth Component</span>
                  <span className="font-semibold text-emerald-600">{formatINR(growth)}</span>
                </div>
              </div>

              {/* Bar chart */}
              <div className="pt-2">
                <div className="h-52 flex items-end justify-center gap-10 px-4 border-b border-border">
                  <div className="flex flex-col items-center justify-end h-full">
                    <span className="text-xs font-semibold text-foreground mb-2">
                      {formatINR(contributions)}
                    </span>
                    <div
                      className="w-20 rounded-t-md bg-primary/70 transition-all duration-200"
                      style={{
                        height: `${maxValue > 0 ? (contributions / maxValue) * 100 : 0}%`,
                        minHeight: "4px",
                      }}
                    />
                  </div>
                  <div className="flex flex-col items-center justify-end h-full">
                    <span className="text-xs font-semibold text-amber-600 mb-2">
                      {formatINR(growth)}
                    </span>
                    <div
                      className="w-20 rounded-t-md bg-amber-500 transition-all duration-200"
                      style={{
                        height: `${maxValue > 0 ? (growth / maxValue) * 100 : 0}%`,
                        minHeight: "4px",
                      }}
                    />
                  </div>
                </div>
                <div className="flex justify-center gap-10 px-4 mt-2">
                  <span className="w-20 text-center text-xs text-foreground/60">
                    Estimated Contributions
                  </span>
                  <span className="w-20 text-center text-xs text-foreground/60">
                    Estimated Growth
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <p className="text-sm text-foreground/60 italic mt-8 leading-relaxed">
          This calculator is for illustration purposes only. The estimated monthly SIP is based on
          the assumed rate of return you enter and is not a recommendation or guarantee. Mutual
          fund investments are subject to market risks; actual returns may be higher or lower.
          Please read all scheme-related documents carefully before investing.
        </p>
        <p className="text-sm text-foreground/60 mt-4">
          Note: Starting earlier may reduce the monthly amount required to work towards the same
          target.
        </p>
      </main>
    </div>
  );
};

export default GoalCalculator;
