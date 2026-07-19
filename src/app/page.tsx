import { getProducts, getSettings } from '@/lib/db';
import WhatsAppFloat from '@/components/whatsapp-float';
import TrackingScripts from '@/components/tracking-scripts';
import {
  CheckCircle,
  Star,
  MessageCircle,
  Shield,
  Zap,
  Leaf,
  Truck,
  Award,
  Clock,
  Users,
  Globe,
  ArrowRight,
  AlertTriangle,
  TrendingUp,
  Heart,
  Activity,
  Flame,
} from 'lucide-react';

export const dynamic = 'force-dynamic';

export async function generateMetadata() {
  return {
    title: 'MaxPlus+ Performance Gel | Japanese Formula | Official Store',
    description: 'MaxPlus+ is a premium Japanese men\'s performance gel. Natural herbal formula for enhanced stamina, confidence, and intimate wellness. Order now.',
    keywords: 'men\'s health gel, Japanese formula, performance enhancer, natural supplement, Kawai Pharmaceutical, MaxPlus, stamina, endurance',
    openGraph: {
      title: 'MaxPlus+ Performance Gel - Official Store',
      description: 'Premium Japanese men\'s performance gel. 100% natural herbal formula.',
      type: 'website',
      locale: 'en_US',
      images: [{ url: '/images/product-hero.jpeg', width: 1200, height: 630 }],
    },
  };
}

