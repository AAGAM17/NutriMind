import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { IconSymbol } from './ui/IconSymbol';

interface NutritionProgressProps {
  title: string;
  current: number;
  target: number;
  unit: string;
  color: string;
  icon: string;
  size?: 'small' | 'medium' | 'large';
}

export const NutritionProgress: React.FC<NutritionProgressProps> = ({
  title,
  current,
  target,
  unit,
  color,
  icon,
  size = 'medium',
}) => {
  const progress = Math.min((current / target) * 100, 100);
  const isCompleted = current >= target;

  const getContainerStyle = () => {
    const baseStyle = [styles.container];
    baseStyle.push(styles[size]);
    return baseStyle;
  };

  const getIconSize = () => {
    switch (size) {
      case 'small': return 16;
      case 'large': return 24;
      default: return 20;
    }
  };

  const getTitleFontSize = () => {
    switch (size) {
      case 'small': return 12;
      case 'large': return 16;
      default: return 14;
    }
  };

  const getValueFontSize = () => {
    switch (size) {
      case 'small': return 14;
      case 'large': return 20;
      default: return 16;
    }
  };

  return (
    <View style={getContainerStyle()}>
      <View style={styles.header}>
        <View style={[styles.iconContainer, { backgroundColor: color }]}>
          <IconSymbol name={icon as any} size={getIconSize()} color="#FFFFFF" />
        </View>
        <View style={styles.headerText}>
          <Text style={[styles.title, { fontSize: getTitleFontSize() }]}>{title}</Text>
          <Text style={[styles.values, { fontSize: getValueFontSize() }]}>
            {current} / {target} {unit}
          </Text>
        </View>
        <View style={styles.percentageContainer}>
          <Text style={[styles.percentage, { color: isCompleted ? '#10B981' : color }]}>
            {Math.round(progress)}%
          </Text>
        </View>
      </View>
      
      <View style={styles.progressContainer}>
        <View style={styles.progressBar}>
          <LinearGradient
            colors={isCompleted ? ['#10B981', '#059669'] : [color, color]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={[styles.progressFill, { width: `${progress}%` }]}
          />
        </View>
        
        {isCompleted && (
          <View style={styles.completedBadge}>
            <IconSymbol name="checkmark.circle.fill" size={16} color="#10B981" />
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  
  // Size variants
  small: {
    padding: 12,
  },
  medium: {
    padding: 16,
  },
  large: {
    padding: 20,
  },
  
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  headerText: {
    flex: 1,
  },
  title: {
    fontWeight: '600',
    color: '#1E293B',
    marginBottom: 2,
  },
  values: {
    color: '#64748B',
  },
  percentageContainer: {
    alignItems: 'flex-end',
  },
  percentage: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  progressBar: {
    flex: 1,
    height: 8,
    backgroundColor: '#E2E8F0',
    borderRadius: 4,
    overflow: 'hidden',
    marginRight: 8,
  },
  progressFill: {
    height: '100%',
    borderRadius: 4,
  },
  completedBadge: {
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
