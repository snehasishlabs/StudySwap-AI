// Supabase client service configuration stub
// In production, initialize with createClient(SUPABASE_URL, SUPABASE_ANON_KEY)

export const SUPABASE_CONFIG = {
  url: (import.meta as any).env?.VITE_SUPABASE_URL || '',
  anonKey: (import.meta as any).env?.VITE_SUPABASE_ANON_KEY || '',
};

export const isSupabaseConfigured = Boolean(
  SUPABASE_CONFIG.url && SUPABASE_CONFIG.anonKey
);
