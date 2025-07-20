import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  TextInput,
  StatusBar,
  RefreshControl,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { IconSymbol } from '@/components/ui/IconSymbol';

interface MealPost {
  id: string;
  user: {
    name: string;
    avatar: string;
    isVerified: boolean;
  };
  image: string;
  description: string;
  nutrition: {
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
  };
  likes: number;
  comments: number;
  timeAgo: string;
  tags: string[];
}

const mockPosts: MealPost[] = [
  {
    id: '1',
    user: {
      name: 'Chef Ernesto Gray',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
      isVerified: true,
    },
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=300&fit=crop',
    description: 'Classic Grilled Chicken Quinoa Bowl With Asparagus 🔥 Perfect post-workout meal!',
    nutrition: {
      calories: 551,
      protein: 45,
      carbs: 32,
      fat: 18,
    },
    likes: 234,
    comments: 18,
    timeAgo: '2h',
    tags: ['#HealthyEating', '#PostWorkout', '#HighProtein'],
  },
  {
    id: '2',
    user: {
      name: 'Sarah Johnson',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b88ce0c6?w=100&h=100&fit=crop&crop=face',
      isVerified: false,
    },
    image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=300&fit=crop',
    description: 'Avocado toast with perfectly poached egg 🥑✨ Started my morning right!',
    nutrition: {
      calories: 420,
      protein: 16,
      carbs: 28,
      fat: 24,
    },
    likes: 156,
    comments: 12,
    timeAgo: '4h',
    tags: ['#Breakfast', '#Avocado', '#Healthy'],
  },
];

export default function FeedScreen() {
  const [refreshing, setRefreshing] = useState(false);
  const [searchText, setSearchText] = useState('');

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  const renderNutritionBadge = (label: string, value: number, unit: string, color: string) => (
    <View style={[styles.nutritionBadge, { backgroundColor: color }]}>
      <Text style={styles.nutritionValue}>{value}{unit}</Text>
      <Text style={styles.nutritionLabel}>{label}</Text>
    </View>
  );

  const renderPost = (post: MealPost) => (
    <View key={post.id} style={styles.postContainer}>
      {/* User Header */}
      <View style={styles.userHeader}>
        <Image source={{ uri: post.user.avatar }} style={styles.avatar} />
        <View style={styles.userInfo}>
          <View style={styles.userNameRow}>
            <Text style={styles.userName}>{post.user.name}</Text>
            {post.user.isVerified && (
              <IconSymbol name="checkmark.seal.fill" size={16} color="#3B82F6" />
            )}
          </View>
          <Text style={styles.timeAgo}>{post.timeAgo}</Text>
        </View>
        <TouchableOpacity style={styles.moreButton}>
          <IconSymbol name="ellipsis" size={20} color="#64748B" />
        </TouchableOpacity>
      </View>

      {/* Meal Image */}
      <Image source={{ uri: post.image }} style={styles.mealImage} />

      {/* Nutrition Info */}
      <View style={styles.nutritionContainer}>
        {renderNutritionBadge('Protein', post.nutrition.protein, 'g', '#FF6B6B')}
        {renderNutritionBadge('Fat', post.nutrition.fat, 'g', '#4ECDC4')}
        {renderNutritionBadge('Carbs', post.nutrition.carbs, 'g', '#45B7D1')}
        {renderNutritionBadge('Calories', post.nutrition.calories, '', '#FFA726')}
      </View>

      {/* Post Actions */}
      <View style={styles.postActions}>
        <TouchableOpacity style={styles.actionButton}>
          <IconSymbol name="heart" size={24} color="#FF6B6B" />
          <Text style={styles.actionText}>{post.likes}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          <IconSymbol name="message" size={24} color="#64748B" />
          <Text style={styles.actionText}>{post.comments}</Text>
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
      
      {/* Tags */}
      <View style={styles.tagsContainer}>
        {post.tags.map((tag, index) => (
          <Text key={index} style={styles.tag}>{tag}</Text>
        ))}
      </View>
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
        <Text style={styles.appName}>NutriMind</Text>
        <TouchableOpacity style={styles.notificationButton}>
          <IconSymbol name="bell" size={24} color="#FFFFFF" />
        </TouchableOpacity>
      </LinearGradient>

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
      <ScrollView
        style={styles.feed}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        showsVerticalScrollIndicator={false}
      >
        {mockPosts.map(renderPost)}
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
