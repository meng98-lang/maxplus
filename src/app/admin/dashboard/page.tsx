'use client';

import { useState, useEffect } from 'react';
import { SiteSettings, Order, Pixel, TrafficStats } from '@/lib/db';

type Tab = 'orders' | 'settings' | 'pixels' | 'stats';

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<Tab>('orders');
  const [orders, setOrders] = useState<Order[]>([]);
  const [settings, setSettings] = useState<SiteSettings | null>(null);
  const [pixels, setPixels] = useState<Pixel[]>([]);
  const [stats, setStats] = useState<TrafficStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  // Settings form
  const [formData, setFormData] = useState({
    siteName: '', whatsappNumber: '', whatsappMessage: '', adminPassword: '',
    stripeKey: '', squareKey: '', paypalKey: '', activePayment: 'whatsapp', currency: 'USD',
  });

  // Pixel form
  const [pixelForm, setPixelForm] = useState({ type: 'google', name: '', pixelId: '', customCode: '', enabled: true });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [ordersRes, settingsRes, pixelsRes, statsRes] = await Promise.all([
        fetch('/api/orders'),
        fetch('/api/settings'),
        fetch('/api/pixels'),
        fetch('/api/stats'),
      ]);
      const ordersData = await ordersRes.json();
      const settingsData = await settingsRes.json();
      const pixelsData = await pixelsRes.json();
      const statsData = await statsRes.json();

      if (ordersData.success) setOrders(ordersData.data || []);
      if (settingsData.success) {
        setSettings(settingsData.data);
        setFormData({
          siteName: settingsData.data.siteName || '',
          whatsappNumber: settingsData.data.whatsappNumber || '',
          whatsappMessage: settingsData.data.whatsappMessage || '',
          adminPassword: settingsData.data.adminPassword || '',
          stripeKey: settingsData.data.stripeKey || '',
          squareKey: settingsData.data.squareKey || '',
          paypalKey: settingsData.data.paypalKey || '',
          activePayment: settingsData.data.activePayment || 'whatsapp',
          currency: settingsData.data.currency || 'USD',
        });
      }
      if (pixelsData.success) setPixels(pixelsData.data || []);
      if (statsData.success) setStats(statsData.data);
    } catch (err) {
      console.error('Failed to fetch data:', err);
    }
    setLoading(false);
  };

  const handleSaveSettings = async () => {
    setSaving(true);
    try {
      const res = await fetch('/api/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success) {
        setMessage('设置已保存');
        setTimeout(() => setMessage(''), 3000);
      } else {
        setMessage('保存失败: ' + (data.error || '未知错误'));
      }
    } catch (err) {
      setMessage('保存失败');
    }
    setSaving(false);
  };

  const handleAddPixel = async () => {
    if (!pixelForm.name || !pixelForm.type) {
      setMessage('请填写像素名称和类型');
      return;
    }
    try {
      const res = await fetch('/api/pixels', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(pixelForm),
      });
      const data = await res.json();
      if (data.success) {
        setMessage('像素代码已添加');
        setPixelForm({ type: 'google', name: '', pixelId: '', customCode: '', enabled: true });
        fetchData();
      }
    } catch (err) {
      setMessage('添加失败');
    }
  };

  const handleDeletePixel = async (id: string) => {
    try {
      await fetch('/api/pixels', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      });
      fetchData();
      setMessage('像素代码已删除');
    } catch (err) {
      setMessage('删除失败');
    }
  };

  const handleTogglePixel = async (pixel: Pixel) => {
    try {
      await fetch('/api/pixels', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...pixel, enabled: !pixel.enabled }),
      });
      fetchData();
    } catch (err) {
      setMessage('更新失败');
    }
  };

  const getStatusBadge = (status: string) => {
    const colors: Record<string, string> = {
      pending: 'bg-yellow-500/20 text-yellow-400',
      paid: 'bg-green-500/20 text-green-400',
      shipped: 'bg-blue-500/20 text-blue-400',
      completed: 'bg-purple-500/20 text-purple-400',
      cancelled: 'bg-red-500/20 text-red-400',
    };
    return colors[status] || 'bg-gray-500/20 text-gray-400';
  };

  const tabs: { id: Tab; label: string; icon: string }[] = [
    { id: 'orders', label: '订单管理', icon: '' },
    { id: 'settings', label: '网站设置', icon: '⚙' },
    { id: 'pixels', label: '像素代码', icon: '' },
    { id: 'stats', label: '数据统计', icon: '' },
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center">
        <div className="text-white text-xl">加载中...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      {/* Header */}
      <header className="bg-gray-900 border-b border-gray-800 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <h1 className="text-xl font-bold">MaxPlus 管理后台</h1>
          <a href="/" className="text-gray-400 hover:text-white text-sm">← 返回前台</a>
        </div>
      </header>

      {/* Tabs */}
      <div className="bg-gray-900/50 border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-6 flex gap-1">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-3 text-sm font-medium border-b-2 transition-all ${
                activeTab === tab.id
                  ? 'border-amber-500 text-amber-400'
                  : 'border-transparent text-gray-400 hover:text-white'
              }`}
            >
              <span className="mr-2">{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {message && (
          <div className="mb-6 p-4 bg-amber-500/20 border border-amber-500/30 rounded-lg text-amber-400">
            {message}
          </div>
        )}

        {/* Orders Tab */}
        {activeTab === 'orders' && (
          <div>
            <h2 className="text-2xl font-bold mb-6">订单管理</h2>
            {orders.length === 0 ? (
              <div className="text-center py-12 text-gray-500">暂无订单</div>
            ) : (
              <div className="space-y-4">
                {orders.map((order) => (
                  <div key={order.id} className="bg-gray-900 border border-gray-800 rounded-xl p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <div className="font-bold text-lg">订单 #{order.orderNumber}</div>
                        <div className="text-gray-400 text-sm">{new Date(order.createdAt).toLocaleString('zh-CN')}</div>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusBadge(order.status)}`}>
                        {order.status === 'pending' ? '待处理' : order.status === 'paid' ? '已付款' : order.status === 'shipped' ? '已发货' : order.status === 'completed' ? '已完成' : '已取消'}
                      </span>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div><span className="text-gray-500">客户:</span> {order.customerName}</div>
                      <div><span className="text-gray-500">邮箱:</span> {order.customerEmail || '-'}</div>
                      <div><span className="text-gray-500">电话:</span> {order.customerPhone || '-'}</div>
                      <div><span className="text-gray-500">金额:</span> <span className="text-amber-400 font-bold">${order.totalAmount}</span></div>
                    </div>
                    <div className="mt-4 pt-4 border-t border-gray-800">
                      <div className="text-gray-500 text-sm mb-2">商品:</div>
                      {order.items.map((item: any, i: number) => (
                        <div key={i} className="text-sm text-gray-300">
                          {item.name} x {item.quantity} = ${item.price}
                        </div>
                      ))}
                    </div>
                    {order.notes && (
                      <div className="mt-3 text-sm text-gray-400">备注: {order.notes}</div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Settings Tab */}
        {activeTab === 'settings' && (
          <div>
            <h2 className="text-2xl font-bold mb-6">网站设置</h2>
            <div className="space-y-6 max-w-2xl">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">网站名称</label>
                <input
                  type="text"
                  value={formData.siteName}
                  onChange={(e) => setFormData({ ...formData, siteName: e.target.value })}
                  className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 text-white focus:border-amber-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">WhatsApp 客服号码</label>
                <input
                  type="text"
                  value={formData.whatsappNumber}
                  onChange={(e) => setFormData({ ...formData, whatsappNumber: e.target.value })}
                  placeholder="例如: 13023107970"
                  className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 text-white focus:border-amber-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">WhatsApp 默认消息</label>
                <textarea
                  value={formData.whatsappMessage}
                  onChange={(e) => setFormData({ ...formData, whatsappMessage: e.target.value })}
                  rows={3}
                  className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 text-white focus:border-amber-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">管理员密码</label>
                <input
                  type="text"
                  value={formData.adminPassword}
                  onChange={(e) => setFormData({ ...formData, adminPassword: e.target.value })}
                  className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 text-white focus:border-amber-500 focus:outline-none"
                />
              </div>

              <div className="border-t border-gray-800 pt-6">
                <h3 className="text-lg font-bold mb-4">支付接口配置</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">Stripe API Key</label>
                    <input
                      type="text"
                      value={formData.stripeKey}
                      onChange={(e) => setFormData({ ...formData, stripeKey: e.target.value })}
                      placeholder="sk_live_..."
                      className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 text-white focus:border-amber-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">Square API Key</label>
                    <input
                      type="text"
                      value={formData.squareKey}
                      onChange={(e) => setFormData({ ...formData, squareKey: e.target.value })}
                      placeholder="sq0idp-..."
                      className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 text-white focus:border-amber-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">PayPal API Key</label>
                    <input
                      type="text"
                      value={formData.paypalKey}
                      onChange={(e) => setFormData({ ...formData, paypalKey: e.target.value })}
                      placeholder="paypal_..."
                      className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 text-white focus:border-amber-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">默认支付方式</label>
                    <select
                      value={formData.activePayment}
                      onChange={(e) => setFormData({ ...formData, activePayment: e.target.value })}
                      className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 text-white focus:border-amber-500 focus:outline-none"
                    >
                      <option value="whatsapp">WhatsApp 下单</option>
                      <option value="stripe">Stripe</option>
                      <option value="square">Square</option>
                      <option value="paypal">PayPal</option>
                    </select>
                  </div>
                </div>
              </div>

              <button
                onClick={handleSaveSettings}
                disabled={saving}
                className="px-6 py-3 bg-amber-500 hover:bg-amber-600 text-black font-bold rounded-lg transition-all disabled:opacity-50"
              >
                {saving ? '保存中...' : '保存设置'}
              </button>
            </div>
          </div>
        )}

        {/* Pixels Tab */}
        {activeTab === 'pixels' && (
          <div>
            <h2 className="text-2xl font-bold mb-6">像素代码管理</h2>

            {/* Add Pixel Form */}
            <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 mb-8">
              <h3 className="text-lg font-bold mb-4">添加像素代码</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">类型</label>
                  <select
                    value={pixelForm.type}
                    onChange={(e) => setPixelForm({ ...pixelForm, type: e.target.value })}
                    className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white focus:border-amber-500 focus:outline-none"
                  >
                    <option value="google">Google Analytics</option>
                    <option value="facebook">Facebook Pixel</option>
                    <option value="tiktok">TikTok Pixel</option>
                    <option value="custom">自定义代码</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">名称</label>
                  <input
                    type="text"
                    value={pixelForm.name}
                    onChange={(e) => setPixelForm({ ...pixelForm, name: e.target.value })}
                    placeholder="例如: GA4 主账号"
                    className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white focus:border-amber-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">Pixel ID</label>
                  <input
                    type="text"
                    value={pixelForm.pixelId}
                    onChange={(e) => setPixelForm({ ...pixelForm, pixelId: e.target.value })}
                    placeholder="例如: G-XXXXXXXXXX"
                    className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white focus:border-amber-500 focus:outline-none"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-400 mb-2">自定义代码（可选）</label>
                  <textarea
                    value={pixelForm.customCode}
                    onChange={(e) => setPixelForm({ ...pixelForm, customCode: e.target.value })}
                    rows={3}
                    placeholder="粘贴完整的像素代码..."
                    className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white font-mono text-sm focus:border-amber-500 focus:outline-none"
                  />
                </div>
              </div>
              <button
                onClick={handleAddPixel}
                className="mt-4 px-6 py-3 bg-amber-500 hover:bg-amber-600 text-black font-bold rounded-lg transition-all"
              >
                添加像素
              </button>
            </div>

            {/* Pixel List */}
            <div className="space-y-4">
              {pixels.length === 0 ? (
                <div className="text-center py-12 text-gray-500">暂无像素代码</div>
              ) : (
                pixels.map((pixel) => (
                  <div key={pixel.id} className="bg-gray-900 border border-gray-800 rounded-xl p-6 flex justify-between items-center">
                    <div>
                      <div className="flex items-center gap-3">
                        <span className="font-bold">{pixel.name}</span>
                        <span className="text-xs px-2 py-1 bg-gray-800 rounded text-gray-400">{pixel.type}</span>
                        {pixel.enabled ? (
                          <span className="text-xs px-2 py-1 bg-green-500/20 text-green-400 rounded">已启用</span>
                        ) : (
                          <span className="text-xs px-2 py-1 bg-gray-500/20 text-gray-400 rounded">已禁用</span>
                        )}
                      </div>
                      {pixel.pixelId && <div className="text-sm text-gray-400 mt-1">ID: {pixel.pixelId}</div>}
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleTogglePixel(pixel)}
                        className="px-3 py-2 text-sm bg-gray-800 hover:bg-gray-700 rounded-lg transition-all"
                      >
                        {pixel.enabled ? '禁用' : '启用'}
                      </button>
                      <button
                        onClick={() => handleDeletePixel(pixel.id)}
                        className="px-3 py-2 text-sm bg-red-500/20 hover:bg-red-500/30 text-red-400 rounded-lg transition-all"
                      >
                        删除
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {/* Stats Tab */}
        {activeTab === 'stats' && (
          <div>
            <h2 className="text-2xl font-bold mb-6">数据统计</h2>
            {stats ? (
              <div className="grid md:grid-cols-3 gap-6">
                <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
                  <div className="text-gray-400 text-sm mb-2">总访问量</div>
                  <div className="text-3xl font-bold text-white">{stats.totalVisits}</div>
                </div>
                <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
                  <div className="text-gray-400 text-sm mb-2">今日访问</div>
                  <div className="text-3xl font-bold text-amber-400">{stats.todayVisits}</div>
                </div>
                <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
                  <div className="text-gray-400 text-sm mb-2">总订单数</div>
                  <div className="text-3xl font-bold text-green-400">{orders.length}</div>
                </div>
              </div>
            ) : (
              <div className="text-center py-12 text-gray-500">暂无统计数据</div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
