import { useMemo, useState } from "react";
import Navbar from "@/components/Navbar";
import PageBackground from "@/components/PageBackground";
import { Card, CardContent } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { ChevronDown, ArrowRight, ArrowDown } from "lucide-react";

const formatINR = (value: number) =>
  "₹" + Math.round(Number.isFinite(value) ? Math.max(value, 0) : 0).toLocaleString("en-IN");

const clamp = (val: number, min: number, max: number) =>
  Math.min(Math.max(val, min), max);

/**
 * Month-by-month simulation: given a starting corpus of 1 unit of the first
 * month's expense, how many units of "first retirement month expense" are
 * needed so the corpus lands at zero at life expectancy?
 * We simulate the present value of the inflation-growing withdrawal stream
 * discounted at the post-retirement return, month by month.
 */
const requiredCorpus = (
  firstMonthExpense: number,
  retirementMonths: number,
  annualReturnPost: number,
  annualInflation: number
) => {
  const r = annualReturnPost / 12 / 100;
  const i = annualInflation / 12 / 100;
  let pv = 0;
  let expense = firstMonthExpense;
  let discount = 1;
  for (let m = 0; m < retirementMonths; m++) {
    pv += expense / discount;
    expense *= 1 + i;
    discount *= 1 + r;
  }
  return Number.isFinite(pv) ? Math.max(pv, 0) : 0;
};

