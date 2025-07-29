import 'react-native-url-polyfill/auto';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://ttzwlqozaglnczfdjhnl.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR0endscW96YWdsbmN6ZmRqaG5sIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDUzMDc1MjAsImV4cCI6MjA2MDg4MzUyMH0.JSo7zvbcIpwUHA3bApaKToJAhHBJNyDZ4gbsbrHENu0';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);