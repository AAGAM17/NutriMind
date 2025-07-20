import { Ionicons } from '@expo/vector-icons';
import { CameraType, CameraView } from 'expo-camera';
import { useEffect, useRef, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

// Add a type for navigation prop (if using React Navigation v5+)
type CameraScreenProps = {
  navigation: any;
};

export default function CameraScreen({ navigation }: CameraScreenProps) {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [type, setType] = useState<CameraType>('back');
  const cameraRef = useRef<CameraView | null>(null);

  useEffect(() => {
    (async () => {
      // CameraView does not have requestCameraPermissionsAsync, so use Camera's static method
      const { Camera } = await import('expo-camera');
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const takePicture = async () => {
    if (cameraRef.current) {
      // CameraView does not have takePictureAsync directly; you may need to use imperative handle if needed
      // For now, this is a placeholder for actual capture logic
      // const photo = await cameraRef.current.takePictureAsync();
      // navigation.navigate('Preview', { photoUri: photo.uri });
    }
  };

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      <CameraView style={styles.camera} facing={type} ref={cameraRef}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.flipButton}
            onPress={() => setType(type === 'back' ? 'front' : 'back')}
          >
            <Ionicons name="camera-reverse" size={30} color="white" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.captureButton} onPress={takePicture}>
            <View style={styles.innerCircle} />
          </TouchableOpacity>
        </View>
      </CameraView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    backgroundColor: 'transparent',
    flexDirection: 'row',
    margin: 20,
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  flipButton: {
    alignSelf: 'flex-end',
    padding: 10,
  },
  captureButton: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  innerCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'white',
    borderWidth: 2,
    borderColor: 'black',
  },
});