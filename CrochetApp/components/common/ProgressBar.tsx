import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface ProgressBarProps {
  current: number;
  total: number;
  color?: 'primary' | 'secondary' | 'success' | 'warning';
  size?: 'sm' | 'md' | 'lg';
  showPercentage?: boolean;
  showNumbers?: boolean;
  label?: string;
  style?: any;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  current,
  total,
  color = 'primary',
  size = 'md',
  showPercentage = true,
  showNumbers = false,
  label,
  style,
}) => {
  const progress = total > 0 ? Math.min((current / total) * 100, 100) : 0;
  const isCompleted = current >= total && total > 0;

  const getColorStyle = () => {
    if (isCompleted) return styles.completedBar;
    switch (color) {
      case 'primary': return styles.primaryBar;
      case 'secondary': return styles.secondaryBar;
      case 'success': return styles.successBar;
      case 'warning': return styles.warningBar;
      default: return styles.primaryBar;
    }
  };

  const getSizeStyle = () => {
    switch (size) {
      case 'sm': return styles.smallBar;
      case 'md': return styles.mediumBar;
      case 'lg': return styles.largeBar;
      default: return styles.mediumBar;
    }
  };

  return (
    <View style={[styles.container, style]}>
      {(label || showNumbers) && (
        <View style={styles.header}>
          {label && (
            <Text style={styles.label}>{label}</Text>
          )}
          {showNumbers && (
            <Text style={styles.numbers}>
              {current} / {total}
            </Text>
          )}
        </View>
      )}
      
      <View style={[styles.track, getSizeStyle()]}>
        <View 
          style={[
            styles.bar,
            getColorStyle(),
            { width: `${progress}%` }
          ]}
        />
      </View>
      
      {showPercentage && (
        <Text style={styles.percentage}>
          {progress.toFixed(0)}%
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    color: '#374151',
  },
  numbers: {
    fontSize: 14,
    color: '#6b7280',
  },
  track: {
    backgroundColor: '#e5e7eb',
    borderRadius: 9999,
    overflow: 'hidden',
  },
  bar: {
    height: '100%',
    borderRadius: 9999,
  },
  smallBar: {
    height: 8,
  },
  mediumBar: {
    height: 12,
  },
  largeBar: {
    height: 16,
  },
  primaryBar: {
    backgroundColor: '#3b82f6',
  },
  secondaryBar: {
    backgroundColor: '#8b5cf6',
  },
  successBar: {
    backgroundColor: '#10b981',
  },
  warningBar: {
    backgroundColor: '#f59e0b',
  },
  completedBar: {
    backgroundColor: '#10b981',
  },
  percentage: {
    fontSize: 12,
    color: '#6b7280',
    textAlign: 'center',
    marginTop: 4,
  },
});