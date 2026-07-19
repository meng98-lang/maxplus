import { getProducts, getSettings } from '@/lib/db';
import WhatsAppFloat from '@/components/whatsapp-float';
import TrackingScripts from '@/components/tracking-scripts';
import { getPixels } from '@/lib/db';
import { Shield, Zap, Leaf, Truck, Clock, CheckCircle } from 'lucide-react';

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
      <TrackingScripts />

      {/* Hero Section - Clean & Premium */}
      <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,_rgba(251,191,36,0.1),_transparent_50%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,_rgba(251,191,36,0.08),_transparent_50%)]" />
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-6 py-20 text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 mb-8 px-4 py-2 bg-amber-500/10 border border-amber-500/20 rounded-full backdrop-blur-sm">
            <span className="w-2 h-2 bg-amber-400 rounded-full animate-pulse" />
            <span className="text-amber-400 text-sm font-medium tracking-wider uppercase">Japanese Formula • Clinically Tested</span>
          </div>

          {/* Main Title */}
          <h1 className="text-6xl md:text-8xl font-bold text-white mb-6 tracking-tight">
            Max<span className="text-amber-400">Plus</span>+
          </h1>
          
          {/* Subtitle */}
          <p className="text-2xl md:text-3xl text-gray-300 mb-4 font-light">
            Advanced Men&apos;s Performance Gel
          </p>
          <p className="text-lg text-gray-400 mb-12 max-w-2xl mx-auto leading-relaxed">
            Japanese-engineered topical formula for enhanced stamina, confidence, and intimate wellness
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <a 
              href="#products" 
              className="px-10 py-4 bg-amber-500 hover:bg-amber-600 text-black font-semibold rounded-lg text-lg transition-all transform hover:scale-105 shadow-lg shadow-amber-500/20"
            >
              Shop Now
            </a>
            <a 
              href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(settings.whatsappMessage || "Hello, I'm interested in MaxPlus")}`} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="px-10 py-4 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg text-lg transition-all flex items-center justify-center gap-3 shadow-lg shadow-green-600/20"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              WhatsApp Order
            </a>
          </div>

          {/* Trust Badges */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {[
              { icon: <Leaf className="w-5 h-5" />, text: '100% Natural' },
              { icon: <Zap className="w-5 h-5" />, text: 'Fast Acting' },
              { icon: <Shield className="w-5 h-5" />, text: 'No Side Effects' },
              { icon: <Truck className="w-5 h-5" />, text: 'Discreet Shipping' },
            ].map((item, i) => (
              <div key={i} className="flex items-center justify-center gap-2 text-gray-400">
                <span className="text-amber-400">{item.icon}</span>
                <span className="text-sm font-medium">{item.text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-slate-900">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Why Choose MaxPlus?</h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">Japanese pharmaceutical-grade formula with proven results</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { 
                icon: <Shield className="w-8 h-8" />, 
                title: 'Japanese Formula', 
                desc: 'Developed by Kawai Pharmaceutical with traditional herbal extracts and modern science' 
              },
              { 
                icon: <Zap className="w-8 h-8" />, 
                title: 'Fast Absorption', 
                desc: 'Advanced penetration technology ensures rapid absorption within 60 seconds of application' 
              },
              { 
                icon: <Leaf className="w-8 h-8" />, 
                title: 'Safe & Natural', 
                desc: 'Made with Epimedium, Cuscuta, and Goji Berry extracts. No chemicals, no side effects' 
              },
            ].map((feature, i) => (
              <div key={i} className="bg-slate-800/50 border border-slate-700 rounded-2xl p-8 text-center hover:border-amber-500/50 transition-all group">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-amber-500/10 rounded-xl mb-6 text-amber-400 group-hover:scale-110 transition-transform">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
                <p className="text-gray-400 leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section id="products" className="py-24 bg-gradient-to-b from-slate-900 to-slate-800">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Choose Your Package</h2>
            <p className="text-gray-400 text-lg">Select the plan that fits your needs</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {products.map((product) => (
              <div key={product.id} className="bg-slate-800 border border-slate-700 rounded-2xl overflow-hidden hover:border-amber-500/50 transition-all group flex flex-col">
                {/* Badge */}
                {product.badge && (
                  <div className="bg-amber-500 text-black text-xs font-bold px-4 py-2 text-center">
                    {product.badge}
                  </div>
                )}
                
                {/* Image */}
                <div className="aspect-square bg-gradient-to-br from-slate-700 to-slate-800 p-8 flex items-center justify-center">
                  {product.imageUrl ? (
                    <img 
                      src={product.imageUrl} 
                      alt={product.name} 
                      className="w-full h-full object-contain rounded-lg group-hover:scale-105 transition-transform duration-500" 
                    />
                  ) : (
                    <div className="text-6xl text-slate-600">📦</div>
                  )}
                </div>
                
                {/* Content */}
                <div className="p-8 flex flex-col flex-1">
                  <div className="text-amber-400 text-sm font-semibold mb-2 uppercase tracking-wider">{product.label}</div>
                  <h3 className="text-2xl font-bold text-white mb-2">{product.name}</h3>
                  <p className="text-gray-400 text-sm mb-6 leading-relaxed flex-1">{product.description}</p>
                  
                  {/* Price */}
                  <div className="flex items-baseline gap-3 mb-6">
                    <span className="text-4xl font-bold text-white">${product.price}</span>
                    {product.comparePrice > 0 && (
                      <span className="text-xl text-gray-500 line-through">${product.comparePrice}</span>
                    )}
                  </div>
                  
                  {/* Highlights */}
                  {product.highlights && product.highlights.length > 0 && (
                    <ul className="space-y-2 mb-6">
                      {product.highlights.slice(0, 3).map((highlight, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-gray-300">
                          <CheckCircle className="w-4 h-4 text-amber-400 mt-0.5 flex-shrink-0" />
                          <span>{highlight}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                  
                  {/* CTA Button */}
                  <a
                    href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(`Hi, I would like to order: ${product.name} - $${product.price}`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-4 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg transition-all flex items-center justify-center gap-2 shadow-lg shadow-green-600/20"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                    </svg>
                    Buy via WhatsApp
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Ingredients Section */}
      <section className="py-24 bg-slate-900">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Natural Ingredients</h2>
            <p className="text-gray-400 text-lg">Premium herbal extracts for maximum effectiveness</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { 
                name: 'Epimedium Extract', 
                desc: 'Traditional herb known for enhancing blood flow and stamina',
                color: 'from-emerald-600 to-emerald-800'
              },
              { 
                name: 'Cuscuta Seed Extract', 
                desc: 'Supports reproductive health and vitality',
                color: 'from-amber-600 to-amber-800'
              },
              { 
                name: 'Goji Berry Extract', 
                desc: 'Rich in antioxidants, boosts energy and endurance',
                color: 'from-red-600 to-red-800'
              },
            ].map((ing, i) => (
              <div key={i} className={`bg-gradient-to-br ${ing.color} rounded-2xl p-8 text-center border border-slate-700 hover:scale-105 transition-transform`}>
                <h3 className="text-xl font-bold text-white mb-3">{ing.name}</h3>
                <p className="text-gray-200 leading-relaxed">{ing.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How to Use */}
      <section className="py-24 bg-gradient-to-b from-slate-800 to-slate-900">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">How to Use</h2>
            <p className="text-gray-400 text-lg">Simple 3-step process for optimal results</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { step: '1', title: 'Apply', desc: 'Apply a moderate amount evenly to the target area' },
              { step: '2', title: 'Massage', desc: 'Use both hands to massage repeatedly until fully absorbed' },
              { step: '3', title: 'Wait', desc: 'After about 60 seconds, the essence is naturally absorbed. No rinsing needed' },
            ].map((s, i) => (
              <div key={i} className="text-center">
                <div className="w-20 h-20 bg-amber-500 rounded-full flex items-center justify-center text-3xl font-bold text-black mx-auto mb-6 shadow-lg shadow-amber-500/20">
                  {s.step}
                </div>
                <h3 className="text-2xl font-bold text-white mb-3">{s.title}</h3>
                <p className="text-gray-400 leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-amber-500">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-black mb-6">Ready to Transform Your Confidence?</h2>
          <p className="text-black/70 text-xl mb-10">Order now via WhatsApp for fast, discreet shipping</p>
          <a 
            href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(settings.whatsappMessage || "Hello, I'm interested in MaxPlus")}`} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="inline-flex items-center gap-3 px-12 py-6 bg-black hover:bg-gray-900 text-amber-400 font-bold rounded-lg text-xl transition-all transform hover:scale-105 shadow-2xl"
          >
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            Order via WhatsApp
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 border-t border-slate-800 py-12">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <div className="mb-6">
            <h3 className="text-2xl font-bold text-white mb-2">Max<span className="text-amber-400">Plus</span>+</h3>
            <p className="text-gray-500 text-sm">Advanced Men&apos;s Performance Gel</p>
          </div>
          <p className="text-gray-500 text-sm mb-4">&copy; 2024 MaxPlus. All rights reserved.</p>
          <p className="text-gray-600 text-xs max-w-2xl mx-auto">
            These statements have not been evaluated by the FDA. This product is not intended to diagnose, treat, cure, or prevent any disease.
          </p>
        </div>
      </footer>

      <WhatsAppFloat />
    </>
  );
}
