import { getProducts, getSettings } from '@/lib/db';
import WhatsAppFloat from '@/components/whatsapp-float';
import TrackingScripts from '@/components/tracking-scripts';
import { Check, Star, MessageCircle } from 'lucide-react';

export const dynamic = 'force-dynamic';

export async function generateMetadata() {
  return {
    title: 'MaxPlus+ — Japanese Men\'s Performance Gel',
    description: '100% natural herbal formula. Extend intimate time, boost performance, enhance confidence. Trusted by 50,000+ men worldwide.',
    openGraph: {
      title: 'MaxPlus+ — Japanese Men\'s Performance Gel',
      description: 'Natural herbal formula for enhanced performance',
      type: 'website',
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

  return (
    <>
      <TrackingScripts />

      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="text-xl font-bold text-gray-900">
              Max<span className="text-amber-500">Plus</span>+
            </div>
            <a href={`https://wa.me/${whatsappNumber}`} target="_blank" rel="noopener noreferrer" className="text-sm text-gray-600 hover:text-gray-900">
              Contact Us
            </a>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="bg-white py-12 lg:py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                MaxPlus+<br />Performance Gel
              </h1>
              <p className="text-lg text-gray-600 mb-8">
                By Kawai Pharmaceutical. 100% natural herbal formula to extend intimate time, boost performance, and enhance confidence.
              </p>
              
              <div className="flex items-center gap-2 mb-8">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <span className="text-gray-600 text-sm">4.9/5 (857 reviews)</span>
              </div>

              <a href="#order" className="inline-block px-8 py-4 bg-amber-500 hover:bg-amber-600 text-white font-semibold rounded-lg">
                Order Now
              </a>
            </div>

            <div>
              {product?.imageUrl && (
                <img src={product.imageUrl} alt="MaxPlus+" className="w-full rounded-lg" />
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="bg-gray-50 py-12">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: 'Extend Intimate Time', desc: 'Up to 2-3x longer' },
              { title: 'Fast Absorption', desc: 'Works in 60 seconds' },
              { title: '100% Natural', desc: 'Herbal formula, no side effects' },
            ].map((item) => (
              <div key={item.title} className="text-center">
                <h3 className="font-semibold text-lg mb-2 text-gray-900">{item.title}</h3>
                <p className="text-gray-600 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Ingredients */}
      <section className="bg-white py-12">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-2xl font-bold text-center text-gray-900 mb-8">Natural Ingredients</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { name: 'Epimedium', desc: 'Enhances blood flow and stamina' },
              { name: 'Cuscuta Seed', desc: 'Supports reproductive health' },
              { name: 'Goji Berry', desc: 'Boosts energy and circulation' },
            ].map((ing) => (
              <div key={ing.name} className="p-6 bg-gray-50 rounded-lg">
                <h3 className="font-semibold mb-2 text-gray-900">{ing.name}</h3>
                <p className="text-gray-600 text-sm">{ing.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How to Use */}
      <section className="bg-gray-50 py-12">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-2xl font-bold text-center text-gray-900 mb-8">How to Use</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { step: '1', title: 'Clean', desc: 'Wash the target area with warm water' },
              { step: '2', title: 'Apply', desc: 'Apply moderate amount evenly' },
              { step: '3', title: 'Massage', desc: 'Massage for 60 seconds until absorbed' },
            ].map((s) => (
              <div key={s.step} className="text-center">
                <div className="w-10 h-10 bg-amber-500 text-white rounded-full flex items-center justify-center font-bold mx-auto mb-3">
                  {s.step}
                </div>
                <h3 className="font-semibold mb-1 text-gray-900">{s.title}</h3>
                <p className="text-gray-600 text-sm">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Order */}
      <section id="order" className="bg-white py-12">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-2xl font-bold text-center text-gray-900 mb-8">Choose Your Package</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { name: '1 Box', price: 49.9, comparePrice: 69.9, badge: null, highlights: ['30-day supply', 'Free shipping'] },
              { name: '2 Boxes', price: 89.9, comparePrice: 139.8, badge: 'Most Popular', highlights: ['60-day supply', 'Save $49.90', 'Free shipping'] },
              { name: '3 Boxes', price: 119.9, comparePrice: 209.7, badge: 'Best Value', highlights: ['90-day supply', 'Save $89.80', 'Free shipping', 'Gift included'] },
            ].map((pkg) => (
              <div key={pkg.name} className={`p-6 bg-white rounded-lg border-2 ${pkg.badge ? 'border-amber-500' : 'border-gray-200'}`}>
                {pkg.badge && (
                  <div className="bg-amber-500 text-white text-xs font-bold px-3 py-1 rounded-full mb-3 inline-block">
                    {pkg.badge}
                  </div>
                )}
                <h3 className="text-xl font-bold mb-1 text-gray-900">{pkg.name}</h3>
                <div className="flex items-baseline gap-2 mb-4">
                  <span className="text-3xl font-bold text-gray-900">${pkg.price}</span>
                  <span className="text-gray-400 line-through">${pkg.comparePrice}</span>
                </div>
                <ul className="space-y-2 mb-6">
                  {pkg.highlights.map((h) => (
                    <li key={h} className="flex items-center gap-2 text-sm text-gray-600">
                      <Check className="w-4 h-4 text-amber-500" />
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
                <a
                  href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(`Order: MaxPlus+ ${pkg.name} - $${pkg.price}`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg flex items-center justify-center gap-2 text-sm"
                >
                  <MessageCircle className="w-4 h-4" />
                  Order via WhatsApp
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-8">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <p className="text-sm">&copy; 2024 MaxPlus+. All rights reserved.</p>
          <p className="text-xs text-gray-500 mt-2">These statements have not been evaluated by the FDA. This product is not intended to diagnose, treat, cure, or prevent any disease.</p>
        </div>
      </footer>

      <WhatsAppFloat />
    </>
  );
}
