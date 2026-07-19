import { createClient } from '@supabase/supabase-js';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
let _supabase: any = null;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function getSupabase(): any {
  if (_supabase) return _supabase;

  const url = process.env.COZE_SUPABASE_URL || '';
  const key = process.env.COZE_SUPABASE_SECRET_KEY || '';

  _supabase = createClient(url, key);
  return _supabase;
}
