import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';

// Remplacez avec vos clés de projet Supabase
const supabaseUrl = 'https://zisovayuryzrkpmzqu1.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyZWYtYmxvY2siOiJ6aXNvdmF5dXJ5enJrcG16cXVsaCIsInJvbGUiOiJhbm9uIiwiaWF0IjoxNzE2NDk2MzY1LCJleHAiOjE3NDgwMzIzNjV9.yJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyZWYtYmxvY2siOiJ6aXNvdmF5dXJ5enJrcG16cXVsaCIsInJvbGUiOiJhbm9uIiwiaWF0IjoxNzE2NDk2MzY1LCJleHAiOjE3NDgwMzIzNjV9';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);