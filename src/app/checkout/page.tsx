"use client";

import { useState, useEffect } from "react";
import { ArrowLeft, Lock, CreditCard } from "lucide-react";
import Link from "next/link";

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

interface SiteSettings {
  siteName: string;
  whatsappNumber: string;
  whatsappMessage: string;
  activePayment: string;
  stripeKey: string;
  squareKey: string;
  paypalKey: string;
  currency: string;
}

export default function CheckoutPage() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [settings, setSettings] = useState<SiteSettings | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zip: "",
  });
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const cartData = localStorage.getItem("mp_cart");
    if (cartData) setCart(JSON.parse(cartData));

    fetch("/api/settings")
      .then(res => res.json())
      .then(data => setSettings(data))
      .finally(() => setLoading(false));
  }, []);

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customerName: formData.name,
          customerEmail: formData.email,
          customerPhone: formData.phone,
          shippingAddress: `${formData.address}, ${formData.city}, ${formData.state} ${formData.zip}`,
          items: cart,
          totalAmount: total,
          paymentMethod: settings?.activePayment || "whatsapp",
        }),
      });

      if (res.ok) {
        const order = await res.json();

        if (settings?.activePayment === "whatsapp" && settings.whatsappNumber) {
          const message = `New Order #${order.orderNumber}\n\nCustomer: ${formData.name}\nEmail: ${formData.email}\nPhone: ${formData.phone}\nAddress: ${formData.address}, ${formData.city}, ${formData.state} ${formData.zip}\n\nItems:\n${cart.map(item => `${item.name} x${item.quantity} - $${(item.price * item.quantity).toFixed(2)}`).join("\n")}\n\nTotal: $${total.toFixed(2)}`;
          window.location.href = `https://wa.me/${settings.whatsappNumber}?text=${encodeURIComponent(message)}`;
        } else {
          localStorage.removeItem("mp_cart");
          window.location.href = `/checkout/success?order=${order.orderNumber}`;
        }
      }
    } catch {
      alert("Failed to place order. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-gold-400 text-xl">Loading...</div>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center px-4">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-4">Your cart is empty</h1>
          <Link href="/" className="text-gold-400 hover:text-gold-300">
            ← Back to Shop
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <header className="border-b border-gray-800 px-6 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 text-gray-400 hover:text-white">
            <ArrowLeft size={20} />
            Back to Shop
          </Link>
          <div className="text-xl font-bold text-gold-400">MAX<span className="text-red-500">+</span></div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-6 py-8">
        <h1 className="text-3xl font-bold mb-8">Checkout</h1>
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Order Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <Lock size={20} className="text-gold-400" />
                Shipping Information
              </h2>
              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="Full Name *"
                  required
                  value={formData.name}
                  onChange={e => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 focus:border-gold-500 focus:outline-none"
                />
                <input
                  type="email"
                  placeholder="Email *"
                  required
                  value={formData.email}
                  onChange={e => setFormData({ ...formData, email: e.target.value })}
                  className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 focus:border-gold-500 focus:outline-none"
                />
                <input
                  type="tel"
                  placeholder="Phone *"
                  required
                  value={formData.phone}
                  onChange={e => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 focus:border-gold-500 focus:outline-none"
                />
                <input
                  type="text"
                  placeholder="Address *"
                  required
                  value={formData.address}
                  onChange={e => setFormData({ ...formData, address: e.target.value })}
                  className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 focus:border-gold-500 focus:outline-none"
                />
                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="City *"
                    required
                    value={formData.city}
                    onChange={e => setFormData({ ...formData, city: e.target.value })}
                    className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 focus:border-gold-500 focus:outline-none"
                  />
                  <input
                    type="text"
                    placeholder="State *"
                    required
                    value={formData.state}
                    onChange={e => setFormData({ ...formData, state: e.target.value })}
                    className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 focus:border-gold-500 focus:outline-none"
                  />
                </div>
                <input
                  type="text"
                  placeholder="ZIP Code *"
                  required
                  value={formData.zip}
                  onChange={e => setFormData({ ...formData, zip: e.target.value })}
                  className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 focus:border-gold-500 focus:outline-none"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full bg-gold-500 hover:bg-gold-600 text-black font-bold py-4 rounded-lg transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
            >
              <CreditCard size={20} />
              {submitting ? "Processing..." : `Place Order - $${total.toFixed(2)}`}
            </button>
          </form>

          {/* Order Summary */}
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 h-fit">
            <h2 className="text-xl font-bold mb-4">Order Summary</h2>
            <div className="space-y-4 mb-6">
              {cart.map(item => (
                <div key={item.id} className="flex justify-between items-center py-2 border-b border-gray-800">
                  <div>
                    <div className="font-medium">{item.name}</div>
                    <div className="text-sm text-gray-400">Qty: {item.quantity}</div>
                  </div>
                  <div className="font-bold">${(item.price * item.quantity).toFixed(2)}</div>
                </div>
              ))}
            </div>
            <div className="flex justify-between items-center text-xl font-bold pt-4 border-t border-gray-700">
              <span>Total</span>
              <span className="text-gold-400">${total.toFixed(2)}</span>
            </div>
            <div className="mt-4 text-sm text-gray-400">
              Payment: {settings?.activePayment === "whatsapp" ? "WhatsApp Order" : settings?.activePayment?.toUpperCase() || "WhatsApp"}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
