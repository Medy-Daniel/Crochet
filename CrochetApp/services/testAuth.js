console.log('🔥 DÉMARRAGE DU SCRIPT testAuth.js');
console.log('Node version:', process.version);
console.log('Working directory:', process.cwd());

console.log('📦 Tentative import Supabase...');
try {
  const { createClient } = require('@supabase/supabase-js');
  console.log('✅ Import Supabase réussi !');
  
  // 📝 Configuration Supabase
  console.log('🔧 Configuration des variables...');
  const supabaseUrl = 'https://wdwnobtqgsyoeyrqkihi.supabase.co';  
  const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Indkd25vYnRxZ3N5b2V5cnFraWhpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTU3MjI2OTksImV4cCI6MjA3MTI5ODY5OX0.JcvPB9tDBbsJE2b8RnK6kTQoaFwi77gRVemZC9wnBNA';
  
  console.log('URL OK:', supabaseUrl.includes('supabase.co'));
  console.log('Key length:', supabaseKey.length);

  console.log('🚀 Création du client Supabase...');
  const supabase = createClient(supabaseUrl, supabaseKey);
  console.log('✅ Client Supabase créé !');

  // 🧪 FONCTIONS DE TEST
  async function testSignUp() {
    console.log('🧪 TEST SIGNUP...');

    try {
      const { data, error } = await supabase.auth.signUp({
        email: 'test.crochet@gmail.com',  // ← Email plus réaliste
        password: 'password123456',
        options: {
          data: {
            full_name: 'Mon Test User'
          }
        }
      });

      console.log('📊 DATA:', data);
      console.log('🚨 ERROR:', error);

      if (error) {
        console.log('❌ ERREUR:', error.message);
      } else {
        console.log('✅ SUCCÈS! User ID:', data.user?.id);
        console.log('📧 Email:', data.user?.email);
        console.log('👤 Nom:', data.user?.user_metadata?.full_name);
      }
    } catch (err) {
      console.log('🚨 EXCEPTION:', err.message);
    }
  }

  async function testSignIn() {
    console.log('🧪 TEST SIGNIN...');

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: 'test.crochet@gmail.com',
        password: 'password123456'
      });

      if (error) {
        console.log('❌ ERREUR CONNEXION:', error.message);
      } else {
        console.log('✅ CONNEXION RÉUSSIE!');
        console.log('📧 Email:', data.user?.email);
      }
    } catch (err) {
      console.log('🚨 EXCEPTION:', err.message);
    }
  }

  async function testGetUser() {
    console.log('🧪 TEST GET USER...');

    try {
      const { data, error } = await supabase.auth.getUser();

      if (error) {
        console.log('❌ ERREUR GET USER:', error.message);
      } else if (data.user) {
        console.log('✅ UTILISATEUR TROUVÉ:');
        console.log('📧 Email:', data.user.email);
        console.log('👤 ID:', data.user.id);
      } else {
        console.log('❌ AUCUN UTILISATEUR CONNECTÉ');
      }
    } catch (err) {
      console.log('🚨 EXCEPTION:', err.message);
    }
  }

  // 🚀 LANCER LES TESTS
  async function runTests() {
    console.log('🔥 DÉBUT DES TESTS AUTH');
    console.log('========================');

    await testGetUser();
    console.log('');

    await testSignUp();
    console.log('');

    await testSignIn();
    console.log('');

    await testGetUser();
    console.log('');

    console.log('🎉 TESTS TERMINÉS!');
  }

  // Lancer les tests
  console.log('🎬 Lancement des tests...');
  runTests().catch(err => {
    console.log('💥 ERREUR GÉNÉRALE:', err.message);
  });

} catch (error) {
  console.log('❌ ERREUR IMPORT SUPABASE:', error.message);
  console.log('💡 Solution: npm install @supabase/supabase-js');
}