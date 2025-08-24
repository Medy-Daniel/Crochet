import React, { useState } from 'react';
import { View, Text, SafeAreaView, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { Button, Card } from '../../components/common';
import { NavigationStackParams } from '../../types';
import { StackNavigationProp } from '@react-navigation/stack';
import { AuthService } from '../../services/authService';

type LoginScreenProps = {
  navigation: StackNavigationProp<NavigationStackParams, 'Login'>;
};


 const translateError = (error: string): string => {
    switch (error) {
      case 'User not registered':
        return "Cet email n'est pas enregistré";
      case 'Email address is invalid':
        return 'Format d\'email invalide';
      case 'Password should be at least 6 characters':
        return "Le mot de passe n'est pas le bon";
      default:
        return 'Une erreur s\'est produite. Veuillez réessayer.';
    }
  };


export const LoginScreen: React.FC<LoginScreenProps> = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
    const handleLogin = async () => {
      setError('')
    setLoading(true);
  
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

  
    try {
      const result = await AuthService.signIn({
        email: email.trim(),
        password: password
      });
      if (result.success){
        console.log('Connexion réussie:', result.user)
        navigation.navigate('Dashboard');
      }else {
        setError(translateError(result.error || 'Erreur inconnue'));
      }
    }catch(error){
      console.error("Erreur de connexion:", error);
      setError('Une erreur est survenue, réessayez')
    }finally{
      setLoading(false);
    }
    };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title}>
            Connexion
          </Text>
          <Text style={styles.subtitle}>
            Connectez-vous à votre compte
          </Text>
        </View>

        <Card style={styles.card}>
          <View style={styles.form}>
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

            <TouchableOpacity style={styles.forgotPassword}>
              <Text style={styles.forgotPasswordText}>
                Mot de passe oublié ?
              </Text>
            </TouchableOpacity>
          </View>
        </Card>

        <View style={styles.buttonContainer}>
          <Button
            title="Se connecter"
            onPress={handleLogin}
            size="lg"
            loading={loading}
            disabled={!email || !password}
          />
        </View>
         {error ? (
          <Card style={{...styles.card, ...styles.errorCard}}>
                    <Text style={styles.errorText}>
                      {error}
                    </Text>
          </Card>
          ) : null}
        <View style={styles.footer}>
          <Text style={styles.footerText}>Pas encore de compte ? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Register')}>
            <Text style={styles.linkText}>S'inscrire</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fafb',
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    justifyContent: 'center',
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
  forgotPassword: {
    alignSelf: 'flex-end',
  },
  forgotPasswordText: {
    color: '#3b82f6',
    fontWeight: '500',
    fontSize: 14,
  },
  buttonContainer: {
    marginBottom: 24,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
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