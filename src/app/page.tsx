import { getProducts, getSettings } from '@/lib/db';
import ProductCard from '@/components/product-card';
import WhatsAppFloat from '@/components/whatsapp-float';
import TrackingScripts from '@/components/tracking-scripts';
import { getPixels } from '@/lib/db';

export const dynamic = 'force-dynamic';

export default async function Home() {
  const [products, settings, pixels] = await Promise.all([
    getProducts(),
    getSettings(),
    getPixels(),
  ]);

  const whatsappNumber = settings.whatsappNumber || '13023107970';

  return (
    <>
      <TrackingScripts pixels={pixels} />

      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-gray-900 via-black to-gray-900">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-amber-900/20 via-transparent to-transparent" />
        <div className="relative z-10 max-w-6xl mx-auto px-4 text-center">
          <div className="inline-block mb-6 px-4 py-2 bg-amber-500/20 border border-amber-500/30 rounded-full">
            <span className="text-amber-400 text-sm font-medium tracking-wide">JAPANESE FORMULA • CLINICALLY TESTED</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
            Max<span className="text-amber-400">Plus</span>+
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-4 max-w-2xl mx-auto">
            Advanced Men&apos;s Performance Gel
          </p>
          <p className="text-lg text-gray-400 mb-8 max-w-xl mx-auto">
            Japanese-engineered topical formula for enhanced stamina, confidence, and intimate wellness
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="#products" className="px-8 py-4 bg-amber-500 hover:bg-amber-600 text-black font-bold rounded-lg text-lg transition-all transform hover:scale-105">
              Shop Now
            </a>
            <a href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(settings.whatsappMessage)}`} target="_blank" rel="noopener noreferrer" className="px-8 py-4 bg-green-600 hover:bg-green-700 text-white font-bold rounded-lg text-lg transition-all flex items-center justify-center gap-2">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
              WhatsApp Order
            </a>
          </div>
          <div className="mt-12 flex flex-wrap justify-center gap-8 text-gray-400">
            <div className="flex items-center gap-2"><span className="text-amber-400 text-xl">✓</span> 100% Natural</div>
            <div className="flex items-center gap-2"><span className="text-amber-400 text-xl">✓</span> Fast Acting</div>
            <div className="flex items-center gap-2"><span className="text-amber-400 text-xl">✓</span> No Side Effects</div>
            <div className="flex items-center gap-2"><span className="text-amber-400 text-xl">✓</span> Discreet Shipping</div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-black">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-4">Why Choose MaxPlus?</h2>
          <p className="text-gray-400 text-center mb-12 max-w-2xl mx-auto">Japanese pharmaceutical-grade formula with proven results</p>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: '', title: 'Japanese Formula', desc: 'Developed by Kawai Pharmaceutical with traditional herbal extracts and modern science' },
              { icon: '⚡', title: 'Fast Absorption', desc: 'Advanced penetration technology ensures rapid absorption within 60 seconds of application' },
              { icon: '️', title: 'Safe & Natural', desc: 'Made with Epimedium, Cuscuta, and Goji Berry extracts. No chemicals, no side effects' },
            ].map((f, i) => (
              <div key={i} className="bg-gray-900/50 border border-gray-800 rounded-xl p-8 text-center hover:border-amber-500/50 transition-all">
                <div className="text-4xl mb-4">{f.icon}</div>
                <h3 className="text-xl font-bold text-white mb-3">{f.title}</h3>
                <p className="text-gray-400">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section id="products" className="py-20 bg-gradient-to-b from-black to-gray-900">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-4">Choose Your Package</h2>
          <p className="text-gray-400 text-center mb-12">Select the plan that fits your needs</p>
          <div className="grid md:grid-cols-3 gap-8">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} whatsappNumber={whatsappNumber} />
            ))}
          </div>
        </div>
      </section>

      {/* Ingredients Section */}
      <section className="py-20 bg-black">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-4">Natural Ingredients</h2>
          <p className="text-gray-400 text-center mb-12">Premium herbal extracts for maximum effectiveness</p>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { name: 'Epimedium Extract', desc: 'Traditional herb known for enhancing blood flow and stamina', color: 'from-green-800 to-green-900' },
              { name: 'Cuscuta Seed Extract', desc: 'Supports reproductive health and vitality', color: 'from-amber-800 to-amber-900' },
              { name: 'Goji Berry Extract', desc: 'Rich in antioxidants, boosts energy and endurance', color: 'from-red-800 to-red-900' },
            ].map((ing, i) => (
              <div key={i} className={`bg-gradient-to-br ${ing.color} rounded-xl p-8 text-center border border-gray-700`}>
                <h3 className="text-xl font-bold text-white mb-3">{ing.name}</h3>
                <p className="text-gray-300">{ing.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How to Use */}
      <section className="py-20 bg-gradient-to-b from-gray-900 to-black">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-12">How to Use</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { step: '1', title: 'Apply', desc: 'Apply a moderate amount evenly to the penis and scrotum area' },
              { step: '2', title: 'Massage', desc: 'Use both hands to massage repeatedly until fully absorbed' },
              { step: '3', title: 'Wait', desc: 'After about 60 seconds of massage, the essence is naturally absorbed. No rinsing needed' },
            ].map((s, i) => (
              <div key={i} className="text-center">
                <div className="w-16 h-16 bg-amber-500 rounded-full flex items-center justify-center text-2xl font-bold text-black mx-auto mb-4">{s.step}</div>
                <h3 className="text-xl font-bold text-white mb-2">{s.title}</h3>
                <p className="text-gray-400">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-amber-500">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-black mb-4">Ready to Transform Your Confidence?</h2>
          <p className="text-black/70 text-lg mb-8">Order now via WhatsApp for fast, discreet shipping</p>
          <a href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(settings.whatsappMessage)}`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-3 px-10 py-5 bg-black hover:bg-gray-900 text-amber-400 font-bold rounded-lg text-xl transition-all transform hover:scale-105">
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
            Order via WhatsApp
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black border-t border-gray-800 py-8">
        <div className="max-w-6xl mx-auto px-4 text-center text-gray-500 text-sm">
          <p className="mb-2">&copy; 2024 MaxPlus. All rights reserved.</p>
          <p>These statements have not been evaluated by the FDA. This product is not intended to diagnose, treat, cure, or prevent any disease.</p>
        </div>
      </footer>

      <WhatsAppFloat whatsappNumber={whatsappNumber} message={settings.whatsappMessage} />
    </>
  );
}
