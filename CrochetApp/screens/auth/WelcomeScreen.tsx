import React from 'react';
import { View, Text, SafeAreaView, StyleSheet } from 'react-native';
import { Button } from '../../components/common';
import { NavigationStackParams } from '../../types';
import { StackNavigationProp } from '@react-navigation/stack';

type WelcomeScreenProps = {
  navigation: StackNavigationProp<NavigationStackParams, 'Welcome'>;
};

export const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.header}>
          <View style={styles.iconContainer}>
            <Text style={styles.icon}>🧶</Text>
          </View>
          
          <Text style={styles.title}>
            CrochetApp
          </Text>
          
          <Text style={styles.subtitle}>
            Votre compagnon parfait pour{'\n'}
            vos projets de crochet et tricot
          </Text>
        </View>

        <View style={styles.featuresList}>
          <View style={styles.featureItem}>
            <Text style={styles.checkmark}>✓</Text>
            <Text style={styles.featureText}>Compteur de rangs intelligent</Text>
          </View>
          
          <View style={styles.featureItem}>
            <Text style={styles.checkmark}>✓</Text>
            <Text style={styles.featureText}>Suivi de vos projets</Text>
          </View>
          
          <View style={styles.featureItem}>
            <Text style={styles.checkmark}>✓</Text>
            <Text style={styles.featureText}>Tutoriels et guides</Text>
          </View>
          
          <View style={styles.featureItem}>
            <Text style={styles.checkmark}>✓</Text>
            <Text style={styles.featureText}>Système de progression</Text>
          </View>
        </View>

        <View style={styles.buttonContainer}>
          <Button
            title="Commencer"
            onPress={() => navigation.navigate('Register')}
            size="lg"
          />
          
          <Button
            title="J'ai déjà un compte"
            onPress={() => navigation.navigate('Login')}
            variant="outline"
            size="lg"
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    alignItems: 'center',
    marginBottom: 48,
  },
  iconContainer: {
    width: 128,
    height: 128,
    backgroundColor: '#dbeafe',
    borderRadius: 64,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
  },
  icon: {
    fontSize: 48,
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#1f2937',
    textAlign: 'center',
    marginBottom: 16,
  },
  subtitle: {
    fontSize: 18,
    color: '#6b7280',
    textAlign: 'center',
    lineHeight: 28,
  },
  featuresList: {
    width: '100%',
    marginBottom: 32,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  checkmark: {
    color: '#3b82f6',
    fontSize: 20,
    marginRight: 12,
  },
  featureText: {
    color: '#374151',
    fontSize: 16,
  },
  buttonContainer: {
    width: '100%',
    gap: 12,
  },
});