import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || "https://rgtnuhugprpoihqdjfui.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJndG51aHVncHJwb2locWRqZnVpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQ5MDgyNDgsImV4cCI6MjA3MDQ4NDI0OH0.g_09Ks-EmELwLU4aYt4QNoxtfqx03uVtEVnkUrPQ4dI";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
  auth: {
    storage: localStorage,
    persistSession: true,
    autoRefreshToken: true,
  }
});