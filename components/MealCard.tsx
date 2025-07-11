import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { IconSymbol } from './ui/IconSymbol';

interface MealCardProps {
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
  onLike?: () => void;
  onComment?: () => void;
  onShare?: () => void;
  onSave?: () => void;
}

export const MealCard: React.FC<MealCardProps> = ({
  user,
  image,
  description,
  nutrition,
  likes,
  comments,
  timeAgo,
  tags,
  onLike,
  onComment,
  onShare,
  onSave,
}) => {
  const renderNutritionBadge = (label: string, value: number, unit: string, color: string) => (
    <View style={[styles.nutritionBadge, { backgroundColor: color }]}>
      <Text style={styles.nutritionValue}>{value}{unit}</Text>
      <Text style={styles.nutritionLabel}>{label}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* User Header */}
      <View style={styles.userHeader}>
        <Image source={{ uri: user.avatar }} style={styles.avatar} />
        <View style={styles.userInfo}>
          <View style={styles.userNameRow}>
            <Text style={styles.userName}>{user.name}</Text>
            {user.isVerified && (
              <IconSymbol name="checkmark.seal.fill" size={16} color="#3B82F6" />
            )}
          </View>
          <Text style={styles.timeAgo}>{timeAgo}</Text>
        </View>
        <TouchableOpacity style={styles.moreButton}>
          <IconSymbol name="ellipsis" size={20} color="#64748B" />
        </TouchableOpacity>
      </View>

      {/* Meal Image */}
      <Image source={{ uri: image }} style={styles.mealImage} />

      {/* Nutrition Info */}
      <View style={styles.nutritionContainer}>
        {renderNutritionBadge('Protein', nutrition.protein, 'g', '#FF6B6B')}
        {renderNutritionBadge('Fat', nutrition.fat, 'g', '#4ECDC4')}
        {renderNutritionBadge('Carbs', nutrition.carbs, 'g', '#45B7D1')}
        {renderNutritionBadge('Calories', nutrition.calories, '', '#FFA726')}
      </View>

      {/* Post Actions */}
      <View style={styles.postActions}>
        <TouchableOpacity style={styles.actionButton} onPress={onLike}>
          <IconSymbol name="heart" size={24} color="#FF6B6B" />
          <Text style={styles.actionText}>{likes}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton} onPress={onComment}>
          <IconSymbol name="message" size={24} color="#64748B" />
          <Text style={styles.actionText}>{comments}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton} onPress={onShare}>
          <IconSymbol name="paperplane" size={24} color="#64748B" />
        </TouchableOpacity>
        <TouchableOpacity style={[styles.actionButton, styles.saveButton]} onPress={onSave}>
          <IconSymbol name="bookmark" size={24} color="#64748B" />
        </TouchableOpacity>
      </View>

      {/* Post Description */}
      <Text style={styles.postDescription}>{description}</Text>
      
      {/* Tags */}
      <View style={styles.tagsContainer}>
        {tags.map((tag, index) => (
          <Text key={index} style={styles.tag}>{tag}</Text>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
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
