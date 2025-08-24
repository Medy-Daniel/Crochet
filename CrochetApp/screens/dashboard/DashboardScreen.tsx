import React from 'react';
import { View, Text, SafeAreaView, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { Button, Card, ProgressBar } from '../../components/common';
import { NavigationStackParams, Project } from '../../types';
import { StackNavigationProp } from '@react-navigation/stack';

type DashboardScreenProps = {
  navigation: StackNavigationProp<NavigationStackParams, 'Dashboard'>;
};

const mockProjects: Project[] = [
  {
    id: '1',
    userId: 'user1',
    name: 'Écharpe d\'hiver',
    type: 'tricot',
    targetRows: 120,
    currentRow: 45,
    isCompleted: false,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '2',
    userId: 'user1',
    name: 'Amigurumi Chat',
    type: 'crochet',
    targetRows: 80,
    currentRow: 80,
    isCompleted: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

export const DashboardScreen: React.FC<DashboardScreenProps> = ({ navigation }) => {
  const activeProjects = mockProjects.filter(p => !p.isCompleted);
  const completedProjects = mockProjects.filter(p => p.isCompleted);

  const ProjectCard: React.FC<{ project: Project }> = ({ project }) => (
    <TouchableOpacity
      onPress={() => navigation.navigate('ProjectDetail', { projectId: project.id })}
      style={styles.projectCardContainer}
    >
      <Card>
        <View style={styles.projectCardHeader}>
          <View style={styles.projectCardInfo}>
            <Text style={styles.projectTitle}>
              {project.name}
            </Text>
            <Text style={styles.projectSubtitle}>
              {project.type} • {project.isCompleted ? 'Terminé' : 'En cours'}
            </Text>
          </View>
          <Text style={styles.projectEmoji}>{project.type === 'crochet' ? '🧶' : '🧣'}</Text>
        </View>

        {project.targetRows > 0 && (
          <ProgressBar
            current={project.currentRow}
            total={project.targetRows}
            showNumbers
            size="sm"
          />
        )}

        {project.isCompleted && (
          <View style={styles.completedBadge}>
            <Text style={styles.completedText}>
              ✅ Projet terminé !
            </Text>
          </View>
        )}
      </Card>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          <View style={styles.header}>
            <View>
              <Text style={styles.welcomeTitle}>
                Bonjour ! 👋
              </Text>
              <Text style={styles.welcomeSubtitle}>
                Continuons vos projets créatifs
              </Text>
            </View>
            <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
              <View style={styles.profileButton}>
                <Text style={styles.profileEmoji}>👤</Text>
              </View>
            </TouchableOpacity>
          </View>

          <Card style={styles.statsCard}>
            <View style={styles.statsContainer}>
              <View>
                <Text style={styles.statsTitle}>
                  Statistiques du jour
                </Text>
                <Text style={styles.statsSubtitle}>
                  5 rangs complétés • +25 XP
                </Text>
              </View>
              <View style={styles.statsNumberContainer}>
                <Text style={styles.statsNumber}>5</Text>
                <Text style={styles.statsUnit}>rangs</Text>
              </View>
            </View>
          </Card>

          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>
              Projets actifs
            </Text>
            <TouchableOpacity>
              <Text style={styles.newProjectText}>+ Nouveau</Text>
            </TouchableOpacity>
          </View>

          {activeProjects.length > 0 ? (
            <>
              {activeProjects.map(project => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </>
          ) : (
            <Card style={styles.emptyStateCard}>
              <View style={styles.emptyStateContainer}>
                <Text style={styles.emptyStateEmoji}>🧶</Text>
                <Text style={styles.emptyStateTitle}>
                  Aucun projet actif
                </Text>
                <Text style={styles.emptyStateSubtitle}>
                  Commencez votre premier projet de crochet ou tricot
                </Text>
                <Button
                  title="Créer un projet"
                  onPress={() => {}}
                  size="md"
                />
              </View>
            </Card>
          )}

          {completedProjects.length > 0 && (
            <>
              <Text style={styles.completedSectionTitle}>
                Projets terminés
              </Text>
              {completedProjects.map(project => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </>
          )}

          <Card style={styles.tutorialsCard}>
            <View style={styles.tutorialsContainer}>
              <Text style={styles.tutorialsTitle}>
                Découvrir les tutoriels
              </Text>
              <Text style={styles.tutorialsSubtitle}>
                Apprenez de nouvelles techniques avec nos guides
              </Text>
              <Button
                title="Explorer"
                onPress={() => navigation.navigate('TutorialList')}
                variant="outline"
              />
            </View>
          </Card>
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
  welcomeTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1f2937',
  },
  welcomeSubtitle: {
    color: '#6b7280',
  },
  profileButton: {
    width: 48,
    height: 48,
    backgroundColor: '#dbeafe',
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileEmoji: {
    fontSize: 20,
  },
  statsCard: {
    marginBottom: 24,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  statsTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 4,
  },
  statsSubtitle: {
    fontSize: 14,
    color: '#6b7280',
  },
  statsNumberContainer: {
    alignItems: 'center',
  },
  statsNumber: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#3b82f6',
  },
  statsUnit: {
    fontSize: 12,
    color: '#6b7280',
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1f2937',
  },
  newProjectText: {
    color: '#3b82f6',
    fontWeight: '500',
  },
  projectCardContainer: {
    marginBottom: 16,
  },
  projectCardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  projectCardInfo: {
    flex: 1,
  },
  projectTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1f2937',
  },
  projectSubtitle: {
    fontSize: 14,
    color: '#6b7280',
    textTransform: 'capitalize',
  },
  projectEmoji: {
    fontSize: 24,
  },
  completedBadge: {
    marginTop: 12,
    backgroundColor: '#f0fdf4',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
  },
  completedText: {
    color: '#15803d',
    fontWeight: '500',
    textAlign: 'center',
  },
  emptyStateCard: {
    marginBottom: 24,
  },
  emptyStateContainer: {
    alignItems: 'center',
    paddingVertical: 24,
  },
  emptyStateEmoji: {
    fontSize: 64,
    marginBottom: 16,
  },
  emptyStateTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 8,
  },
  emptyStateSubtitle: {
    color: '#6b7280',
    textAlign: 'center',
    marginBottom: 16,
  },
  completedSectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 16,
  },
  tutorialsCard: {
    marginBottom: 24,
  },
  tutorialsContainer: {
    alignItems: 'center',
    paddingVertical: 16,
  },
  tutorialsTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 8,
  },
  tutorialsSubtitle: {
    color: '#6b7280',
    textAlign: 'center',
    marginBottom: 16,
  },
});