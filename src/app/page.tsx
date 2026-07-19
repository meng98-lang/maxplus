"use client";

import { useState, useEffect } from "react";
import { ShoppingCart, Check, Star, Shield, Truck, MessageCircle } from "lucide-react";
import Link from "next/link";
import WhatsAppFloat from "@/components/whatsapp-float";
import TrackingScripts from "@/components/tracking-scripts";

interface SiteSettings {
  siteName: string;
  whatsappNumber: string;
  whatsappMessage: string;
  activePayment: string;
}

const PRICING_TIERS = [
  {
    id: "1box",
    name: "Starter Pack",
    boxes: 1,
    price: 49.9,
    originalPrice: 49.9,
    benefit: "Extend Intimacy Time",
    description: "Perfect for trying out MaxPlus",
    popular: false,
  },
  {
    id: "2box",
    name: "Treatment Pack",
    boxes: 2,
    price: 89.9,
    originalPrice: 99.8,
    benefit: "Treat ED & Premature Ejaculation",
    description: "Most popular choice for results",
    popular: true,
  },
  {
    id: "3box",
    name: "Complete Pack",
    boxes: 3,
    price: 119.9,
    originalPrice: 149.7,
    benefit: "Complete Enhancement Solution",
    description: "Maximum savings & best results",
    popular: false,
  },
];

const INGREDIENTS = [
  { name: "Epimedium Extract", desc: "Natural aphrodisiac, enhances blood flow" },
  { name: "Cnidium Extract", desc: "Traditional herbal remedy for men's health" },
  { name: "Goji Berry Extract", desc: "Rich in antioxidants, boosts vitality" },
];

