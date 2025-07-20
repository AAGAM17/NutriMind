import { useState } from 'react';
import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Button } from 'react-native-paper';
import { usePosts } from '../context/PostsContext';

type PostFormProps = {
  navigation: any;
  route: { params: { photoUri: string } };
};

export default function PostForm({ route, navigation }: PostFormProps) {
  const { photoUri } = route.params;
  const [caption, setCaption] = useState('');
  const [mealType, setMealType] = useState('breakfast');
  const [isPosting, setIsPosting] = useState(false);
  const { addPost } = usePosts();

  const handlePost = async () => {
    setIsPosting(true);
    try {
      addPost({
        id: Date.now().toString(),
        user: {
          name: 'You',
          avatar: require('../../assets/images/icon.png'),
        },
        time: new Date().toLocaleTimeString(),
        image: { uri: photoUri },
        caption,
        likes: 0,
        comments: 0,
        mealType,
      });
      navigation.navigate('Home'); // Return to home after posting
    } catch (error) {
      console.error('Error posting:', error);
    } finally {
      setIsPosting(false);
    }
  };

  return (
    <View style={styles.container}>
      <Image source={{ uri: photoUri }} style={styles.image} />
      
      <TextInput
        style={styles.captionInput}
        placeholder="What's this meal about?"
        multiline
        value={caption}
        onChangeText={setCaption}
      />
      
      <View style={styles.mealTypeContainer}>
        {['breakfast', 'lunch', 'dinner', 'snack'].map((type) => (
          <TouchableOpacity
            key={type}
            style={[
              styles.mealTypeButton,
              mealType === type && styles.selectedMealType,
            ]}
            onPress={() => setMealType(type)}
          >
            <Text style={styles.mealTypeText}>{type}</Text>
          </TouchableOpacity>
        ))}
      </View>
      
      <Button
        mode="contained"
        loading={isPosting}
        onPress={handlePost}
        style={styles.postButton}
        labelStyle={styles.postButtonText}
      >
        {isPosting ? 'Posting...' : 'Share Post'}
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  image: {
    width: '100%',
    height: 300,
    borderRadius: 10,
    marginBottom: 20,
  },
  captionInput: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
    minHeight: 100,
  },
  mealTypeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  mealTypeButton: {
    padding: 10,
    borderRadius: 20,
    backgroundColor: '#f0f0f0',
  },
  selectedMealType: {
    backgroundColor: '#4CAF50',
  },
  mealTypeText: {
    textTransform: 'capitalize',
  },
  postButton: {
    backgroundColor: '#4CAF50',
    padding: 10,
    borderRadius: 10,
  },
  postButtonText: {
    color: 'white',
    fontSize: 16,
  },
});