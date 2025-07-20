import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://iyjiktgfeztcaxurzhfq.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml5amlrdGdmZXp0Y2F4dXJ6aGZxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTI3NzE3NDYsImV4cCI6MjA2ODM0Nzc0Nn0.Es1n1uooxYqx42deNvTZSraCCdT5ZXhiH4tMxdXfkDk';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Fetch all meals with user info
export async function fetchMeals() {
  const { data, error } = await supabase
    .from('meals')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data;
} 