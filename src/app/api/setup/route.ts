import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

const SQL = `
-- MaxPlus Products
CREATE TABLE IF NOT EXISTS maxplus_products (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT DEFAULT '',
  price DECIMAL(10,2) NOT NULL DEFAULT 0,
  compare_price DECIMAL(10,2) NOT NULL DEFAULT 0,
  quantity INTEGER NOT NULL DEFAULT 0,
  label TEXT DEFAULT '',
  badge TEXT DEFAULT '',
  image_url TEXT DEFAULT '',
  enabled BOOLEAN DEFAULT true,
  sort_order INTEGER DEFAULT 0
);

-- MaxPlus Settings
CREATE TABLE IF NOT EXISTS maxplus_settings (
  id INTEGER PRIMARY KEY DEFAULT 1,
  site_name TEXT DEFAULT 'MaxPlus',
  whatsapp_number TEXT DEFAULT '',
  whatsapp_message TEXT DEFAULT 'Hello, I would like to order MaxPlus',
  admin_password TEXT DEFAULT 'admin888',
  stripe_key TEXT DEFAULT '',
  square_key TEXT DEFAULT '',
  paypal_key TEXT DEFAULT '',
  active_payment TEXT DEFAULT 'whatsapp',
  currency TEXT DEFAULT 'USD'
);

-- MaxPlus Orders
CREATE TABLE IF NOT EXISTS maxplus_orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_number TEXT NOT NULL,
  customer_name TEXT NOT NULL,
  customer_email TEXT DEFAULT '',
  customer_phone TEXT DEFAULT '',
  shipping_address TEXT DEFAULT '',
  items JSONB DEFAULT '[]',
  total_amount DECIMAL(10,2) NOT NULL DEFAULT 0,
  currency TEXT DEFAULT 'USD',
  status TEXT DEFAULT 'pending',
  payment_method TEXT DEFAULT 'whatsapp',
  payment_id TEXT DEFAULT '',
  notes TEXT DEFAULT '',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- MaxPlus Pixels
CREATE TABLE IF NOT EXISTS maxplus_pixels (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  type TEXT NOT NULL,
  name TEXT NOT NULL,
  pixel_id TEXT DEFAULT '',
  custom_code TEXT DEFAULT '',
  enabled BOOLEAN DEFAULT true
);

-- MaxPlus Clicks
CREATE TABLE IF NOT EXISTS maxplus_clicks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  contact_id TEXT NOT NULL,
  platform TEXT NOT NULL,
  timestamp TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  page TEXT DEFAULT '',
  ip TEXT DEFAULT ''
);

-- MaxPlus Traffic
CREATE TABLE IF NOT EXISTS maxplus_traffic (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  timestamp TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  page TEXT DEFAULT '',
  referrer TEXT DEFAULT '',
  country TEXT DEFAULT '',
  device TEXT DEFAULT '',
  ip TEXT DEFAULT ''
);

-- Insert default products
INSERT INTO maxplus_products (id, name, description, price, compare_price, quantity, label, badge, enabled, sort_order) VALUES
('1box', 'MaxPlus 1 Box - Extend Intimacy', '1 box of MaxPlus gel for extending intimacy time', 49.90, 69.90, 100, '1 Box', 'Starter', true, 1),
('2box', 'MaxPlus 2 Boxes - Treat ED & PE', '2 boxes of MaxPlus gel for treating erectile dysfunction and premature ejaculation', 89.90, 139.80, 100, '2 Boxes', 'Popular', true, 2),
('3box', 'MaxPlus 3 Boxes - Complete Treatment', '3 boxes of MaxPlus gel for complete male enhancement treatment', 119.90, 209.70, 100, '3 Boxes', 'Best Value', true, 3)
ON CONFLICT (id) DO NOTHING;

-- Insert default settings
INSERT INTO maxplus_settings (id) VALUES (1) ON CONFLICT (id) DO NOTHING;
`;

export async function GET() {
  try {
    const url = process.env.COZE_SUPABASE_URL;
    const key = process.env.COZE_SUPABASE_SECRET_KEY;

    if (!url || !key) {
      return NextResponse.json({ error: 'Supabase not configured' }, { status: 500 });
    }

    // Use Supabase REST API to check if tables exist
    const checkRes = await fetch(`${url}/rest/v1/maxplus_products`, {
      headers: { apikey: key, Authorization: `Bearer ${key}` }
    });

    if (checkRes.ok) {
      return NextResponse.json({ message: 'Tables already exist' });
    }

    // Tables don't exist, need to create them via SQL
    // Since we can't execute DDL via REST API, return instructions
    return NextResponse.json({
      message: 'Tables need to be created. Please run the SQL in Supabase SQL Editor.',
      sql: SQL
    });
  } catch (error) {
    return NextResponse.json({ error: 'Setup failed' }, { status: 500 });
  }
}
