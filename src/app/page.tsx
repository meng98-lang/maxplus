import { getProducts, getSettings } from '@/lib/db';
import WhatsAppFloat from '@/components/whatsapp-float';
import TrackingScripts from '@/components/tracking-scripts';
import {
  Check,
  Star,
  MessageCircle,
  Truck,
  Shield,
  Zap,
  ArrowRight,
  Leaf,
  Clock,
  Award,
} from 'lucide-react';

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
                <Zap className="w-3.5 h-3.5" />
                Summer Sale - Up to 43% Off
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                MaxPlus+
                <span className="block bg-gradient-to-r from-amber-600 to-orange-500 bg-clip-text text-transparent">
                  Performance Gel
                </span>
              </h1>
              <p className="mt-6 text-lg text-gray-600 leading-relaxed max-w-lg">
                By Kawai Pharmaceutical. 100% natural herbal formula to extend intimate time, boost performance, and enhance confidence. Trusted by 50,000+ men worldwide.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <a
                  href="#order"
                  className="inline-flex items-center gap-2 px-7 py-3.5 bg-amber-500 hover:bg-amber-600 text-white font-semibold rounded-xl transition-all shadow-lg shadow-amber-500/25 hover:shadow-amber-500/40 hover:-translate-y-0.5"
                >
                  Order Now
                  <ArrowRight className="w-4 h-4" />
                </a>
                <a
                  href={`https://wa.me/${whatsappNumber}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-7 py-3.5 bg-white hover:bg-gray-50 text-gray-700 font-semibold rounded-xl transition-colors border border-gray-200"
                >
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
                  30-Day Guarantee
                </div>
                <div className="flex items-center gap-1.5">
                  <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                  4.9/5
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
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Zap, title: 'Fast Acting', desc: 'Works within 60 seconds. No waiting, no mess.', color: 'text-amber-500', bg: 'bg-amber-50' },
              { icon: Clock, title: 'Long Lasting', desc: 'Extend intimate time by 2-3x with proven formula.', color: 'text-orange-500', bg: 'bg-orange-50' },
              { icon: Leaf, title: '100% Natural', desc: 'Premium herbal extracts. No chemicals, no side effects.', color: 'text-green-500', bg: 'bg-green-50' },
              { icon: Award, title: 'Clinically Tested', desc: 'Dermatologically tested and approved for safety.', color: 'text-blue-500', bg: 'bg-blue-50' },
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

      {/* Products Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-10">
            <div>
              <h2 className="text-3xl font-bold text-gray-900">Choose Your Package</h2>
              <p className="mt-2 text-gray-500">Select the plan that fits your needs</p>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { name: '1 Box', price: 49.9, comparePrice: 69.9, badge: null, highlights: ['30-day supply', 'Extend intimate time', 'Free shipping', 'Money-back guarantee'] },
              { name: '2 Boxes', price: 89.9, comparePrice: 139.8, badge: 'Most Popular', highlights: ['60-day supply', 'Treat performance issues', 'Save $49.90', 'Free shipping', 'Priority support'] },
              { name: '3 Boxes', price: 119.9, comparePrice: 209.7, badge: 'Best Value', highlights: ['90-day supply', 'Maximum results', 'Save $89.80', 'Free shipping', 'VIP support', 'Gift included'] },
            ].map((pkg) => (
              <div key={pkg.name} className={`bg-white rounded-2xl p-6 border-2 ${pkg.badge ? 'border-amber-500 shadow-lg' : 'border-gray-100'}`}>
                {pkg.badge && (
                  <div className="bg-amber-500 text-white text-xs font-bold px-3 py-1 rounded-full mb-3 inline-block">
                    {pkg.badge}
                  </div>
                )}
                <h3 className="text-xl font-bold text-gray-900 mb-1">{pkg.name}</h3>
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
                  className="w-full py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-xl flex items-center justify-center gap-2 text-sm transition-colors"
                >
                  <MessageCircle className="w-4 h-4" />
                  Order via WhatsApp
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gradient-to-r from-amber-500 to-orange-500 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { value: '50K+', label: 'Happy Customers' },
              { value: '4.9/5', label: 'Average Rating' },
              { value: '100%', label: 'Natural Formula' },
              { value: '30-Day', label: 'Money Back' },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-3xl sm:text-4xl font-bold">{stat.value}</div>
                <div className="mt-1 text-sm text-amber-100">{stat.label}</div>
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
            <p className="mt-2 text-gray-500">Premium herbal extracts for optimal results</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { name: 'Epimedium', desc: 'Known as Horny Goat Weed. Enhances blood flow, boosts stamina, and supports healthy testosterone levels.', color: 'text-green-500', bg: 'bg-green-50' },
              { name: 'Cuscuta Seed', desc: 'Powerful antioxidant properties. Supports reproductive health, improves vitality, and enhances overall male wellness.', color: 'text-amber-500', bg: 'bg-amber-50' },
              { name: 'Goji Berry', desc: 'Rich in vitamins and minerals. Boosts energy, improves circulation, and provides essential nutrients for optimal performance.', color: 'text-red-500', bg: 'bg-red-50' },
            ].map((ing) => (
              <div key={ing.name} className="p-6 rounded-2xl border border-gray-100 hover:border-gray-200 hover:shadow-lg transition-all">
                <div className={`w-12 h-12 ${ing.bg} rounded-xl flex items-center justify-center mb-4`}>
                  <Leaf className={`w-6 h-6 ${ing.color}`} />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">{ing.name}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{ing.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How to Use Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-bold text-gray-900">How to Use</h2>
            <p className="mt-2 text-gray-500">Simple 3-step process for best results</p>
          </div>

          <div className="grid sm:grid-cols-3 gap-8">
            {[
              { step: '01', title: 'Clean', desc: 'Wash the target area with warm water and dry thoroughly' },
              { step: '02', title: 'Apply', desc: 'Apply a moderate amount of gel evenly to the target area' },
              { step: '03', title: 'Massage', desc: 'Massage gently for 60 seconds until fully absorbed. No rinsing needed.' },
            ].map((s) => (
              <div key={s.step} className="text-center">
                <div className="w-16 h-16 bg-amber-500 text-white rounded-2xl flex items-center justify-center font-bold text-2xl mx-auto mb-4">
                  {s.step}
                </div>
                <h3 className="font-semibold text-lg text-gray-900 mb-2">{s.title}</h3>
                <p className="text-gray-500 text-sm">{s.desc}</p>
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
          </div>

          <div className="space-y-4">
            {[
              { q: 'How quickly does MaxPlus+ work?', a: 'MaxPlus+ is designed to work within 60 seconds of application. The fast-absorbing formula penetrates quickly for immediate results.' },
              { q: 'Is MaxPlus+ safe to use?', a: 'Yes, MaxPlus+ is made from 100% natural herbal extracts. It has been dermatologically tested and is free from harmful chemicals or side effects.' },
              { q: 'How long do the effects last?', a: 'Effects typically last 2-3 hours. For best results, we recommend consistent use over 4-8 weeks for long-term benefits.' },
              { q: 'Do you offer discreet shipping?', a: 'Yes, all orders are shipped in plain, unmarked packaging to ensure complete privacy and discretion.' },
              { q: 'What is your refund policy?', a: 'We offer a 30-day money-back guarantee. If you\'re not satisfied with the results, contact us for a full refund.' },
            ].map((faq) => (
              <div key={faq.q} className="p-6 bg-gray-50 rounded-xl">
                <h3 className="font-semibold text-gray-900 mb-2">{faq.q}</h3>
                <p className="text-gray-600 text-sm">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-amber-50 to-orange-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Ready to Enhance Your Performance?
          </h2>
          <p className="text-gray-600 mb-8">
            Join 50,000+ satisfied customers. Order now and experience the difference.
          </p>
          <a
            href="#order"
            className="inline-flex items-center gap-2 px-8 py-4 bg-amber-500 hover:bg-amber-600 text-white font-semibold rounded-xl transition-all shadow-lg shadow-amber-500/25 hover:shadow-amber-500/40 hover:-translate-y-0.5"
          >
            Order Now
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <div className="text-xl font-bold text-white mb-4">
                Max<span className="text-amber-500">Plus</span>+
              </div>
              <p className="text-sm">
                Premium men\'s wellness formula by Kawai Pharmaceutical.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">Contact</h4>
              <p className="text-sm">WhatsApp: +{whatsappNumber}</p>
              <p className="text-sm">Available 24/7</p>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">Shipping</h4>
              <p className="text-sm">Free worldwide shipping</p>
              <p className="text-sm">Discreet packaging</p>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center">
            <p className="text-sm">&copy; 2024 MaxPlus+. All rights reserved.</p>
            <p className="text-xs text-gray-500 mt-2">
              These statements have not been evaluated by the FDA. This product is not intended to diagnose, treat, cure, or prevent any disease.
            </p>
          </div>
        </div>
      </footer>

      <WhatsAppFloat />
    </>
  );
}
