-- MaxPlus Men's Health Product Store - Database Schema
-- 注意：所有表名使用 maxplus_ 前缀

-- Settings table
CREATE TABLE IF NOT EXISTS maxplus_settings (
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
CREATE TABLE IF NOT EXISTS maxplus_products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  subtitle TEXT DEFAULT '',
  description TEXT DEFAULT '',
  description_html TEXT DEFAULT '',
  price DECIMAL(10,2) NOT NULL,
  compare_price DECIMAL(10,2) DEFAULT 0,
  quantity INTEGER DEFAULT 1,
  label TEXT DEFAULT '',
  badge TEXT DEFAULT '',
  image_url TEXT DEFAULT '',
  images TEXT[] DEFAULT '{}',
  highlights TEXT[] DEFAULT '{}',
  specifications JSONB DEFAULT '[]',
  rating DECIMAL(2,1) DEFAULT 4.8,
  reviews INTEGER DEFAULT 0,
  enabled BOOLEAN DEFAULT true,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Orders
CREATE TABLE IF NOT EXISTS maxplus_orders (
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
CREATE TABLE IF NOT EXISTS maxplus_cart_events (
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
CREATE TABLE IF NOT EXISTS maxplus_pixels (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  type TEXT NOT NULL,
  name TEXT NOT NULL,
  pixel_id TEXT DEFAULT '',
  custom_code TEXT DEFAULT '',
  enabled BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Traffic/visitor tracking
CREATE TABLE IF NOT EXISTS maxplus_traffic (
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
CREATE TABLE IF NOT EXISTS maxplus_clicks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  type TEXT NOT NULL,
  label TEXT DEFAULT '',
  ip TEXT DEFAULT '',
  page TEXT DEFAULT '',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert default settings
INSERT INTO maxplus_settings (id, site_name, whatsapp_number, whatsapp_message, admin_password)
VALUES (1, 'MaxPlus', '13023107970', 'Hello, I''m interested in MaxPlus', 'maxplus2024')
ON CONFLICT (id) DO NOTHING;

-- Insert products
INSERT INTO maxplus_products (name, subtitle, description, description_html, price, compare_price, quantity, label, badge, images, highlights, specifications, rating, reviews, enabled, sort_order)
VALUES 
(
  '1 Box - Starter Pack',
  'Extend Intimate Time',
  'Perfect for first-time users. Experience the Japanese formula''s effectiveness with a 1-month supply.',
  '<p>Perfect for first-time users. Experience the Japanese formula''s effectiveness with a 1-month supply.</p><ul><li>30-day supply</li><li>Fast-acting formula</li><li>Natural ingredients</li></ul>',
  49.9,
  69.9,
  1,
  'Starter',
  'Popular',
  ARRAY['/images/product-box.jpeg'],
  ARRAY['Extends intimate time by 2-3x', 'Fast absorption in 60 seconds', 'Natural herbal formula', 'No side effects'],
  '[{"label":"Quantity","value":"1 Box (30ml)"},{"label":"Supply","value":"30 days"},{"label":"Strength","value":"Standard"}]',
  4.8,
  156,
  true,
  1
),
(
  '2 Boxes - Treatment Pack',
  'Treat ED & Premature',
  'Recommended for treating erectile dysfunction and premature ejaculation. 2-month supply for optimal results.',
  '<p>Recommended for treating erectile dysfunction and premature ejaculation. 2-month supply for optimal results.</p><ul><li>60-day supply</li><li>Treats ED and premature ejaculation</li><li>Long-lasting effects</li></ul>',
  89.9,
  139.8,
  2,
  'Treatment',
  'Best Value',
  ARRAY['/images/product-set.jpeg'],
  ARRAY['Treats erectile dysfunction', 'Solves premature ejaculation', '60-day complete treatment', 'Save $49.90'],
  '[{"label":"Quantity","value":"2 Boxes (60ml)"},{"label":"Supply","value":"60 days"},{"label":"Strength","value":"Enhanced"}]',
  4.9,
  289,
  true,
  2
),
(
  '3 Boxes - Premium Pack',
  'Treat Micro Penis',
  'Complete treatment package for penis enlargement. 3-month supply for maximum results.',
  '<p>Complete treatment package for penis enlargement. 3-month supply for maximum results.</p><ul><li>90-day supply</li><li>Penis enlargement formula</li><li>Maximum results guaranteed</li></ul>',
  119.9,
  209.7,
  3,
  'Premium',
  'Best Seller',
  ARRAY['/images/product-hero.jpeg'],
  ARRAY['Penis enlargement formula', '90-day complete treatment', 'Maximum results', 'Save $89.80'],
  '[{"label":"Quantity","value":"3 Boxes (90ml)"},{"label":"Supply","value":"90 days"},{"label":"Strength","value":"Maximum"}]',
  5.0,
  412,
  true,
  3
);
