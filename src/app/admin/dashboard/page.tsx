"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Package, Settings, BarChart3, Code, LogOut, Eye, EyeOff,
  Trash2, Plus, Save, DollarSign, ShoppingBag, Users, TrendingUp
} from "lucide-react";

interface Order {
  id: string;
  orderNumber: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  shippingAddress: string;
  items: Array<{ name: string; quantity: number; price: number }>;
  totalAmount: number;
  status: string;
  paymentMethod: string;
  createdAt: string;
}

interface SiteSettings {
  siteName: string;
  whatsappNumber: string;
  whatsappMessage: string;
  adminPassword: string;
  stripeKey: string;
  squareKey: string;
  paypalKey: string;
  activePayment: string;
  currency: string;
}

interface Pixel {
  id: string;
  type: string;
  name: string;
  pixelId: string;
  customCode: string;
  enabled: boolean;
}

interface TrafficStats {
  total: number;
  today: number;
  byPage: Array<{ page: string; count: number }>;
  byCountry: Array<{ country: string; count: number }>;
}

interface ClickStats {
  total: number;
  today: number;
  byType: Array<{ type: string; count: number }>;
}

interface CartStats {
  addToCart: number;
  checkouts: number;
  purchases: number;
}

export default function AdminDashboard() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("orders");
  const [orders, setOrders] = useState<Order[]>([]);
  const [settings, setSettings] = useState<SiteSettings>({
    siteName: "MaxPlus",
    whatsappNumber: "",
    whatsappMessage: "Hello, I'm interested in MaxPlus",
    adminPassword: "maxplus2024",
    stripeKey: "",
    squareKey: "",
    paypalKey: "",
    activePayment: "whatsapp",
    currency: "USD",
  });
  const [pixels, setPixels] = useState<Pixel[]>([]);
  const [trafficStats, setTrafficStats] = useState<TrafficStats | null>(null);
  const [clickStats, setClickStats] = useState<ClickStats | null>(null);
  const [cartStats, setCartStats] = useState<CartStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem("mp_admin") !== "true") {
      router.push("/admin");
      return;
    }
    fetchData();
  }, [router]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [ordersRes, settingsRes, pixelsRes, trafficRes, clicksRes] = await Promise.all([
        fetch("/api/orders"),
        fetch("/api/settings"),
        fetch("/api/pixels"),
        fetch("/api/traffic"),
        fetch("/api/clicks"),
      ]);
      setOrders(await ordersRes.json());
      setSettings(await settingsRes.json());
      setPixels(await pixelsRes.json());
      setTrafficStats(await trafficRes.json());
      setClickStats(await clicksRes.json());
    } catch (error) {
      console.error("Failed to fetch data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveSettings = async () => {
    setSaving(true);
    try {
      await fetch("/api/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(settings),
      });
      alert("Settings saved!");
    } catch {
      alert("Failed to save settings");
    } finally {
      setSaving(false);
    }
  };

  const handleSavePixel = async (pixel: Partial<Pixel>) => {
    try {
      await fetch("/api/pixels", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(pixel),
      });
      fetchData();
    } catch {
      alert("Failed to save pixel");
    }
  };

  const handleDeletePixel = async (id: string) => {
    if (!confirm("Delete this pixel?")) return;
    try {
      await fetch("/api/pixels", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      fetchData();
    } catch {
      alert("Failed to delete pixel");
    }
  };

  const handleUpdateOrderStatus = async (orderId: string, status: string) => {
    try {
      await fetch("/api/orders", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orderId, status }),
      });
      fetchData();
    } catch {
      alert("Failed to update order");
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem("mp_admin");
    router.push("/admin");
  };

  const tabs = [
    { id: "orders", label: "Orders", icon: Package },
    { id: "settings", label: "Settings", icon: Settings },
    { id: "pixels", label: "Tracking", icon: Code },
    { id: "stats", label: "Analytics", icon: BarChart3 },
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-gold-400 text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      {/* Header */}
      <header className="bg-black border-b border-gold-500/20 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="text-xl font-bold text-gold-400">MAX<span className="text-red-500">+</span> Admin</div>
          </div>
          <button onClick={handleLogout} className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
            <LogOut size={18} />
            Logout
          </button>
        </div>
      </header>

      {/* Tabs */}
      <div className="max-w-7xl mx-auto px-6 py-6">
        <div className="flex gap-2 mb-8 overflow-x-auto">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-colors whitespace-nowrap ${
                activeTab === tab.id
                  ? "bg-gold-500 text-black"
                  : "bg-gray-900 text-gray-400 hover:text-white"
              }`}
            >
              <tab.icon size={18} />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Orders Tab */}
        {activeTab === "orders" && (
          <div>
            <h2 className="text-2xl font-bold mb-6">Orders ({orders.length})</h2>
            {orders.length === 0 ? (
              <p className="text-gray-400 text-center py-12">No orders yet</p>
            ) : (
              <div className="space-y-4">
                {orders.map(order => (
                  <div key={order.id} className="bg-gray-900 border border-gray-800 rounded-xl p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <div className="font-bold text-lg">{order.orderNumber}</div>
                        <div className="text-gray-400 text-sm">
                          {new Date(order.createdAt).toLocaleDateString()} {new Date(order.createdAt).toLocaleTimeString()}
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <select
                          value={order.status}
                          onChange={e => handleUpdateOrderStatus(order.id, e.target.value)}
                          className="bg-gray-800 border border-gray-700 rounded-lg px-3 py-1 text-sm"
                        >
                          <option value="pending">Pending</option>
                          <option value="paid">Paid</option>
                          <option value="shipped">Shipped</option>
                          <option value="delivered">Delivered</option>
                          <option value="cancelled">Cancelled</option>
                        </select>
                        <div className="text-gold-400 font-bold text-lg">${order.totalAmount.toFixed(2)}</div>
                      </div>
                    </div>
                    <div className="grid md:grid-cols-2 gap-4 text-sm">
                      <div>
                        <div className="text-gray-400 mb-1">Customer</div>
                        <div>{order.customerName}</div>
                        <div className="text-gray-400">{order.customerEmail}</div>
                        <div className="text-gray-400">{order.customerPhone}</div>
                      </div>
                      <div>
                        <div className="text-gray-400 mb-1">Shipping Address</div>
                        <div>{order.shippingAddress}</div>
                      </div>
                    </div>
                    <div className="mt-4 pt-4 border-t border-gray-800">
                      <div className="text-gray-400 text-sm mb-2">Items</div>
                      {order.items.map((item, i) => (
                        <div key={i} className="flex justify-between text-sm">
                          <span>{item.name} x{item.quantity}</span>
                          <span>${(item.price * item.quantity).toFixed(2)}</span>
                        </div>
                      ))}
                    </div>
                    <div className="mt-2 text-xs text-gray-500">
                      Payment: {order.paymentMethod}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Settings Tab */}
        {activeTab === "settings" && (
          <div className="max-w-2xl">
            <h2 className="text-2xl font-bold mb-6">Site Settings</h2>
            <div className="space-y-6">
              <div>
                <label className="block text-sm text-gray-400 mb-2">WhatsApp Number (with country code, no +)</label>
                <input
                  type="text"
                  value={settings.whatsappNumber}
                  onChange={e => setSettings({ ...settings, whatsappNumber: e.target.value })}
                  className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 focus:border-gold-500 focus:outline-none"
                  placeholder="13023107970"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-2">WhatsApp Default Message</label>
                <textarea
                  value={settings.whatsappMessage}
                  onChange={e => setSettings({ ...settings, whatsappMessage: e.target.value })}
                  className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 focus:border-gold-500 focus:outline-none h-24"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-2">Admin Password</label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={settings.adminPassword}
                    onChange={e => setSettings({ ...settings, adminPassword: e.target.value })}
                    className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 pr-10 focus:border-gold-500 focus:outline-none"
                  />
                  <button
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-2">Active Payment Method</label>
                <select
                  value={settings.activePayment}
                  onChange={e => setSettings({ ...settings, activePayment: e.target.value })}
                  className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 focus:border-gold-500 focus:outline-none"
                >
                  <option value="whatsapp">WhatsApp Order</option>
                  <option value="stripe">Stripe</option>
                  <option value="square">Square</option>
                  <option value="paypal">PayPal</option>
                </select>
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-2">Stripe Publishable Key</label>
                <input
                  type="text"
                  value={settings.stripeKey}
                  onChange={e => setSettings({ ...settings, stripeKey: e.target.value })}
                  className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 focus:border-gold-500 focus:outline-none"
                  placeholder="pk_live_..."
                />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-2">Square Application ID</label>
                <input
                  type="text"
                  value={settings.squareKey}
                  onChange={e => setSettings({ ...settings, squareKey: e.target.value })}
                  className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 focus:border-gold-500 focus:outline-none"
                  placeholder="sq0idp-..."
                />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-2">PayPal Client ID</label>
                <input
                  type="text"
                  value={settings.paypalKey}
                  onChange={e => setSettings({ ...settings, paypalKey: e.target.value })}
                  className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 focus:border-gold-500 focus:outline-none"
                  placeholder="AYSq3RDGsmBLJE-..."
                />
              </div>
              <button
                onClick={handleSaveSettings}
                disabled={saving}
                className="bg-gold-500 hover:bg-gold-600 text-black font-bold px-8 py-3 rounded-lg transition-colors flex items-center gap-2 disabled:opacity-50"
              >
                <Save size={18} />
                {saving ? "Saving..." : "Save Settings"}
              </button>
            </div>
          </div>
        )}

        {/* Pixels Tab */}
        {activeTab === "pixels" && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">Tracking Codes</h2>
              <button
                onClick={() => handleSavePixel({ type: "custom", name: "New Code", customCode: "" })}
                className="bg-gold-500 hover:bg-gold-600 text-black font-bold px-4 py-2 rounded-lg transition-colors flex items-center gap-2"
              >
                <Plus size={18} />
                Add Code
              </button>
            </div>
            <div className="space-y-4">
              {pixels.map(pixel => (
                <div key={pixel.id} className="bg-gray-900 border border-gray-800 rounded-xl p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <input
                        type="text"
                        value={pixel.name}
                        onChange={e => handleSavePixel({ ...pixel, name: e.target.value })}
                        className="bg-transparent text-lg font-bold border-b border-gray-700 focus:border-gold-500 focus:outline-none pb-1 w-full"
                      />
                      <div className="text-sm text-gray-400 mt-1">{pixel.type}</div>
                    </div>
                    <div className="flex items-center gap-3">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={pixel.enabled}
                          onChange={e => handleSavePixel({ ...pixel, enabled: e.target.checked })}
                          className="w-4 h-4 accent-gold-500"
                        />
                        <span className="text-sm text-gray-400">Enabled</span>
                      </label>
                      <button
                        onClick={() => handleDeletePixel(pixel.id)}
                        className="text-red-400 hover:text-red-300"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                  {pixel.type !== "custom" && (
                    <div className="mb-4">
                      <label className="block text-sm text-gray-400 mb-2">Pixel/Tracking ID</label>
                      <input
                        type="text"
                        value={pixel.pixelId}
                        onChange={e => handleSavePixel({ ...pixel, pixelId: e.target.value })}
                        className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-sm focus:border-gold-500 focus:outline-none"
                        placeholder="Enter pixel ID"
                      />
                    </div>
                  )}
                  <div>
                    <label className="block text-sm text-gray-400 mb-2">Custom Code (HTML/Script)</label>
                    <textarea
                      value={pixel.customCode}
                      onChange={e => handleSavePixel({ ...pixel, customCode: e.target.value })}
                      className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-sm font-mono focus:border-gold-500 focus:outline-none h-32"
                      placeholder="<script>...</script>"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Stats Tab */}
        {activeTab === "stats" && (
          <div>
            <h2 className="text-2xl font-bold mb-6">Analytics</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
                <div className="flex items-center gap-3 mb-2">
                  <Users className="text-gold-400" size={24} />
                  <span className="text-gray-400">Total Visitors</span>
                </div>
                <div className="text-3xl font-bold">{trafficStats?.total || 0}</div>
                <div className="text-sm text-gray-500 mt-1">Today: {trafficStats?.today || 0}</div>
              </div>
              <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
                <div className="flex items-center gap-3 mb-2">
                  <ShoppingBag className="text-gold-400" size={24} />
                  <span className="text-gray-400">Add to Cart</span>
                </div>
                <div className="text-3xl font-bold">{cartStats?.addToCart || 0}</div>
              </div>
              <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
                <div className="flex items-center gap-3 mb-2">
                  <DollarSign className="text-gold-400" size={24} />
                  <span className="text-gray-400">Checkouts</span>
                </div>
                <div className="text-3xl font-bold">{cartStats?.checkouts || 0}</div>
              </div>
              <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
                <div className="flex items-center gap-3 mb-2">
                  <TrendingUp className="text-gold-400" size={24} />
                  <span className="text-gray-400">Purchases</span>
                </div>
                <div className="text-3xl font-bold">{orders.length}</div>
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
                <h3 className="font-bold mb-4">Traffic by Page</h3>
                {trafficStats?.byPage.map((item, i) => (
                  <div key={i} className="flex justify-between py-2 border-b border-gray-800 last:border-0">
                    <span className="text-gray-300">{item.page}</span>
                    <span className="text-gold-400">{item.count}</span>
                  </div>
                ))}
                {(!trafficStats?.byPage || trafficStats.byPage.length === 0) && (
                  <p className="text-gray-500 text-center py-4">No data yet</p>
                )}
              </div>
              <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
                <h3 className="font-bold mb-4">Traffic by Country</h3>
                {trafficStats?.byCountry.map((item, i) => (
                  <div key={i} className="flex justify-between py-2 border-b border-gray-800 last:border-0">
                    <span className="text-gray-300">{item.country}</span>
                    <span className="text-gold-400">{item.count}</span>
                  </div>
                ))}
                {(!trafficStats?.byCountry || trafficStats.byCountry.length === 0) && (
                  <p className="text-gray-500 text-center py-4">No data yet</p>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
