import React, { useState, useEffect } from 'react';
import { View, SafeAreaView, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { RowCounter } from '../../components/counters/RowCounter';
import { Card, Button } from '../../components/common';
import { NavigationStackParams, Project } from '../../types';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';

type RowCounterScreenProps = {
  navigation: StackNavigationProp<NavigationStackParams, 'RowCounter'>;
  route: RouteProp<NavigationStackParams, 'RowCounter'>;
};

export const RowCounterScreen: React.FC<RowCounterScreenProps> = ({ 
  navigation, 
  route 
}) => {
  const { projectId } = route.params;
  
  // Mock project data - replace with actual data fetching
  const [project, setProject] = useState<Project>({
    id: projectId,
    userId: 'user1',
    name: 'Écharpe d\'hiver',
    type: 'tricot',
    targetRows: 120,
    currentRow: 45,
    notes: 'Point mousse, aiguilles 4.5mm',
    isCompleted: false,
    createdAt: new Date(),
    updatedAt: new Date(),
  });

  const [showNotes, setShowNotes] = useState(false);

  const handleIncrement = () => {
    setProject(prev => ({
      ...prev,
      currentRow: prev.currentRow + 1,
      updatedAt: new Date(),
    }));
  };

  const handleDecrement = () => {
    setProject(prev => ({
      ...prev,
      currentRow: Math.max(0, prev.currentRow - 1),
      updatedAt: new Date(),
    }));
  };

  const handleSave = () => {
    // TODO: Save project to backend
    navigation.goBack();
  };

  const handleReset = () => {
    setProject(prev => ({
      ...prev,
      currentRow: 0,
      updatedAt: new Date(),
    }));
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text style={styles.backButton}>← Retour</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>
            Compteur
          </Text>
          <TouchableOpacity onPress={handleSave}>
            <Text style={styles.saveButton}>Sauvegarder</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.counterContainer}>
          <RowCounter
            currentRow={project.currentRow}
            targetRows={project.targetRows}
            onIncrement={handleIncrement}
            onDecrement={handleDecrement}
            projectName={project.name}
          />

          {/* Actions */}
          <View style={styles.actionsContainer}>
            {project.notes && (
              <TouchableOpacity onPress={() => setShowNotes(!showNotes)}>
                <Card>
                  <View style={styles.notesHeader}>
                    <Text style={styles.notesToggle}>
                      {showNotes ? 'Masquer les notes' : 'Voir les notes'}
                    </Text>
                    <Text style={styles.notesArrow}>
                      {showNotes ? '▼' : '▶'}
                    </Text>
                  </View>
                  {showNotes && (
                    <View style={styles.notesContent}>
                      <Text style={styles.notesText}>
                        {project.notes}
                      </Text>
                    </View>
                  )}
                </Card>
              </TouchableOpacity>
            )}

            <Card>
              <View style={styles.quickActionsHeader}>
                <View style={styles.quickActionsInfo}>
                  <Text style={styles.quickActionsTitle}>
                    Actions rapides
                  </Text>
                  <Text style={styles.quickActionsTime}>
                    Dernière mise à jour: {project.updatedAt.toLocaleTimeString()}
                  </Text>
                </View>
                <View style={styles.quickActionsButtons}>
                  <TouchableOpacity
                    onPress={handleReset}
                    style={styles.resetButton}
                  >
                    <Text style={styles.resetButtonText}>Reset</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => navigation.navigate('ProjectDetail', { projectId })}
                    style={styles.detailsButton}
                  >
                    <Text style={styles.detailsButtonText}>Détails</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </Card>
          </View>
        </View>

        {/* Achievement notification */}
        {project.currentRow > 0 && project.currentRow % 10 === 0 && (
          <View style={styles.achievementNotification}>
            <Card style={styles.achievementCard}>
              <Text style={styles.achievementText}>
                🎉 Milestone atteint ! {project.currentRow} rangs complétés
              </Text>
            </Card>
          </View>
        )}
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
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 16,
    backgroundColor: '#ffffff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  backButton: {
    color: '#3b82f6',
    fontWeight: '500',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1f2937',
  },
  saveButton: {
    color: '#3b82f6',
    fontWeight: '500',
  },
  counterContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  actionsContainer: {
    paddingHorizontal: 24,
    gap: 12,
  },
  notesHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  notesToggle: {
    color: '#374151',
    fontWeight: '500',
  },
  notesArrow: {
    color: '#9ca3af',
  },
  notesContent: {
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#f3f4f6',
  },
  notesText: {
    color: '#6b7280',
    lineHeight: 22,
  },
  quickActionsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  quickActionsInfo: {
    flex: 1,
  },
  quickActionsTitle: {
    color: '#374151',
    fontWeight: '500',
    marginBottom: 4,
  },
  quickActionsTime: {
    fontSize: 14,
    color: '#6b7280',
  },
  quickActionsButtons: {
    flexDirection: 'row',
    gap: 8,
  },
  resetButton: {
    backgroundColor: '#fef2f2',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  resetButtonText: {
    color: '#dc2626',
    fontWeight: '500',
  },
  detailsButton: {
    backgroundColor: '#eff6ff',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  detailsButtonText: {
    color: '#2563eb',
    fontWeight: '500',
  },
  achievementNotification: {
    position: 'absolute',
    top: 96,
    left: 24,
    right: 24,
  },
  achievementCard: {
    backgroundColor: '#f0fdf4',
    borderWidth: 1,
    borderColor: '#bbf7d0',
  },
  achievementText: {
    color: '#15803d',
    fontWeight: '500',
    textAlign: 'center',
  },
});