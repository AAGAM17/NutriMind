import { CustomButton } from '@/components/CustomButton';
import { HelloWave } from '@/components/HelloWave';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React, { useCallback, useState } from 'react';
import {
  FlatList,
  Image,
  RefreshControl,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import { dummyPosts } from '../constants/dummyData';

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
  isLiked: boolean;
  isSaved: boolean;
}

export default function FeedScreen() {
  const [refreshing, setRefreshing] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [posts, setPosts] = useState<MealPost[]>(dummyPosts);
  const router = useRouter();

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    // Simulate refresh
    setTimeout(() => setRefreshing(false), 1000);
  }, []);

  const handleLike = useCallback((postId: string) => {
    setPosts(prevPosts =>
      prevPosts.map(post =>
        post.id === postId
          ? {
              ...post,
              isLiked: !post.isLiked,
              likes: post.isLiked ? post.likes - 1 : post.likes + 1
            }
          : post
      )
    );
  }, []);

  const handleSave = useCallback((postId: string) => {
    setPosts(prevPosts =>
      prevPosts.map(post =>
        post.id === postId
          ? { ...post, isSaved: !post.isSaved }
          : post
      )
    );
  }, []);

  const renderNutritionBadge = useCallback(
    (label: string, value: number, unit: string, color: string) => (
      <View style={[styles.nutritionBadge, { backgroundColor: color }]}> 
        <Text style={styles.nutritionValue}>{value}{unit}</Text>
        <Text style={styles.nutritionLabel}>{label}</Text>
      </View>
    ),
    []
  );

  const renderPost = useCallback(({ item }: { item: MealPost }) => (
    <View style={styles.postContainer}>
      {/* User Header */}
      <View style={styles.userHeader}>
        <Image source={{ uri: item.user.avatar }} style={styles.avatar} />
        <View style={styles.userInfo}>
          <View style={styles.userNameRow}>
            <Text style={styles.userName}>{item.user.name}</Text>
            {item.user.isVerified && (
              <IconSymbol name="checkmark.seal.fill" size={16} color="#3B82F6" />
            )}
          </View>
          <Text style={styles.timeAgo}>{item.timeAgo}</Text>
        </View>
        <TouchableOpacity style={styles.moreButton}>
          <IconSymbol name="ellipsis" size={20} color="#64748B" />
        </TouchableOpacity>
      </View>

      {/* Meal Image */}
      <Image source={{ uri: item.image }} style={styles.mealImage} />

      {/* Nutrition Info */}
      <View style={styles.nutritionContainer}>
        {renderNutritionBadge('Protein', item.nutrition.protein, 'g', '#FF6B6B')}
        {renderNutritionBadge('Fat', item.nutrition.fat, 'g', '#4ECDC4')}
        {renderNutritionBadge('Carbs', item.nutrition.carbs, 'g', '#45B7D1')}
        {renderNutritionBadge('Calories', item.nutrition.calories, '', '#FFA726')}
      </View>

      {/* Post Actions */}
      <View style={styles.postActions}>
        <TouchableOpacity 
          style={styles.actionButton}
          onPress={() => handleLike(item.id)}
        >
          <IconSymbol 
            name={item.isLiked ? "heart.fill" : "heart"} 
            size={24} 
            color={item.isLiked ? "#FF6B6B" : "#64748B"} 
          />
          <Text style={styles.actionText}>{item.likes}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          <IconSymbol name="message" size={24} color="#64748B" />
          <Text style={styles.actionText}>{item.comments}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          <IconSymbol name="paperplane" size={24} color="#64748B" />
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.actionButton, styles.saveButton]}
          onPress={() => handleSave(item.id)}
        >
          <IconSymbol 
            name={item.isSaved ? "bookmark.fill" : "bookmark"} 
            size={24} 
            color="#64748B" 
          />
        </TouchableOpacity>
      </View>

      {/* Post Description */}
      <Text style={styles.postDescription}>{item.description}</Text>
      {/* Tags */}
      <View style={styles.tagsContainer}>
        {item.tags.map((tag, index) => (
          <TouchableOpacity key={index}>
            <Text style={styles.tag}>{tag}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  ), [handleLike, handleSave, renderNutritionBadge]);

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
          <View style={styles.notificationBadge} />
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
          returnKeyType="search"
        />
      </View>
      {/* Feed */}
      <FlatList
        data={posts}
        keyExtractor={(item) => item.id}
        renderItem={renderPost}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.feedContent}
        ListHeaderComponent={<View style={styles.listHeader} />}
        ListFooterComponent={<View style={styles.listFooter} />}
      />
    </View>
  );
}

// 🔧 Include your `styles` from your original code (already correct)

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
    fontFamily: 'Inter_700Bold',
  },
  notificationButton: {
    padding: 8,
    position: 'relative',
  },
  notificationBadge: {
    position: 'absolute',
    top: 5,
    right: 5,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#FFD700',
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
    fontFamily: 'Inter_400Regular',
  },
  feedContent: {
    paddingBottom: 16,
  },
  listHeader: {
    height: 8,
  },
  listFooter: {
    height: 32,
  },
  postContainer: {
    backgroundColor: '#FFFFFF',
    marginBottom: 16,
    paddingBottom: 16,
    borderRadius: 12,
    overflow: 'hidden',
    marginHorizontal: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
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
    fontFamily: 'Inter_600SemiBold',
  },
  timeAgo: {
    fontSize: 12,
    color: '#64748B',
    marginTop: 2,
    fontFamily: 'Inter_400Regular',
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
    fontFamily: 'Inter_700Bold',
  },
  nutritionLabel: {
    fontSize: 12,
    color: '#FFFFFF',
    marginTop: 2,
    fontFamily: 'Inter_400Regular',
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
    fontFamily: 'Inter_500Medium',
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
    fontFamily: 'Inter_400Regular',
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
    fontFamily: 'Inter_500Medium',
  },
});