import { useMemo, useState } from "react";
import Navbar from "@/components/Navbar";
import PageBackground from "@/components/PageBackground";
import { Card, CardContent } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { useTranslation } from "react-i18next";

const formatINR = (value: number) =>
  "₹" + Math.round(value).toLocaleString("en-IN");

const StepUpSipCalculator = () => {
  const { t } = useTranslation();
  const [monthly, setMonthly] = useState(10000);
  const [stepUp, setStepUp] = useState(10);
  const [annualReturn, setAnnualReturn] = useState(12);
  const [years, setYears] = useState(10);

  const { invested, gain, futureValue, finalYearSip, schedule } = useMemo(() => {
    const n = Math.round(years * 12);
    const r = annualReturn / 12 / 100;
    let balance = 0;
    let totalInvested = 0;
    const yearSchedule: { year: number; sip: number }[] = [];

    for (let month = 1; month <= n; month++) {
      const yearIndex = Math.floor((month - 1) / 12);
      const sip = monthly * Math.pow(1 + stepUp / 100, yearIndex);
      if ((month - 1) % 12 === 0) {
        yearSchedule.push({ year: yearIndex + 1, sip });
      }
      // Beginning-of-month convention: add contribution, then compound
      balance = (balance + sip) * (1 + r);
      totalInvested += sip;
    }

    if (annualReturn === 0) {
      balance = totalInvested;
    }

    return {
      invested: totalInvested,
      gain: Math.max(balance - totalInvested, 0),
      futureValue: balance,
      finalYearSip:
        yearSchedule.length > 0 ? yearSchedule[yearSchedule.length - 1].sip : monthly,
      schedule: yearSchedule,
    };
  }, [monthly, stepUp, annualReturn, years]);

  const maxValue = Math.max(invested, gain);

  const clamp = (val: number, min: number, max: number) =>
    Math.min(Math.max(val, min), max);

  return (
    <div className="min-h-screen">
      <PageBackground variant="resources" />
      <Navbar />
      <main className="container mx-auto px-4 py-12 max-w-5xl">
        <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4">Step-Up SIP Calculator</h1>
        <p className="text-foreground/70 text-lg mb-10">
          See how increasing your monthly SIP each year could build over time.
        </p>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Inputs */}
          <Card className="border-primary/20">
            <CardContent className="pt-6 space-y-8">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <label className="font-medium text-foreground">Starting Monthly SIP Amount (₹)</label>
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
                  <label className="font-medium text-foreground">Annual SIP Step-Up (%)</label>
                  <Input
                    type="number"
                    min={0}
                    max={50}
                    value={stepUp}
                    onChange={(e) => setStepUp(clamp(Number(e.target.value) || 0, 0, 50))}
                    className="w-24 text-right"
                  />
                </div>
                <Slider
                  value={[stepUp]}
                  min={0}
                  max={50}
                  step={1}
                  onValueChange={([v]) => setStepUp(v)}
                />
                <p className="text-xs text-foreground/50 mt-1">Percentage by which your monthly SIP increases each year</p>
                <p className="text-xs text-foreground/50">0%–50%</p>
              </div>

              <div>
                <div className="flex items-center justify-between mb-3">
                  <label className="font-medium text-foreground">Assumed Annual Return (%)</label>
                  <Input
                    type="number"
                    min={0}
                    max={30}
                    value={annualReturn}
                    onChange={(e) => setAnnualReturn(clamp(Number(e.target.value) || 0, 0, 30))}
                    className="w-24 text-right"
                  />
                </div>
                <Slider
                  value={[annualReturn]}
                  min={0}
                  max={30}
                  step={0.5}
                  onValueChange={([v]) => setAnnualReturn(v)}
                />
                <p className="text-xs text-foreground/50 mt-1">For illustration only · 0%–30%</p>
              </div>

              <div>
                <div className="flex items-center justify-between mb-3">
                  <label className="font-medium text-foreground">Investment Period (Years)</label>
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
            </CardContent>
          </Card>

          {/* Results */}
          <Card className="border-primary/20">
            <CardContent className="pt-6 space-y-6">
              <div className="text-center pb-4 border-b border-border">
                <p className="text-sm text-foreground/60 mb-1">Estimated Future Value</p>
                <p className="text-4xl font-bold text-primary">{formatINR(futureValue)}</p>
                <p className="text-xs text-foreground/50 mt-1">Based on the assumptions selected above</p>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-foreground/70">Total Amount Invested</span>
                  <span className="font-semibold text-foreground">{formatINR(invested)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-foreground/70">Estimated Growth</span>
                  <span className="font-semibold text-emerald-600">{formatINR(gain)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-foreground/70">Monthly SIP in Final Year</span>
                  <span className="font-semibold text-foreground">{formatINR(finalYearSip)}</span>
                </div>
                <div className="flex justify-between border-t border-border pt-3">
                  <span className="text-foreground/70">Estimated Future Value</span>
                  <span className="font-semibold text-foreground">{formatINR(futureValue)}</span>
                </div>
              </div>

              {/* Bar chart */}
              <div className="pt-2">
                <div className="h-52 flex items-end justify-center gap-10 px-4 border-b border-border">
                  <div className="flex flex-col items-center justify-end h-full">
                    <span className="text-xs font-semibold text-foreground mb-2">
                      {formatINR(invested)}
                    </span>
                    <div
                      className="w-20 rounded-t-md bg-primary/70 transition-all duration-200"
                      style={{
                        height: `${maxValue > 0 ? (invested / maxValue) * 100 : 0}%`,
                        minHeight: "4px",
                      }}
                    />
                  </div>
                  <div className="flex flex-col items-center justify-end h-full">
                    <span className="text-xs font-semibold text-amber-600 mb-2">
                      {formatINR(gain)}
                    </span>
                    <div
                      className="w-20 rounded-t-md bg-amber-500 transition-all duration-200"
                      style={{
                        height: `${maxValue > 0 ? (gain / maxValue) * 100 : 0}%`,
                        minHeight: "4px",
                      }}
                    />
                  </div>
                </div>
                <div className="flex justify-center gap-10 px-4 mt-2">
                  <span className="w-20 text-center text-xs text-foreground/60">
                    Amount Invested
                  </span>
                  <span className="w-20 text-center text-xs text-foreground/60">
                    Estimated Growth
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Year-by-Year SIP Schedule */}
        <Card className="border-primary/20 mt-8">
          <CardContent className="pt-6">
            <h2 className="text-xl font-bold text-primary mb-4">Year-by-Year SIP Schedule</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
              {schedule.map((item) => (
                <div
                  key={item.year}
                  className="rounded-lg border border-border bg-card px-3 py-2 text-center"
                >
                  <p className="text-xs text-foreground/60">Year {item.year}</p>
                  <p className="text-sm font-semibold text-foreground">
                    {formatINR(item.sip)}/month
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <p className="text-sm text-foreground/60 italic mt-8 leading-relaxed">
          This calculator is for illustration and investor education only. Results are based on
          assumptions entered by the user and do not represent or guarantee actual or future
          returns. Mutual fund returns are market-linked and may vary. Mutual Fund investments
          are subject to market risks. Read all scheme-related documents carefully.
        </p>
      </main>
    </div>
  );
};

export default StepUpSipCalculator;
