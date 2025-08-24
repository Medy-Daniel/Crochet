import React, { useState } from 'react';
import { View, Text, SafeAreaView, TextInput, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { Button, Card } from '../../components/common';
import { NavigationStackParams } from '../../types';
import { StackNavigationProp } from '@react-navigation/stack';
import { AuthService } from '../../services/authService';

type RegisterScreenProps = {
  navigation: StackNavigationProp<NavigationStackParams, 'Register'>;
};


 const translateError = (error: string): string => {
    switch (error) {
      case 'User already registered':
        return 'Cet email est déjà utilisé';
      case 'Email address is invalid':
        return 'Format d\'email invalide';
      case 'Password should be at least 6 characters':
        return 'Le mot de passe doit contenir au moins 6 caractères';
      default:
        return 'Une erreur s\'est produite. Veuillez réessayer.';
    }
  };

export const RegisterScreen: React.FC<RegisterScreenProps> = ({ navigation }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleRegister = async () => {
  setLoading(true);

  if (!name.trim()) {
    setError('Le nom complet est obligatoire');
    setLoading(false);
    return;
  }

  if (!email.trim()) {
    setError('L\'email est obligatoire');
    setLoading(false);
    return;
  }

  if (!email.includes('@')) {
    setError('Format d\'email invalide');
    setLoading(false);
    return;
  }

  if (password.length < 6) {
    setError('Le mot de passe doit contenir au moins 6 caractères');
    setLoading(false);
    return;
  }

  if (password !== confirmPassword) {
    setError('Les mots de passe ne correspondent pas');
    setLoading(false);
    return;
  }

  if (!acceptTerms) {
    setError('Veuillez accepter les conditions d\'utilisation');
    setLoading(false);
    return;
  }

  try {
    const result = await AuthService.signUp({
      email: email.trim(),
      password: password,
      fullName: name.trim()
    });
    if (result.success){
      console.log('Inscription réussie:', result.user)
      navigation.navigate('Dashboard');
    }else {
      setError(translateError(result.error || 'Erreur inconnue'));
    }
  }catch(error){
    console.error("Erreur d'inscription:", error);
    setError('Une erreur est survenue, réessayez')
  }finally{
    setLoading(false);
  }
  };

  const isFormValid = name && email && password && confirmPassword && acceptTerms;

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          <View style={styles.header}>
            <Text style={styles.title}>
              Inscription
            </Text>
            <Text style={styles.subtitle}>
              Créez votre compte et commencez{'\n'}
              votre parcours créatif
            </Text>
          </View>

          <Card style={styles.card}>
            <View style={styles.form}>
              <View style={styles.inputGroup}>
                <Text style={styles.label}>
                  Nom complet
                </Text>
                <TextInput
                  style={styles.input}
                  placeholder="Votre nom"
                  value={name}
                  onChangeText={setName}
                  autoCapitalize="words"
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.label}>
                  Email
                </Text>
                <TextInput
                  style={styles.input}
                  placeholder="votre@email.com"
                  value={email}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoCorrect={false}
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.label}>
                  Mot de passe
                </Text>
                <TextInput
                  style={styles.input}
                  placeholder="••••••••"
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.label}>
                  Confirmer le mot de passe
                </Text>
                <TextInput
                  style={styles.input}
                  placeholder="••••••••"
                  value={confirmPassword}
                  onChangeText={setConfirmPassword}
                  secureTextEntry
                />
              </View>
            </View>
          </Card>
             {error ? (
          <Card style={{...styles.card, ...styles.errorCard}}>
            <Text style={styles.errorText}>
              {error}
            </Text>
          </Card>
        ) : null}
          <Card style={styles.card}>
            <TouchableOpacity 
              style={styles.checkboxContainer}
              onPress={() => setAcceptTerms(!acceptTerms)}
            >
              <View style={[
                styles.checkbox,
                acceptTerms ? styles.checkboxChecked : styles.checkboxUnchecked
              ]}>
                {acceptTerms && <Text style={styles.checkmark}>✓</Text>}
              </View>
              <Text style={styles.termsText}>
                J'accepte les{' '}
                <Text style={styles.linkInline}>
                  conditions d'utilisation
                </Text>
                {' '}et la{' '}
                <Text style={styles.linkInline}>
                  politique de confidentialité
                </Text>
              </Text>
            </TouchableOpacity>
          </Card>

          <View style={styles.buttonContainer}>
            <Button
              title="Créer mon compte"
              onPress={handleRegister}
              size="lg"
              loading={loading}
              disabled={!isFormValid}
            />
          </View>

          <View style={styles.footer}>
            <Text style={styles.footerText}>Déjà un compte ? </Text>
            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
              <Text style={styles.linkText}>Se connecter</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fafb',
  },
  scrollView: {
    flex: 1,
    paddingHorizontal: 24,
  },
  content: {
    paddingVertical: 24,
  },
  header: {
    alignItems: 'center',
    marginBottom: 32,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 8,
  },
  subtitle: {
    color: '#6b7280',
    fontSize: 16,
    textAlign: 'center',
  },
  card: {
    marginBottom: 24,
  },
  form: {
    gap: 16,
  },
  inputGroup: {
    gap: 8,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    color: '#374151',
  },
  input: {
    width: '100%',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#f9fafb',
    borderRadius: 12,
    color: '#1f2937',
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 2,
    marginRight: 12,
    marginTop: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxChecked: {
    backgroundColor: '#3b82f6',
    borderColor: '#3b82f6',
  },
  checkboxUnchecked: {
    borderColor: '#d1d5db',
  },
  checkmark: {
    color: 'white',
    fontSize: 12,
  },
  termsText: {
    fontSize: 14,
    color: '#374151',
    flex: 1,
    lineHeight: 20,
  },
  linkInline: {
    color: '#3b82f6',
    fontWeight: '500',
  },
  buttonContainer: {
    marginBottom: 24,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingBottom: 24,
  },
  footerText: {
    color: '#6b7280',
    fontSize: 16,
  },
  linkText: {
    color: '#3b82f6',
    fontWeight: '500',
    fontSize: 16,
  },
   errorCard: {
    backgroundColor: '#fee2e2',
    borderColor: '#fca5a5',
    borderWidth: 1,
  },
  errorText: {
    color: '#dc2626',
    fontSize: 14,
    fontWeight: '500',
  },
});