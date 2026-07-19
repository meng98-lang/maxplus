import { getSupabase } from './supabase';

// ============ Types ============
export interface SiteSettings {
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

export interface Product {
  id: string;
  name: string;
  subtitle: string;
  description: string;
  price: number;
  comparePrice: number;
  quantity: number;
  label: string;
  badge: string;
  imageUrl: string;
  images: string[];
  rating: number;
  reviews: number;
  specs: Array<{ label: string; value: string }>;
  enabled: boolean;
  sortOrder: number;
}

export interface Order {
  id: string;
  orderNumber: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  shippingAddress: string;
  items: Array<{ productId: string; name: string; quantity: number; price: number }>;
  totalAmount: number;
  currency: string;
  status: string;
  paymentMethod: string;
  paymentId: string;
  notes: string;
  createdAt: string;
}

export interface Pixel {
  id: string;
  type: string;
  name: string;
  pixelId: string;
  customCode: string;
  enabled: boolean;
}

export interface TrafficRecord {
  id: string;
  sessionId: string;
  page: string;
  referrer: string;
  userAgent: string;
  ip: string;
  country: string;
  device: string;
  createdAt: string;
}

export interface ClickRecord {
  id: string;
  type: string;
  label: string;
  ip: string;
  page: string;
  createdAt: string;
}

// ============ Settings ============
export async function getSettings(): Promise<SiteSettings> {
  const supabase = getSupabase();
  const { data, error } = await supabase
    .from('mp_settings')
    .select('*')
    .eq('id', 1)
    .single();

  if (error || !data) {
    return {
      siteName: 'MaxPlus',
      whatsappNumber: '',
      whatsappMessage: "Hello, I'm interested in MaxPlus",
      adminPassword: 'maxplus2024',
      stripeKey: '',
      squareKey: '',
      paypalKey: '',
      activePayment: 'whatsapp',
      currency: 'USD',
    };
  }

  const d = data as Record<string, unknown>;
  return {
    siteName: (d.site_name as string) || 'MaxPlus',
    whatsappNumber: (d.whatsapp_number as string) || '',
    whatsappMessage: (d.whatsapp_message as string) || "Hello, I'm interested in MaxPlus",
    adminPassword: (d.admin_password as string) || 'maxplus2024',
    stripeKey: (d.stripe_key as string) || '',
    squareKey: (d.square_key as string) || '',
    paypalKey: (d.paypal_key as string) || '',
    activePayment: (d.active_payment as string) || 'whatsapp',
    currency: (d.currency as string) || 'USD',
  };
}

export async function updateSettings(settings: Partial<SiteSettings>): Promise<SiteSettings> {
  const supabase = getSupabase();
  const dbData: Record<string, unknown> = { updated_at: new Date().toISOString() };

  if (settings.siteName !== undefined) dbData.site_name = settings.siteName;
  if (settings.whatsappNumber !== undefined) dbData.whatsapp_number = settings.whatsappNumber;
  if (settings.whatsappMessage !== undefined) dbData.whatsapp_message = settings.whatsappMessage;
  if (settings.adminPassword !== undefined) dbData.admin_password = settings.adminPassword;
  if (settings.stripeKey !== undefined) dbData.stripe_key = settings.stripeKey;
  if (settings.squareKey !== undefined) dbData.square_key = settings.squareKey;
  if (settings.paypalKey !== undefined) dbData.paypal_key = settings.paypalKey;
  if (settings.activePayment !== undefined) dbData.active_payment = settings.activePayment;
  if (settings.currency !== undefined) dbData.currency = settings.currency;

  const { error } = await supabase
    .from('mp_settings')
    .update(dbData)
    .eq('id', 1);

  if (error) throw error;
  return getSettings();
}

// ============ Products ============
export async function getProducts(): Promise<Product[]> {
  const supabase = getSupabase();
  const { data, error } = await supabase
    .from('mp_products')
    .select('*')
    .eq('enabled', true)
    .order('sort_order', { ascending: true });

  if (error) return [];

  return (data || []).map((p: Record<string, unknown>) => ({
    id: p.id as string,
    name: p.name as string,
    subtitle: (p.subtitle as string) || '',
    description: p.description as string,
    price: Number(p.price),
    comparePrice: Number(p.compare_price) || 0,
    quantity: Number(p.quantity) || 1,
    label: p.label as string,
    badge: p.badge as string,
    imageUrl: p.image_url as string,
    images: p.images ? (p.images as string[]) : [p.image_url as string],
    rating: Number(p.rating) || 4.8,
    reviews: Number(p.reviews) || 0,
    specs: p.specs ? (p.specs as Array<{ label: string; value: string }>) : [],
    enabled: p.enabled as boolean,
    sortOrder: Number(p.sort_order) || 0,
  }));
}

export async function getProductById(id: string): Promise<Product | null> {
  const supabase = getSupabase();
  const { data, error } = await supabase
    .from('mp_products')
    .select('*')
    .eq('id', id)
    .single();

  if (error || !data) return null;

  const p = data as Record<string, unknown>;
  return {
    id: p.id as string,
    name: p.name as string,
    subtitle: (p.subtitle as string) || '',
    description: p.description as string,
    price: Number(p.price),
    comparePrice: Number(p.compare_price) || 0,
    quantity: Number(p.quantity) || 1,
    label: p.label as string,
    badge: p.badge as string,
    imageUrl: p.image_url as string,
    images: p.images ? (p.images as string[]) : [p.image_url as string],
    rating: Number(p.rating) || 4.8,
    reviews: Number(p.reviews) || 0,
    specs: p.specs ? (p.specs as Array<{ label: string; value: string }>) : [],
    enabled: p.enabled as boolean,
    sortOrder: Number(p.sort_order) || 0,
  };
}

// ============ Orders ============
export async function createOrder(order: {
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  shippingAddress: string;
  items: Array<{ productId: string; name: string; quantity: number; price: number }>;
  totalAmount: number;
  paymentMethod: string;
  notes?: string;
}): Promise<Order> {
  const supabase = getSupabase();
  const orderNumber = 'MP-' + Date.now().toString(36).toUpperCase() + Math.random().toString(36).substring(2, 6).toUpperCase();

  const { data, error } = await supabase
    .from('mp_orders')
    .insert({
      order_number: orderNumber,
      customer_name: order.customerName,
      customer_email: order.customerEmail,
      customer_phone: order.customerPhone,
      shipping_address: order.shippingAddress,
      items: order.items,
      total_amount: order.totalAmount,
      currency: 'USD',
      status: 'pending',
      payment_method: order.paymentMethod,
      notes: order.notes || '',
    } as Record<string, unknown>)
    .select()
    .single();

  if (error) throw error;

  const d = data as Record<string, unknown>;
  return {
    id: d.id as string,
    orderNumber: d.order_number as string,
    customerName: d.customer_name as string,
    customerEmail: d.customer_email as string,
    customerPhone: d.customer_phone as string,
    shippingAddress: d.shipping_address as string,
    items: d.items as Array<{ productId: string; name: string; quantity: number; price: number }>,
    totalAmount: Number(d.total_amount),
    currency: d.currency as string,
    status: d.status as string,
    paymentMethod: d.payment_method as string,
    paymentId: data.payment_id,
    notes: data.notes,
    createdAt: data.created_at,
  };
}

export async function getOrders(limit = 50): Promise<Order[]> {
  const supabase = getSupabase();
  const { data, error } = await supabase
    .from('mp_orders')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(limit);

  if (error) return [];

  return (data || []).map((o: Record<string, unknown>) => ({
    id: o.id as string,
    orderNumber: o.order_number as string,
    customerName: o.customer_name as string,
    customerEmail: o.customer_email as string,
    customerPhone: o.customer_phone as string,
    shippingAddress: o.shipping_address as string,
    items: o.items as Array<{ productId: string; name: string; quantity: number; price: number }>,
    totalAmount: Number(o.total_amount),
    currency: o.currency as string,
    status: o.status as string,
    paymentMethod: o.payment_method as string,
    paymentId: o.payment_id as string,
    notes: o.notes as string,
    createdAt: o.created_at as string,
  }));
}

export async function updateOrderStatus(orderId: string, status: string): Promise<void> {
  const supabase = getSupabase();
  await supabase
    .from('mp_orders')
    .update({ status, updated_at: new Date().toISOString() })
    .eq('id', orderId);
}

// ============ Cart Events ============
export async function recordCartEvent(event: {
  sessionId: string;
  productId?: string;
  quantity?: number;
  eventType?: string;
  ip?: string;
  page?: string;
}): Promise<void> {
  const supabase = getSupabase();
  await supabase.from('mp_cart_events').insert({
    session_id: event.sessionId,
    product_id: event.productId || null,
    quantity: event.quantity || 1,
    event_type: event.eventType || 'add_to_cart',
    ip: event.ip || '',
    page: event.page || '',
  });
}

export async function getCartStats(): Promise<{ addToCart: number; checkouts: number; purchases: number }> {
  const supabase = getSupabase();
  const { data } = await supabase
    .from('mp_cart_events')
    .select('event_type');

  if (!data) return { addToCart: 0, checkouts: 0, purchases: 0 };

  return {
    addToCart: data.filter((e: Record<string, unknown>) => e.event_type === 'add_to_cart').length,
    checkouts: data.filter((e: Record<string, unknown>) => e.event_type === 'checkout').length,
    purchases: data.filter((e: Record<string, unknown>) => e.event_type === 'purchase').length,
  };
}

// ============ Pixels ============
export async function getPixels(): Promise<Pixel[]> {
  const supabase = getSupabase();
  const { data, error } = await supabase
    .from('mp_pixels')
    .select('*')
    .order('created_at', { ascending: true });

  if (error) return [];

  return (data || []).map((p: Record<string, unknown>) => ({
    id: p.id as string,
    type: p.type as string,
    name: p.name as string,
    pixelId: p.pixel_id as string,
    customCode: p.custom_code as string,
    enabled: p.enabled as boolean,
  }));
}

export async function upsertPixel(pixel: {
  id?: string;
  type: string;
  name: string;
  pixelId?: string;
  customCode?: string;
  enabled?: boolean;
}): Promise<Pixel> {
  const supabase = getSupabase();
  const dbData: Record<string, unknown> = {
    type: pixel.type,
    name: pixel.name,
    pixel_id: pixel.pixelId || '',
    custom_code: pixel.customCode || '',
    enabled: pixel.enabled !== undefined ? pixel.enabled : true,
  };

  let result;
  if (pixel.id) {
    const { data, error } = await supabase
      .from('mp_pixels')
      .update(dbData)
      .eq('id', pixel.id)
      .select()
      .single();
    if (error) throw error;
    result = data;
  } else {
    const { data, error } = await supabase
      .from('mp_pixels')
      .insert(dbData)
      .select()
      .single();
    if (error) throw error;
    result = data;
  }

  return {
    id: result.id,
    type: result.type,
    name: result.name,
    pixelId: result.pixel_id,
    customCode: result.custom_code,
    enabled: result.enabled,
  };
}

export async function deletePixel(id: string): Promise<void> {
  const supabase = getSupabase();
  await supabase.from('mp_pixels').delete().eq('id', id);
}

// ============ Traffic ============
export async function recordVisit(visit: {
  sessionId: string;
  page?: string;
  referrer?: string;
  userAgent?: string;
  ip?: string;
  country?: string;
  device?: string;
}): Promise<void> {
  const supabase = getSupabase();
  await supabase.from('mp_traffic').insert({
    session_id: visit.sessionId,
    page: visit.page || '',
    referrer: visit.referrer || '',
    user_agent: visit.userAgent || '',
    ip: visit.ip || '',
    country: visit.country || '',
    device: visit.device || '',
  });
}

export async function getTrafficStats(): Promise<{
  total: number;
  today: number;
  byPage: Array<{ page: string; count: number }>;
  byCountry: Array<{ country: string; count: number }>;
}> {
  const supabase = getSupabase();
  const { data } = await supabase
    .from('mp_traffic')
    .select('*');

  if (!data) return { total: 0, today: 0, byPage: [], byCountry: [] };

  const today = new Date().toISOString().split('T')[0];
  const todayCount = data.filter((d: Record<string, unknown>) =>
    (d.created_at as string).startsWith(today)
  ).length;

  const pageMap = new Map<string, number>();
  const countryMap = new Map<string, number>();

  data.forEach((d: Record<string, unknown>) => {
    const page = (d.page as string) || '/';
    const country = (d.country as string) || 'Unknown';
    pageMap.set(page, (pageMap.get(page) || 0) + 1);
    countryMap.set(country, (countryMap.get(country) || 0) + 1);
  });

  return {
    total: data.length,
    today: todayCount,
    byPage: Array.from(pageMap.entries()).map(([page, count]) => ({ page, count })).sort((a, b) => b.count - a.count),
    byCountry: Array.from(countryMap.entries()).map(([country, count]) => ({ country, count })).sort((a, b) => b.count - a.count),
  };
}

// ============ Clicks ============
export async function recordClick(click: {
  type: string;
  label?: string;
  ip?: string;
  page?: string;
}): Promise<void> {
  const supabase = getSupabase();
  await supabase.from('mp_clicks').insert({
    type: click.type,
    label: click.label || '',
    ip: click.ip || '',
    page: click.page || '',
  });
}

export async function getClickStats(): Promise<{
  total: number;
  today: number;
  byType: Array<{ type: string; count: number }>;
}> {
  const supabase = getSupabase();
  const { data } = await supabase.from('mp_clicks').select('*');

  if (!data) return { total: 0, today: 0, byType: [] };

  const today = new Date().toISOString().split('T')[0];
  const todayCount = data.filter((d: Record<string, unknown>) =>
    (d.created_at as string).startsWith(today)
  ).length;

  const typeMap = new Map<string, number>();
  data.forEach((d: Record<string, unknown>) => {
    const type = (d.type as string) || 'unknown';
    typeMap.set(type, (typeMap.get(type) || 0) + 1);
  });

  return {
    total: data.length,
    today: todayCount,
    byType: Array.from(typeMap.entries()).map(([type, count]) => ({ type, count })),
  };
}
