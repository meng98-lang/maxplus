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
} from 'lucide-react';

export const dynamic = 'force-dynamic';

export async function generateMetadata() {
  return {
    title: 'MaxPlus+ Men\'s Performance Gel | Japanese Formula | Official Store',
    description: 'MaxPlus+ is a premium Japanese men\'s performance gel developed by Kawai Pharmaceutical. Natural herbal formula for enhanced stamina and confidence.',
    keywords: 'men\'s health gel, Japanese formula, performance enhancer, natural supplement, Kawai Pharmaceutical, MaxPlus',
    openGraph: {
      title: 'MaxPlus+ Men\'s Performance Gel',
      description: 'Premium Japanese men\'s performance gel. Natural herbal formula.',
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
    description: 'Premium Japanese men\'s performance gel',
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

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-amber-50 via-white to-orange-50">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-amber-200/30 rounded-full blur-3xl" />
          <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-orange-200/30 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-amber-100 text-amber-700 text-sm font-medium rounded-full mb-6">
                <Award className="w-3.5 h-3.5" />
                Japanese Pharmaceutical Grade
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                Max<span className="text-amber-600">Plus</span>+
                <span className="block text-2xl sm:text-3xl lg:text-4xl font-medium text-gray-600 mt-2">
                  by Kawai Pharmaceutical
                </span>
              </h1>
              <p className="mt-6 text-lg text-gray-600 leading-relaxed max-w-lg">
                Premium men&apos;s wellness formula. Natural herbal extracts for enhanced stamina, confidence, and intimate performance.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <a
                  href="#packages"
                  className="inline-flex items-center gap-2 px-7 py-3.5 bg-amber-600 hover:bg-amber-700 text-white font-semibold rounded-xl transition-all shadow-lg shadow-amber-600/25 hover:shadow-amber-600/40 hover:-translate-y-0.5"
                >
                  View Packages
                  <ArrowRight className="w-4 h-4" />
                </a>
                <a
                  href={`https://wa.me/${whatsappNumber}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-7 py-3.5 bg-white hover:bg-gray-50 text-gray-700 font-semibold rounded-xl transition-colors border border-gray-200"
                >
                  <MessageCircle className="w-4 h-4" />
                  Contact Us
                </a>
              </div>

              <div className="mt-10 flex flex-wrap items-center gap-6 text-sm text-gray-500">
                <div className="flex items-center gap-1.5">
                  <Truck className="w-4 h-4 text-amber-500" />
                  Free Shipping
                </div>
                <div className="flex items-center gap-1.5">
                  <Shield className="w-4 h-4 text-amber-500" />
                  100% Authentic
                </div>
                <div className="flex items-center gap-1.5">
                  <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                  4.9/5 (857 reviews)
                </div>
              </div>
            </div>

            <div className="relative hidden lg:block">
              <div className="relative w-full aspect-square max-w-lg mx-auto">
                <div className="absolute inset-8 bg-gradient-to-br from-amber-100 to-orange-50 rounded-full" />
                {product?.imageUrl && (
                  <img
                    src={product.imageUrl}
                    alt="MaxPlus+ Performance Gel"
                    className="relative z-10 w-full h-full object-cover rounded-3xl shadow-2xl"
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-bold text-gray-900">Why Choose MaxPlus+?</h2>
            <p className="mt-3 text-gray-500">Trusted by thousands of men worldwide</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Leaf, title: '100% Natural', desc: 'Premium herbal extracts', color: 'text-green-600', bg: 'bg-green-50' },
              { icon: Zap, title: 'Fast Acting', desc: 'Absorbs in 60 seconds', color: 'text-amber-600', bg: 'bg-amber-50' },
              { icon: Shield, title: 'Clinically Tested', desc: 'No side effects', color: 'text-blue-600', bg: 'bg-blue-50' },
              { icon: Award, title: 'Japanese Quality', desc: 'Pharmaceutical grade', color: 'text-purple-600', bg: 'bg-purple-50' },
            ].map((feature) => (
              <div
                key={feature.title}
                className="p-6 rounded-2xl border border-gray-100 hover:border-gray-200 hover:shadow-lg transition-all group"
              >
                <div className={`w-12 h-12 ${feature.bg} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <feature.icon className={`w-6 h-6 ${feature.color}`} />
                </div>
                <h3 className="font-semibold text-gray-900">{feature.title}</h3>
                <p className="mt-2 text-sm text-gray-500 leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gradient-to-r from-amber-600 to-orange-500 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { value: '10K+', label: 'Happy Customers' },
              { value: '50+', label: 'Countries Served' },
              { value: '4.9/5', label: 'Average Rating' },
              { value: '100%', label: 'Natural Formula' },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-3xl sm:text-4xl font-bold">{stat.value}</div>
                <div className="mt-1 text-sm text-amber-100">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Packages Section */}
      <section id="packages" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-bold text-gray-900">Choose Your Package</h2>
            <p className="mt-3 text-gray-500">Select the plan that fits your needs</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { name: '1 Box', subtitle: 'Starter Pack', price: 49.9, comparePrice: 69.9, badge: null, highlights: ['30-day supply', 'Extend intimate time', 'Free shipping'] },
              { name: '2 Boxes', subtitle: 'Treatment Pack', price: 89.9, comparePrice: 139.8, badge: 'Most Popular', highlights: ['60-day supply', 'Treat performance issues', 'Save $49.90', 'Free shipping'] },
              { name: '3 Boxes', subtitle: 'Premium Pack', price: 119.9, comparePrice: 209.7, badge: 'Best Value', highlights: ['90-day supply', 'Maximum results', 'Save $89.80', 'Free shipping', 'Priority support'] },
            ].map((pkg) => (
              <div
                key={pkg.name}
                className={`bg-white rounded-2xl ${pkg.badge ? 'border-2 border-amber-500 shadow-xl' : 'border border-gray-200'} p-8 flex flex-col hover:shadow-lg transition-shadow`}
              >
                {pkg.badge && (
                  <div className="bg-amber-500 text-white text-xs font-bold px-3 py-1 rounded-full mb-6 self-start">
                    {pkg.badge}
                  </div>
                )}
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{pkg.name}</h3>
                <p className="text-gray-500 text-sm mb-6">{pkg.subtitle}</p>
                <div className="flex items-baseline gap-3 mb-8">
                  <span className="text-5xl font-bold text-gray-900">${pkg.price}</span>
                  <span className="text-xl text-gray-400 line-through">${pkg.comparePrice}</span>
                </div>
                <ul className="space-y-3 mb-8 flex-1">
                  {pkg.highlights.map((h) => (
                    <li key={h} className="flex items-start gap-3 text-gray-700">
                      <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
                <a
                  href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(`Order: MaxPlus+ ${pkg.name} - $${pkg.price}`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3.5 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-xl transition-colors flex items-center justify-center gap-2"
                >
                  <MessageCircle className="w-5 h-5" />
                  Order via WhatsApp
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Ingredients Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-bold text-gray-900">Natural Ingredients</h2>
            <p className="mt-3 text-gray-500">Premium herbal extracts for optimal results</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { name: 'Epimedium', desc: 'Enhances blood flow and stamina. Traditional herb known for its performance-enhancing properties.' },
              { name: 'Cuscuta Seed', desc: 'Supports reproductive health and vitality. Rich in antioxidants and essential nutrients.' },
              { name: 'Goji Berry', desc: 'Powerful antioxidant properties. Boosts energy and overall wellness.' },
            ].map((ing) => (
              <div key={ing.name} className="p-8 rounded-2xl border border-gray-100 hover:border-gray-200 hover:shadow-lg transition-all">
                <div className="w-12 h-12 bg-amber-50 rounded-xl flex items-center justify-center mb-4">
                  <Leaf className="w-6 h-6 text-amber-600" />
                </div>
                <h3 className="font-bold text-gray-900 text-lg mb-3">{ing.name}</h3>
                <p className="text-gray-600 leading-relaxed">{ing.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How to Use Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-bold text-gray-900">How to Use</h2>
            <p className="mt-3 text-gray-500">Simple 3-step process for best results</p>
          </div>

          <div className="grid md:grid-cols-3 gap-12">
            {[
              { step: '1', icon: <Clock className="w-6 h-6" />, title: 'Apply', desc: 'Apply a moderate amount to the target area' },
              { step: '2', icon: <Zap className="w-6 h-6" />, title: 'Massage', desc: 'Massage gently for 60 seconds until fully absorbed' },
              { step: '3', icon: <CheckCircle className="w-6 h-6" />, title: 'Wait', desc: 'No rinsing needed. Works quickly and effectively' },
            ].map((s) => (
              <div key={s.step} className="text-center">
                <div className="w-16 h-16 bg-amber-600 rounded-2xl flex items-center justify-center text-white mx-auto mb-6 shadow-lg shadow-amber-600/25">
                  {s.icon}
                </div>
                <div className="text-sm font-bold text-amber-600 mb-2">STEP {s.step}</div>
                <h3 className="font-bold text-gray-900 text-lg mb-3">{s.title}</h3>
                <p className="text-gray-600">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-bold text-gray-900">Frequently Asked Questions</h2>
            <p className="mt-3 text-gray-500">Everything you need to know</p>
          </div>

          <div className="space-y-6">
            {[
              { q: 'How does MaxPlus+ work?', a: 'MaxPlus+ is a topical gel that absorbs quickly into the skin. Apply and massage for 60 seconds. The natural herbal formula works within minutes.' },
              { q: 'Is it safe to use?', a: 'Yes, MaxPlus+ is made from 100% natural herbal extracts. It has been clinically tested with no reported side effects.' },
              { q: 'How long until I see results?', a: 'Most users notice results within the first use. For best results, use consistently for 30-90 days depending on your package.' },
              { q: 'Is shipping discreet?', a: 'Yes, all orders are shipped in plain unmarked packaging. Your privacy is 100% guaranteed.' },
              { q: 'Do you offer a money-back guarantee?', a: 'Yes, we offer a 30-day money-back guarantee. If you\'re not satisfied, contact us for a full refund.' },
            ].map((faq) => (
              <div key={faq.q} className="p-8 rounded-2xl border border-gray-100 hover:border-gray-200 transition-colors">
                <h3 className="font-bold text-gray-900 text-lg mb-3">{faq.q}</h3>
                <p className="text-gray-600 leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-amber-600 to-orange-500">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">Ready to Get Started?</h2>
          <p className="text-amber-100 text-lg mb-10">Order now via WhatsApp and get free shipping</p>
          <a
            href={`https://wa.me/${whatsappNumber}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-10 py-5 bg-white text-amber-600 font-bold rounded-xl transition-colors shadow-lg hover:shadow-xl"
          >
            <MessageCircle className="w-5 h-5" />
            Order via WhatsApp
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <h3 className="text-white font-bold text-lg mb-4">MaxPlus+</h3>
              <p className="text-sm">Premium Japanese men&apos;s wellness formula by Kawai Pharmaceutical.</p>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-4">Contact</h3>
              <p className="text-sm">WhatsApp: +{whatsappNumber}</p>
              <p className="text-sm mt-2">Available 24/7</p>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-4">Shipping</h3>
              <p className="text-sm">Free worldwide shipping</p>
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
