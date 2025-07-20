<<<<<<< HEAD
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  StatusBar,
  Alert,
=======
import { IconSymbol } from '@/components/ui/IconSymbol';
import React, { useState } from 'react';
import {
    Alert,
    Image,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
>>>>>>> 2ebba678bb6268b40f02fa64271ff57b97a8a8c1
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { IconSymbol } from '@/components/ui/IconSymbol';

interface UserStats {
  posts: number;
  followers: number;
  following: number;
  streak: number;
}

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  color: string;
  unlockedAt: string;
}

interface RecentMeal {
  id: string;
  image: string;
  likes: number;
  timeAgo: string;
}

const userStats: UserStats = {
  posts: 127,
  followers: 892,
  following: 234,
  streak: 14,
};

const achievements: Achievement[] = [
  {
    id: '1',
    title: 'Protein Pro',
    description: 'Hit protein goals for 7 days straight',
    icon: 'bolt.fill',
    color: '#FF6B6B',
    unlockedAt: '2 days ago',
  },
  {
    id: '2',
    title: 'Hydration Hero',
    description: 'Drank 8+ glasses of water daily for a week',
    icon: 'drop.fill',
    color: '#45B7D1',
    unlockedAt: '1 week ago',
  },
  {
    id: '3',
    title: 'Social Butterfly',
    description: 'Received 100+ likes on a single post',
    icon: 'heart.fill',
    color: '#FF6B6B',
    unlockedAt: '2 weeks ago',
  },
  {
    id: '4',
    title: 'Consistency King',
    description: 'Logged meals for 30 days straight',
    icon: 'calendar',
    color: '#10B981',
    unlockedAt: '1 month ago',
  },
];

const recentMeals: RecentMeal[] = [
  {
    id: '1',
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=150&h=150&fit=crop',
    likes: 45,
    timeAgo: '2h',
  },
  {
    id: '2',
    image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=150&h=150&fit=crop',
    likes: 32,
    timeAgo: '1d',
  },
  {
    id: '3',
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=150&h=150&fit=crop',
    likes: 78,
    timeAgo: '2d',
  },
  {
    id: '4',
    image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=150&h=150&fit=crop',
    likes: 23,
    timeAgo: '3d',
  },
  {
    id: '5',
    image: 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=150&h=150&fit=crop',
    likes: 56,
    timeAgo: '4d',
  },
  {
    id: '6',
    image: 'https://images.unsplash.com/photo-1551782450-a2132b4ba21d?w=150&h=150&fit=crop',
    likes: 67,
    timeAgo: '5d',
  },
];

