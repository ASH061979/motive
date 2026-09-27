// Original English content of the two MotivWealth Learning Library documents,
// transcribed exactly from the source DOCX files (not translated).

export type NoteBlock =
  | { type: "h1"; text: string }
  | { type: "h2"; text: string }
  | { type: "p"; text: string }
  | { type: "bullets"; items: string[] }
  | { type: "kv"; items: string[] }
  | { type: "callout"; text: string }
  | { type: "dialogue"; lines: string[] };

export interface LearningNote {
  slug: string;
  title: string;
  tagline: string;
  kicker: string;
  blocks: NoteBlock[];
  about: string;
  disclaimer: string;
}

const ABOUT =
  "MotivWealth is the brand name used by Meghna Prakash, an AMFI-registered Mutual Fund Distributor (ARN-330963 | EUIN-E628002). MotivWealth / Meghna Prakash is not presented as a SEBI-registered Investment Adviser.";
const DISCLAIMER =
  "Mutual Fund investments are subject to market risks. Read all scheme-related documents carefully.";

export const newToMutualFunds: LearningNote = {
  slug: "new-to-mutual-funds-start-here",
  title: "New to Mutual Funds? Start Here.",
  tagline:
    "Mutual funds don't have to feel complicated. Let's understand the basics - one simple question at a time.",
  kicker: "A beginner-friendly guide from MotivWealth",
  blocks: [
    {
      type: "h1",
      text: "“I've heard about mutual funds. But I don't really understand them.”",
    },
    {
      type: "p",
      text: "If that sounds familiar, you're not alone. Perhaps you've heard friends talking about SIPs. Maybe you've seen advertisements about mutual funds. Or perhaps you've been meaning to start investing but aren't quite sure where to begin.",
    },
    {
      type: "p",
      text: "Then you come across words like NAV, equity, debt, expense ratio, Riskometer, Regular Plan and Direct Plan - and something that should be straightforward suddenly starts feeling complicated.",
    },
    { type: "p", text: "It doesn't need to." },
    {
      type: "p",
      text: "At MotivWealth, we believe you don't have to become a financial expert before you start thinking about investing. You just need to understand a few important things:",
    },
    {
      type: "bullets",
      items: [
        "What am I investing in?",
        "Why am I investing?",
        "How long can I stay invested?",
        "What risks am I taking?",
      ],
    },
    { type: "p", text: "So let's start at the beginning." },
    {
      type: "h1",
      text: "“Okay Meghna, first things first. What exactly is a mutual fund?”",
    },
    {
      type: "p",
      text: "Think of a mutual fund as a pool of money contributed by many investors. That money is invested according to the objective of the particular mutual fund scheme.",
    },
    {
      type: "p",
      text: "Depending on the scheme, the money may be invested in shares of companies, bonds and other debt securities, money-market instruments, or a combination of different assets.",
    },
    {
      type: "p",
      text: "Instead of you having to select and manage every individual security yourself, the mutual fund portfolio is managed professionally according to the scheme's stated investment objective. When you invest, you receive units of that mutual fund scheme.",
    },
    {
      type: "callout",
      text: "Meghna explains: Think of the mutual fund as the vehicle. You don't need to memorise every vehicle available - first understand where you want to go.",
    },
    { type: "h1", text: "“Can you give me a really simple example?”" },
    {
      type: "p",
      text: "Of course. Imagine you invest ₹10,000 in a mutual fund. Thousands of other investors may also invest in the same scheme. The fund pools that money and invests it according to the scheme's investment strategy.",
    },
    {
      type: "kv",
      items: [
        "You invest ₹10,000",
        "You receive units",
        "The fund invests as per its objective",
        "Your unit value can rise or fall",
      ],
    },
    {
      type: "p",
      text: "If the value of the underlying investments rises, the value of your investment may rise. If their value falls, your investment may fall too. That is why mutual fund returns are market-linked and are not guaranteed.",
    },
    { type: "h1", text: "“I've heard the word NAV. What does that mean?”" },
    {
      type: "p",
      text: "NAV stands for Net Asset Value. In simple terms, it represents the per-unit value of a mutual fund scheme.",
    },
    {
      type: "p",
      text: "For a very simplified illustration, if you invest ₹10,000 when the NAV is ₹50, you would receive approximately 200 units, ignoring applicable charges or adjustments for this simple example.",
    },
    { type: "p", text: "A lower NAV does not mean a mutual fund is cheaper or better." },
    {
      type: "p",
      text: "A fund with an NAV of ₹20 is not automatically a better investment than a fund with an NAV of ₹200. NAV by itself should not be used to decide which fund to invest in.",
    },
    {
      type: "callout",
      text: "Meghna explains: Don't choose a mutual fund simply because its NAV looks low. NAV alone tells you very little about whether a scheme is appropriate for you.",
    },
    { type: "h1", text: "“And what exactly is an SIP?”" },
    {
      type: "p",
      text: "SIP stands for Systematic Investment Plan. An SIP is simply a way of investing a specified amount into a mutual fund scheme at regular intervals.",
    },
    { type: "p", text: "For example: ₹5,000 every month" },
    {
      type: "p",
      text: "Instead of investing a large amount at one time, you invest regularly. The important point is that an SIP is not a separate investment product. You are investing in a mutual fund through an SIP.",
    },
    {
      type: "dialogue",
      lines: [
        "Investor: So when I say, “I've invested in an SIP,” that's not quite accurate?",
        "Meghna: Exactly. SIP is the method. The mutual fund scheme is the investment.",
      ],
    },
    {
      type: "h1",
      text: "“Then should I invest through SIP or put in a lumpsum?”",
    },
    {
      type: "p",
      text: "They are simply two different ways of investing. With an SIP, you invest periodically - for example, every month. With a lumpsum investment, you invest a larger amount at one time.",
    },
    {
      type: "p",
      text: "Neither method automatically guarantees a better return. What may be appropriate depends on factors such as how much money you have available, why you are investing, your investment horizon and your ability to tolerate market fluctuations.",
    },
    { type: "h1", text: "“Are all mutual funds basically the same?”" },
    {
      type: "p",
      text: "No. There are many categories, but a beginner can start by understanding three broad groups.",
    },
    { type: "h2", text: "Equity Mutual Funds" },
    {
      type: "p",
      text: "Invest predominantly in equities. Their values can fluctuate significantly with markets, so they generally involve greater market risk and are commonly considered for longer investment horizons.",
    },
    { type: "h2", text: "Debt Mutual Funds" },
    {
      type: "p",
      text: "Invest predominantly in debt and money-market instruments. They may fluctuate differently from equity funds but should not be assumed to be risk-free. Debt funds can carry risks such as interest-rate risk and credit risk.",
    },
    { type: "h2", text: "Hybrid Mutual Funds" },
    {
      type: "p",
      text: "Invest across more than one asset class, commonly combining equity and debt in different proportions. Their risk depends on how the particular scheme invests.",
    },
    {
      type: "callout",
      text: "Meghna explains: You don't need to memorise every mutual fund category before you begin. First understand what equity, debt and hybrid broadly mean. We can build from there.",
    },
    {
      type: "h1",
      text: "“But Meghna... can I actually lose money?”",
    },
    { type: "p", text: "Yes." },
    {
      type: "p",
      text: "Mutual funds are market-linked investments. Their value can rise and fall, and different schemes carry different types and levels of risk.",
    },
    {
      type: "p",
      text: "That's why one of the least useful questions for a beginner is: “Which mutual fund gives the highest return?”",
    },
    { type: "p", text: "More useful questions are:" },
    {
      type: "bullets",
      items: [
        "What am I investing for?",
        "When will I need the money?",
        "How much fluctuation can I reasonably tolerate?",
        "What role will this investment play in my overall finances?",
      ],
    },
    { type: "p", text: "The MotivWealth approach: Start with the investor. Not the fund." },
    {
      type: "h1",
      text: "“When people say a mutual fund is risky, what does that actually mean?”",
    },
    {
      type: "p",
      text: "Risk does not simply mean, “Will I lose all my money?” It can include the possibility that your investment falls in value, does not generate the return you assumed, fluctuates significantly when you need the money, or does not keep pace with your financial goal.",
    },
    {
      type: "p",
      text: "Before investing, understand the scheme's objective, look at its Riskometer and read the relevant scheme documents.",
    },
    {
      type: "callout",
      text: "Meghna explains: Risk isn't something to be frightened of or ignored. It is something to understand.",
    },
    {
      type: "h1",
      text: "“What are Regular and Direct Plans? I keep seeing both.”",
    },
    {
      type: "p",
      text: "Mutual fund schemes generally offer Regular Plans and Direct Plans. This is an important distinction to understand before you invest.",
    },
    { type: "h2", text: "Regular Plan" },
    {
      type: "p",
      text: "When you invest in a Regular Plan through a mutual fund distributor such as MotivWealth, the distributor may receive commission from the Asset Management Company.",
    },
    { type: "h2", text: "Direct Plan" },
    {
      type: "p",
      text: "A Direct Plan does not involve distributor commission and generally has a lower expense ratio than the corresponding Regular Plan.",
    },
    { type: "h1", text: "“Expense ratio? That's another new term.”" },
    {
      type: "p",
      text: "Managing and operating a mutual fund involves expenses. The Total Expense Ratio (TER) represents expenses charged to the scheme in accordance with applicable regulations. These expenses affect the scheme's NAV and therefore ultimately affect investor returns.",
    },
    {
      type: "p",
      text: "Expense ratios can differ between schemes and between Regular and Direct Plans. You don't need to become an expert in TER calculations today. The important takeaway is simple: costs matter, so understand them before you invest.",
    },
    { type: "h1", text: "“Can anyone tell me what return I will get?”" },
    { type: "p", text: "No one can guarantee the future return of a mutual fund." },
    {
      type: "p",
      text: "Past performance does not guarantee future performance. And when you use a calculator showing what an investment could become, the result depends entirely on the assumptions used.",
    },
    {
      type: "p",
      text: "That is why MotivWealth calculators ask you to choose an assumed annual return. The result is an illustration - not a prediction.",
    },
    { type: "h1", text: "“How long should I stay invested?”" },
    {
      type: "p",
      text: "There isn't one correct holding period for every mutual fund or every investor. Think about when you will need the money.",
    },
    {
      type: "p",
      text: "Money you may need relatively soon should not necessarily be approached in the same way as money being accumulated for a goal many years away. Your investment horizon should be considered alongside the nature and risk of the investment.",
    },
    {
      type: "callout",
      text: "Meghna explains: Before asking how long you should hold a fund, ask when you actually need the money. Your goal gives the investment a purpose.",
    },
    { type: "h1", text: "“So where should I actually begin?”" },
    {
      type: "p",
      text: "Before choosing a mutual fund, ask yourself five simple questions:",
    },
    {
      type: "p",
      text: "1. What am I investing for? Retirement? Your child's education? A future home? Long-term wealth creation? Greater financial independence?",
    },
    { type: "p", text: "2. When will I need the money? Your time horizon matters." },
    {
      type: "p",
      text: "3. How much can I invest comfortably? Investing should fit into your broader financial life.",
    },
    {
      type: "p",
      text: "4. How much fluctuation can I tolerate? Understanding your comfort with risk matters.",
    },
    { type: "p", text: "5. Do I understand what I'm investing in? Never hesitate to ask questions." },
    {
      type: "p",
      text: "Don't begin with: “Which mutual fund should I buy?” Begin with: “What am I investing for?”",
    },
    {
      type: "p",
      text: "Once the purpose becomes clearer, it becomes easier to think about the amount, investment horizon and risk involved.",
    },
    { type: "h1", text: "That's enough for today." },
    {
      type: "p",
      text: "Seriously. You don't need to understand every mutual fund category, ratio and acronym in one sitting.",
    },
    {
      type: "p",
      text: "If you've reached this point, you already understand some of the most important basics: a mutual fund is the investment; an SIP is a way of investing; returns are not guaranteed; risk matters; costs matter; and your goal should come before choosing a fund.",
    },
    { type: "p", text: "That's a good place to start." },
    { type: "h1", text: "What would you like to understand next?" },
    {
      type: "bullets",
      items: [
        "What is an SIP and How Does It Work?",
        "Equity, Debt & Hybrid Funds - Simply Explained",
        "Understanding Risk Before You Invest",
        "Goal-Based Investing: Giving Your Money a Purpose",
      ],
    },
    {
      type: "p",
      text: "Still thinking, “I understand this better now, but I'm not sure where to start?” That's perfectly fine. Learning comes before investing. If you would like help understanding the mutual fund investment process or the options available through MotivWealth, you can speak with Meghna.",
    },
  ],
  about: ABOUT,
  disclaimer: DISCLAIMER,
};

