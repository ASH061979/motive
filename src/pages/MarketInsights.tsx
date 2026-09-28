import { LineChart, Receipt, BarChart3, Newspaper, ShieldCheck, Landmark, ArrowUpRight, Info } from "lucide-react";
import Navbar from "@/components/Navbar";

const cards = [
  { icon: LineChart, title: "NSE Market Data", desc: "View current Indian equity market and index information from NSE.", cta: "Visit NSE", url: "https://www.nseindia.com/market-data/live-equity-market" },
  { icon: Receipt, title: "Latest Mutual Fund NAVs", desc: "Check the latest and historical mutual fund NAV information published by AMFI.", cta: "Check NAVs", url: "https://www.amfiindia.com/net-asset-value" },
  { icon: BarChart3, title: "Mutual Fund Industry Data", desc: "Explore AUM, industry trends and other Indian mutual fund statistics published by AMFI.", cta: "Explore AMFI Data", url: "https://www.amfiindia.com/research-information" },
  { icon: Newspaper, title: "Market News", desc: "Follow current financial-market news and developments through ET Markets.", cta: "View Market News", url: "https://economictimes.indiatimes.com/markets" },
  { icon: ShieldCheck, title: "SEBI Investor Resources", desc: "Access investor education, awareness and investor-protection resources from SEBI.", cta: "Visit SEBI Investor", url: "https://investor.sebi.gov.in/" },
  { icon: Landmark, title: "RBI Rates & Updates", desc: "Follow monetary-policy developments, interest rates and other information published by the Reserve Bank of India.", cta: "Visit RBI", url: "https://www.rbi.org.in/" },
];

const MarketInsights = () => (
  <div className="min-h-screen">
    <Navbar />
    <main className="container mx-auto px-4 pt-32 pb-16">
      <h1 className="text-4xl md:text-5xl font-bold text-primary mb-3">Market Insights</h1>
      <p className="text-muted-foreground text-lg mb-10">Useful links to official market, mutual fund, regulatory and economic information.</p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {cards.map(({ icon: Icon, title, desc, cta, url }) => (
          <div key={title} className="flex flex-col h-full rounded-2xl border border-border bg-card p-6 shadow-sm hover:shadow-md hover:border-primary transition-all">
            <Icon className="w-10 h-10 text-primary mb-4" strokeWidth={1.5} />
            <h2 className="text-xl font-semibold text-foreground mb-2">{title}</h2>
            <p className="text-muted-foreground text-sm leading-relaxed flex-1">{desc}</p>
            <a href={url} target="_blank" rel="noopener noreferrer" className="mt-6 inline-flex items-center gap-1.5 self-start rounded-full bg-primary px-5 py-2 text-sm font-medium text-primary-foreground hover:opacity-90 transition-opacity">
              {cta} <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>
        ))}
      </div>
      <div className="mt-10 rounded-xl border border-border bg-muted/40 p-5 flex gap-3">
        <Info className="w-5 h-5 text-primary shrink-0 mt-0.5" />
        <div>
          <p className="font-semibold text-foreground mb-1">External Resources</p>
          <p className="text-sm text-muted-foreground leading-relaxed">The links above lead to third-party or official websites and are provided for general information and investor education. MotivWealth does not control the content or availability of external websites. Information available through these links should not be construed as investment advice or a recommendation.</p>
        </div>
      </div>
    </main>
  </div>
);

export default MarketInsights;
