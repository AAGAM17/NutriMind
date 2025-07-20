import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Image,
  Alert,
  StatusBar,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import * as ImagePicker from 'expo-image-picker';
import { IconSymbol } from '@/components/ui/IconSymbol';

interface MealData {
  image: string | null;
  description: string;
  tags: string[];
  nutrition: {
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
  };
  privacy: 'public' | 'private' | 'friends';
}

const quickTags = [
  '#Breakfast', '#Lunch', '#Dinner', '#Snack',
  '#Healthy', '#Keto', '#Vegan', '#Vegetarian',
  '#HighProtein', '#LowCarb', '#PostWorkout', '#Cheatmeal'
];

export default function AddMealScreen() {
  const [mealData, setMealData] = useState<MealData>({
    image: null,
    description: '',
    tags: [],
    nutrition: {
      calories: 0,
      protein: 0,
      carbs: 0,
      fat: 0,
    },
    privacy: 'public',
  });

  const [isPosting, setIsPosting] = useState(false);

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission Required', 'We need access to your photos to add meal images.');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });

    if (!result.canceled) {
      setMealData({ ...mealData, image: result.assets[0].uri });
    }
  };

  const takePhoto = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission Required', 'We need access to your camera to take meal photos.');
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });

    if (!result.canceled) {
      setMealData({ ...mealData, image: result.assets[0].uri });
    }
  };

  const toggleTag = (tag: string) => {
    if (mealData.tags.includes(tag)) {
      setMealData({
        ...mealData,
        tags: mealData.tags.filter(t => t !== tag),
      });
    } else {
      setMealData({
        ...mealData,
        tags: [...mealData.tags, tag],
      });
    }
  };

  const handlePost = async () => {
    if (!mealData.description.trim()) {
      Alert.alert('Missing Information', 'Please add a description for your meal.');
      return;
    }

    setIsPosting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsPosting(false);
      Alert.alert(
        'Meal Posted!',
        'Your meal has been shared with the community.',
        [
          {
            text: 'OK',
            onPress: () => {
              // Reset form
              setMealData({
                image: null,
                description: '',
                tags: [],
                nutrition: { calories: 0, protein: 0, carbs: 0, fat: 0 },
                privacy: 'public',
              });
            },
          },
        ]
      );
    }, 2000);
  };

  const showImagePicker = () => {
    Alert.alert(
      'Add Photo',
      'Choose how you want to add a photo of your meal',
      [
        { text: 'Camera', onPress: takePhoto },
        { text: 'Photo Library', onPress: pickImage },
        { text: 'Cancel', style: 'cancel' },
      ]
    );
  };

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
        <Text style={styles.headerTitle}>Share Your Meal</Text>
      </LinearGradient>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Image Section */}
        <View style={styles.imageSection}>
          {mealData.image ? (
            <TouchableOpacity onPress={showImagePicker}>
              <Image source={{ uri: mealData.image }} style={styles.mealImage} />
              <View style={styles.imageOverlay}>
                <IconSymbol name="camera.fill" size={20} color="#FFFFFF" />
                <Text style={styles.imageOverlayText}>Tap to change</Text>
              </View>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity style={styles.imagePlaceholder} onPress={showImagePicker}>
              <IconSymbol name="camera.fill" size={40} color="#94A3B8" />
              <Text style={styles.imagePlaceholderText}>Add Photo</Text>
            </TouchableOpacity>
          )}
        </View>

        {/* Description */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Description</Text>
          <TextInput
            style={styles.descriptionInput}
            placeholder="What did you eat? Share your thoughts..."
            placeholderTextColor="#94A3B8"
            multiline
            numberOfLines={4}
            value={mealData.description}
            onChangeText={(text) => setMealData({ ...mealData, description: text })}
          />
        </View>

        {/* Tags */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Tags</Text>
          <View style={styles.tagsContainer}>
            {quickTags.map((tag) => (
              <TouchableOpacity
                key={tag}
                style={[
                  styles.tag,
                  mealData.tags.includes(tag) && styles.tagSelected,
                ]}
                onPress={() => toggleTag(tag)}
              >
                <Text
                  style={[
                    styles.tagText,
                    mealData.tags.includes(tag) && styles.tagTextSelected,
                  ]}
                >
                  {tag}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Nutrition Info */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Nutrition (Optional)</Text>
          <View style={styles.nutritionGrid}>
            <View style={styles.nutritionInput}>
              <Text style={styles.nutritionLabel}>Calories</Text>
              <TextInput
                style={styles.nutritionField}
                placeholder="0"
                keyboardType="numeric"
                value={mealData.nutrition.calories.toString()}
                onChangeText={(text) =>
                  setMealData({
                    ...mealData,
                    nutrition: { ...mealData.nutrition, calories: parseInt(text) || 0 },
                  })
                }
              />
            </View>
            <View style={styles.nutritionInput}>
              <Text style={styles.nutritionLabel}>Protein (g)</Text>
              <TextInput
                style={styles.nutritionField}
                placeholder="0"
                keyboardType="numeric"
                value={mealData.nutrition.protein.toString()}
                onChangeText={(text) =>
                  setMealData({
                    ...mealData,
                    nutrition: { ...mealData.nutrition, protein: parseInt(text) || 0 },
                  })
                }
              />
            </View>
            <View style={styles.nutritionInput}>
              <Text style={styles.nutritionLabel}>Carbs (g)</Text>
              <TextInput
                style={styles.nutritionField}
                placeholder="0"
                keyboardType="numeric"
                value={mealData.nutrition.carbs.toString()}
                onChangeText={(text) =>
                  setMealData({
                    ...mealData,
                    nutrition: { ...mealData.nutrition, carbs: parseInt(text) || 0 },
                  })
                }
              />
            </View>
            <View style={styles.nutritionInput}>
              <Text style={styles.nutritionLabel}>Fat (g)</Text>
              <TextInput
                style={styles.nutritionField}
                placeholder="0"
                keyboardType="numeric"
                value={mealData.nutrition.fat.toString()}
                onChangeText={(text) =>
                  setMealData({
                    ...mealData,
                    nutrition: { ...mealData.nutrition, fat: parseInt(text) || 0 },
                  })
                }
              />
            </View>
          </View>
        </View>

        {/* Privacy Settings */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Privacy</Text>
          <View style={styles.privacyContainer}>
            {[
              { key: 'public', label: 'Public', icon: 'globe' },
              { key: 'friends', label: 'Friends Only', icon: 'person.2' },
              { key: 'private', label: 'Private', icon: 'lock' },
            ].map((option) => (
              <TouchableOpacity
                key={option.key}
                style={[
                  styles.privacyOption,
                  mealData.privacy === option.key && styles.privacyOptionSelected,
                ]}
                onPress={() => setMealData({ ...mealData, privacy: option.key as any })}
              >
                <IconSymbol
                  name={option.icon as any}
                  size={20}
                  color={mealData.privacy === option.key ? '#FFFFFF' : '#64748B'}
                />
                <Text
                  style={[
                    styles.privacyOptionText,
                    mealData.privacy === option.key && styles.privacyOptionTextSelected,
                  ]}
                >
                  {option.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Post Button */}
        <TouchableOpacity
          style={[styles.postButton, isPosting && styles.postButtonDisabled]}
          onPress={handlePost}
          disabled={isPosting}
        >
          <LinearGradient
            colors={['#FF6B6B', '#4ECDC4']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.postButtonGradient}
          >
            {isPosting ? (
              <Text style={styles.postButtonText}>Posting...</Text>
            ) : (
              <>
                <IconSymbol name="paperplane.fill" size={20} color="#FFFFFF" />
                <Text style={styles.postButtonText}>Share Meal</Text>
              </>
            )}
          </LinearGradient>
        </TouchableOpacity>
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
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  imageSection: {
    marginBottom: 30,
  },
  mealImage: {
    width: '100%',
    height: 200,
    borderRadius: 15,
    resizeMode: 'cover',
  },
  imageOverlay: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  imageOverlayText: {
    color: '#FFFFFF',
    fontSize: 12,
    marginLeft: 4,
  },
  imagePlaceholder: {
    width: '100%',
    height: 200,
    borderRadius: 15,
    backgroundColor: '#FFFFFF',
    borderWidth: 2,
    borderColor: '#E2E8F0',
    borderStyle: 'dashed',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imagePlaceholderText: {
    color: '#94A3B8',
    fontSize: 16,
    marginTop: 8,
  },
  section: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1E293B',
    marginBottom: 15,
  },
  descriptionInput: {
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    padding: 15,
    fontSize: 16,
    color: '#1E293B',
    textAlignVertical: 'top',
    minHeight: 100,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  tag: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  tagSelected: {
    backgroundColor: '#FF6B6B',
    borderColor: '#FF6B6B',
  },
  tagText: {
    fontSize: 14,
    color: '#64748B',
  },
  tagTextSelected: {
    color: '#FFFFFF',
  },
  nutritionGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 15,
  },
  nutritionInput: {
    flex: 1,
    minWidth: '45%',
  },
  nutritionLabel: {
    fontSize: 14,
    color: '#64748B',
    marginBottom: 5,
  },
  nutritionField: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 12,
    fontSize: 16,
    color: '#1E293B',
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  privacyContainer: {
    flexDirection: 'row',
    gap: 10,
  },
  privacyOption: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    paddingVertical: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  privacyOptionSelected: {
    backgroundColor: '#FF6B6B',
    borderColor: '#FF6B6B',
  },
  privacyOptionText: {
    fontSize: 14,
    color: '#64748B',
    marginLeft: 8,
  },
  privacyOptionTextSelected: {
    color: '#FFFFFF',
  },
  postButton: {
    marginTop: 20,
    marginBottom: 40,
    borderRadius: 25,
    overflow: 'hidden',
  },
  postButtonDisabled: {
    opacity: 0.6,
  },
  postButtonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 15,
    paddingHorizontal: 30,
  },
  postButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
});
