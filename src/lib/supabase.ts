import { createClient } from '@supabase/supabase-js';

let _supabase: ReturnType<typeof createClient> | null = null;

export function getSupabase() {
  if (_supabase) return _supabase;

  const url = process.env.COZE_SUPABASE_URL || 'https://placeholder.supabase.co';
  const key = process.env.COZE_SUPABASE_SECRET_KEY || 'placeholder-key';

  _supabase = createClient(url, key);
  return _supabase;
}
