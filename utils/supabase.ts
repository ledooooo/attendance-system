import { createClient } from '@supabase/supabase-js';

   const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
   const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

   if (!supabaseUrl || !supabaseKey) {
     throw new Error(`Supabase URL and Anon Key are required. URL: ${supabaseUrl}, Key: ${supabaseKey ? 'Present' : 'Missing'}`);
   }

   export const supabase = createClient(supabaseUrl, supabaseKey, {
     auth: {
       autoRefreshToken: true,
       persistSession: true,
       detectSessionInUrl: true
     }
   });