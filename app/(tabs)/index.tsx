import { CustomButton } from '@/components/CustomButton';
import { HelloWave } from '@/components/HelloWave';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Image,
  RefreshControl,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { fetchMeals } from '../../lib/supabase';

export default function FeedScreen() {
  const [refreshing, setRefreshing] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [meals, setMeals] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const loadMeals = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchMeals();
      console.log('Fetched meals:', data);
      setMeals(data || []);
    } catch (e: any) {
      setError(e.message || 'Failed to load meals');
      setMeals([]);
      console.error('Error fetching meals:', e);
    } finally {
      setLoading(false);
      console.log('Loading set to false');
    }
  };

  useEffect(() => {
    loadMeals();
  }, []);

  useEffect(() => {
    console.log('Meals data:', meals);
  }, [meals]);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    loadMeals().finally(() => setRefreshing(false));
  }, []);

  const renderNutritionBadge = (label: string, value: number, unit: string, color: string) => (
    <View style={[styles.nutritionBadge, { backgroundColor: color }]}> 
      <Text style={styles.nutritionValue}>{value}{unit}</Text>
      <Text style={styles.nutritionLabel}>{label}</Text>
    </View>
  );

  const renderPost = (post: any) => (
    <View key={post.id} style={styles.postContainer}>
      {/* User Header */}
      <View style={styles.userHeader}>
        <Image source={{ uri: post.users?.avatar_url || '' }} style={styles.avatar} />
        <View style={styles.userInfo}>
          <View style={styles.userNameRow}>
            <Text style={styles.userName}>{post.users?.name || 'Unknown'}</Text>
          </View>
          <Text style={styles.timeAgo}>{post.created_at ? new Date(post.created_at).toLocaleString() : ''}</Text>
        </View>
        <TouchableOpacity style={styles.moreButton}>
          <IconSymbol name="ellipsis" size={20} color="#64748B" />
        </TouchableOpacity>
      </View>

      {/* Meal Image */}
      <Image source={{ uri: post.image_url || '' }} style={styles.mealImage} />

      {/* Nutrition Info */}
      <View style={styles.nutritionContainer}>
        {renderNutritionBadge('Protein', post.protein, 'g', '#FF6B6B')}
        {renderNutritionBadge('Fat', post.fat, 'g', '#4ECDC4')}
        {renderNutritionBadge('Carbs', post.carbs, 'g', '#45B7D1')}
        {renderNutritionBadge('Calories', post.calories, '', '#FFA726')}
      </View>

      {/* Post Actions */}
      <View style={styles.postActions}>
        <TouchableOpacity style={styles.actionButton}>
          <IconSymbol name="heart" size={24} color="#FF6B6B" />
          <Text style={styles.actionText}>0</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          <IconSymbol name="message" size={24} color="#64748B" />
          <Text style={styles.actionText}>0</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          <IconSymbol name="paperplane" size={24} color="#64748B" />
        </TouchableOpacity>
        <TouchableOpacity style={[styles.actionButton, styles.saveButton]}>
          <IconSymbol name="bookmark" size={24} color="#64748B" />
        </TouchableOpacity>
      </View>

      {/* Post Description */}
      <Text style={styles.postDescription}>{post.description}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      {/* Header */}
      <LinearGradient
        colors={['#FF6B6B', '#4ECDC4']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.header}
      >
        <Text style={styles.appName}>NutriMindd</Text>
        <TouchableOpacity style={styles.notificationButton}>
          <IconSymbol name="bell" size={24} color="#FFFFFF" />
        </TouchableOpacity>
      </LinearGradient>
      {/* Animated Hello Wave Greeting */}
      <HelloWave />
      {/* Login / Sign Up Button */}
      <View style={{ marginHorizontal: 16, marginTop: 16 }}>
        <CustomButton
          title="Login / Sign Up"
          onPress={() => router.push('./signin')}
          icon="person.fill"
          size="large"
        />
      </View>
      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <IconSymbol name="magnifyingglass" size={20} color="#64748B" />
        <TextInput
          style={styles.searchInput}
          placeholder="Search for meals, users, or tags..."
          placeholderTextColor="#94A3B8"
          value={searchText}
          onChangeText={setSearchText}
        />
      </View>
      {/* Feed */}
      {error && (
        <Text style={{ color: 'red', textAlign: 'center', marginTop: 32 }}>{error}</Text>
      )}
      {loading && !error ? (
        <ActivityIndicator size="large" color="#FF6B6B" style={{ marginTop: 32 }} />
      ) : !error && meals.length === 0 ? (
        <Text style={{ textAlign: 'center', marginTop: 32 }}>No meals found.</Text>
      ) : !error && (
        <ScrollView
          style={styles.feed}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          showsVerticalScrollIndicator={false}
        >
          {meals.map(renderPost)}
        </ScrollView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 60,
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  appName: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  notificationButton: {
    padding: 8,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    margin: 16,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 25,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  searchInput: {
    flex: 1,
    marginLeft: 12,
    fontSize: 16,
    color: '#1E293B',
  },
  feed: {
    flex: 1,
  },
  postContainer: {
    backgroundColor: '#FFFFFF',
    marginBottom: 16,
    paddingBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  userHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  userInfo: {
    flex: 1,
  },
  userNameRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  userName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1E293B',
    marginRight: 4,
  },
  timeAgo: {
    fontSize: 12,
    color: '#64748B',
    marginTop: 2,
  },
  moreButton: {
    padding: 8,
  },
  mealImage: {
    width: '100%',
    height: 300,
    resizeMode: 'cover',
  },
  nutritionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 16,
  },
  nutritionBadge: {
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 20,
    minWidth: 70,
  },
  nutritionValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  nutritionLabel: {
    fontSize: 12,
    color: '#FFFFFF',
    marginTop: 2,
  },
  postActions: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingBottom: 12,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
  },
  actionText: {
    fontSize: 14,
    color: '#64748B',
    marginLeft: 4,
  },
  saveButton: {
    marginLeft: 'auto',
    marginRight: 0,
  },
  postDescription: {
    fontSize: 14,
    color: '#334155',
    paddingHorizontal: 16,
    lineHeight: 20,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 16,
    paddingTop: 8,
  },
  tag: {
    fontSize: 12,
    color: '#3B82F6',
    marginRight: 8,
    marginBottom: 4,
  },
});
