import { getProducts, getSettings } from '@/lib/db';
import WhatsAppFloat from '@/components/whatsapp-float';
import TrackingScripts from '@/components/tracking-scripts';
import { CheckCircle, MessageCircle, ArrowRight } from 'lucide-react';

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

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-6xl font-bold mb-4">
                Max<span className="text-amber-500">Plus</span>+
              </h1>
              <p className="text-2xl text-gray-300 mb-6">日本川井制药出品</p>
              <p className="text-lg text-gray-400 mb-8 leading-relaxed">
                100% 天然草本配方，专为男性健康研发。帮助延长亲密时间、提升表现、增强自信。全球 50,000+ 男性用户的共同选择。
              </p>
              
              <div className="flex flex-wrap gap-4 mb-8">
                <a href="#order" className="px-8 py-4 bg-amber-500 hover:bg-amber-600 text-black font-bold rounded-lg transition-all shadow-lg">
                  立即订购
                </a>
                <a href={`https://wa.me/${whatsappNumber}`} target="_blank" rel="noopener noreferrer" className="px-8 py-4 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-lg border border-white/20">
                  咨询客服
                </a>
              </div>

              <div className="grid grid-cols-3 gap-6 pt-8 border-t border-white/10">
                <div>
                  <div className="text-3xl font-bold text-amber-500">50K+</div>
                  <div className="text-sm text-gray-400">满意用户</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-amber-500">4.9/5</div>
                  <div className="text-sm text-gray-400">平均评分</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-amber-500">100%</div>
                  <div className="text-sm text-gray-400">天然成分</div>
                </div>
              </div>
            </div>

            <div className="relative">
              {product?.imageUrl && (
                <img src={product.imageUrl} alt="MaxPlus+ 产品" className="w-full rounded-2xl shadow-2xl" />
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20 bg-gray-900 text-white">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-12">产品优势</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: '延长亲密时间', desc: '有效延长 2-3 倍，让您更自信' },
              { title: '60秒快速吸收', desc: '无需等待，即涂即用' },
              { title: '100% 天然配方', desc: '草本提取物，无副作用' },
              { title: '临床验证', desc: '通过皮肤科测试，安全可靠' },
              { title: '提升自信', desc: '改善表现，重拾信心' },
              { title: '改善血液循环', desc: '促进局部血流，效果持久' },
            ].map((item) => (
              <div key={item.title} className="p-6 bg-gray-800 rounded-xl border border-gray-700">
                <h3 className="font-bold text-xl mb-3 text-amber-500">{item.title}</h3>
                <p className="text-gray-400">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Ingredients */}
      <section className="py-20 bg-black text-white">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-12">天然成分</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { name: '淫羊藿提取物', desc: '增强血流，提升耐力，支持健康睾酮水平' },
              { name: '菟丝子提取物', desc: '抗氧化，支持生殖健康，增强活力' },
              { name: '枸杞提取物', desc: '富含维生素，提升能量，改善循环' },
            ].map((ing) => (
              <div key={ing.name} className="p-8 bg-gray-900 rounded-xl border border-gray-800">
                <h3 className="font-bold text-2xl mb-4 text-amber-500">{ing.name}</h3>
                <p className="text-gray-400 leading-relaxed">{ing.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How to Use */}
      <section className="py-20 bg-gray-900 text-white">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-12">使用方法</h2>
          <div className="space-y-6">
            {[
              { step: '01', title: '清洁', desc: '使用前用温水清洁目标区域' },
              { step: '02', title: '涂抹', desc: '取适量凝胶均匀涂抹于目标区域' },
              { step: '03', title: '按摩', desc: '轻轻按摩 60 秒直至完全吸收' },
              { step: '04', title: '等待', desc: '无需冲洗，60 秒后即可见效' },
            ].map((s) => (
              <div key={s.step} className="flex items-start gap-6 p-6 bg-gray-800 rounded-xl">
                <div className="text-4xl font-bold text-amber-500">{s.step}</div>
                <div>
                  <h3 className="font-bold text-xl mb-2">{s.title}</h3>
                  <p className="text-gray-400">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Results Timeline */}
      <section className="py-20 bg-black text-white">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-12">效果时间线</h2>
          <div className="space-y-6">
            {[
              { week: '第 1-2 周', title: '初期效果', desc: '敏感度提升，血流改善，持久力增强' },
              { week: '第 3-4 周', title: '显著改善', desc: '表现明显提升，自信心增强，效果持久' },
              { week: '第 5-8 周', title: '最佳效果', desc: '达到最佳状态，全面提升男性健康' },
            ].map((r) => (
              <div key={r.week} className="p-6 bg-gray-900 rounded-xl border-l-4 border-amber-500">
                <div className="text-amber-500 font-bold mb-2">{r.week}</div>
                <h3 className="font-bold text-xl mb-2">{r.title}</h3>
                <p className="text-gray-400">{r.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Warning */}
      <section className="py-12 bg-amber-500/10 border-y border-amber-500/30">
        <div className="max-w-4xl mx-auto px-6">
          <div className="flex items-start gap-4">
            <div className="text-amber-500 text-3xl">⚠️</div>
            <div>
              <h3 className="font-bold text-xl text-amber-500 mb-2">警惕假冒产品</h3>
              <p className="text-gray-300">
                MaxPlus+ 仅在官方网站销售。假冒产品可能含有有害成分，不仅无效还可能引起过敏。请认准官方渠道购买，每瓶正品均附有防伪码和质量保证。
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Order Section */}
      <section id="order" className="py-20 bg-gray-900 text-white">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-12">选择套餐</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { name: '1 盒装', subtitle: '体验装', price: 49.9, comparePrice: 69.9, badge: null, highlights: ['30 天用量', '延长亲密时间', '免费送货', '退款保证'] },
              { name: '2 盒装', subtitle: '疗程装', price: 89.9, comparePrice: 139.8, badge: '最受欢迎', highlights: ['60 天用量', '治疗性能问题', '节省 $49.90', '免费送货', '优先支持'] },
              { name: '3 盒装', subtitle: '尊享装', price: 119.9, comparePrice: 209.7, badge: '最佳价值', highlights: ['90 天用量', '最大效果', '节省 $89.80', '免费送货', 'VIP 支持', '赠品'] },
            ].map((pkg) => (
              <div key={pkg.name} className={`p-8 bg-gray-800 rounded-xl ${pkg.badge ? 'border-2 border-amber-500 shadow-2xl' : 'border border-gray-700'} flex flex-col`}>
                {pkg.badge && (
                  <div className="bg-amber-500 text-black text-sm font-bold px-4 py-2 rounded-full mb-4 self-start">
                    {pkg.badge}
                  </div>
                )}
                <h3 className="text-2xl font-bold mb-2">{pkg.name}</h3>
                <p className="text-gray-400 mb-6">{pkg.subtitle}</p>
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
                  href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(`订购：MaxPlus+ ${pkg.name} - $${pkg.price}`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-4 bg-green-600 hover:bg-green-700 text-white font-bold rounded-lg transition-colors flex items-center justify-center gap-2"
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
      <footer className="bg-black text-gray-400 py-12 border-t border-gray-800">
        <div className="max-w-6xl mx-auto px-6">
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