export default function Home() {
  const [settings, setSettings] = useState<SiteSettings | null>(null);
  const [selectedTier, setSelectedTier] = useState(PRICING_TIERS[1]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/settings")
      .then(res => res.json())
      .then(data => setSettings(data))
      .finally(() => setLoading(false));

    // Track page view
    fetch("/api/traffic", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ page: "home", referrer: document.referrer }),
    }).catch(() => {});
  }, []);

  const handleAddToCart = () => {
    const cart = [{
      id: selectedTier.id,
      name: `MaxPlus ${selectedTier.name} (${selectedTier.boxes} Box${selectedTier.boxes > 1 ? "es" : ""})`,
      price: selectedTier.price,
      quantity: 1,
    }];
    localStorage.setItem("mp_cart", JSON.stringify(cart));

    // Track add to cart
    fetch("/api/clicks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ type: "add_to_cart", page: "home" }),
    }).catch(() => {});

    window.location.href = "/checkout";
  };

  const handleWhatsAppOrder = () => {
    if (!settings?.whatsappNumber) return;
    const message = `Hi, I'd like to order MaxPlus ${selectedTier.name} (${selectedTier.boxes} Box${selectedTier.boxes > 1 ? "es" : ""}) - $${selectedTier.price}`;
    window.open(`https://wa.me/${settings.whatsappNumber}?text=${encodeURIComponent(message)}`, "_blank");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-gold-400 text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <TrackingScripts />

      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-40 bg-black/90 backdrop-blur-md border-b border-gold-500/20">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="text-2xl font-bold text-gold-400">MAX<span className="text-red-500">+</span></div>
          <nav className="flex items-center gap-6">
            <a href="#product" className="text-gray-300 hover:text-gold-400 transition-colors text-sm">Product</a>
            <a href="#pricing" className="text-gray-300 hover:text-gold-400 transition-colors text-sm">Pricing</a>
            <a href="#ingredients" className="text-gray-300 hover:text-gold-400 transition-colors text-sm">Ingredients</a>
            <button
              onClick={handleAddToCart}
              className="bg-gold-500 hover:bg-gold-600 text-black px-4 py-2 rounded-lg font-medium text-sm transition-colors flex items-center gap-2"
            >
              <ShoppingCart size={16} />
              Buy Now
            </button>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-24 pb-16 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-block bg-red-500/20 text-red-400 px-4 py-1 rounded-full text-sm font-medium mb-6">
                Japanese Formula • 60ml
              </div>
              <h1 className="text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                Unlock Your <span className="text-gold-400">Full Potential</span>
              </h1>
              <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                Premium Japanese men's enhancement gel. Natural ingredients, visible results in 60 seconds daily.
              </p>
              <div className="flex flex-wrap gap-4 mb-8">
                <div className="flex items-center gap-2 text-gray-300">
                  <Check className="text-gold-400" size={20} />
                  <span>Natural Formula</span>
                </div>
                <div className="flex items-center gap-2 text-gray-300">
                  <Check className="text-gold-400" size={20} />
                  <span>Fast Absorption</span>
                </div>
                <div className="flex items-center gap-2 text-gray-300">
                  <Check className="text-gold-400" size={20} />
                  <span>No Side Effects</span>
                </div>
              </div>
              <div className="flex flex-wrap gap-4">
                <button
                  onClick={handleAddToCart}
                  className="bg-gold-500 hover:bg-gold-600 text-black px-8 py-4 rounded-lg font-bold text-lg transition-colors flex items-center gap-2"
                >
                  <ShoppingCart size={22} />
                  Order Now - From $49.9
                </button>
                {settings?.whatsappNumber && (
                  <button
                    onClick={handleWhatsAppOrder}
                    className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-lg font-bold text-lg transition-colors flex items-center gap-2"
                  >
                    <MessageCircle size={22} />
                    WhatsApp
                  </button>
                )}
              </div>
            </div>
            <div className="relative">
              <div className="aspect-square bg-gradient-to-br from-gray-900 to-black rounded-2xl border border-gold-500/20 flex items-center justify-center overflow-hidden">
                <div className="text-center">
                  <div className="text-8xl font-bold text-gold-400 mb-2">MAX<span className="text-red-500">+</span></div>
                  <div className="text-2xl text-gray-300">Men's Enhancement Gel</div>
                  <div className="text-lg text-gray-500 mt-2">川井製薬 • 60ml</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Problems Section */}
      <section className="py-16 px-6 bg-gray-950">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl lg:text-4xl font-bold text-center mb-4">
            Don't Let Size Hold You Back
          </h2>
          <p className="text-gray-400 text-center mb-12 text-lg">
            Do you experience any of these issues?
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: "Not Hard Enough", desc: "Difficulty maintaining erection" },
              { title: "Not Big Enough", desc: "Feel inadequate for your partner" },
              { title: "Not Lasting Long", desc: "Premature ejaculation issues" },
              { title: "Not Confident", desc: "Performance anxiety" },
            ].map((item, i) => (
              <div key={i} className="bg-gray-900 border border-gray-800 rounded-xl p-6 text-center">
                <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">😔</span>
                </div>
                <h3 className="font-bold text-lg mb-2">{item.title}</h3>
                <p className="text-gray-400 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Product Features */}
      <section id="product" className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl lg:text-4xl font-bold text-center mb-4">
            How to Use MaxPlus
          </h2>
          <p className="text-gray-400 text-center mb-12 text-lg">
            Strong penetration,温和 long-lasting active essence
          </p>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { step: "1", title: "Apply", desc: "Take appropriate amount and apply evenly" },
              { step: "2", title: "Massage", desc: "Massage with both hands for even absorption" },
              { step: "3", title: "Absorb", desc: "After ~60 seconds, essence is naturally absorbed. No rinsing needed." },
            ].map((item, i) => (
              <div key={i} className="bg-gray-900 border border-gold-500/20 rounded-xl p-8 text-center">
                <div className="w-16 h-16 bg-gold-500 text-black rounded-full flex items-center justify-center mx-auto mb-6 text-2xl font-bold">
                  {item.step}
                </div>
                <h3 className="font-bold text-xl mb-3">{item.title}</h3>
                <p className="text-gray-400">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Ingredients */}
      <section id="ingredients" className="py-16 px-6 bg-gray-950">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl lg:text-4xl font-bold text-center mb-4">
            Natural Ingredients
          </h2>
          <p className="text-gray-400 text-center mb-12 text-lg">
            Premium herbal extracts for men's health
          </p>
          <div className="grid md:grid-cols-3 gap-8">
            {INGREDIENTS.map((item, i) => (
              <div key={i} className="bg-gray-900 border border-gray-800 rounded-xl p-8 text-center">
                <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-3xl"></span>
                </div>
                <h3 className="font-bold text-xl mb-3 text-gold-400">{item.name}</h3>
                <p className="text-gray-400">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl lg:text-4xl font-bold text-center mb-4">
            Choose Your Pack
          </h2>
          <p className="text-gray-400 text-center mb-12 text-lg">
            Free shipping on all orders
          </p>
          <div className="grid md:grid-cols-3 gap-8">
            {PRICING_TIERS.map(tier => (
              <div
                key={tier.id}
                onClick={() => setSelectedTier(tier)}
                className={`relative bg-gray-900 border rounded-xl p-8 cursor-pointer transition-all ${
                  selectedTier.id === tier.id
                    ? "border-gold-500 ring-2 ring-gold-500/20"
                    : "border-gray-800 hover:border-gray-600"
                }`}
              >
                {tier.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gold-500 text-black px-4 py-1 rounded-full text-sm font-bold">
                    Most Popular
                  </div>
                )}
                <div className="text-center mb-6">
                  <h3 className="text-xl font-bold mb-2">{tier.name}</h3>
                  <p className="text-gray-400 text-sm mb-4">{tier.description}</p>
                  <div className="text-4xl font-bold text-gold-400">
                    ${tier.price}
                  </div>
                  {tier.originalPrice > tier.price && (
                    <div className="text-gray-500 line-through text-sm mt-1">
                      ${tier.originalPrice}
                    </div>
                  )}
                  <div className="text-sm text-gray-400 mt-2">
                    {tier.boxes} Box{tier.boxes > 1 ? "es" : ""}
                  </div>
                </div>
                <div className="bg-gray-800 rounded-lg p-4 mb-6">
                  <div className="text-sm font-medium text-gold-400 mb-1">Benefit:</div>
                  <div className="text-sm text-gray-300">{tier.benefit}</div>
                </div>
                <div className={`text-center py-3 rounded-lg font-bold transition-colors ${
                  selectedTier.id === tier.id
                    ? "bg-gold-500 text-black"
                    : "bg-gray-800 text-gray-400"
                }`}>
                  {selectedTier.id === tier.id ? "Selected ✓" : "Select"}
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <button
              onClick={handleAddToCart}
              className="bg-gold-500 hover:bg-gold-600 text-black px-12 py-4 rounded-lg font-bold text-lg transition-colors inline-flex items-center gap-3"
            >
              <ShoppingCart size={22} />
              Order {selectedTier.name} - ${selectedTier.price}
            </button>
          </div>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="py-16 px-6 bg-gray-950">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: Shield, title: "Secure Payment", desc: "SSL encrypted checkout" },
              { icon: Truck, title: "Free Shipping", desc: "Discreet packaging" },
              { icon: Star, title: "Satisfaction Guarantee", desc: "30-day money back" },
            ].map((item, i) => (
              <div key={i} className="text-center">
                <item.icon className="text-gold-400 mx-auto mb-4" size={40} />
                <h3 className="font-bold text-lg mb-2">{item.title}</h3>
                <p className="text-gray-400">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-800 py-8 px-6">
        <div className="max-w-6xl mx-auto text-center text-gray-500 text-sm">
          <p>© 2024 MaxPlus. All rights reserved.</p>
          <p className="mt-2">This product is not intended to diagnose, treat, cure, or prevent any disease.</p>
        </div>
      </footer>

      <WhatsAppFloat />
    </div>
  );
}