export default async function Home() {
  const [products, settings] = await Promise.all([
    getProducts(),
    getSettings(),
  ]);

  const whatsappNumber = settings.whatsappNumber || '13023107970';
  const product = products[0];

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: 'MaxPlus+ Performance Gel',
    image: ['/images/product-hero.jpeg'],
    description: 'Premium Japanese men\'s performance gel by Kawai Pharmaceutical',
    brand: { '@type': 'Brand', name: 'Kawai Pharmaceutical' },
    offers: {
      '@type': 'AggregateOffer',
      priceCurrency: 'USD',
      lowPrice: '49.9',
      highPrice: '119.9',
      offerCount: '3',
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      reviewCount: '857',
    },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <TrackingScripts />

      {/* Hero Section - Dark Theme */}
      <section className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-500/20 border border-amber-500/30 text-amber-400 text-sm font-medium rounded-full mb-6">
                <Award className="w-4 h-4" />
                Japanese Pharmaceutical Grade
              </div>
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight mb-4">
                Max<span className="text-amber-500">Plus</span>+
              </h1>
              <p className="text-xl sm:text-2xl text-gray-300 font-light mb-6">
                by Kawai Pharmaceutical
              </p>
              <p className="text-lg text-gray-400 leading-relaxed mb-8 max-w-lg">
                Premium men&apos;s wellness formula. Natural herbal extracts for enhanced stamina, confidence, and intimate performance. Trusted by 50,000+ men worldwide.
              </p>

              <div className="flex flex-wrap gap-4 mb-10">
                <a
                  href="#order"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-amber-500 hover:bg-amber-600 text-black font-bold rounded-lg transition-all shadow-lg shadow-amber-500/25 hover:shadow-amber-500/40 hover:-translate-y-0.5"
                >
                  Order Now
                  <ArrowRight className="w-5 h-5" />
                </a>
                <a
                  href={`https://wa.me/${whatsappNumber}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-lg transition-colors border border-white/20"
                >
                  <MessageCircle className="w-5 h-5" />
                  Contact Us
                </a>
              </div>

              <div className="grid grid-cols-3 gap-6 pt-8 border-t border-white/10">
                <div>
                  <div className="text-3xl font-bold text-amber-500">50K+</div>
                  <div className="text-sm text-gray-400 mt-1">Happy Customers</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-amber-500">4.9/5</div>
                  <div className="text-sm text-gray-400 mt-1">Average Rating</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-amber-500">100%</div>
                  <div className="text-sm text-gray-400 mt-1">Natural Formula</div>
                </div>
              </div>
            </div>

            <div className="relative hidden lg:block">
              <div className="relative w-full aspect-square max-w-lg mx-auto">
                <div className="absolute inset-0 bg-gradient-to-br from-amber-500/20 to-orange-500/20 rounded-full blur-3xl" />
                {product?.imageUrl && (
                  <img
                    src={product.imageUrl}
                    alt="MaxPlus+ Performance Gel"
                    className="relative z-10 w-full h-full object-cover rounded-2xl shadow-2xl"
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-4xl font-bold mb-4">Why Choose MaxPlus+?</h2>
            <p className="text-gray-400 text-lg">The ultimate solution for men&apos;s intimate wellness</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { icon: <TrendingUp className="w-6 h-6" />, title: 'Enhanced Performance', desc: 'Extend intimate time by 2-3x with our proven formula' },
              { icon: <Zap className="w-6 h-6" />, title: 'Fast Absorption', desc: 'Works within 60 seconds. No waiting, no mess' },
              { icon: <Leaf className="w-6 h-6" />, title: '100% Natural', desc: 'Premium herbal extracts. No chemicals, no side effects' },
              { icon: <Shield className="w-6 h-6" />, title: 'Clinically Tested', desc: 'Dermatologically tested and approved for safety' },
              { icon: <Heart className="w-6 h-6" />, title: 'Boosts Confidence', desc: 'Feel more confident and satisfied in intimate moments' },
              { icon: <Activity className="w-6 h-6" />, title: 'Improves Circulation', desc: 'Enhances blood flow for better performance' },
            ].map((benefit) => (
              <div key={benefit.title} className="p-8 bg-gray-800/50 border border-gray-700 rounded-xl hover:border-amber-500/50 transition-colors">
                <div className="w-12 h-12 bg-amber-500/20 rounded-lg flex items-center justify-center text-amber-500 mb-4">
                  {benefit.icon}
                </div>
                <h3 className="font-bold text-lg mb-2">{benefit.title}</h3>
                <p className="text-gray-400">{benefit.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Ingredients Section */}
      <section className="py-20 bg-black text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-4xl font-bold mb-4">Natural Ingredients</h2>
            <p className="text-gray-400 text-lg">Premium herbal extracts for optimal results</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { name: 'Epimedium', desc: 'Known as Horny Goat Weed. Enhances blood flow, boosts stamina, and supports healthy testosterone levels. Used in traditional medicine for centuries.' },
              { name: 'Cuscuta Seed', desc: 'Powerful antioxidant properties. Supports reproductive health, improves vitality, and enhances overall male wellness.' },
              { name: 'Goji Berry', desc: 'Rich in vitamins and minerals. Boosts energy, improves circulation, and provides essential nutrients for optimal performance.' },
            ].map((ing) => (
              <div key={ing.name} className="p-8 bg-gray-900 border border-gray-800 rounded-xl hover:border-amber-500/50 transition-colors">
                <div className="w-12 h-12 bg-amber-500/20 rounded-lg flex items-center justify-center text-amber-500 mb-4">
                  <Leaf className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-xl mb-3">{ing.name}</h3>
                <p className="text-gray-400 leading-relaxed">{ing.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How to Use Section */}
      <section className="py-20 bg-gray-900 text-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-4xl font-bold mb-4">How to Use</h2>
            <p className="text-gray-400 text-lg">Simple 3-step process for best results</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { step: '01', icon: <Flame className="w-6 h-6" />, title: 'Apply', desc: 'Apply a moderate amount to the target area' },
              { step: '02', icon: <Zap className="w-6 h-6" />, title: 'Massage', desc: 'Massage gently for 60 seconds until fully absorbed' },
              { step: '03', icon: <CheckCircle className="w-6 h-6" />, title: 'Enjoy', desc: 'No rinsing needed. Works quickly and effectively' },
            ].map((s) => (
              <div key={s.step} className="text-center p-8 bg-gray-800/50 border border-gray-700 rounded-xl">
                <div className="text-5xl font-bold text-amber-500/30 mb-4">{s.step}</div>
                <div className="w-16 h-16 bg-amber-500 rounded-xl flex items-center justify-center text-black mx-auto mb-6">
                  {s.icon}
                </div>
                <h3 className="font-bold text-xl mb-3">{s.title}</h3>
                <p className="text-gray-400">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Results Timeline */}
      <section className="py-20 bg-black text-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-4xl font-bold mb-4">Expected Results</h2>
            <p className="text-gray-400 text-lg">What to expect with consistent use</p>
          </div>

          <div className="space-y-6">
            {[
              { week: 'Week 1-2', title: 'Initial Effects', desc: 'Notice improved sensitivity and enhanced blood flow. Better endurance during intimate moments.' },
              { week: 'Week 3-4', title: 'Visible Improvements', desc: 'Significant enhancement in performance. Longer lasting results and increased confidence.' },
              { week: 'Week 5-8', title: 'Maximum Benefits', desc: 'Optimal results achieved. Sustained performance improvement and overall wellness boost.' },
            ].map((result) => (
              <div key={result.week} className="p-8 bg-gray-900 border border-gray-800 rounded-xl flex items-start gap-6">
                <div className="flex-shrink-0 w-24 text-center">
                  <div className="text-amber-500 font-bold text-sm">{result.week}</div>
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-xl mb-2">{result.title}</h3>
                  <p className="text-gray-400">{result.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Warning Section */}
      <section className="py-16 bg-amber-500/10 border-y border-amber-500/30">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-start gap-6">
            <div className="flex-shrink-0 w-12 h-12 bg-amber-500 rounded-lg flex items-center justify-center text-black">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold text-xl text-amber-500 mb-2">Beware of Counterfeit Products</h3>
              <p className="text-gray-300 leading-relaxed">
                MaxPlus+ is only sold through our official website. Counterfeit products may contain harmful ingredients and provide no benefits. Always verify you&apos;re purchasing from the official source. Each genuine product comes with authentication code and quality guarantee.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Order Section */}
      <section id="order" className="py-20 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-4xl font-bold mb-4">Choose Your Package</h2>
            <p className="text-gray-400 text-lg">Select the plan that fits your needs</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { name: '1 Box', subtitle: 'Starter Pack', price: 49.9, comparePrice: 69.9, badge: null, highlights: ['30-day supply', 'Extend intimate time', 'Free shipping', 'Money-back guarantee'] },
              { name: '2 Boxes', subtitle: 'Treatment Pack', price: 89.9, comparePrice: 139.8, badge: 'Most Popular', highlights: ['60-day supply', 'Treat performance issues', 'Save $49.90', 'Free shipping', 'Priority support'] },
              { name: '3 Boxes', subtitle: 'Premium Pack', price: 119.9, comparePrice: 209.7, badge: 'Best Value', highlights: ['90-day supply', 'Maximum results', 'Save $89.80', 'Free shipping', 'VIP support', 'Gift included'] },
            ].map((pkg) => (
              <div
                key={pkg.name}
                className={`bg-gray-800 rounded-xl ${pkg.badge ? 'border-2 border-amber-500 shadow-2xl shadow-amber-500/20' : 'border border-gray-700'} p-8 flex flex-col hover:border-amber-500/50 transition-colors`}
              >
                {pkg.badge && (
                  <div className="bg-amber-500 text-black text-xs font-bold px-4 py-1.5 rounded-full mb-6 self-start">
                    {pkg.badge}
                  </div>
                )}
                <h3 className="text-2xl font-bold mb-2">{pkg.name}</h3>
                <p className="text-gray-400 text-sm mb-6">{pkg.subtitle}</p>
                <div className="flex items-baseline gap-3 mb-8">
                  <span className="text-5xl font-bold">${pkg.price}</span>
                  <span className="text-xl text-gray-500 line-through">${pkg.comparePrice}</span>
                </div>
                <ul className="space-y-3 mb-8 flex-1">
                  {pkg.highlights.map((h) => (
                    <li key={h} className="flex items-start gap-3 text-gray-300">
                      <CheckCircle className="w-5 h-5 text-amber-500 mt-0.5 flex-shrink-0" />
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
                <a
                  href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(`Order: MaxPlus+ ${pkg.name} - $${pkg.price}`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-4 bg-green-600 hover:bg-green-700 text-white font-bold rounded-lg transition-colors flex items-center justify-center gap-2"
                >
                  <MessageCircle className="w-5 h-5" />
                  Order via WhatsApp
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="py-12 bg-black text-white border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { icon: <Truck className="w-6 h-6" />, title: 'Free Shipping', desc: 'Worldwide delivery' },
              { icon: <Shield className="w-6 h-6" />, title: 'Secure Payment', desc: '100% protected' },
              { icon: <Award className="w-6 h-6" />, title: 'Quality Guarantee', desc: 'Authentic product' },
              { icon: <Users className="w-6 h-6" />, title: '24/7 Support', desc: 'Always here to help' },
            ].map((badge) => (
              <div key={badge.title} className="text-center">
                <div className="w-12 h-12 bg-amber-500/20 rounded-lg flex items-center justify-center text-amber-500 mx-auto mb-3">
                  {badge.icon}
                </div>
                <div className="font-semibold mb-1">{badge.title}</div>
                <div className="text-sm text-gray-400">{badge.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-950 text-gray-400 py-12 border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <h3 className="text-white font-bold text-lg mb-4">MaxPlus+</h3>
              <p className="text-sm">Premium Japanese men&apos;s wellness formula by Kawai Pharmaceutical. Trusted by thousands worldwide.</p>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-4">Contact</h3>
              <p className="text-sm">WhatsApp: +{whatsappNumber}</p>
              <p className="text-sm mt-2">Available 24/7 for your questions</p>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-4">Shipping & Returns</h3>
              <p className="text-sm">Free worldwide shipping</p>
              <p className="text-sm mt-2">30-day money-back guarantee</p>
              <p className="text-sm mt-2">Discreet packaging</p>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center">
            <p className="text-sm">&copy; 2024 MaxPlus+. All rights reserved.</p>
            <p className="text-xs text-gray-500 mt-3">These statements have not been evaluated by the FDA. This product is not intended to diagnose, treat, cure, or prevent any disease.</p>
          </div>
        </div>
      </footer>

      <WhatsAppFloat />
    </>
  );
}