export const whatIsAnSip: LearningNote = {
  slug: "what-is-an-sip-and-how-does-it-work",
  title: "What is an SIP and How Does It Work?",
  tagline: "A simple way to understand regular investing - without the jargon.",
  kicker: "A beginner-friendly guide from MotivWealth",
  blocks: [
    {
      type: "h1",
      text: "“I keep hearing about SIPs. What exactly am I signing up for?”",
    },
    {
      type: "p",
      text: "If you are new to mutual funds, SIP is one of the first terms you are likely to hear. The good news is that the idea is much simpler than the name sounds.",
    },
    {
      type: "p",
      text: "SIP stands for Systematic Investment Plan. It is a method of investing a chosen amount into a mutual fund scheme at regular intervals - commonly every month.",
    },
    {
      type: "callout",
      text: "Meghna explains: An SIP is not a separate investment product. The mutual fund scheme is the investment; SIP is simply the way you invest in it regularly.",
    },
    { type: "h1", text: "“Can you show me with a simple example?”" },
    {
      type: "p",
      text: "Suppose you decide to invest ₹5,000 every month into a mutual fund scheme through an SIP. Instead of trying to find one “perfect” day to invest a large amount, you invest ₹5,000 at the chosen interval.",
    },
    {
      type: "kv",
      items: [
        "Every month ₹5,000",
        "Your money buys units of the scheme",
        "The fund invests as per its stated objective",
        "The value of your units can rise or fall",
      ],
    },
    {
      type: "p",
      text: "The number of units you receive depends on the scheme’s NAV at the time your investment is processed. When the NAV is lower, the same ₹5,000 generally buys more units; when the NAV is higher, it buys fewer units.",
    },
    {
      type: "h1",
      text: "“Is that what people mean by rupee-cost averaging?”",
    },
    {
      type: "p",
      text: "Yes. Because you invest the same amount at different market levels, you naturally buy more units when prices are lower and fewer units when prices are higher. This is commonly called rupee-cost averaging.",
    },
    {
      type: "p",
      text: "It can reduce the need to decide the “right” market level for every monthly investment. But it does not remove market risk, and it does not guarantee a profit.",
    },
    { type: "h1", text: "“Why do people use SIPs?”" },
    {
      type: "bullets",
      items: [
        "Regular investing - A fixed schedule can make investing easier to continue as a habit.",
        "Start with a manageable amount - You do not necessarily need a large lumpsum before you begin. The minimum amount depends on the scheme and platform.",
        "Work towards long-term goals - SIPs can be used while investing towards goals such as retirement, education or long-term wealth creation.",
        "Flexibility - Depending on the scheme and applicable terms, SIP amounts or instructions can generally be changed or stopped.",
        "Less focus on market timing - Regular investing can help you avoid making every contribution dependent on a prediction about where the market will move next.",
      ],
    },
    { type: "h1", text: "“Does an SIP guarantee good returns?”" },
    { type: "p", text: "No." },
    {
      type: "p",
      text: "An SIP creates a regular investment process; it does not guarantee returns. Your investment remains exposed to the risks of the mutual fund scheme you choose. The value can rise or fall, and actual returns may differ significantly from illustrations or assumptions.",
    },
    {
      type: "callout",
      text: "Meghna explains: Discipline can be useful, but discipline does not make an investment risk-free. Always understand the scheme you are investing in.",
    },
    {
      type: "h1",
      text: "“How is SIP different from a lumpsum investment?”",
    },
    {
      type: "p",
      text: "With an SIP, you invest periodically. With a lumpsum, you invest a larger amount at one time. Neither method is automatically better. The choice can depend on your available money, goal, time horizon and comfort with market fluctuations.",
    },
    { type: "h1", text: "“How long should I continue an SIP?”" },
    {
      type: "p",
      text: "There is no single period that is right for everyone. Start with the purpose of the investment. If the money is meant for a long-term goal, your time horizon may be very different from money you expect to need soon.",
    },
    {
      type: "p",
      text: "Also remember: a long SIP period does not make every mutual fund suitable for every goal. The nature and risk of the underlying scheme still matter.",
    },
    { type: "h1", text: "“Can I increase my SIP later?”" },
    {
      type: "p",
      text: "In many cases, investors choose to increase their regular investment as their income and ability to invest grow. This is often called a Step-Up SIP. Whether and how you can change an SIP depends on the applicable scheme and platform process.",
    },
    {
      type: "p",
      text: "MotivWealth’s Step-Up SIP Calculator can help you illustrate how increasing a monthly investment over time changes the numbers - based on assumptions you choose.",
    },
    { type: "h1", text: "So what should I remember?" },
    {
      type: "bullets",
      items: [
        "A mutual fund scheme is the investment; SIP is the method of investing regularly.",
        "Your SIP buys units at the applicable NAV, so the number of units can vary from one instalment to another.",
        "Regular investing can encourage discipline and reduce the need to time every contribution.",
        "Rupee-cost averaging does not eliminate risk or guarantee profit.",
        "Choose an SIP because it fits your goal and investment plan - not simply because “everyone is doing SIPs.”",
      ],
    },
    {
      type: "callout",
      text: "A simple thought from Meghna: “Starting small is perfectly fine. What matters is understanding why you are investing, choosing an appropriate investment, and building a habit you can sustain.”",
    },
    { type: "h1", text: "Want to explore the numbers?" },
    {
      type: "p",
      text: "Try the MotivWealth SIP Calculator to see an illustration using a monthly investment, time period and assumed rate of return selected by you. You can also explore the Step-Up SIP Calculator if you want to see the effect of increasing the monthly amount over time.",
    },
  ],
  about: ABOUT,
  disclaimer: DISCLAIMER,
};

export const learningNotes: Record<string, LearningNote> = {
  "new-to-mutual-funds-start-here": newToMutualFunds,
  "what-is-an-sip-and-how-does-it-work": whatIsAnSip,
};
