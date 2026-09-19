import { useMemo, useState } from "react";
import Navbar from "@/components/Navbar";
import PageBackground from "@/components/PageBackground";
import { Card, CardContent } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";

const formatINR = (value: number) =>
  "₹" + Math.round(value).toLocaleString("en-IN");

const LumpsumCalculator = () => {
  const [amount, setAmount] = useState(100000);
  const [annualReturn, setAnnualReturn] = useState(12);
  const [years, setYears] = useState(10);
  const [isEditingAmount, setIsEditingAmount] = useState(false);
  const [amountInput, setAmountInput] = useState(String(amount));

  const { invested, gain, futureValue } = useMemo(() => {
    if (annualReturn === 0) {
      return { invested: amount, gain: 0, futureValue: amount };
    }
    const fv = amount * Math.pow(1 + annualReturn / 100, years);
    return {
      invested: amount,
      gain: Math.max(fv - amount, 0),
      futureValue: fv,
    };
  }, [amount, annualReturn, years]);

  const maxValue = Math.max(invested, gain);

  const clamp = (val: number, min: number, max: number) =>
    Math.min(Math.max(val, min), max);

  return (
    <div className="min-h-screen">
      <PageBackground variant="resources" />
      <Navbar />
      <main className="container mx-auto px-4 py-12 max-w-4xl">
        <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4">Lumpsum Calculator</h1>
        <p className="text-foreground/70 text-lg mb-10">
          See how a one-time investment could build over time based on an assumed rate of return.
        </p>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Inputs */}
          <Card className="border-primary/20">
            <CardContent className="pt-6 space-y-8">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <label className="font-medium text-foreground">Investment Amount (₹)</label>
                  <Input
                    type="text"
                    inputMode="numeric"
                    value={isEditingAmount ? amountInput : formatINR(amount)}
                    onFocus={() => {
                      setIsEditingAmount(true);
                      setAmountInput(String(amount));
                    }}
                    onChange={(e) => {
                      const digits = e.target.value.replace(/\D/g, "");
                      setAmountInput(digits);
                      if (digits) setAmount(Number(digits));
                    }}
                    onBlur={() => {
                      const nextAmount = clamp(Number(amountInput) || 1000, 1000, 100000000);
                      setAmount(nextAmount);
                      setAmountInput(String(nextAmount));
                      setIsEditingAmount(false);
                    }}
                    className="w-36 text-right"
                  />
                </div>
                <Slider
                  value={[amount]}
                  min={1000}
                  max={10000000}
                  step={1000}
                  onValueChange={([v]) => setAmount(v)}
                />
                <p className="text-xs text-foreground/50 mt-1">Minimum ₹1,000</p>
              </div>

              <div>
                <div className="flex items-center justify-between mb-3">
                  <label className="font-medium text-foreground">Assumed Annual Return (%)</label>
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
                    Estimated Gain
                  </span>
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

export default LumpsumCalculator;
