// 'use Server';
// useSupabase.ts
import { createClient } from '@/utils/supabase/server';
import { cookies } from 'next/headers';

const cookieStore = cookies();
export const supabase = createClient(cookieStore);
