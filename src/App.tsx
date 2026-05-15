/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion, AnimatePresence } from "motion/react";
import { 
  ArrowRight, 
  BarChart3, 
  ShieldCheck, 
  Zap, 
  Globe, 
  Users, 
  Smartphone, 
  CheckCircle2, 
  ChevronDown, 
  Menu, 
  X, 
  Wallet, 
  TrendingUp, 
  Lock, 
  HelpCircle,
  Mail,
  Twitter,
  Github,
  MessageSquare,
  DollarSign
} from "lucide-react";
import React, { useState, useEffect, useRef, memo } from "react";

// TradingView Chart Component
const TradingViewWidget = memo(({ symbol }: { symbol: string }) => {
  const container = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const currentContainer = container.current;
    if (!currentContainer) return;
    
    // Create new script element
    const script = document.createElement("script");
    script.src = "https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js";
    script.type = "text/javascript";
    script.async = true;
    // Cross-origin attribute to help with "Script error" visibility
    script.crossOrigin = "anonymous";
    
    script.innerHTML = JSON.stringify({
      "autosize": true,
      "symbol": `BINANCE:${symbol}USDT`,
      "interval": "D",
      "timezone": "Etc/UTC",
      "theme": "dark",
      "style": "1",
      "locale": "en",
      "enable_publishing": false,
      "allow_symbol_change": true,
      "calendar": false,
      "support_host": "https://www.tradingview.com"
    });
    
    // Clear previous and append new
    currentContainer.innerHTML = "";
    currentContainer.appendChild(script);

    return () => {
      if (currentContainer) {
        currentContainer.innerHTML = "";
      }
    };
  }, [symbol]);

  return (
    <div className="tradingview-widget-container h-[500px] w-full overflow-hidden" ref={container}>
      <div className="tradingview-widget-container__widget h-full w-full"></div>
    </div>
  );
});

// Types for Market Data
interface MarketCoin {
  symbol: string;
  name: string;
  price: string;
  change: string;
  isUp: boolean;
}

const MARKET_DATA: MarketCoin[] = [
  { symbol: "BTC", name: "Bitcoin", price: "64,231.50", change: "+2.45%", isUp: true },
  { symbol: "ETH", name: "Ethereum", price: "3,421.20", change: "-0.12%", isUp: false },
  { symbol: "BNB", name: "BNB", price: "592.10", change: "+1.20%", isUp: true },
  { symbol: "SOL", name: "Solana", price: "145.82", change: "+5.67%", isUp: true },
  { symbol: "ADA", name: "Cardano", price: "0.42", change: "-1.10%", isUp: false },
];

const TRUST_STATS = [
  { label: "Registered Users", value: "180M+" },
  { label: "24h Trading Volume", value: "$65B+" },
  { label: "Countries Supported", value: "180+" },
  { label: "Assets Listed", value: "350+" },
];

const WHY_BINANCE = [
  { icon: ShieldCheck, title: "Industry-leading Security", desc: "Your funds are protected by the Secure Asset Fund for Users (SAFU) and advanced cold storage." },
  { icon: Zap, title: "Lightning Fast Trading", desc: "Execute orders with sub-millisecond latency on our high-performance matching engine." },
  { icon: Globe, title: "Global Compliance", desc: "Registered and licensed in multiple jurisdictions worldwide to ensure regulatory standards." },
];

const HOW_IT_WORKS = [
  { step: "01", title: "Verify Identity", desc: "Complete basic verification to secure your account and unlock trading limits." },
  { step: "02", title: "Fund Account", desc: "Deposit crypto or buy directly via credit card, P2P, or bank transfer." },
  { step: "03", title: "Start Trading", desc: "Access 350+ tokens with spot, margin, and futures trading tools." },
];

const PRODUCTS = [
  { title: "Spot Trading", desc: "Trade crypto with advanced tools and deep liquidity." },
  { title: "Futures", desc: "Maximize profits with up to 125x leverage on perps." },
  { title: "Binance Earn", desc: "Put your idle assets to work with high-yield savings." },
  { title: "NFT Marketplace", desc: "Discover and trade original digital collectibles." },
];

const FAQS = [
  { q: "Is Binance safe to use?", a: "Binance uses multi-tier and multi-cluster system architecture and SAFU (Secure Asset Fund for Users) to protect user accounts." },
  { q: "How can I buy Bitcoin?", a: "You can buy Bitcoin via credit card, bank transfer, or P2P trading directly on the Binance platform." },
  { q: "What are the fees?", a: "Binance offers industry-leading low fees starting from 0.1% for spot trading, with further discounts for BNB holders." },
];

