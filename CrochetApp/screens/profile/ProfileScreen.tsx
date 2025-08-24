import React from 'react';
import { View, Text, SafeAreaView, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { Card, ProgressBar, Button } from '../../components/common';
import { NavigationStackParams, User, UserLevel } from '../../types';
import { StackNavigationProp } from '@react-navigation/stack';
import { PREMIUM_FEATURES } from '../../constants';

type ProfileScreenProps = {
  navigation: StackNavigationProp<NavigationStackParams, 'Profile'>;
};

const mockUser: User = {
  id: 'user1',
  email: 'marie@example.com',
  name: 'Marie Durand',
  subscriptionTier: 'free',
  level: {
    level: 3,
    name: 'Débutant',
    xp: 350,
    nextLevelXp: 500,
  },
  createdAt: new Date('2024-01-15'),
  updatedAt: new Date(),
};

export const ProfileScreen: React.FC<ProfileScreenProps> = ({ navigation }) => {
  const { level } = mockUser;
  const progressToNext = ((level.xp / level.nextLevelXp) * 100);

  const StatCard: React.FC<{ title: string; value: string; icon: string }> = ({ 
    title, 
    value, 
    icon 
  }) => (
    <Card style={styles.statCard}>
      <Text style={styles.statIcon}>{icon}</Text>
      <Text style={styles.statValue}>{value}</Text>
      <Text style={styles.statTitle}>{title}</Text>
    </Card>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.headerTitle}>
              Profil
            </Text>
            <TouchableOpacity onPress={() => navigation.navigate('Settings')}>
              <Text style={styles.settingsButton}>Paramètres</Text>
            </TouchableOpacity>
          </View>

          {/* User Info */}
          <Card style={styles.userCard}>
            <View style={styles.userContainer}>
              <View style={styles.avatar}>
                <Text style={styles.avatarText}>{mockUser.name?.[0] || '👤'}</Text>
              </View>
              <Text style={styles.userName}>
                {mockUser.name}
              </Text>
              <Text style={styles.userEmail}>{mockUser.email}</Text>
              
              {mockUser.subscriptionTier === 'free' && (
                <View style={styles.freeBadge}>
                  <Text style={styles.freeBadgeText}>Compte Gratuit</Text>
                </View>
              )}
            </View>
          </Card>

          {/* Level Progress */}
          <Card style={styles.levelCard}>
            <View style={styles.levelHeader}>
              <Text style={styles.levelTitle}>
                Niveau {level.level} - {level.name}
              </Text>
              <Text style={styles.levelXP}>
                {level.xp} / {level.nextLevelXp} XP
              </Text>
            </View>
            <ProgressBar
              current={level.xp}
              total={level.nextLevelXp}
              color="secondary"
              showPercentage={false}
            />
            <Text style={styles.levelProgress}>
              Plus que {level.nextLevelXp - level.xp} XP pour le niveau suivant
            </Text>
          </Card>

          {/* Statistics */}
          <Text style={styles.sectionTitle}>
            Vos statistiques
          </Text>
          <View style={styles.statsContainer}>
            <StatCard title="Projets terminés" value="12" icon="✅" />
            <StatCard title="Rangs tricotés" value="1,247" icon="🧶" />
            <StatCard title="Jours actifs" value="28" icon="📅" />
          </View>

          {/* Premium Upgrade */}
          {mockUser.subscriptionTier === 'free' && (
            <Card style={styles.premiumCard}>
              <View style={styles.premiumContainer}>
                <Text style={styles.premiumTitle}>
                  ✨ Passez au Premium
                </Text>
                <Text style={styles.premiumSubtitle}>
                  Débloquez toutes les fonctionnalités avancées
                </Text>
                
                <View style={styles.premiumFeatures}>
                  {PREMIUM_FEATURES.slice(0, 3).map((feature, index) => (
                    <View key={index} style={styles.featureRow}>
                      <Text style={styles.featureCheckmark}>✓</Text>
                      <Text style={styles.featureText}>{feature}</Text>
                    </View>
                  ))}
                </View>

                <Button
                  title="Découvrir Premium"
                  onPress={() => {}}
                  variant="primary"
                  size="md"
                />
              </View>
            </Card>
          )}

          {/* Achievements */}
          <Text style={styles.sectionTitle}>
            Réalisations récentes
          </Text>
          <Card style={styles.achievementsCard}>
            <View style={styles.achievementsContainer}>
              <View style={styles.achievementRow}>
                <Text style={styles.achievementIcon}>🏆</Text>
                <View style={styles.achievementContent}>
                  <Text style={styles.achievementTitle}>Premier projet</Text>
                  <Text style={styles.achievementDescription}>Terminez votre premier projet</Text>
                </View>
                <Text style={styles.achievementDate}>Il y a 2 jours</Text>
              </View>
              
              <View style={styles.achievementRow}>
                <Text style={styles.achievementIcon}>🔥</Text>
                <View style={styles.achievementContent}>
                  <Text style={styles.achievementTitle}>Série de 7 jours</Text>
                  <Text style={styles.achievementDescription}>Tricotez 7 jours consécutifs</Text>
                </View>
                <Text style={styles.achievementDate}>Il y a 1 semaine</Text>
              </View>
            </View>
          </Card>

          {/* Quick Actions */}
          <Text style={styles.sectionTitle}>
            Actions rapides
          </Text>
          <View style={styles.actionsContainer}>
            <TouchableOpacity>
              <Card style={styles.actionCard}>
                <View style={styles.actionLeft}>
                  <Text style={styles.actionIcon}>📊</Text>
                  <Text style={styles.actionText}>Voir les statistiques détaillées</Text>
                </View>
                <Text style={styles.actionArrow}>→</Text>
              </Card>
            </TouchableOpacity>

            <TouchableOpacity>
              <Card style={styles.actionCard}>
                <View style={styles.actionLeft}>
                  <Text style={styles.actionIcon}>🎓</Text>
                  <Text style={styles.actionText}>Mes tutoriels suivis</Text>
                </View>
                <Text style={styles.actionArrow}>→</Text>
              </Card>
            </TouchableOpacity>

            <TouchableOpacity>
              <Card style={styles.actionCard}>
                <View style={styles.actionLeft}>
                  <Text style={styles.actionIcon}>📱</Text>
                  <Text style={styles.actionText}>Inviter des amis</Text>
                </View>
                <Text style={styles.actionArrow}>→</Text>
              </Card>
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
  },
  content: {
    paddingHorizontal: 24,
    paddingVertical: 24,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1f2937',
  },
  settingsButton: {
    color: '#3b82f6',
    fontWeight: '500',
  },
  userCard: {
    marginBottom: 24,
  },
  userContainer: {
    alignItems: 'center',
  },
  avatar: {
    width: 80,
    height: 80,
    backgroundColor: '#dbeafe',
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  avatarText: {
    fontSize: 32,
  },
  userName: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 4,
  },
  userEmail: {
    color: '#6b7280',
    marginBottom: 16,
  },
  freeBadge: {
    backgroundColor: '#fef3c7',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#f59e0b',
  },
  freeBadgeText: {
    color: '#92400e',
    fontWeight: '500',
  },
  levelCard: {
    marginBottom: 24,
  },
  levelHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  levelTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1f2937',
  },
  levelXP: {
    fontSize: 14,
    color: '#6b7280',
  },
  levelProgress: {
    fontSize: 12,
    color: '#6b7280',
    textAlign: 'center',
    marginTop: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 16,
  },
  statsContainer: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 24,
  },
  statCard: {
    flex: 1,
    alignItems: 'center',
  },
  statIcon: {
    fontSize: 24,
    marginBottom: 8,
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1f2937',
  },
  statTitle: {
    fontSize: 14,
    color: '#6b7280',
    textAlign: 'center',
  },
  premiumCard: {
    marginBottom: 24,
    backgroundColor: '#eff6ff',
    borderWidth: 1,
    borderColor: '#93c5fd',
  },
  premiumContainer: {
    alignItems: 'center',
  },
  premiumTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 8,
  },
  premiumSubtitle: {
    color: '#6b7280',
    textAlign: 'center',
    marginBottom: 16,
  },
  premiumFeatures: {
    width: '100%',
    marginBottom: 16,
  },
  featureRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  featureCheckmark: {
    color: '#3b82f6',
    marginRight: 8,
  },
  featureText: {
    fontSize: 14,
    color: '#374151',
  },
  achievementsCard: {
    marginBottom: 24,
  },
  achievementsContainer: {
    gap: 12,
  },
  achievementRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  achievementIcon: {
    fontSize: 24,
    marginRight: 12,
  },
  achievementContent: {
    flex: 1,
  },
  achievementTitle: {
    fontWeight: '500',
    color: '#1f2937',
  },
  achievementDescription: {
    fontSize: 14,
    color: '#6b7280',
  },
  achievementDate: {
    fontSize: 12,
    color: '#6b7280',
  },
  actionsContainer: {
    gap: 12,
    marginBottom: 24,
  },
  actionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  actionLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionIcon: {
    fontSize: 20,
    marginRight: 12,
  },
  actionText: {
    fontWeight: '500',
    color: '#1f2937',
  },
  actionArrow: {
    color: '#9ca3af',
  },
});