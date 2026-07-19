-- MaxPlus Men's Health Product Store - Database Schema

-- Settings table
CREATE TABLE IF NOT EXISTS mp_settings (
  id INTEGER PRIMARY KEY DEFAULT 1,
  site_name TEXT DEFAULT 'MaxPlus',
  whatsapp_number TEXT DEFAULT '',
  whatsapp_message TEXT DEFAULT 'Hello, I''m interested in MaxPlus',
  admin_password TEXT DEFAULT 'maxplus2024',
  stripe_key TEXT DEFAULT '',
  square_key TEXT DEFAULT '',
  paypal_key TEXT DEFAULT '',
  active_payment TEXT DEFAULT 'whatsapp',
  currency TEXT DEFAULT 'USD',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Product variants (1 box, 2 boxes, 3 boxes)
CREATE TABLE IF NOT EXISTS mp_products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT DEFAULT '',
  price DECIMAL(10,2) NOT NULL,
  compare_price DECIMAL(10,2) DEFAULT 0,
  quantity INTEGER DEFAULT 1,
  label TEXT DEFAULT '',
  badge TEXT DEFAULT '',
  image_url TEXT DEFAULT '',
  enabled BOOLEAN DEFAULT true,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Orders
CREATE TABLE IF NOT EXISTS mp_orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_number TEXT NOT NULL,
  customer_name TEXT DEFAULT '',
  customer_email TEXT DEFAULT '',
  customer_phone TEXT DEFAULT '',
  shipping_address TEXT DEFAULT '',
  items JSONB DEFAULT '[]',
  total_amount DECIMAL(10,2) DEFAULT 0,
  currency TEXT DEFAULT 'USD',
  status TEXT DEFAULT 'pending',
  payment_method TEXT DEFAULT 'whatsapp',
  payment_id TEXT DEFAULT '',
  notes TEXT DEFAULT '',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Cart sessions (temporary, for tracking)
CREATE TABLE IF NOT EXISTS mp_cart_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id TEXT NOT NULL,
  product_id UUID,
  quantity INTEGER DEFAULT 1,
  event_type TEXT DEFAULT 'add_to_cart',
  ip TEXT DEFAULT '',
  page TEXT DEFAULT '',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Pixel/tracking codes
CREATE TABLE IF NOT EXISTS mp_pixels (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  type TEXT NOT NULL,
  name TEXT NOT NULL,
  pixel_id TEXT DEFAULT '',
  custom_code TEXT DEFAULT '',
  enabled BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Traffic/visitor tracking
CREATE TABLE IF NOT EXISTS mp_traffic (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id TEXT NOT NULL,
  page TEXT DEFAULT '',
  referrer TEXT DEFAULT '',
  user_agent TEXT DEFAULT '',
  ip TEXT DEFAULT '',
  country TEXT DEFAULT '',
  device TEXT DEFAULT '',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Click tracking (WhatsApp clicks)
CREATE TABLE IF NOT EXISTS mp_clicks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  type TEXT NOT NULL,
  label TEXT DEFAULT '',
  ip TEXT DEFAULT '',
  page TEXT DEFAULT '',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert default settings
INSERT INTO mp_settings (id) VALUES (1) ON CONFLICT (id) DO NOTHING;

-- Insert default product variants
INSERT INTO mp_products (name, description, price, compare_price, quantity, label, badge, sort_order, enabled) VALUES
('MaxPlus - 1 Box', 'Extend intimacy time. 1 box of MaxPlus gel.', 49.90, 69.90, 1, '1 Box - $49.90', 'Best for trying', 1, true),
('MaxPlus - 2 Boxes', 'Treat ED & premature ejaculation. 2 boxes of MaxPlus gel.', 89.90, 139.80, 2, '2 Boxes - $89.90', 'Most Popular', 2, true),
('MaxPlus - 3 Boxes', 'Complete treatment for size enhancement. 3 boxes of MaxPlus gel.', 119.90, 209.70, 3, '3 Boxes - $119.90', 'Best Value', 3, true)
ON CONFLICT DO NOTHING;