const RetirementCalculator = () => {
  const [currentAge, setCurrentAge] = useState(35);
  const [retirementAge, setRetirementAge] = useState(60);
  const [lifeExpectancy, setLifeExpectancy] = useState(85);
  const [monthlyExpenses, setMonthlyExpenses] = useState(75000);
  const [existingSavings, setExistingSavings] = useState(0);
  const [inflation, setInflation] = useState(6);
  const [preReturn, setPreReturn] = useState(12);
  const [postReturn, setPostReturn] = useState(7);
  const [showAssumptions, setShowAssumptions] = useState(false);

  const safeRetirementAge = Math.max(retirementAge, currentAge + 1);
  const safeLifeExpectancy = Math.max(lifeExpectancy, safeRetirementAge + 1);

  const result = useMemo(() => {
    const yearsToRetire = safeRetirementAge - currentAge;
    const expensesAtRetirement =
      monthlyExpenses * Math.pow(1 + inflation / 100, yearsToRetire);
    const retirementMonths = (safeLifeExpectancy - safeRetirementAge) * 12;
    const corpus = requiredCorpus(
      expensesAtRetirement,
      retirementMonths,
      postReturn,
      inflation
    );

    // Grow existing retirement savings to retirement age using the same
    // pre-retirement return assumption (compound growth).
    const savingsAtRetirement =
      existingSavings * Math.pow(1 + preReturn / 100, yearsToRetire);

    const fundingGap = Math.max(corpus - savingsAtRetirement, 0);

    const n = yearsToRetire * 12;
    let sip: number;
    if (preReturn === 0) {
      sip = n > 0 ? fundingGap / n : 0;
    } else {
      const r = preReturn / 12 / 100;
      const factor = ((Math.pow(1 + r, n) - 1) / r) * (1 + r);
      sip = factor > 0 ? fundingGap / factor : 0;
    }

    const totalContributions = sip * n;

    return {
      yearsToRetire,
      expensesAtRetirement,
      corpus,
      savingsAtRetirement: Number.isFinite(savingsAtRetirement)
        ? Math.max(savingsAtRetirement, 0)
        : 0,
      fundingGap,
      sip: Number.isFinite(sip) ? Math.max(sip, 0) : 0,
      totalContributions: Number.isFinite(totalContributions)
        ? Math.max(totalContributions, 0)
        : 0,
      retirementMonths,
    };
  }, [
    currentAge,
    safeRetirementAge,
    safeLifeExpectancy,
    monthlyExpenses,
    existingSavings,
    inflation,
    preReturn,
    postReturn,
  ]);

  const savingsSufficient =
    existingSavings > 0 && result.savingsAtRetirement >= result.corpus;

  const journey = [
    {
      label: "TODAY",
      headline: `Age ${currentAge}`,
      value: `${formatINR(monthlyExpenses)}/month`,
      caption: "Current monthly expenses",
    },
    {
      label: "RETIREMENT",
      headline: `Age ${safeRetirementAge}`,
      value: `${formatINR(result.expensesAtRetirement)}/month`,
      caption: "Estimated monthly expenses",
    },
    {
      label: "CORPUS REQUIRED",
      headline: formatINR(result.corpus),
      value: null as string | null,
      caption: "Estimated retirement corpus",
    },
    {
      label: "MONTHLY INVESTMENT",
      headline: `${formatINR(result.sip)}/month`,
      value: null as string | null,
      caption: "Estimated SIP required",
    },
  ];

  return (
    <div className="min-h-screen">
      <PageBackground variant="resources" />
      <Navbar />
      <main className="container mx-auto px-4 py-12 max-w-4xl">
        <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4">
          Retirement Calculator
        </h1>
        <p className="text-foreground/70 text-lg mb-10">
          Estimate the corpus you may need at retirement and the monthly investment that could work
          towards it.
        </p>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Inputs */}
          <Card className="border-primary/20">
            <CardContent className="pt-6 space-y-8">
              <div>
                <h2 className="text-lg font-semibold text-primary mb-5">Your Retirement</h2>

                <div className="space-y-6">
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <label className="font-medium text-foreground">Current Age</label>
                      <Input
                        type="number"
                        min={18}
                        max={70}
                        value={currentAge}
                        onChange={(e) =>
                          setCurrentAge(clamp(Number(e.target.value) || 18, 18, 70))
                        }
                        className="w-24 text-right"
                      />
                    </div>
                    <Slider
                      value={[currentAge]}
                      min={18}
                      max={70}
                      step={1}
                      onValueChange={([v]) => setCurrentAge(v)}
                    />
                    <p className="text-xs text-foreground/50 mt-1">18–70 years</p>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <label className="font-medium text-foreground">Retirement Age</label>
                      <Input
                        type="number"
                        min={currentAge + 1}
                        max={80}
                        value={safeRetirementAge}
                        onChange={(e) =>
                          setRetirementAge(
                            clamp(Number(e.target.value) || currentAge + 1, currentAge + 1, 80)
                          )
                        }
                        className="w-24 text-right"
                      />
                    </div>
                    <Slider
                      value={[safeRetirementAge]}
                      min={currentAge + 1}
                      max={80}
                      step={1}
                      onValueChange={([v]) => setRetirementAge(v)}
                    />
                    <p className="text-xs text-foreground/50 mt-1">
                      Must be greater than current age
                    </p>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <label className="font-medium text-foreground">Life Expectancy</label>
                      <Input
                        type="number"
                        min={safeRetirementAge + 1}
                        max={100}
                        value={safeLifeExpectancy}
                        onChange={(e) =>
                          setLifeExpectancy(
                            clamp(
                              Number(e.target.value) || safeRetirementAge + 1,
                              safeRetirementAge + 1,
                              100
                            )
                          )
                        }
                        className="w-24 text-right"
                      />
                    </div>
                    <Slider
                      value={[safeLifeExpectancy]}
                      min={safeRetirementAge + 1}
                      max={100}
                      step={1}
                      onValueChange={([v]) => setLifeExpectancy(v)}
                    />
                    <p className="text-xs text-foreground/50 mt-1">
                      Must be greater than retirement age · up to 100
                    </p>
                  </div>
                </div>
              </div>

              <div className="border-t border-border pt-6">
                <h2 className="text-lg font-semibold text-primary mb-5">Your Expenses</h2>

                <div className="space-y-6">
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <label className="font-medium text-foreground">
                        Current Monthly Expenses (₹)
                      </label>
                      <Input
                        type="number"
                        min={1000}
                        value={monthlyExpenses}
                        onChange={(e) =>
                          setMonthlyExpenses(
                            clamp(Number(e.target.value) || 1000, 1000, 10000000)
                          )
                        }
                        className="w-32 text-right"
                      />
                    </div>
                    <Slider
                      value={[monthlyExpenses]}
                      min={5000}
                      max={1000000}
                      step={1000}
                      onValueChange={([v]) => setMonthlyExpenses(v)}
                    />
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <label className="font-medium text-foreground">
                        Existing Retirement Savings (₹)
                      </label>
                      <Input
                        type="number"
                        min={0}
                        value={existingSavings}
                        onChange={(e) =>
                          setExistingSavings(
                            clamp(Number(e.target.value) || 0, 0, 1000000000)
                          )
                        }
                        className="w-32 text-right"
                      />
                    </div>
                    <Slider
                      value={[existingSavings]}
                      min={0}
                      max={50000000}
                      step={10000}
                      onValueChange={([v]) => setExistingSavings(v)}
                    />
                    <p className="text-xs text-foreground/50 mt-1">
                      Money already earmarked specifically for retirement
                    </p>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <label className="font-medium text-foreground">Assumed Inflation (%)</label>
                      <Input
                        type="number"
                        min={0}
                        max={15}
                        value={inflation}
                        onChange={(e) => setInflation(clamp(Number(e.target.value) || 0, 0, 15))}
                        className="w-24 text-right"
                      />
                    </div>
                    <Slider
                      value={[inflation]}
                      min={0}
                      max={15}
                      step={0.5}
                      onValueChange={([v]) => setInflation(v)}
                    />
                    <p className="text-xs text-foreground/50 mt-1">Assumption only · 0%–15%</p>
                  </div>
                </div>
              </div>

              <div className="border-t border-border pt-6">
                <h2 className="text-lg font-semibold text-primary mb-5">Investment Assumptions</h2>

                <div className="space-y-6">
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <label className="font-medium text-foreground">
                        Assumed Return Before Retirement (%)
                      </label>
                      <Input
                        type="number"
                        min={0}
                        max={30}
                        value={preReturn}
                        onChange={(e) => setPreReturn(clamp(Number(e.target.value) || 0, 0, 30))}
                        className="w-24 text-right"
                      />
                    </div>
                    <Slider
                      value={[preReturn]}
                      min={0}
                      max={30}
                      step={0.5}
                      onValueChange={([v]) => setPreReturn(v)}
                    />
                    <p className="text-xs text-foreground/50 mt-1">
                      Assumed return while building your retirement corpus · For illustration only
                    </p>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <label className="font-medium text-foreground">
                        Assumed Return During Retirement (%)
                      </label>
                      <Input
                        type="number"
                        min={0}
                        max={20}
                        value={postReturn}
                        onChange={(e) => setPostReturn(clamp(Number(e.target.value) || 0, 0, 20))}
                        className="w-24 text-right"
                      />
                    </div>
                    <Slider
                      value={[postReturn]}
                      min={0}
                      max={20}
                      step={0.5}
                      onValueChange={([v]) => setPostReturn(v)}
                    />
                    <p className="text-xs text-foreground/50 mt-1">
                      Assumed return on the remaining corpus during retirement · For illustration
                      only
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Results */}
          <Card className="border-primary/20">
            <CardContent className="pt-6 space-y-6">
              <div className="text-center pb-4 border-b border-border">
                <p className="text-sm text-foreground/60 mb-1">
                  Estimated Retirement Corpus Required
                </p>
                <p className="text-4xl font-bold text-primary">{formatINR(result.corpus)}</p>
                <p className="text-xs text-foreground/50 mt-2">
                  Based on the assumptions selected above
                </p>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-foreground/70">Years Until Retirement</span>
                  <span className="font-semibold text-foreground">
                    {result.yearsToRetire} years
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-foreground/70">Today's Monthly Expenses</span>
                  <span className="font-semibold text-foreground">
                    {formatINR(monthlyExpenses)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-foreground/70">Est. Monthly Expenses at Retirement</span>
                  <span className="font-semibold text-foreground">
                    {formatINR(result.expensesAtRetirement)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-foreground/70">Est. Retirement Corpus Required</span>
                  <span className="font-semibold text-foreground">{formatINR(result.corpus)}</span>
                </div>
                {existingSavings > 0 && (
                  <>
                    <div className="flex justify-between">
                      <span className="text-foreground/70">
                        Est. Value of Existing Savings at Retirement
                      </span>
                      <span className="font-semibold text-foreground">
                        {formatINR(result.savingsAtRetirement)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-foreground/70">Retirement Funding Gap</span>
                      <span className="font-semibold text-foreground">
                        {formatINR(result.fundingGap)}
                      </span>
                    </div>
                  </>
                )}
                <div className="flex justify-between border-t border-border pt-3">
                  <span className="text-foreground/70">Estimated Monthly SIP Required</span>
                  <span className="font-semibold text-emerald-600">
                    {formatINR(result.sip)}/month
                  </span>
                </div>
                {savingsSufficient && (
                  <p className="text-sm text-emerald-700 bg-emerald-50 border border-emerald-200 rounded-md px-3 py-2 leading-relaxed">
                    Based on the assumptions selected, your existing retirement savings may be
                    sufficient to meet the estimated retirement corpus.
                  </p>
                )}
              </div>

              {/* Your Retirement Journey */}
              <div className="pt-2">
                <h3 className="text-sm font-semibold text-primary mb-4 text-center">
                  Your Retirement Journey
                </h3>
                <div className="flex flex-col md:flex-row items-stretch md:items-center justify-center gap-2">
                  {journey.map((stage, idx) => (
                    <div key={stage.label} className="flex items-center gap-2 md:flex-1 md:min-w-0">
                      <div className="flex-1 md:min-w-0 rounded-lg border border-primary/20 bg-background px-2 py-3 text-center">
                        <p className="text-[10px] font-semibold tracking-wide text-primary/80 leading-tight">
                          {stage.label}
                        </p>
                        <p className="text-xs font-bold text-foreground mt-1 break-words">
                          {stage.headline}
                        </p>
                        {stage.value && (
                          <p className="text-xs font-semibold text-foreground break-words">
                            {stage.value}
                          </p>
                        )}
                        <p className="text-[10px] text-foreground/50 mt-1 leading-tight">
                          {stage.caption}
                        </p>
                      </div>
                      {idx < journey.length - 1 && (
                        <>
                          <ArrowRight className="hidden md:block h-4 w-4 shrink-0 text-primary/50" />
                          <ArrowDown className="md:hidden h-4 w-4 shrink-0 text-primary/50 self-center" />
                        </>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Assumptions Used */}
              <div className="border-t border-border pt-4">
                <button
                  type="button"
                  onClick={() => setShowAssumptions((v) => !v)}
                  className="flex w-full items-center justify-between text-left font-medium text-primary"
                >
                  Assumptions Used
                  <ChevronDown
                    className={`h-4 w-4 transition-transform ${showAssumptions ? "rotate-180" : ""}`}
                  />
                </button>
                {showAssumptions && (
                  <div className="mt-3 space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-foreground/70">Inflation</span>
                      <span className="text-foreground">{inflation}% p.a.</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-foreground/70">Pre-Retirement Return</span>
                      <span className="text-foreground">{preReturn}% p.a.</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-foreground/70">Post-Retirement Return</span>
                      <span className="text-foreground">{postReturn}% p.a.</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-foreground/70">Retirement Age</span>
                      <span className="text-foreground">{safeRetirementAge}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-foreground/70">Life Expectancy</span>
                      <span className="text-foreground">{safeLifeExpectancy}</span>
                    </div>
                    {existingSavings > 0 && (
                      <div className="flex justify-between">
                        <span className="text-foreground/70">Existing Retirement Savings</span>
                        <span className="text-foreground">{formatINR(existingSavings)}</span>
                      </div>
                    )}
                    <p className="text-xs text-foreground/60 pt-2 leading-relaxed">
                      These are assumptions selected by you for illustration. They are not actual or
                      expected investment performance.
                    </p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        <p className="text-sm text-foreground/60 italic mt-8 leading-relaxed">
          This retirement calculator is for illustration and investor education only. Results are
          based on assumptions selected by the user and do not constitute investment advice or
          guarantee that the estimated corpus or investment amount will be sufficient for
          retirement. Actual expenses, inflation, investment returns, taxation and personal
          circumstances may differ materially from the assumptions used. Mutual Fund investments are
          subject to market risks. Read all scheme-related documents carefully.
        </p>
      </main>
    </div>
  );
};

export default RetirementCalculator;
