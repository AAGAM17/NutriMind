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
      <StatusBar barStyle="light-content" />
      
      {/* Header */}
      <LinearGradient
        colors={['#FF6B6B', '#4ECDC4']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.header}
      >
        <View style={styles.headerTop}>
          <Text style={styles.headerTitle}>Profile</Text>
          <TouchableOpacity onPress={handleSettingsPress}>
            <IconSymbol name="gearshape.fill" size={24} color="#FFFFFF" />
          </TouchableOpacity>
        </View>
      </LinearGradient>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Profile Info */}
        <View style={styles.profileSection}>
          <View style={styles.profileHeader}>
            <Image
              source={{ uri: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&h=120&fit=crop&crop=face' }}
              style={styles.profileAvatar}
            />
            <View style={styles.profileInfo}>
              <Text style={styles.profileName}>Alex Johnson</Text>
              <Text style={styles.profileBio}>
                🏋️‍♂️ Fitness enthusiast | 🥗 Nutrition lover | 📈 Tracking my journey
              </Text>
              <View style={styles.streakContainer}>
                <IconSymbol name="flame.fill" size={16} color="#FF6B6B" />
                <Text style={styles.streakText}>{userStats.streak} day streak!</Text>
              </View>
            </View>
          </View>

          {/* Stats */}
          <View style={styles.statsContainer}>
            {renderStatCard('Posts', userStats.posts)}
            {renderStatCard('Followers', userStats.followers, handleFollowersPress)}
            {renderStatCard('Following', userStats.following, handleFollowingPress)}
          </View>

          {/* Action Buttons */}
          <View style={styles.actionButtons}>
            <TouchableOpacity style={styles.editButton} onPress={handleEditProfile}>
              <Text style={styles.editButtonText}>Edit Profile</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.shareButton}>
              <IconSymbol name="square.and.arrow.up" size={16} color="#FF6B6B" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Tab Selection */}
        <View style={styles.tabContainer}>
          <TouchableOpacity
            style={[styles.tab, selectedTab === 'posts' && styles.tabActive]}
            onPress={() => setSelectedTab('posts')}
          >
            <IconSymbol 
              name="square.grid.3x3.fill" 
              size={16} 
              color={selectedTab === 'posts' ? '#FF6B6B' : '#64748B'} 
            />
            <Text style={[styles.tabText, selectedTab === 'posts' && styles.tabTextActive]}>
              Posts
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tab, selectedTab === 'achievements' && styles.tabActive]}
            onPress={() => setSelectedTab('achievements')}
          >
            <IconSymbol 
              name="trophy.fill" 
              size={16} 
              color={selectedTab === 'achievements' ? '#FF6B6B' : '#64748B'} 
            />
            <Text style={[styles.tabText, selectedTab === 'achievements' && styles.tabTextActive]}>
              Achievements
            </Text>
          </TouchableOpacity>
        </View>

        {/* Content */}
        {selectedTab === 'posts' ? (
          <View style={styles.postsGrid}>
            {recentMeals.map(renderMealPost)}
          </View>
        ) : (
          <View style={styles.achievementsContainer}>
            {achievements.map(renderAchievement)}
          </View>
        )}
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
    paddingBottom: 20,
    paddingHorizontal: 20,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  content: {
    flex: 1,
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
    marginLeft: 5,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  statCard: {
    alignItems: 'center',
    flex: 1,
  },
  statValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1E293B',
  },
  statLabel: {
    fontSize: 12,
    color: '#64748B',
    marginTop: 2,
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 10,
  },
  editButton: {
    flex: 1,
    backgroundColor: '#F1F5F9',
    paddingVertical: 12,
    borderRadius: 20,
    alignItems: 'center',
  },
  editButtonText: {
    fontSize: 14,
    color: '#334155',
    fontWeight: '600',
  },
  shareButton: {
    width: 44,
    height: 44,
    backgroundColor: '#F1F5F9',
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  tab: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 20,
  },
  tabActive: {
    backgroundColor: '#FEF2F2',
  },
  tabText: {
    fontSize: 14,
    color: '#64748B',
    marginLeft: 8,
    fontWeight: '500',
  },
  tabTextActive: {
    color: '#FF6B6B',
    fontWeight: '600',
  },
  postsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 10,
  },
  mealPost: {
    width: '33.33%',
    aspectRatio: 1,
    padding: 2,
  },
  mealImage: {
    width: '100%',
    height: '100%',
    borderRadius: 8,
  },
  mealOverlay: {
    position: 'absolute',
    top: 2,
    left: 2,
    right: 2,
    bottom: 2,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    borderRadius: 8,
    justifyContent: 'flex-end',
    padding: 8,
  },
  mealStats: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  mealLikes: {
    color: '#FFFFFF',
    fontSize: 12,
    marginLeft: 4,
    fontWeight: '600',
  },
  achievementsContainer: {
    padding: 20,
  },
  achievementCard: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    padding: 15,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  achievementIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  achievementInfo: {
    flex: 1,
  },
  achievementTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1E293B',
    marginBottom: 4,
  },
  achievementDescription: {
    fontSize: 14,
    color: '#64748B',
    marginBottom: 4,
  },
  achievementTime: {
    fontSize: 12,
    color: '#94A3B8',
  },
});
