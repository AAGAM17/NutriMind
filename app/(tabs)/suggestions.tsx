<<<<<<< HEAD
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  RefreshControl,
=======
import { IconSymbol } from '@/components/ui/IconSymbol';
import { Picker } from '@react-native-picker/picker';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useCallback, useState } from 'react';
import {
  Animated,
  Easing,
  Linking,
  RefreshControl,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
>>>>>>> 2ebba678bb6268b40f02fa64271ff57b97a8a8c1
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { IconSymbol } from '@/components/ui/IconSymbol';

// Mock data here ...
// Keep your mockGoals and mockSuggestions here (unchanged for brevity)

// Main component
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
  }]

// NutriRoll templates and values
const nutriTemplates = [
  "🍎 Eat a {food_type}",
  "💧 Drink {amount} of water",
  "🧘 Take {duration} minutes to {relax_activity}",
  "🚶 Do {steps} steps right now",
  "📝 Write down {mental_tip}",
  "🤸‍♂️ Do {exercise_count} {exercise}",
  "😌 Take a break and {self_care}",
  "🥣 Add a {nutrient_type} to your next meal",
  "🦶 Try a {mobility_move}",
  "📵 Unplug for {unplug_time} minutes",
  "🌞 Get some sunlight for {duration} minutes",
  "🧂 Use less salt in your next meal",
  "🍵 Have a cup of {healthy_drink}",
  "🧑‍🍳 Cook a meal with {ingredient}",
];
const nutriValues = {
  food_type: ["fruit", "veggie", "handful of nuts", "healthy snack", "whole grain"],
  amount: ["a glass", "half a bottle", "250ml", "a big gulp", "a full bottle"],
  duration: ["1", "2", "3", "5", "10", "15"],
  relax_activity: ["breathe deeply", "stretch", "meditate", "close your eyes", "listen to music"],
  steps: ["10", "15", "20", "30", "50", "100"],
  mental_tip: ["something you're grateful for", "today’s top goal", "a positive thought", "a recent win"],
  exercise_count: ["5", "10", "12", "15", "20"],
  exercise: ["squats", "push-ups", "jumping jacks", "arm circles", "lunges"],
  self_care: ["wash your face", "step outside", "drink tea", "hug yourself", "smile at yourself in the mirror"],
  nutrient_type: ["protein", "fiber", "healthy fat", "colorful vegetable", "vitamin-rich food"],
  mobility_move: ["ankle circles", "hip openers", "neck rolls", "wrist stretches"],
  unplug_time: ["2", "5", "10", "15"],
  healthy_drink: ["green tea", "herbal tea", "lemon water", "warm water"],
  ingredient: ["spinach", "chickpeas", "avocado", "berries", "sweet potato"],
};

function getRandomFromArray<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function generateNutriTask() {
  let template = getRandomFromArray(nutriTemplates);
  return template.replace(/\{(.*?)\}/g, (_, key: string) => {
    if (key in nutriValues) {
      return getRandomFromArray(nutriValues[key as keyof typeof nutriValues]);
    }
    return key;
  });
}

