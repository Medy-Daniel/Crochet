import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Card } from '../common/Card';

interface RowCounterProps {
  currentRow: number;
  targetRows: number;
  onIncrement: () => void;
  onDecrement: () => void;
  projectName: string;
}

export const RowCounter: React.FC<RowCounterProps> = ({
  currentRow,
  targetRows,
  onIncrement,
  onDecrement,
  projectName,
}) => {
  const progress = targetRows > 0 ? (currentRow / targetRows) * 100 : 0;
  const isCompleted = currentRow >= targetRows && targetRows > 0;

  return (
    <Card style={styles.card}>
      <View style={styles.container}>
        <Text style={styles.projectName}>
          {projectName}
        </Text>
        
        <Text style={styles.progressText}>
          {targetRows > 0 ? `${currentRow} / ${targetRows} rangs` : `${currentRow} rangs`}
        </Text>

        {targetRows > 0 && (
          <View style={styles.progressContainer}>
            <View style={styles.progressTrack}>
              <View 
                style={[
                  styles.progressBar,
                  isCompleted ? styles.completedBar : styles.primaryBar,
                  { width: `${Math.min(progress, 100)}%` }
                ]}
              />
            </View>
            <Text style={styles.progressPercentage}>
              {progress.toFixed(0)}% terminé
            </Text>
          </View>
        )}

        <View style={styles.buttonsContainer}>
          <TouchableOpacity
            onPress={onDecrement}
            disabled={currentRow <= 0}
            style={[
              styles.button,
              currentRow <= 0 ? styles.disabledButton : styles.decrementButton
            ]}
            activeOpacity={0.8}
          >
            <Text style={[
              styles.buttonText,
              currentRow <= 0 ? styles.disabledButtonText : styles.activeButtonText
            ]}>
              -
            </Text>
          </TouchableOpacity>

          <View style={styles.counterDisplay}>
            <Text style={styles.counterNumber}>
              {currentRow}
            </Text>
          </View>

          <TouchableOpacity
            onPress={onIncrement}
            style={[styles.button, styles.incrementButton]}
            activeOpacity={0.8}
          >
            <Text style={[styles.buttonText, styles.activeButtonText]}>+</Text>
          </TouchableOpacity>
        </View>

        {isCompleted && (
          <View style={styles.completedBadge}>
            <Text style={styles.completedText}>
              🎉 Projet terminé !
            </Text>
          </View>
        )}
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    marginHorizontal: 16,
    marginBottom: 24,
  },
  container: {
    alignItems: 'center',
  },
  projectName: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 8,
  },
  progressText: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 16,
  },
  progressContainer: {
    width: '100%',
    marginBottom: 24,
  },
  progressTrack: {
    height: 12,
    backgroundColor: '#e5e7eb',
    borderRadius: 9999,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    borderRadius: 9999,
  },
  primaryBar: {
    backgroundColor: '#3b82f6',
  },
  completedBar: {
    backgroundColor: '#10b981',
  },
  progressPercentage: {
    fontSize: 12,
    color: '#6b7280',
    textAlign: 'center',
    marginTop: 4,
  },
  buttonsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 32,
  },
  button: {
    width: 64,
    height: 64,
    borderRadius: 32,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  disabledButton: {
    backgroundColor: '#e5e7eb',
  },
  decrementButton: {
    backgroundColor: '#ef4444',
  },
  incrementButton: {
    backgroundColor: '#3b82f6',
  },
  buttonText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  disabledButtonText: {
    color: '#9ca3af',
  },
  activeButtonText: {
    color: '#ffffff',
  },
  counterDisplay: {
    backgroundColor: '#f9fafb',
    paddingHorizontal: 24,
    paddingVertical: 16,
    borderRadius: 16,
    minWidth: 80,
    alignItems: 'center',
  },
  counterNumber: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#1f2937',
  },
  completedBadge: {
    marginTop: 16,
    backgroundColor: '#f0fdf4',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 12,
  },
  completedText: {
    color: '#15803d',
    fontWeight: '600',
    textAlign: 'center',
  },
});