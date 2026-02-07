const { createClient } = require('@supabase/supabase-js');


const supabase = createClient(
  'https://pihczsfjnoxwhuxawbes.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBpaGN6c2Zqbm94d2h1eGF3YmVzIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1NTE2NDU4MywiZXhwIjoyMDcwNzQwNTgzfQ.-F7Skp6HbKI_5M0-k3Crgur4YnAHTLkxsESVmUbf-vw' // service_role key, len na server!
);

async function deleteUser(userId) {
  const { error } = await supabase.auth.admin.deleteUser(userId);
  if (error) {
    console.error('Chyba pri mazaní:', error.message);
  } else {
    console.log('Používateľ vymazaný');
  }
}

deleteUser('504150cc-0c02-4f56-960b-b40e8e89c17e');