export default function SuggestionsScreen() {
  const [refreshing, setRefreshing] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'meal' | 'nutrition' | 'lifestyle' | 'goal'>('all');

  const [age, setAge] = useState('');
  const [ageFocused, setAgeFocused] = useState(false);
  const [gender, setGender] = useState('');
  const [genderFocused, setGenderFocused] = useState(false);
  const [diet, setDiet] = useState('');
  const [dietFocused, setDietFocused] = useState(false);
  const [goal, setGoal] = useState('');
  const [goalFocused, setGoalFocused] = useState(false);
  const [meals, setMeals] = useState<any[]>([]);
  const [loadingMeals, setLoadingMeals] = useState(false);
  const [medicalConditions, setMedicalConditions] = useState('');
  const [nutriTask, setNutriTask] = useState(generateNutriTask());
  const diceAnim = useState(new Animated.Value(0))[0];
  const [rolling, setRolling] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  const rollDice = () => {
    if (rolling) return;
    setRolling(true);
    Animated.sequence([
      Animated.timing(diceAnim, {
        toValue: 1,
        duration: 700,
        easing: Easing.bounce,
        useNativeDriver: true,
      }),
      Animated.timing(diceAnim, {
        toValue: 0,
        duration: 0,
        useNativeDriver: true,
      }),
    ]).start(() => {
      setNutriTask(generateNutriTask());
      setRolling(false);
    });
  };

  const fetchMealPlan = async () => {
    if (!age || !gender || !goal) return;

    setLoadingMeals(true);

    let targetCalories = 2000;
    if (goal === 'gain') targetCalories = 2500;
    if (goal === 'loss') targetCalories = 1600;

    try {
      const res = await fetch(
        `https://api.spoonacular.com/mealplanner/generate?timeFrame=day&targetCalories=${targetCalories}&diet=${diet}${medicalConditions ? `&exclude=${encodeURIComponent(medicalConditions)}` : ''}&apiKey=YOUR_SPOONACULAR_API_KEY_HERE`,
        {
          headers: { 'Content-Type': 'application/json' },
        }
      );

      const data = await res.json();
      setMeals(data.meals || []);
    } catch (error) {
      console.error('Meal fetch failed', error);
    }

    setLoadingMeals(false);
  };

  const filteredSuggestions = selectedCategory === 'all'
    ? mockSuggestions
    : mockSuggestions.filter((s) => s.type === selectedCategory);

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
            { width: `${goal.progress}%`, backgroundColor: goal.color },
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
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        showsVerticalScrollIndicator={false}
      >
        {/* NutriRoll */}
        <View style={styles.section}>
          <View style={styles.nutriRollCard}>
            <LinearGradient
              colors={['#FDE68A', '#FCA5A5', '#6EE7B7']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.nutriRollGradient}
            >
              <Text style={styles.nutriRollTitle}>NutriRoll: Roll the Dice for a Healthy Task!</Text>
              <Animated.View
                style={{
                  marginVertical: 20,
                  alignItems: 'center',
                  transform: [
                    {
                      rotate: diceAnim.interpolate({
                        inputRange: [0, 1],
                        outputRange: ['0deg', '720deg'],
                      }),
                    },
                  ],
                }}
              >
                <TouchableOpacity
                  onPress={rollDice}
                  activeOpacity={0.7}
                  style={styles.diceButton}
                  disabled={rolling}
                >
                  <Text style={styles.diceEmoji}>🎲</Text>
                </TouchableOpacity>
              </Animated.View>
              <Text style={styles.nutriTaskText}>{nutriTask}</Text>
              <Text style={styles.nutriRollHint}>Tap the dice to get a new healthy challenge!</Text>
            </LinearGradient>
          </View>
        </View>
        {/* Goals */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Today's Goals</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View style={styles.goalsContainer}>{mockGoals.map(renderGoalCard)}</View>
          </ScrollView>
        </View>

        {/* Filters */}
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
        <View style={styles.section}>{filteredSuggestions.map(renderSuggestion)}</View>

        {/* Meal Plan Form */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Personalized Meal Plan</Text>
          <View style={{ paddingHorizontal: 20 }}>
            <Text>Age</Text>
            <TextInput
              style={[
                styles.input,
                ageFocused && styles.inputFocused,
              ]}
              value={age}
              onChangeText={setAge}
              keyboardType="numeric"
              placeholder="Enter your age"
              onFocus={() => setAgeFocused(true)}
              onBlur={() => setAgeFocused(false)}
            />

            <Text>Gender</Text>
            <TouchableOpacity
              activeOpacity={1}
              onPressIn={() => setGenderFocused(true)}
              onPressOut={() => setGenderFocused(false)}
              style={[styles.input, genderFocused && styles.inputFocused]}
            >
              <Picker
                selectedValue={gender}
                onValueChange={setGender}
                style={{ backgroundColor: 'transparent' }}
                dropdownIconColor="#6366F1"
              >
                <Picker.Item label="Select gender" value="" />
                <Picker.Item label="Male" value="male" />
                <Picker.Item label="Female" value="female" />
              </Picker>
            </TouchableOpacity>

            <Text>Dietary Preference</Text>
            <TouchableOpacity
              activeOpacity={1}
              onPressIn={() => setDietFocused(true)}
              onPressOut={() => setDietFocused(false)}
              style={[styles.input, dietFocused && styles.inputFocused]}
            >
              <Picker
                selectedValue={diet}
                onValueChange={setDiet}
                style={{ backgroundColor: 'transparent' }}
                dropdownIconColor="#6366F1"
              >
                <Picker.Item label="None" value="" />
                <Picker.Item label="Vegetarian" value="vegetarian" />
                <Picker.Item label="Vegan" value="vegan" />
                <Picker.Item label="Paleo" value="paleo" />
                <Picker.Item label="Ketogenic" value="ketogenic" />
              </Picker>
            </TouchableOpacity>

            <Text>Fitness Goal</Text>
            <TouchableOpacity
              activeOpacity={1}
              onPressIn={() => setGoalFocused(true)}
              onPressOut={() => setGoalFocused(false)}
              style={[styles.input, goalFocused && styles.inputFocused]}
            >
              <Picker
                selectedValue={goal}
                onValueChange={setGoal}
                style={{ backgroundColor: 'transparent' }}
                dropdownIconColor="#6366F1"
              >
                <Picker.Item label="Select goal" value="" />
                <Picker.Item label="Muscle Gain" value="gain" />
                <Picker.Item label="Fat Loss" value="loss" />
                <Picker.Item label="Maintenance" value="maintain" />
                <Picker.Item label="Endurance" value="endurance" />
                <Picker.Item label="Flexibility" value="flexibility" />
                <Picker.Item label="General Health" value="health" />
                <Picker.Item label="Sports Performance" value="sports" />
                <Picker.Item label="Stress Reduction" value="stress" />
                <Picker.Item label="Improve Sleep" value="sleep" />
                <Picker.Item label="Increase Energy" value="energy" />
                <Picker.Item label="Weight Gain" value="weight_gain" />
                <Picker.Item label="Tone Up" value="tone" />
                <Picker.Item label="Improve Mobility" value="mobility" />
              </Picker>
            </TouchableOpacity>

            <Text style={{ marginTop: 16 }}>Medical Conditions (optional)</Text>
            <TextInput
              style={styles.input}
              value={medicalConditions}
              onChangeText={setMedicalConditions}
              placeholder="e.g. diabetes, gluten intolerance, nut allergy"
              autoCapitalize="none"
              autoCorrect={false}
            />

            <TouchableOpacity
              style={[styles.actionButton, { marginTop: 10 }]}
              onPress={fetchMealPlan}
              disabled={loadingMeals}
            >
              <Text style={styles.actionButtonText}>
                {loadingMeals ? 'Generating...' : 'Get Meal Plan'}
              </Text>
            </TouchableOpacity>
          </View>

          {/* Meal Results */}
          {meals.length > 0 && (
            <View style={{ marginTop: 20 }}>
              {meals.map((meal) => (
                <View key={meal.id} style={styles.suggestionCard}>
                  <Text style={styles.suggestionTitle}>{meal.title}</Text>
                  <Text style={styles.suggestionDescription}>
                    Ready in {meal.readyInMinutes} mins | Servings: {meal.servings}
                  </Text>
                  <TouchableOpacity
                    onPress={() => Linking.openURL(meal.sourceUrl)}
                    style={[styles.actionButton, { marginTop: 10 }]}
                  >
                    <Text style={styles.actionButtonText}>View Recipe</Text>
                  </TouchableOpacity>
                </View>
              ))}
            </View>
          )}
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
                Based on your recent meals and activity, your nutrition consistency has improved by 23% this week.
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

// 👇 Your styles stay unchanged


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
  input: {
    borderRadius: 18,
    paddingHorizontal: 18,
    paddingVertical: 14,
    fontSize: 16,
    backgroundColor: 'rgba(255,255,255,0.95)',
    borderWidth: 1.5,
    borderColor: '#E2E8F0',
    shadowColor: '#6366F1',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.10,
    shadowRadius: 10,
    elevation: 4,
    marginVertical: 12,
    color: '#1E293B',
    transitionProperty: 'border-color, box-shadow',
    transitionDuration: '0.2s',
  },
  inputFocused: {
    borderColor: '#6366F1',
    shadowColor: '#6366F1',
    shadowOpacity: 0.25,
    shadowRadius: 16,
    elevation: 8,
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
  nutriRollCard: {
    marginHorizontal: 20,
    marginTop: 20,
    borderRadius: 22,
    overflow: 'hidden',
    marginBottom: 10,
    shadowColor: '#F59E0B',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.18,
    shadowRadius: 12,
    elevation: 6,
  },
  nutriRollGradient: {
    padding: 28,
    alignItems: 'center',
  },
  nutriRollTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1E293B',
    marginBottom: 10,
    textAlign: 'center',
    letterSpacing: 0.5,
  },
  diceButton: {
    backgroundColor: '#FFFDEB',
    borderRadius: 40,
    width: 64,
    height: 64,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#F59E0B',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 4,
    marginBottom: 10,
  },
  diceEmoji: {
    fontSize: 38,
  },
  nutriTaskText: {
    fontSize: 18,
    color: '#1E293B',
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 8,
    marginHorizontal: 10,
  },
  nutriRollHint: {
    fontSize: 13,
    color: '#64748B',
    opacity: 0.8,
    marginTop: 6,
    textAlign: 'center',
  },
});
