import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';

// Remplacez les valeurs ci-dessous par les clés de votre propre projet Supabase.
const supabaseUrl = 'https://zisovayurzyrkpmzqcul.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inppc292YXl1cnp5cmtwbXpxY3VsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQ4MzExNTUsImV4cCI6MjA3MDQwNzE1NX0.IS40LYSsLzaL-It1ypRZsvgrifb5vhxMsin5y5nnstk'; 

export const supabase = createClient(supabaseUrl, supabaseAnonKey);