// Reusable Components
const SectionHeading = ({ children, centered = false }: { children: React.ReactNode, centered?: boolean }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    className={`mb-12 ${centered ? "text-center" : ""}`}
  >
    <h2 className="text-3xl md:text-4xl font-bold mb-4">{children}</h2>
    <div className={`h-1 w-20 bg-binance-yellow ${centered ? "mx-auto" : ""}`} />
  </motion.div>
);

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [selectedSymbol, setSelectedSymbol] = useState("BTC");

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="font-sans">
      {/* Navigation */}
      <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${scrolled ? "bg-binance-black/95 backdrop-blur-md border-b border-binance-gray/20 py-3" : "bg-transparent py-5"}`}>
        <div className="max-w-7xl mx-auto px-4 md:px-6 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-binance-yellow rounded-sm transform rotate-45 flex items-center justify-center">
                <div className="w-4 h-4 bg-binance-black transform rotate-45" />
              </div>
              <span className="text-2xl font-bold text-binance-yellow tracking-tighter">BINANCE</span>
            </div>
            <div className="hidden lg:flex items-center gap-6 text-sm font-medium">
              <a href="#" className="hover:text-binance-yellow transition-colors">Buy Crypto</a>
              <a href="#" className="hover:text-binance-yellow transition-colors">Markets</a>
              <a href="#" className="hover:text-binance-yellow transition-colors">Trade</a>
              <a href="#" className="hover:text-binance-yellow transition-colors">Earn</a>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button className="hidden sm:block text-sm font-medium hover:text-binance-yellow">Log In</button>
            <button className="bg-binance-yellow text-binance-black px-5 py-2 rounded-md text-sm font-bold hover:bg-yellow-400 transition-colors">Register</button>
            <button className="lg:hidden" onClick={() => setIsMenuOpen(true)}>
              <Menu size={24} />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-0 bg-binance-black z-[60] flex flex-col p-6"
          >
            <div className="flex justify-between items-center mb-12">
              <span className="text-xl font-bold text-binance-yellow">BINANCE</span>
              <button onClick={() => setIsMenuOpen(false)}><X size={32} /></button>
            </div>
            <div className="flex flex-col gap-6 text-2xl font-medium">
              <a href="#" onClick={() => setIsMenuOpen(false)}>Buy Crypto</a>
              <a href="#" onClick={() => setIsMenuOpen(false)}>Markets</a>
              <a href="#" onClick={() => setIsMenuOpen(false)}>Trade</a>
              <a href="#" onClick={() => setIsMenuOpen(false)}>Earn</a>
            </div>
            <div className="mt-auto flex flex-col gap-4">
              <button className="w-full py-4 text-center font-bold border border-binance-gray/30 rounded-lg">Log In</button>
              <button className="w-full py-4 text-center font-bold bg-binance-yellow text-binance-black rounded-lg">Register</button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <main>
        {/* Hero Section */}
        <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[1000px] bg-binance-yellow/5 rounded-full blur-[120px] -z-10" />
          <div className="max-w-7xl mx-auto px-4 md:px-6">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              >
                <h1 className="text-5xl md:text-7xl font-bold leading-[1.1] mb-6">
                  Buy, Trade, and <span className="text-binance-yellow">Hold 350+</span> Cryptocurrencies
                </h1>
                <p className="text-lg md:text-xl text-binance-gray mb-10 max-w-xl">
                  Join the world's largest crypto exchange by trading volume. 
                  Start your investment journey with high-performance tools and elite security.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 mb-12">
                  <button className="bg-binance-yellow text-binance-black px-8 py-4 rounded-lg font-bold text-lg hover:bg-yellow-400 transition-all flex items-center justify-center gap-2 group">
                    Get Started <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                  </button>
                  <button className="px-8 py-4 rounded-lg font-bold text-lg border border-binance-gray/30 hover:bg-white/5 transition-all">
                    View Markets
                  </button>
                </div>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, delay: 0.2 }}
                className="relative hidden lg:block"
              >
                <div className="bg-binance-dark border border-binance-gray/20 rounded-2xl p-8 shadow-2xl relative z-10">
                  <div className="flex items-center justify-between mb-8">
                    <span className="text-lg font-bold">Live Market Sync</span>
                    <TrendingUp className="text-binance-yellow" />
                  </div>
                  <div className="space-y-6">
                    {MARKET_DATA.slice(0, 3).map((coin, idx) => (
                      <div key={idx} className="flex items-center justify-between group cursor-pointer hover:bg-white/5 p-2 rounded-lg transition-colors">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 bg-binance-black rounded-full flex items-center justify-center font-bold">
                            {coin.symbol[0]}
                          </div>
                          <div>
                            <div className="font-bold">{coin.symbol}</div>
                            <div className="text-sm text-binance-gray">{coin.name}</div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-bold font-mono">${coin.price}</div>
                          <div className={`text-sm ${coin.isUp ? "text-green-500" : "text-red-500"}`}>{coin.change}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                {/* Decorative elements */}
                <div className="absolute -top-4 -right-4 w-24 h-24 bg-binance-yellow/20 rounded-full blur-2xl" />
                <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-binance-yellow/10 rounded-full blur-3xl" />
              </motion.div>
            </div>
          </div>
        </section>

        {/* Trust Bar */}
        <section className="bg-binance-dark/50 border-y border-binance-gray/10 py-12">
          <div className="max-w-7xl mx-auto px-4 md:px-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {TRUST_STATS.map((stat, idx) => (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="text-center"
                >
                  <div className="text-3xl md:text-4xl font-bold text-binance-yellow mb-2">{stat.value}</div>
                  <div className="text-sm text-binance-gray uppercase tracking-widest">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Why Binance */}
        <section className="py-24">
          <div className="max-w-7xl mx-auto px-4 md:px-6">
            <SectionHeading centered>Why Choose Binance?</SectionHeading>
            <div className="grid md:grid-cols-3 gap-8">
              {WHY_BINANCE.map((item, idx) => (
                <motion.div 
                  key={idx}
                  whileHover={{ y: -10 }}
                  className="bg-binance-dark border border-binance-gray/10 p-8 rounded-2xl hover:border-binance-yellow/30 transition-all"
                >
                  <div className="w-14 h-14 bg-binance-yellow/10 rounded-lg flex items-center justify-center text-binance-yellow mb-6">
                    <item.icon size={32} />
                  </div>
                  <h3 className="text-xl font-bold mb-4">{item.title}</h3>
                  <p className="text-binance-gray leading-relaxed text-sm">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Live Markets */}
        <section className="py-24 bg-binance-black relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 md:px-6">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
              <div>
                <SectionHeading>Market Trends</SectionHeading>
                <p className="text-binance-gray -mt-8">Live prices for top assets. Click a row to view the chart.</p>
              </div>
              <button className="text-binance-yellow hover:underline flex items-center gap-1 font-medium">
                View More Markets <ArrowRight size={16} />
              </button>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
              {/* Asset List */}
              <div className="lg:col-span-1">
                <div className="bg-binance-dark rounded-2xl border border-binance-gray/10 overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left">
                      <thead>
                        <tr className="border-b border-binance-gray/10 text-binance-gray text-xs uppercase">
                          <th className="px-4 py-4 font-medium tracking-wider">Asset</th>
                          <th className="px-4 py-4 font-medium tracking-wider">Price</th>
                          <th className="px-4 py-4 font-medium tracking-wider text-right">24h</th>
                        </tr>
                      </thead>
                      <tbody>
                        {MARKET_DATA.map((coin, idx) => (
                          <tr 
                            key={idx} 
                            onClick={() => setSelectedSymbol(coin.symbol)}
                            className={`border-b border-binance-gray/5 hover:bg-white/[0.05] transition-colors cursor-pointer group ${selectedSymbol === coin.symbol ? "bg-binance-yellow/5 border-l-2 border-l-binance-yellow" : ""}`}
                          >
                            <td className="px-4 py-4">
                              <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-full bg-binance-black flex items-center justify-center font-bold border border-binance-gray/20 text-xs">
                                  {coin.symbol[0]}
                                </div>
                                <div>
                                  <div className="font-bold text-sm">{coin.symbol}</div>
                                  <div className="text-[10px] text-binance-gray">{coin.name}</div>
                                </div>
                              </div>
                            </td>
                            <td className="px-4 py-4 font-mono font-bold text-sm">${coin.price}</td>
                            <td className="px-4 py-4 text-right">
                              <span className={`text-xs font-bold ${coin.isUp ? "text-green-500" : "text-red-500"}`}>
                                {coin.change}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>

              {/* Chart Component */}
              <div className="lg:col-span-2">
                <motion.div 
                  key={selectedSymbol}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-binance-dark rounded-2xl border border-binance-gray/10 overflow-hidden h-full min-h-[500px]"
                >
                  <div className="p-4 border-b border-binance-gray/10 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <BarChart3 className="text-binance-yellow" size={18} />
                      <span className="font-bold">{selectedSymbol}/USDT Technical Analysis</span>
                    </div>
                    <div className="text-xs text-binance-gray font-mono">Real-time Data</div>
                  </div>
                  <div className="p-1 h-[calc(100%-60px)]">
                    <TradingViewWidget symbol={selectedSymbol} />
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="py-24 bg-binance-dark/30">
          <div className="max-w-7xl mx-auto px-4 md:px-6">
            <SectionHeading centered>Start Trading in Minutes</SectionHeading>
            <div className="grid md:grid-cols-3 gap-12 relative">
              {/* Connector line for desktop */}
              <div className="hidden md:block absolute top-[60px] left-1/4 right-1/4 h-0.5 bg-binance-gray/20 -z-0" />
              
              {HOW_IT_WORKS.map((item, idx) => (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.2 }}
                  className="relative z-10 text-center"
                >
                  <div className="w-16 h-16 bg-binance-yellow rounded-full mx-auto flex items-center justify-center text-binance-black text-2xl font-black mb-6 shadow-lg shadow-binance-yellow/20">
                    {item.step}
                  </div>
                  <h3 className="text-xl font-bold mb-4">{item.title}</h3>
                  <p className="text-binance-gray text-sm leading-relaxed max-w-[250px] mx-auto">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials (Social Proof) */}
        <section className="py-24">
          <div className="max-w-7xl mx-auto px-4 md:px-6">
            <SectionHeading>Trusted by Millions</SectionHeading>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-binance-dark p-8 rounded-2xl border border-binance-gray/10">
                  <div className="flex gap-1 text-binance-yellow mb-6">
                    {[1, 2, 3, 4, 5].map(s => <Zap key={s} size={16} fill="currentColor" />)}
                  </div>
                  <p className="text-binance-light mb-8 font-medium italic">
                    "The liquidity on Binance is unmatched. Even during high volatility, my orders were filled instantly. Best exchange for professionals."
                  </p>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-binance-gray/20" />
                    <div>
                      <div className="font-bold">Investor_{i}42</div>
                      <div className="text-xs text-binance-gray font-mono uppercase tracking-tighter">Verified Trader</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Products */}
        <section className="py-24 bg-binance-black">
          <div className="max-w-7xl mx-auto px-4 md:px-6">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div>
                <SectionHeading>One Platform, Endless Possibilities.</SectionHeading>
                <div className="grid sm:grid-cols-2 gap-6">
                  {PRODUCTS.map((prod, idx) => (
                    <motion.div 
                      key={idx}
                      whileHover={{ x: 10 }}
                      className="group cursor-pointer"
                    >
                      <h4 className="text-lg font-bold group-hover:text-binance-yellow transition-colors flex items-center gap-2">
                        {prod.title} <ArrowRight size={14} />
                      </h4>
                      <p className="text-binance-gray text-sm mt-2">{prod.desc}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
              <div className="bg-gradient-to-br from-binance-yellow/20 to-transparent p-1 rounded-2xl">
                <div className="bg-binance-black p-8 rounded-2xl h-full flex flex-col items-center justify-center text-center">
                  <BarChart3 size={64} className="text-binance-yellow mb-6" />
                  <h3 className="text-2xl font-bold mb-4">Institutional Services</h3>
                  <p className="text-binance-gray mb-8">Customized solutions for hedge funds, asset managers, and family offices.</p>
                  <button className="text-binance-yellow font-bold border-b border-binance-yellow pb-1 hover:brightness-125 transition-all">Learn More</button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Security */}
        <section className="py-24 bg-binance-dark/50">
          <div className="max-w-7xl mx-auto px-4 md:px-6">
            <div className="flex flex-col items-center text-center max-w-3xl mx-auto">
              <div className="w-20 h-20 bg-binance-yellow/10 rounded-full flex items-center justify-center text-binance-yellow mb-8 animate-pulse">
                <Lock size={40} />
              </div>
              <SectionHeading centered>Your Security is Our Priority</SectionHeading>
              <p className="text-binance-gray text-lg -mt-6 mb-12">
                We employ the most comprehensive security measures in the industry, from multi-factor authentication (MFA) to high-end encryption.
              </p>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-6 w-full">
                {["SAFU Fund", "2FA Security", "Cold Storage", "Device Management", "End-to-End Encryption", "KYC Protocols"].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-3 bg-binance-black/40 p-4 rounded-xl border border-binance-gray/10">
                    <CheckCircle2 className="text-binance-yellow" size={18} />
                    <span className="font-bold text-sm">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Fees */}
        <section className="py-24">
          <div className="max-w-7xl mx-auto px-4 md:px-6">
            <div className="bg-binance-dark rounded-3xl p-10 md:p-16 relative overflow-hidden">
               <div className="absolute top-0 right-0 p-12 opacity-5">
                 <DollarSign size={200} />
               </div>
               <div className="relative z-10 max-w-2xl">
                 <SectionHeading>World-class Fees</SectionHeading>
                 <p className="text-binance-gray text-lg mb-8">
                   We believe in providing the best value. Our fees are among the lowest in the industry, and you can reduce them even further by holding BNB.
                 </p>
                 <div className="flex flex-wrap gap-8">
                   <div>
                     <div className="text-4xl font-bold">0.1%</div>
                     <div className="text-sm text-binance-gray">Spot Trading Fee</div>
                   </div>
                   <div className="w-px h-12 bg-binance-gray/20 hidden sm:block" />
                   <div>
                     <div className="text-4xl font-bold">25% OFF</div>
                     <div className="text-sm text-binance-gray">Discount with BNB</div>
                   </div>
                 </div>
                 <button className="mt-12 bg-white/5 border border-binance-yellow/30 text-binance-yellow px-8 py-3 rounded-lg font-bold hover:bg-binance-yellow hover:text-black transition-all">
                   Check Fee Schedule
                 </button>
               </div>
            </div>
          </div>
        </section>

        {/* Mobile App */}
        <section className="py-24 bg-binance-yellow overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 md:px-6">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <motion.div 
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="text-binance-black"
              >
                <div className="flex items-center gap-3 mb-6">
                  <Smartphone size={32} />
                  <span className="font-black text-xl tracking-tighter">APP BY BINANCE</span>
                </div>
                <h2 className="text-4xl md:text-5xl font-black mb-6 leading-tight">Trade Crypto Anywhere, Anytime.</h2>
                <p className="text-lg font-medium opacity-80 mb-10">
                  Scan to download the Binance app and stay on top of the markets. 
                  Get real-time alerts, manage your portfolio, and trade on the go.
                </p>
                <div className="flex items-center gap-8">
                   <div className="w-32 h-32 bg-white p-2 rounded-xl shadow-xl flex items-center justify-center">
                      <div className="w-full h-full bg-binance-black rounded flex items-center justify-center">
                        <span className="text-xs text-binance-yellow font-bold">QR CODE</span>
                      </div>
                   </div>
                   <div className="flex flex-col gap-4">
                      <button className="flex items-center gap-3 bg-binance-black text-white px-6 py-3 rounded-xl font-bold hover:scale-105 transition-transform">
                        App Store
                      </button>
                      <button className="flex items-center gap-3 bg-binance-black text-white px-6 py-3 rounded-xl font-bold hover:scale-105 transition-transform">
                        Play Store
                      </button>
                   </div>
                </div>
              </motion.div>
              <div className="relative">
                 <motion.div 
                    initial={{ y: 100 }}
                    whileInView={{ y: 0 }}
                    viewport={{ once: true }}
                    transition={{ type: "spring", damping: 20 }}
                    className="bg-binance-dark w-[280px] h-[580px] rounded-[40px] border-[8px] border-binance-black mx-auto overflow-hidden shadow-2xl relative z-10"
                 >
                    <div className="p-6">
                       <div className="w-12 h-1 bg-binance-gray/30 rounded-full mx-auto mb-8" />
                       <div className="space-y-6">
                          {[1,2,3,4].map(i => (
                            <div key={i} className="h-12 bg-white/5 rounded-xl border border-white/10" />
                          ))}
                       </div>
                    </div>
                 </motion.div>
                 <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-white/30 rounded-full blur-[80px] -z-0" />
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-24">
          <div className="max-w-3xl mx-auto px-4 md:px-6">
            <SectionHeading centered>Frequently Asked Questions</SectionHeading>
            <div className="space-y-4">
              {FAQS.map((faq, idx) => (
                <div key={idx} className="bg-binance-dark border border-binance-gray/10 rounded-2xl overflow-hidden">
                  <button className="w-full p-6 text-left flex justify-between items-center group font-bold">
                    {faq.q}
                    <ChevronDown size={20} className="text-binance-gray group-hover:text-binance-yellow transition-colors" />
                  </button>
                  <div className="px-6 pb-6 text-binance-gray text-sm leading-relaxed">
                    {faq.a}
                  </div>
                </div>
              ))}
            </div>
            <div className="text-center mt-12">
              <span className="text-binance-gray">Don't see your question? </span>
              <a href="#" className="text-binance-yellow font-bold underline underline-offset-4">Visit our Help Center</a>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-24 relative overflow-hidden">
          <div className="absolute inset-0 bg-binance-yellow/5 -z-10" />
          <div className="max-w-7xl mx-auto px-4 md:px-6 text-center">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              className="max-w-3xl mx-auto"
            >
              <h2 className="text-4xl md:text-5xl font-black mb-8 leading-tight">Join 180M+ Registered Users on the World’s Leading Exchange.</h2>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <input 
                  type="email" 
                  placeholder="Enter email address" 
                  className="w-full sm:w-80 bg-binance-dark border border-binance-gray/30 rounded-lg px-6 py-4 focus:border-binance-yellow focus:outline-none transition-colors"
                />
                <button className="w-full sm:w-auto bg-binance-yellow text-binance-black px-10 py-4 rounded-lg font-bold text-lg hover:brightness-110 active:scale-95 transition-all">
                  Sign Up Now
                </button>
              </div>
              <div className="mt-8 flex items-center justify-center gap-6 text-sm text-binance-gray">
                <span className="flex items-center gap-1"><CheckCircle2 size={16} className="text-binance-yellow" /> No hidden fees</span>
                <span className="flex items-center gap-1"><CheckCircle2 size={16} className="text-binance-yellow" /> Secure storage</span>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-binance-black pt-20 pb-10 border-t border-binance-gray/10">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
            <div className="col-span-1 md:col-span-2 lg:col-span-1">
              <div className="flex items-center gap-2 mb-6">
                <div className="w-6 h-6 bg-binance-yellow rounded-sm transform rotate-45" />
                <span className="text-xl font-black text-binance-yellow tracking-tighter">BINANCE</span>
              </div>
              <p className="text-binance-gray text-sm leading-relaxed mb-6">
                Binance is the world's leading blockchain ecosystem and cryptocurrency infrastructure provider.
              </p>
              <div className="flex gap-4">
                {[Twitter, Github, MessageSquare, Mail].map((Icon, idx) => (
                  <a key={idx} href="#" className="w-10 h-10 bg-binance-dark rounded-full flex items-center justify-center hover:text-binance-yellow hover:bg-white/5 transition-all">
                    <Icon size={18} />
                  </a>
                ))}
              </div>
            </div>
            
            <div>
              <h5 className="font-bold mb-6">Markets</h5>
              <ul className="space-y-4 text-sm text-binance-gray">
                <li><a href="#" className="hover:text-binance-yellow">All Crypto Prices</a></li>
                <li><a href="#" className="hover:text-binance-yellow">Bitcoin Price</a></li>
                <li><a href="#" className="hover:text-binance-yellow">Ethereum Price</a></li>
                <li><a href="#" className="hover:text-binance-yellow">Altcoin Prices</a></li>
              </ul>
            </div>

            <div>
              <h5 className="font-bold mb-6">Support</h5>
              <ul className="space-y-4 text-sm text-binance-gray">
                <li><a href="#" className="hover:text-binance-yellow">Help Center</a></li>
                <li><a href="#" className="hover:text-binance-yellow">Submit a Request</a></li>
                <li><a href="#" className="hover:text-binance-yellow">Fees and API</a></li>
                <li><a href="#" className="hover:text-binance-yellow">Trading Rules</a></li>
              </ul>
            </div>

            <div>
              <h5 className="font-bold mb-6">Legal</h5>
              <ul className="space-y-4 text-sm text-binance-gray">
                <li><a href="#" className="hover:text-binance-yellow">Terms of Use</a></li>
                <li><a href="#" className="hover:text-binance-yellow">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-binance-yellow">Risk Warning</a></li>
                <li><a href="#" className="hover:text-binance-yellow">Cookie Preferences</a></li>
              </ul>
            </div>
          </div>
          
          <div className="pt-10 border-t border-binance-gray/10 text-center md:text-left flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="text-xs text-binance-gray">
              © 2026 Binance.com. All rights reserved. 
            </div>
            <div className="flex gap-4 text-xs font-bold text-binance-gray">
              <span>English</span>
              <span>USD</span>
              <span>Dark Mode</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

