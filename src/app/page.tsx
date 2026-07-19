import { getProducts, getSettings } from '@/lib/db';
import WhatsAppFloat from '@/components/whatsapp-float';
import TrackingScripts from '@/components/tracking-scripts';
import { CheckCircle, Star, MessageCircle, Shield, Zap, Leaf, Truck } from 'lucide-react';

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

      {/* Hero */}
      <section className="bg-white">
        <div className="max-w-6xl mx-auto px-6 py-20 lg:py-28">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-amber-50 border border-amber-200 rounded-full mb-8">
                <span className="text-amber-700 text-sm font-medium">Japanese Pharmaceutical Grade</span>
              </div>
              <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                Max<span className="text-amber-600">Plus</span>+
              </h1>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Premium men&apos;s wellness formula by Kawai Pharmaceutical. Natural herbal extracts for enhanced stamina and confidence.
              </p>
              <div className="flex items-center gap-3 mb-10">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-amber-400 fill-amber-400" />
                  ))}
                </div>
                <span className="text-gray-600 text-sm">4.9 (857 reviews)</span>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <a href="#packages" className="px-8 py-4 bg-amber-600 hover:bg-amber-700 text-white font-medium rounded-lg transition-colors text-center">
                  View Packages
                </a>
                <a href={`https://wa.me/${whatsappNumber}`} target="_blank" rel="noopener noreferrer" className="px-8 py-4 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg transition-colors flex items-center justify-center gap-2">
                  <MessageCircle className="w-5 h-5" />
                  WhatsApp
                </a>
              </div>
            </div>
            <div className="aspect-square bg-gray-50 rounded-2xl p-16">
              {product?.imageUrl && <img src={product.imageUrl} alt="MaxPlus+" className="w-full h-full object-contain" />}
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="bg-gray-50 border-y border-gray-200">
        <div className="max-w-6xl mx-auto px-6 py-12">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: <Leaf className="w-5 h-5" />, title: '100% Natural', desc: 'Herbal extracts' },
              { icon: <Zap className="w-5 h-5" />, title: 'Fast Acting', desc: '60 sec absorption' },
              { icon: <Shield className="w-5 h-5" />, title: 'Clinically Tested', desc: 'No side effects' },
              { icon: <Truck className="w-5 h-5" />, title: 'Discreet Shipping', desc: 'Plain packaging' },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="text-amber-600">{item.icon}</div>
                <div>
                  <div className="font-semibold text-gray-900 text-sm">{item.title}</div>
                  <div className="text-xs text-gray-500">{item.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Packages */}
      <section id="packages" className="bg-white">
        <div className="max-w-6xl mx-auto px-6 py-24">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Choose Your Package</h2>
            <p className="text-lg text-gray-600">Select the plan that fits your needs</p>
          </div>
          <div className="grid lg:grid-cols-3 gap-8">
            {[
              { name: '1 Box', subtitle: 'Starter Pack', price: 49.9, comparePrice: 69.9, badge: null, highlights: ['30-day supply', 'Extend intimate time', 'Free shipping'] },
              { name: '2 Boxes', subtitle: 'Treatment Pack', price: 89.9, comparePrice: 139.8, badge: 'Most Popular', highlights: ['60-day supply', 'Treat performance issues', 'Save $49.90', 'Free shipping'] },
              { name: '3 Boxes', subtitle: 'Premium Pack', price: 119.9, comparePrice: 209.7, badge: 'Best Value', highlights: ['90-day supply', 'Maximum results', 'Save $89.80', 'Free shipping', 'Priority support'] },
            ].map((pkg, i) => (
              <div key={i} className={`bg-white rounded-xl ${pkg.badge ? 'border-2 border-amber-500 shadow-xl' : 'border border-gray-200'} p-10 flex flex-col`}>
                {pkg.badge && <div className="bg-amber-500 text-white text-xs font-bold px-3 py-1 rounded-full mb-6 self-start">{pkg.badge}</div>}
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{pkg.name}</h3>
                <p className="text-gray-500 text-sm mb-8">{pkg.subtitle}</p>
                <div className="flex items-baseline gap-3 mb-8">
                  <span className="text-5xl font-bold text-gray-900">${pkg.price}</span>
                  <span className="text-xl text-gray-400 line-through">${pkg.comparePrice}</span>
                </div>
                <ul className="space-y-4 mb-10 flex-1">
                  {pkg.highlights.map((h, j) => (
                    <li key={j} className="flex items-start gap-3 text-gray-700">
                      <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
                <a href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(`Order: MaxPlus+ ${pkg.name} - $${pkg.price}`)}`} target="_blank" rel="noopener noreferrer" className="w-full py-4 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg transition-colors flex items-center justify-center gap-2">
                  <MessageCircle className="w-5 h-5" />
                  Order via WhatsApp
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Ingredients */}
      <section className="bg-gray-50">
        <div className="max-w-6xl mx-auto px-6 py-24">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Natural Ingredients</h2>
            <p className="text-lg text-gray-600">Premium herbal extracts</p>
          </div>
          <div className="grid lg:grid-cols-3 gap-8">
            {[
              { name: 'Epimedium', desc: 'Enhances blood flow and stamina' },
              { name: 'Cuscuta Seed', desc: 'Supports reproductive health' },
              { name: 'Goji Berry', desc: 'Rich in antioxidants' },
            ].map((ing, i) => (
              <div key={i} className="bg-white rounded-xl p-8 border border-gray-200">
                <h3 className="font-bold text-gray-900 text-lg mb-3">{ing.name}</h3>
                <p className="text-gray-600">{ing.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How to Use */}
      <section className="bg-white">
        <div className="max-w-5xl mx-auto px-6 py-24">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">How to Use</h2>
            <p className="text-lg text-gray-600">Simple 3-step process</p>
          </div>
          <div className="grid md:grid-cols-3 gap-12">
            {[
              { step: '1', title: 'Apply', desc: 'Apply moderate amount to target area' },
              { step: '2', title: 'Massage', desc: 'Massage for 60 seconds until absorbed' },
              { step: '3', title: 'Wait', desc: 'No rinsing needed. Works quickly' },
            ].map((s, i) => (
              <div key={i} className="text-center">
                <div className="w-16 h-16 bg-amber-600 rounded-full flex items-center justify-center text-2xl font-bold text-white mx-auto mb-6">{s.step}</div>
                <h3 className="font-bold text-gray-900 text-lg mb-3">{s.title}</h3>
                <p className="text-gray-600">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-gray-50">
        <div className="max-w-4xl mx-auto px-6 py-24">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">FAQ</h2>
            <p className="text-lg text-gray-600">Common questions</p>
          </div>
          <div className="space-y-6">
            {[
              { q: 'How does MaxPlus+ work?', a: 'Topical gel that absorbs quickly. Apply and massage for 60 seconds.' },
              { q: 'Is it safe?', a: 'Yes, 100% natural herbal extracts. No side effects reported.' },
              { q: 'How long to see results?', a: 'Most users notice results within first use. For best results, use consistently for 30-90 days.' },
              { q: 'Is shipping discreet?', a: 'Yes, plain unmarked packaging. Your privacy is guaranteed.' },
            ].map((faq, i) => (
              <div key={i} className="bg-white rounded-xl p-8 border border-gray-200">
                <h3 className="font-bold text-gray-900 text-lg mb-3">{faq.q}</h3>
                <p className="text-gray-600">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-amber-600">
        <div className="max-w-4xl mx-auto px-6 py-20 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">Ready to Get Started?</h2>
          <p className="text-amber-100 text-lg mb-10">Order now via WhatsApp</p>
          <a href={`https://wa.me/${whatsappNumber}`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-10 py-5 bg-white text-amber-600 font-bold rounded-lg transition-colors">
            <MessageCircle className="w-5 h-5" />
            Order via WhatsApp
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-12">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <p className="text-sm">&copy; 2024 MaxPlus+. All rights reserved.</p>
          <p className="text-xs text-gray-500 mt-3">These statements have not been evaluated by the FDA.</p>
        </div>
      </footer>

      <WhatsAppFloat />
    </>
  );
}
