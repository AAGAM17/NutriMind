import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

type PreviewScreenProps = {
  navigation: any;
  route: { params: { photoUri: string } };
};

export default function PreviewScreen({ route, navigation }: PreviewScreenProps) {
  const { photoUri } = route.params;
  const [caption, setCaption] = useState('');

  const handlePost = () => {
    // Here you would typically upload to your backend
    navigation.navigate('PostForm', { photoUri, caption });
  };

  return (
    <View style={styles.container}>
      <Image source={{ uri: photoUri }} style={styles.previewImage} />
      
      <View style={styles.buttonRow}>
        <TouchableOpacity 
          style={styles.retakeButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={24} color="white" />
          <Text style={styles.buttonText}>Retake</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.nextButton}
          onPress={handlePost}
        >
          <Text style={styles.buttonText}>Next</Text>
          <Ionicons name="arrow-forward" size={24} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  previewImage: {
    flex: 1,
    resizeMode: 'contain',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
  },
  retakeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  nextButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  buttonText: {
    color: 'white',
    marginHorizontal: 5,
    fontSize: 16,
  },
});