import { getProducts, getSettings } from '@/lib/db';
import WhatsAppFloat from '@/components/whatsapp-float';
import TrackingScripts from '@/components/tracking-scripts';
import { getPixels } from '@/lib/db';
import { Shield, Zap, Leaf, Truck, CheckCircle, Star, Award, Clock, Users, MessageCircle } from 'lucide-react';

export const dynamic = 'force-dynamic';

export async function generateMetadata() {
  return {
    title: 'MaxPlus+ Men\'s Performance Gel | Japanese Formula | Official Store',
    description: 'MaxPlus+ is a premium Japanese men\'s performance gel developed by Kawai Pharmaceutical. Natural herbal formula for enhanced stamina and confidence. Order now with discreet shipping.',
    keywords: 'men\'s health gel, Japanese formula, performance enhancer, natural supplement, Kawai Pharmaceutical, MaxPlus, intimate wellness, stamina boost',
    alternates: {
      canonical: 'https://maxplus.com',
    },
    openGraph: {
      title: 'MaxPlus+ Men\'s Performance Gel | Japanese Formula',
      description: 'Premium Japanese men\'s performance gel. Natural herbal formula for enhanced stamina and confidence.',
      type: 'website',
      locale: 'en_US',
      siteName: 'MaxPlus+',
      images: [
        {
          url: '/images/product-hero.jpeg',
          width: 1200,
          height: 630,
          alt: 'MaxPlus+ Performance Gel',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: 'MaxPlus+ Men\'s Performance Gel',
      description: 'Japanese-engineered topical formula for enhanced stamina and confidence',
      images: ['/images/product-hero.jpeg'],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  };
}

export default async function Home() {
  const [products, settings, pixels] = await Promise.all([
    getProducts(),
    getSettings(),
    getPixels(),
  ]);

  const whatsappNumber = settings.whatsappNumber || '13023107970';
  const product = products[0];

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': 'https://maxplus.com/#organization',
        name: 'MaxPlus+',
        url: 'https://maxplus.com',
        logo: {
          '@type': 'ImageObject',
          url: 'https://maxplus.com/images/product-hero.jpeg',
        },
        contactPoint: {
          '@type': 'ContactPoint',
          contactType: 'Customer Service',
          availableLanguage: ['English'],
        },
      },
      {
        '@type': 'Product',
        '@id': 'https://maxplus.com/#product',
        name: 'MaxPlus+ Performance Gel',
        image: [
          '/images/product-hero.jpeg',
          '/images/product-box.jpeg',
          '/images/product-set.jpeg',
        ],
        description: 'Premium Japanese men\'s performance gel developed by Kawai Pharmaceutical. Natural herbal formula for enhanced stamina, confidence, and intimate wellness.',
        brand: {
          '@type': 'Brand',
          name: 'Kawai Pharmaceutical',
        },
        offers: {
          '@type': 'AggregateOffer',
          priceCurrency: 'USD',
          lowPrice: '49.9',
          highPrice: '119.9',
          offerCount: '3',
          availability: 'https://schema.org/InStock',
        },
        aggregateRating: {
          '@type': 'AggregateRating',
          ratingValue: '4.9',
          reviewCount: '857',
          bestRating: '5',
          worstRating: '1',
        },
      },
      {
        '@type': 'FAQPage',
        '@id': 'https://maxplus.com/#faq',
        mainEntity: [
          {
            '@type': 'Question',
            name: 'How does MaxPlus+ work?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'MaxPlus+ is a topical gel that absorbs quickly into the skin. Apply a moderate amount to the target area, massage for 60 seconds until fully absorbed. The natural herbal formula works locally to enhance blood flow and sensitivity.',
            },
          },
          {
            '@type': 'Question',
            name: 'Is MaxPlus+ safe to use?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Yes, MaxPlus+ is made with 100% natural herbal extracts including Epimedium, Cuscuta Seed, and Goji Berry. It has been clinically tested and contains no chemicals or harmful ingredients. No side effects have been reported.',
            },
          },
          {
            '@type': 'Question',
            name: 'How long does it take to see results?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Most users report noticeable results within the first use. For optimal long-term benefits, we recommend using MaxPlus+ consistently for 30-90 days depending on your chosen package.',
            },
          },
          {
            '@type': 'Question',
            name: 'Is shipping discreet?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Yes, all orders are shipped in plain, unmarked packaging with no indication of the contents. Your privacy is our priority.',
            },
          },
          {
            '@type': 'Question',
            name: 'What is your refund policy?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'We offer a 30-day money-back guarantee. If you\'re not satisfied with the results, contact us via WhatsApp for a full refund.',
            },
          },
        ],
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <TrackingScripts />

      {/* Hero Section */}
      <section className="relative bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div>
              <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 bg-amber-100 border border-amber-200 rounded-full">
                <Award className="w-4 h-4 text-amber-600" />
                <span className="text-amber-800 text-sm font-medium">Japanese Pharmaceutical Grade</span>
              </div>

              <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                Max<span className="text-amber-600">Plus</span>+ Performance Gel
              </h1>
              
              <p className="text-xl text-gray-600 mb-6 leading-relaxed">
                Premium men&apos;s wellness formula developed by <strong>Kawai Pharmaceutical</strong>. Natural herbal extracts for enhanced stamina and confidence.
              </p>

              {/* Rating */}
              <div className="flex items-center gap-3 mb-8">
                <div className="flex items-center">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-amber-400 fill-amber-400" />
                  ))}
                </div>
                <span className="text-gray-600 font-medium">4.9/5</span>
                <span className="text-gray-400">•</span>
                <span className="text-gray-600">857 verified reviews</span>
              </div>

              {/* Key Benefits */}
              <ul className="space-y-3 mb-8">
                {[
                  'Extends intimate time by 2-3x',
                  'Fast absorption within 60 seconds',
                  '100% natural herbal formula',
                  'No side effects, clinically tested',
                ].map((benefit, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">{benefit}</span>
                  </li>
                ))}
              </ul>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <a 
                  href="#packages" 
                  className="px-8 py-4 bg-amber-600 hover:bg-amber-700 text-white font-semibold rounded-lg text-lg transition-all text-center shadow-lg"
                >
                  View Packages
                </a>
                <a 
                  href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent("Hello, I'm interested in MaxPlus+")}`} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="px-8 py-4 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg text-lg transition-all flex items-center justify-center gap-2 shadow-lg"
                >
                  <MessageCircle className="w-5 h-5" />
                  WhatsApp Us
                </a>
              </div>
            </div>

            {/* Right Image */}
            <div className="relative">
              <div className="aspect-square bg-gradient-to-br from-gray-100 to-gray-200 rounded-3xl p-12 shadow-xl">
                {product?.imageUrl ? (
                  <img 
                    src={product.imageUrl} 
                    alt="MaxPlus+ Performance Gel - Japanese men's wellness formula" 
                    className="w-full h-full object-contain"
                    loading="eager"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-8xl text-gray-400">📦</div>
                )}
              </div>
              {/* Trust Badge */}
              <div className="absolute -bottom-6 -right-6 bg-white rounded-2xl p-6 shadow-xl border border-gray-100">
                <div className="text-sm text-gray-500 mb-1">Starting from</div>
                <div className="text-4xl font-bold text-gray-900">$49.9</div>
                <div className="text-sm text-green-600 font-medium">Free Shipping</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Bar */}
      <section className="bg-gray-50 border-y border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { icon: <Leaf className="w-6 h-6" />, title: '100% Natural', desc: 'Herbal extracts' },
              { icon: <Zap className="w-6 h-6" />, title: 'Fast Acting', desc: '60 second absorption' },
              { icon: <Shield className="w-6 h-6" />, title: 'Clinically Tested', desc: 'No side effects' },
              { icon: <Truck className="w-6 h-6" />, title: 'Discreet Shipping', desc: 'Plain packaging' },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-4">
                <div className="text-amber-600">{item.icon}</div>
                <div>
                  <div className="font-semibold text-gray-900">{item.title}</div>
                  <div className="text-sm text-gray-500">{item.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Product */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">About MaxPlus+</h2>
            <p className="text-lg text-gray-600">Japanese pharmaceutical excellence in men&apos;s wellness</p>
          </div>
          
          <div className="prose prose-lg mx-auto text-gray-600">
            <p className="mb-4">
              <strong>MaxPlus+</strong> is a premium topical gel developed by <strong>Kawai Pharmaceutical</strong>, a leading Japanese health products manufacturer. Our formula combines traditional herbal medicine with modern science to deliver effective results.
            </p>
            <p className="mb-4">
              The gel features a unique blend of <strong>Epimedium (Horny Goat Weed)</strong>, <strong>Cuscuta Seed Extract</strong>, and <strong>Goji Berry Extract</strong> — three powerful natural ingredients known for their benefits in men&apos;s health and vitality.
            </p>
            <p>
              Unlike oral supplements, MaxPlus+ works locally through topical application, ensuring fast absorption and targeted effectiveness without systemic side effects.
            </p>
          </div>
        </div>
      </section>

      {/* Packages Section */}
      <section id="packages" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Choose Your Package</h2>
            <p className="text-lg text-gray-600">Select the plan that fits your needs</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { 
                name: 'Starter Pack', 
                quantity: '1 Box (30ml)',
                price: 49.9, 
                comparePrice: 69.9,
                badge: null,
                highlights: ['30-day supply', 'Extend intimate time', 'Fast-acting formula', 'Free shipping'],
              },
              { 
                name: 'Treatment Pack', 
                quantity: '2 Boxes (60ml)',
                price: 89.9, 
                comparePrice: 139.8,
                badge: 'Most Popular',
                highlights: ['60-day supply', 'Treat performance issues', 'Long-lasting results', 'Save $49.90', 'Free shipping'],
              },
              { 
                name: 'Premium Pack', 
                quantity: '3 Boxes (90ml)',
                price: 119.9, 
                comparePrice: 209.7,
                badge: 'Best Value',
                highlights: ['90-day supply', 'Maximum results', 'Complete treatment', 'Save $89.80', 'Free shipping', 'Priority support'],
              },
            ].map((pkg, i) => (
              <div key={i} className={`bg-white rounded-2xl overflow-hidden shadow-lg border-2 ${pkg.badge ? 'border-amber-500' : 'border-gray-200'} flex flex-col`}>
                {pkg.badge && (
                  <div className="bg-amber-500 text-white text-sm font-bold px-4 py-2 text-center">
                    {pkg.badge}
                  </div>
                )}
                
                <div className="p-8 flex flex-col flex-1">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{pkg.name}</h3>
                  <p className="text-gray-500 mb-6">{pkg.quantity}</p>
                  
                  {/* Price */}
                  <div className="flex items-baseline gap-3 mb-6">
                    <span className="text-5xl font-bold text-gray-900">${pkg.price}</span>
                    <span className="text-xl text-gray-400 line-through">${pkg.comparePrice}</span>
                  </div>
                  
                  {/* Highlights */}
                  <ul className="space-y-3 mb-8 flex-1">
                    {pkg.highlights.map((highlight, j) => (
                      <li key={j} className="flex items-start gap-3 text-gray-700">
                        <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>
                  
                  {/* CTA Button */}
                  <a
                    href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(`Hi, I would like to order: MaxPlus+ ${pkg.name} - $${pkg.price}`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-4 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg transition-all flex items-center justify-center gap-2 shadow-lg"
                  >
                    <MessageCircle className="w-5 h-5" />
                    Order via WhatsApp
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Ingredients */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Natural Ingredients</h2>
            <p className="text-lg text-gray-600">Premium herbal extracts backed by science</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { 
                name: 'Epimedium (Horny Goat Weed)', 
                desc: 'Traditional Chinese herb known for enhancing blood flow, stamina, and sexual function. Contains icariin, a compound that supports nitric oxide production.',
                benefits: ['Enhances blood flow', 'Boosts stamina', 'Supports sexual function']
              },
              { 
                name: 'Cuscuta Seed Extract', 
                desc: 'Also known as Dodder Seed, this herb has been used in traditional medicine to support reproductive health, kidney function, and overall vitality.',
                benefits: ['Supports reproductive health', 'Enhances vitality', 'Traditional remedy']
              },
              { 
                name: 'Goji Berry Extract', 
                desc: 'Rich in antioxidants, vitamins, and minerals. Goji berries have been used for centuries to boost energy, endurance, and overall wellness.',
                benefits: ['Rich in antioxidants', 'Boosts energy', 'Enhances endurance']
              },
            ].map((ing, i) => (
              <div key={i} className="bg-gray-50 rounded-2xl p-8 border border-gray-200">
                <h3 className="text-xl font-bold text-gray-900 mb-3">{ing.name}</h3>
                <p className="text-gray-600 mb-4 leading-relaxed">{ing.desc}</p>
                <ul className="space-y-2">
                  {ing.benefits.map((benefit, j) => (
                    <li key={j} className="flex items-center gap-2 text-sm text-gray-700">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How to Use */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">How to Use</h2>
            <p className="text-lg text-gray-600">Simple 3-step process for optimal results</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { step: '1', title: 'Apply', desc: 'Apply a moderate amount of gel evenly to the target area. Use clean, dry hands for best results.' },
              { step: '2', title: 'Massage', desc: 'Use both hands to massage the gel gently but firmly. Continue for approximately 60 seconds until fully absorbed.' },
              { step: '3', title: 'Wait', desc: 'Allow the essence to absorb naturally. No rinsing needed. The formula works quickly and discreetly.' },
            ].map((s, i) => (
              <div key={i} className="text-center bg-white rounded-2xl p-8 shadow-md">
                <div className="w-16 h-16 bg-amber-600 rounded-full flex items-center justify-center text-2xl font-bold text-white mx-auto mb-6">
                  {s.step}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{s.title}</h3>
                <p className="text-gray-600 leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
            <p className="text-lg text-gray-600">Everything you need to know about MaxPlus+</p>
          </div>
          
          <div className="space-y-6">
            {[
              {
                q: 'How does MaxPlus+ work?',
                a: 'MaxPlus+ is a topical gel that absorbs quickly into the skin. Apply a moderate amount to the target area, massage for 60 seconds until fully absorbed. The natural herbal formula works locally to enhance blood flow and sensitivity.'
              },
              {
                q: 'Is MaxPlus+ safe to use?',
                a: 'Yes, MaxPlus+ is made with 100% natural herbal extracts including Epimedium, Cuscuta Seed, and Goji Berry. It has been clinically tested and contains no chemicals or harmful ingredients. No side effects have been reported.'
              },
              {
                q: 'How long does it take to see results?',
                a: 'Most users report noticeable results within the first use. For optimal long-term benefits, we recommend using MaxPlus+ consistently for 30-90 days depending on your chosen package.'
              },
              {
                q: 'Is shipping discreet?',
                a: 'Yes, all orders are shipped in plain, unmarked packaging with no indication of the contents. Your privacy is our priority.'
              },
              {
                q: 'What is your refund policy?',
                a: 'We offer a 30-day money-back guarantee. If you\'re not satisfied with the results, contact us via WhatsApp for a full refund.'
              },
              {
                q: 'Can I use MaxPlus+ with other medications?',
                a: 'MaxPlus+ is a topical product that works locally. However, we recommend consulting with your healthcare provider before use if you\'re taking any medications or have underlying health conditions.'
              },
            ].map((faq, i) => (
              <div key={i} className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                <h3 className="text-lg font-bold text-gray-900 mb-3">{faq.q}</h3>
                <p className="text-gray-600 leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-amber-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">Ready to Get Started?</h2>
          <p className="text-xl text-amber-100 mb-10">Order now via WhatsApp for fast, discreet shipping</p>
          <a 
            href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent("Hello, I'm interested in MaxPlus+")}`} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="inline-flex items-center gap-3 px-10 py-5 bg-white hover:bg-gray-100 text-amber-600 font-bold rounded-lg text-xl transition-all shadow-2xl"
          >
            <MessageCircle className="w-6 h-6" />
            Order via WhatsApp
          </a>
          <p className="text-amber-200 text-sm mt-6">30-day money-back guarantee • Free shipping • Discreet packaging</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <h3 className="text-white text-lg font-bold mb-4">Max<span className="text-amber-500">Plus</span>+</h3>
              <p className="text-sm">Premium Japanese men&apos;s performance gel. Natural formula for enhanced stamina and confidence.</p>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Contact</h4>
              <p className="text-sm mb-2">WhatsApp: +{whatsappNumber}</p>
              <p className="text-sm">Email: support@maxplus.com</p>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Shipping</h4>
              <p className="text-sm mb-2">Free worldwide shipping</p>
              <p className="text-sm">Discreet packaging guaranteed</p>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8">
            <p className="text-sm mb-2">&copy; 2024 MaxPlus+. All rights reserved.</p>
            <p className="text-xs text-gray-500">
              These statements have not been evaluated by the FDA. This product is not intended to diagnose, treat, cure, or prevent any disease.
            </p>
          </div>
        </div>
      </footer>

      <WhatsAppFloat />
    </>
  );
}
