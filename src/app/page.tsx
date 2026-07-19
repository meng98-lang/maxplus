import { getProducts, getSettings } from '@/lib/db';
import WhatsAppFloat from '@/components/whatsapp-float';
import TrackingScripts from '@/components/tracking-scripts';
import { Check, Star, MessageCircle } from 'lucide-react';

export const dynamic = 'force-dynamic';

export async function generateMetadata() {
  return {
    title: 'MaxPlus+ — 日本男性保健凝胶',
    description: '100%天然草本配方，帮助延长亲密时间、提升表现。全球50,000+用户信赖。',
    openGraph: {
      title: 'MaxPlus+ — 日本男性保健凝胶',
      description: '天然草本配方，延长亲密时间',
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
              联系客服
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
                MaxPlus+<br />男性保健凝胶
              </h1>
              <p className="text-lg text-gray-600 mb-8">
                日本川井制药出品。100%天然草本配方，帮助延长亲密时间、提升表现、增强自信。
              </p>
              
              <div className="flex items-center gap-2 mb-8">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <span className="text-gray-600 text-sm">4.9/5 (857评价)</span>
              </div>

              <a href="#order" className="inline-block px-8 py-4 bg-amber-500 hover:bg-amber-600 text-white font-semibold rounded-lg">
                立即购买
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
              { title: '延长亲密时间', desc: '有效延长2-3倍' },
              { title: '60秒快速吸收', desc: '即涂即用，无需等待' },
              { title: '100%天然配方', desc: '草本提取物，无副作用' },
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
          <h2 className="text-2xl font-bold text-center text-gray-900 mb-8">天然成分</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { name: '淫羊藿提取物', desc: '增强血流，提升耐力' },
              { name: '菟丝子提取物', desc: '支持生殖健康，增强活力' },
              { name: '枸杞提取物', desc: '提升能量，改善循环' },
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
          <h2 className="text-2xl font-bold text-center text-gray-900 mb-8">使用方法</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { step: '1', title: '清洁', desc: '用温水清洁目标区域' },
              { step: '2', title: '涂抹', desc: '取适量均匀涂抹' },
              { step: '3', title: '按摩', desc: '按摩60秒至吸收' },
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
          <h2 className="text-2xl font-bold text-center text-gray-900 mb-8">选择套餐</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { name: '1盒装', price: 49.9, comparePrice: 69.9, badge: null, highlights: ['30天用量', '免费送货'] },
              { name: '2盒装', price: 89.9, comparePrice: 139.8, badge: '最受欢迎', highlights: ['60天用量', '节省$49.90', '免费送货'] },
              { name: '3盒装', price: 119.9, comparePrice: 209.7, badge: '最佳价值', highlights: ['90天用量', '节省$89.80', '免费送货', '赠品'] },
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
                  href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(`订购：MaxPlus+ ${pkg.name} - $${pkg.price}`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg flex items-center justify-center gap-2 text-sm"
                >
                  <MessageCircle className="w-4 h-4" />
                  WhatsApp订购
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-8">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <p className="text-sm">&copy; 2024 MaxPlus+. 保留所有权利。</p>
          <p className="text-xs text-gray-500 mt-2">本产品声明未经FDA评估。不用于诊断、治疗、治愈或预防任何疾病。</p>
        </div>
      </footer>

      <WhatsAppFloat />
    </>
  );
}
