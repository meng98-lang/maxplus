import { getProducts, getSettings } from '@/lib/db';
import WhatsAppFloat from '@/components/whatsapp-float';
import TrackingScripts from '@/components/tracking-scripts';
import { Check, Star, Truck, Shield, Clock, MessageCircle } from 'lucide-react';

export const dynamic = 'force-dynamic';

export async function generateMetadata() {
  return {
    title: 'MaxPlus+ — 日本男性保健凝胶 | 官方网站',
    description: 'MaxPlus+ 是日本川井制药出品的男性保健凝胶，采用天然草本配方，帮助延长亲密时间、提升表现。全球50,000+用户信赖。',
    keywords: '男性保健，延时凝胶，日本配方，川井制药，MaxPlus，天然草本',
    openGraph: {
      title: 'MaxPlus+ — 日本男性保健凝胶',
      description: '天然草本配方，延长亲密时间，提升男性自信',
      type: 'website',
      locale: 'zh_CN',
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
    name: 'MaxPlus+ 男性保健凝胶',
    image: ['/images/product-hero.jpeg'],
    description: '日本川井制药出品，天然草本配方',
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

      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="text-2xl font-bold text-gray-900">
              Max<span className="text-amber-500">Plus</span>+
            </div>
            <a href={`https://wa.me/${whatsappNumber}`} target="_blank" rel="noopener noreferrer" className="text-sm text-gray-600 hover:text-gray-900 flex items-center gap-2">
              <MessageCircle className="w-4 h-4" />
              联系客服
            </a>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <div className="inline-block px-3 py-1 bg-amber-100 text-amber-700 text-sm font-medium rounded-full mb-4">
                日本川井制药出品
              </div>
              <h1 className="text-5xl font-bold text-gray-900 mb-6 leading-tight">
                MaxPlus+<br />男性保健凝胶
              </h1>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                100% 天然草本配方，专为男性健康研发。帮助延长亲密时间、提升表现、增强自信。
              </p>
              
              <div className="flex items-center gap-4 mb-8">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <span className="text-gray-600">4.9/5 (857 评价)</span>
              </div>

              <div className="flex flex-wrap gap-4">
                <a href="#order" className="px-8 py-4 bg-amber-500 hover:bg-amber-600 text-white font-semibold rounded-lg transition-colors">
                  立即购买
                </a>
                <a href={`https://wa.me/${whatsappNumber}`} target="_blank" rel="noopener noreferrer" className="px-8 py-4 bg-gray-100 hover:bg-gray-200 text-gray-900 font-semibold rounded-lg transition-colors">
                  咨询客服
                </a>
              </div>

              <div className="grid grid-cols-3 gap-6 mt-12 pt-8 border-t border-gray-200">
                <div className="flex items-center gap-3">
                  <Truck className="w-8 h-8 text-gray-400" />
                  <div>
                    <div className="font-semibold text-gray-900">免费配送</div>
                    <div className="text-sm text-gray-500">全球包邮</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Shield className="w-8 h-8 text-gray-400" />
                  <div>
                    <div className="font-semibold text-gray-900">品质保证</div>
                    <div className="text-sm text-gray-500">正品保证</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Clock className="w-8 h-8 text-gray-400" />
                  <div>
                    <div className="font-semibold text-gray-900">快速见效</div>
                    <div className="text-sm text-gray-500">60秒吸收</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="order-1 lg:order-2">
              {product?.imageUrl && (
                <img src={product.imageUrl} alt="MaxPlus+ 产品" className="w-full rounded-2xl" />
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">为什么选择 MaxPlus+</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: '延长亲密时间', desc: '有效延长 2-3 倍，让您更自信' },
              { title: '60秒快速吸收', desc: '无需等待，即涂即用' },
              { title: '100% 天然配方', desc: '草本提取物，无副作用' },
            ].map((item) => (
              <div key={item.title} className="bg-white p-8 rounded-xl shadow-sm">
                <h3 className="font-bold text-xl mb-3 text-gray-900">{item.title}</h3>
                <p className="text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Ingredients */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">天然成分</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { name: '淫羊藿提取物', desc: '增强血流，提升耐力，支持健康睾酮水平' },
              { name: '菟丝子提取物', desc: '抗氧化，支持生殖健康，增强活力' },
              { name: '枸杞提取物', desc: '富含维生素，提升能量，改善循环' },
            ].map((ing) => (
              <div key={ing.name} className="p-8 bg-gray-50 rounded-xl">
                <h3 className="font-bold text-xl mb-3 text-gray-900">{ing.name}</h3>
                <p className="text-gray-600">{ing.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How to Use */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">使用方法</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { step: '1', title: '清洁', desc: '使用前用温水清洁目标区域' },
              { step: '2', title: '涂抹', desc: '取适量凝胶均匀涂抹于目标区域' },
              { step: '3', title: '按摩', desc: '轻轻按摩 60 秒直至完全吸收' },
            ].map((s) => (
              <div key={s.step} className="text-center">
                <div className="w-12 h-12 bg-amber-500 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                  {s.step}
                </div>
                <h3 className="font-bold text-xl mb-2 text-gray-900">{s.title}</h3>
                <p className="text-gray-600">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Order Section */}
      <section id="order" className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">选择套餐</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { name: '1 盒装', subtitle: '体验装', price: 49.9, comparePrice: 69.9, badge: null, highlights: ['30 天用量', '延长亲密时间', '免费送货', '退款保证'] },
              { name: '2 盒装', subtitle: '疗程装', price: 89.9, comparePrice: 139.8, badge: '最受欢迎', highlights: ['60 天用量', '治疗性能问题', '节省 $49.90', '免费送货', '优先支持'] },
              { name: '3 盒装', subtitle: '尊享装', price: 119.9, comparePrice: 209.7, badge: '最佳价值', highlights: ['90 天用量', '最大效果', '节省 $89.80', '免费送货', 'VIP 支持', '赠品'] },
            ].map((pkg) => (
              <div key={pkg.name} className={`p-8 bg-white rounded-xl border-2 ${pkg.badge ? 'border-amber-500 shadow-lg' : 'border-gray-200'} flex flex-col`}>
                {pkg.badge && (
                  <div className="bg-amber-500 text-white text-sm font-bold px-4 py-1 rounded-full mb-4 self-start">
                    {pkg.badge}
                  </div>
                )}
                <h3 className="text-2xl font-bold mb-2 text-gray-900">{pkg.name}</h3>
                <p className="text-gray-500 mb-6">{pkg.subtitle}</p>
                <div className="flex items-baseline gap-3 mb-8">
                  <span className="text-4xl font-bold text-gray-900">${pkg.price}</span>
                  <span className="text-lg text-gray-400 line-through">${pkg.comparePrice}</span>
                </div>
                <ul className="space-y-3 mb-8 flex-1">
                  {pkg.highlights.map((h) => (
                    <li key={h} className="flex items-start gap-3 text-gray-600">
                      <Check className="w-5 h-5 text-amber-500 mt-0.5 flex-shrink-0" />
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
                <a
                  href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(`订购：MaxPlus+ ${pkg.name} - $${pkg.price}`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-4 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg transition-colors flex items-center justify-center gap-2"
                >
                  <MessageCircle className="w-5 h-5" />
                  WhatsApp 订购
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <h3 className="text-white font-bold text-lg mb-4">MaxPlus+</h3>
              <p className="text-sm">日本川井制药出品，天然草本男性保健凝胶。全球 50,000+ 用户的信赖之选。</p>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-4">联系我们</h3>
              <p className="text-sm">WhatsApp: +{whatsappNumber}</p>
              <p className="text-sm mt-2">24/7 全天候服务</p>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-4">配送与保障</h3>
              <p className="text-sm">全球免费配送</p>
              <p className="text-sm mt-2">30 天退款保证</p>
              <p className="text-sm mt-2">隐私包装</p>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center">
            <p className="text-sm">&copy; 2024 MaxPlus+. 保留所有权利。</p>
            <p className="text-xs text-gray-500 mt-3">本产品声明未经 FDA 评估。本产品不用于诊断、治疗、治愈或预防任何疾病。</p>
          </div>
        </div>
      </footer>

      <WhatsAppFloat />
    </>
  );
}