export default function ProfileScreen() {
  const [selectedTab, setSelectedTab] = useState<'posts' | 'achievements'>('posts');

  const handleSettingsPress = () => {
    Alert.alert('Settings', 'Settings screen would open here');
  };

  const handleEditProfile = () => {
    Alert.alert('Edit Profile', 'Edit profile screen would open here');
  };

  const handleFollowersPress = () => {
    Alert.alert('Followers', 'Followers list would open here');
  };

  const handleFollowingPress = () => {
    Alert.alert('Following', 'Following list would open here');
  };

  const renderStatCard = (label: string, value: number, onPress?: () => void) => (
    <TouchableOpacity style={styles.statCard} onPress={onPress}>
      <Text style={styles.statValue}>{value}</Text>
      <Text style={styles.statLabel}>{label}</Text>
    </TouchableOpacity>
  );

  const renderAchievement = (achievement: Achievement) => (
    <View key={achievement.id} style={styles.achievementCard}>
      <View style={[styles.achievementIcon, { backgroundColor: achievement.color }]}>
        <IconSymbol name={achievement.icon as any} size={20} color="#FFFFFF" />
      </View>
      <View style={styles.achievementInfo}>
        <Text style={styles.achievementTitle}>{achievement.title}</Text>
        <Text style={styles.achievementDescription}>{achievement.description}</Text>
        <Text style={styles.achievementTime}>Unlocked {achievement.unlockedAt}</Text>
      </View>
    </View>
  );

  const renderMealPost = (meal: RecentMeal) => (
    <TouchableOpacity key={meal.id} style={styles.mealPost}>
      <Image source={{ uri: meal.image }} style={styles.mealImage} />
      <View style={styles.mealOverlay}>
        <View style={styles.mealStats}>
          <IconSymbol name="heart.fill" size={12} color="#FFFFFF" />
          <Text style={styles.mealLikes}>{meal.likes}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      {/* Profile Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Profile</Text>
        <TouchableOpacity onPress={handleSettingsPress}>
          <IconSymbol name="gear" size={24} color="#64748B" />
        </TouchableOpacity>
      </View>
      {/* Profile Info */}
      <View style={styles.profileSection}>
        <View style={styles.profileHeader}>
          <Image
            source={{ uri: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face' }}
            style={styles.profileAvatar}
          />
          <View style={styles.profileInfo}>
            <Text style={styles.profileName}>Chef Ernesto Gray</Text>
            <Text style={styles.profileBio}>Passionate about healthy eating and sharing delicious recipes. Let’s fuel our bodies right!</Text>
            <View style={styles.streakContainer}>
              <IconSymbol name="flame.fill" size={16} color="#FF6B6B" />
              <Text style={styles.streakText}>Streak: {userStats.streak} days</Text>
            </View>
          </View>
        </View>
        <View style={styles.profileActions}>
          <TouchableOpacity style={styles.editProfileButton} onPress={handleEditProfile}>
            <Text style={styles.editProfileText}>Edit Profile</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.statsRow}>
          {renderStatCard('Posts', userStats.posts)}
          {renderStatCard('Followers', userStats.followers, handleFollowersPress)}
          {renderStatCard('Following', userStats.following, handleFollowingPress)}
        </View>
      </View>
      {/* Tabs */}
      <View style={styles.tabsRow}>
        <TouchableOpacity
          style={[styles.tabButton, selectedTab === 'posts' && styles.tabButtonActive]}
          onPress={() => setSelectedTab('posts')}
        >
          <Text style={[styles.tabText, selectedTab === 'posts' && styles.tabTextActive]}>Posts</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tabButton, selectedTab === 'achievements' && styles.tabButtonActive]}
          onPress={() => setSelectedTab('achievements')}
        >
          <Text style={[styles.tabText, selectedTab === 'achievements' && styles.tabTextActive]}>Achievements</Text>
        </TouchableOpacity>
      </View>
      {/* Tab Content */}
      {selectedTab === 'posts' ? (
        <View style={styles.mealsGrid}>
          {recentMeals.map(renderMealPost)}
        </View>
      ) : (
        <View style={styles.achievementsList}>
          {achievements.map(renderAchievement)}
        </View>
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
    paddingTop: 60,
    paddingBottom: 20,
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1E293B',
  },
  profileSection: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    paddingTop: 30,
    paddingBottom: 20,
    marginBottom: 10,
  },
  profileHeader: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  profileAvatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 15,
  },
  profileInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  profileName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1E293B',
    marginBottom: 5,
  },
  profileBio: {
    fontSize: 14,
    color: '#64748B',
    lineHeight: 20,
    marginBottom: 10,
  },
  streakContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  streakText: {
    fontSize: 14,
    color: '#FF6B6B',
    fontWeight: '600',
    marginLeft: 6,
  },
  profileActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginBottom: 10,
  },
  editProfileButton: {
    backgroundColor: '#4ECDC4',
    borderRadius: 20,
    paddingVertical: 6,
    paddingHorizontal: 18,
  },
  editProfileText: {
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: 14,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  statCard: {
    alignItems: 'center',
    flex: 1,
  },
  statValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1E293B',
  },
  statLabel: {
    fontSize: 12,
    color: '#64748B',
    marginTop: 2,
  },
  tabsRow: {
    flexDirection: 'row',
    backgroundColor: '#E2E8F0',
    borderRadius: 20,
    marginHorizontal: 20,
    marginBottom: 10,
    overflow: 'hidden',
  },
  tabButton: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
  },
  tabButtonActive: {
    backgroundColor: '#4ECDC4',
  },
  tabText: {
    fontSize: 14,
    color: '#64748B',
    fontWeight: '600',
  },
  tabTextActive: {
    color: '#FFFFFF',
  },
  mealsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginTop: 10,
  },
  mealPost: {
    width: '30%',
    aspectRatio: 1,
    marginBottom: 12,
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: '#F1F5F9',
  },
  mealImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  mealOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.15)',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    padding: 6,
  },
  mealStats: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.4)',
    borderRadius: 10,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  mealLikes: {
    color: '#FFFFFF',
    fontSize: 12,
    marginLeft: 4,
  },
  achievementsList: {
    paddingHorizontal: 20,
    marginTop: 10,
  },
  achievementCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 2,
  },
  achievementIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  achievementInfo: {
    flex: 1,
  },
  achievementTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1E293B',
  },
  achievementDescription: {
    fontSize: 13,
    color: '#64748B',
    marginTop: 2,
  },
  achievementTime: {
    fontSize: 11,
    color: '#94A3B8',
    marginTop: 4,
  },
});
