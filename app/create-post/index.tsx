import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

type CreatePostScreenProps = {
  navigation: any;
};

export default function CreatePostScreen({ navigation }: CreatePostScreenProps) {
  const openCamera = () => {
    navigation.navigate('Camera');
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      navigation.navigate('Preview', { photoUri: result.assets[0].uri });
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.optionButton} onPress={openCamera}>
        <Ionicons name="camera" size={30} color="#4CAF50" />
        <Text style={styles.optionText}>Take a Photo</Text>
      </TouchableOpacity>
      
      <TouchableOpacity style={styles.optionButton} onPress={pickImage}>
        <Ionicons name="image" size={30} color="#4CAF50" />
        <Text style={styles.optionText}>Choose from Gallery</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  optionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8f8f8',
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
    width: '100%',
  },
  optionText: {
    marginLeft: 15,
    fontSize: 18,
    color: '#333',
  },
});