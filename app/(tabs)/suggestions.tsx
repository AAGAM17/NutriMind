import { IconSymbol } from '@/components/ui/IconSymbol';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useState } from 'react';
import {
    RefreshControl,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

interface Suggestion {
  id: string;
  type: 'meal' | 'nutrition' | 'lifestyle' | 'goal';
  title: string;
  description: string;
  icon: string;
  color: string;
  priority: 'high' | 'medium' | 'low';
  actionable: boolean;
}

interface Goal {
  id: string;
  title: string;
  current: number;
  target: number;
  unit: string;
  progress: number;
  icon: string;
  color: string;
}

const mockSuggestions: Suggestion[] = [
  {
    id: '1',
    type: 'nutrition',
    title: 'Increase Protein Intake',
    description: 'You\'re averaging 75g protein daily. Try adding Greek yogurt or lean chicken to reach your 120g goal.',
    icon: 'bolt.fill',
    color: '#FF6B6B',
    priority: 'high',
    actionable: true,
  },
  {
    id: '2',
    type: 'meal',
    title: 'Pre-Workout Snack',
    description: 'Based on your workout schedule, have a banana with almond butter 30 minutes before training.',
    icon: 'figure.run',
    color: '#4ECDC4',
    priority: 'medium',
    actionable: true,
  },
  {
    id: '3',
    type: 'lifestyle',
    title: 'Hydration Reminder',
    description: 'You\'ve been drinking less water lately. Aim for 8 glasses today for better energy and metabolism.',
    icon: 'drop.fill',
    color: '#45B7D1',
    priority: 'medium',
    actionable: true,
  },
  {
    id: '4',
    type: 'goal',
    title: 'Weekly Progress Update',
    description: 'Great job! You\'ve hit 85% of your weekly nutrition goals. Keep up the momentum!',
    icon: 'chart.line.uptrend.xyaxis',
    color: '#10B981',
    priority: 'low',
    actionable: false,
  },
];

const mockGoals: Goal[] = [
  {
    id: '1',
    title: 'Daily Protein',
    current: 75,
    target: 120,
    unit: 'g',
    progress: 62.5,
    icon: 'bolt.fill',
    color: '#FF6B6B',
  },
  {
    id: '2',
    title: 'Water Intake',
    current: 6,
    target: 8,
    unit: 'glasses',
    progress: 75,
    icon: 'drop.fill',
    color: '#45B7D1',
  },
  {
    id: '3',
    title: 'Weekly Workouts',
    current: 3,
    target: 5,
    unit: 'sessions',
    progress: 60,
    icon: 'figure.run',
    color: '#4ECDC4',
  },
  {
    id: '4',
    title: 'Calories',
    current: 1850,
    target: 2000,
    unit: 'kcal',
    progress: 92.5,
    icon: 'flame.fill',
    color: '#FFA726',
  },
];

export default function SuggestionsScreen() {
  const [refreshing, setRefreshing] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'meal' | 'nutrition' | 'lifestyle' | 'goal'>('all');

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  const filteredSuggestions = selectedCategory === 'all' 
    ? mockSuggestions 
    : mockSuggestions.filter(s => s.type === selectedCategory);

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return '#EF4444';
      case 'medium': return '#F59E0B';
      case 'low': return '#10B981';
      default: return '#64748B';
    }
  };

  const renderGoalCard = (goal: Goal) => (
    <View key={goal.id} style={styles.goalCard}>
      <View style={styles.goalHeader}>
        <View style={[styles.goalIcon, { backgroundColor: goal.color }]}>
          <IconSymbol name={goal.icon as any} size={20} color="#FFFFFF" />
        </View>
        <View style={styles.goalInfo}>
          <Text style={styles.goalTitle}>{goal.title}</Text>
          <Text style={styles.goalProgress}>
            {goal.current} / {goal.target} {goal.unit}
          </Text>
        </View>
        <Text style={styles.goalPercentage}>{goal.progress}%</Text>
      </View>
      <View style={styles.progressBar}>
        <View 
          style={[
            styles.progressFill, 
            { width: `${goal.progress}%`, backgroundColor: goal.color }
          ]} 
        />
      </View>
    </View>
  );

  const renderSuggestion = (suggestion: Suggestion) => (
    <View key={suggestion.id} style={styles.suggestionCard}>
      <View style={styles.suggestionHeader}>
        <View style={[styles.suggestionIcon, { backgroundColor: suggestion.color }]}>
          <IconSymbol name={suggestion.icon as any} size={24} color="#FFFFFF" />
        </View>
        <View style={styles.suggestionInfo}>
          <View style={styles.suggestionTitleRow}>
            <Text style={styles.suggestionTitle}>{suggestion.title}</Text>
            <View style={[styles.priorityBadge, { backgroundColor: getPriorityColor(suggestion.priority) }]}>
              <Text style={styles.priorityText}>{suggestion.priority}</Text>
            </View>
          </View>
          <Text style={styles.suggestionDescription}>{suggestion.description}</Text>
        </View>
      </View>
      {suggestion.actionable && (
        <TouchableOpacity style={styles.actionButton}>
          <Text style={styles.actionButtonText}>Take Action</Text>
          <IconSymbol name="arrow.right" size={16} color="#FF6B6B" />
        </TouchableOpacity>
      )}
    </View>
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      
      {/* Header */}
      <LinearGradient
        colors={['#FF6B6B', '#4ECDC4']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.header}
      >
        <Text style={styles.headerTitle}>AI Nutrition Coach</Text>
        <Text style={styles.headerSubtitle}>Personalized insights for your goals</Text>
      </LinearGradient>

      <ScrollView
        style={styles.content}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        showsVerticalScrollIndicator={false}
      >
        {/* Goals Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Today&apos;s Goals</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View style={styles.goalsContainer}>
              {mockGoals.map(renderGoalCard)}
            </View>
          </ScrollView>
        </View>

        {/* Filter Categories */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Smart Suggestions</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View style={styles.filterContainer}>
              {[
                { key: 'all', label: 'All', icon: 'sparkles' },
                { key: 'meal', label: 'Meals', icon: 'fork.knife' },
                { key: 'nutrition', label: 'Nutrition', icon: 'bolt.fill' },
                { key: 'lifestyle', label: 'Lifestyle', icon: 'heart.fill' },
                { key: 'goal', label: 'Goals', icon: 'target' },
              ].map((category) => (
                <TouchableOpacity
                  key={category.key}
                  style={[
                    styles.filterButton,
                    selectedCategory === category.key && styles.filterButtonActive,
                  ]}
                  onPress={() => setSelectedCategory(category.key as any)}
                >
                  <IconSymbol
                    name={category.icon as any}
                    size={16}
                    color={selectedCategory === category.key ? '#FFFFFF' : '#64748B'}
                  />
                  <Text
                    style={[
                      styles.filterButtonText,
                      selectedCategory === category.key && styles.filterButtonTextActive,
                    ]}
                  >
                    {category.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>
        </View>

        {/* Suggestions */}
        <View style={styles.section}>
          {filteredSuggestions.map(renderSuggestion)}
        </View>

        {/* AI Insights */}
        <View style={styles.section}>
          <View style={styles.insightsCard}>
            <LinearGradient
              colors={['#6366F1', '#8B5CF6']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.insightsGradient}
            >
              <IconSymbol name="brain" size={30} color="#FFFFFF" />
              <Text style={styles.insightsTitle}>AI Insights</Text>
              <Text style={styles.insightsDescription}>
                Based on your recent meals and activity, your nutrition consistency has improved by 23% this week. Keep focusing on protein timing for better results!
              </Text>
              <TouchableOpacity style={styles.insightsButton}>
                <Text style={styles.insightsButtonText}>View Detailed Report</Text>
              </TouchableOpacity>
            </LinearGradient>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  header: {
    paddingTop: 60,
    paddingBottom: 30,
    paddingHorizontal: 20,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 5,
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#FFFFFF',
    opacity: 0.9,
  },
  content: {
    flex: 1,
  },
  section: {
    marginBottom: 25,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1E293B',
    marginBottom: 15,
    marginHorizontal: 20,
  },
  goalsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    gap: 15,
  },
  goalCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    padding: 20,
    width: 200,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  goalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  goalIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  goalInfo: {
    flex: 1,
  },
  goalTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1E293B',
  },
  goalProgress: {
    fontSize: 12,
    color: '#64748B',
    marginTop: 2,
  },
  goalPercentage: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1E293B',
  },
  progressBar: {
    height: 6,
    backgroundColor: '#E2E8F0',
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 3,
  },
  filterContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    gap: 10,
  },
  filterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  filterButtonActive: {
    backgroundColor: '#FF6B6B',
    borderColor: '#FF6B6B',
  },
  filterButtonText: {
    fontSize: 14,
    color: '#64748B',
    marginLeft: 6,
  },
  filterButtonTextActive: {
    color: '#FFFFFF',
  },
  suggestionCard: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 20,
    marginBottom: 15,
    borderRadius: 15,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  suggestionHeader: {
    flexDirection: 'row',
    marginBottom: 15,
  },
  suggestionIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  suggestionInfo: {
    flex: 1,
  },
  suggestionTitleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  suggestionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1E293B',
    flex: 1,
  },
  priorityBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 10,
    marginLeft: 10,
  },
  priorityText: {
    fontSize: 10,
    color: '#FFFFFF',
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  suggestionDescription: {
    fontSize: 14,
    color: '#64748B',
    lineHeight: 20,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    paddingHorizontal: 15,
    paddingVertical: 8,
    backgroundColor: '#FEF2F2',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#FECACA',
  },
  actionButtonText: {
    fontSize: 14,
    color: '#FF6B6B',
    fontWeight: '600',
    marginRight: 5,
  },
  insightsCard: {
    marginHorizontal: 20,
    borderRadius: 20,
    overflow: 'hidden',
  },
  insightsGradient: {
    padding: 25,
    alignItems: 'center',
  },
  insightsTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginTop: 10,
    marginBottom: 10,
  },
  insightsDescription: {
    fontSize: 14,
    color: '#FFFFFF',
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 20,
    opacity: 0.9,
  },
  insightsButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  insightsButtonText: {
    fontSize: 14,
    color: '#FFFFFF',
    fontWeight: '600',
  },
});
