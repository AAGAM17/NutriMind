import { IconSymbol } from '@/components/ui/IconSymbol';
import { CameraType, CameraView, useCameraPermissions } from 'expo-camera';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useState } from 'react';
import {
    Alert,
    Modal,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

interface NutritionInfo {
  name: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  fiber: number;
  sugar: number;
  sodium: number;
  servingSize: string;
  confidence: number;
}

const mockNutritionData: NutritionInfo = {
  name: 'Grilled Chicken Breast',
  calories: 165,
  protein: 31,
  carbs: 0,
  fat: 3.6,
  fiber: 0,
  sugar: 0,
  sodium: 74,
  servingSize: '100g',
  confidence: 0.92,
};

export default function ScanScreen() {
  const [facing, setFacing] = useState<CameraType>('back');
  const [permission, requestPermission] = useCameraPermissions();
  const [isScanning, setIsScanning] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [nutritionData, setNutritionData] = useState<NutritionInfo | null>(null);

  if (!permission) {
    return <View />;
  }

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" />
        <LinearGradient
          colors={['#FF6B6B', '#4ECDC4']}
          style={styles.permissionContainer}
        >
          <IconSymbol name="camera.fill" size={80} color="#FFFFFF" />
          <Text style={styles.permissionTitle}>Camera Access Required</Text>
          <Text style={styles.permissionText}>
            We need access to your camera to scan and analyze your meals for nutrition information.
          </Text>
          <TouchableOpacity style={styles.permissionButton} onPress={requestPermission}>
            <Text style={styles.permissionButtonText}>Grant Camera Access</Text>
          </TouchableOpacity>
        </LinearGradient>
      </View>
    );
  }

  function toggleCameraFacing() {
    setFacing(current => (current === 'back' ? 'front' : 'back'));
  }

  const handleScan = async () => {
    setIsScanning(true);
    
    // Simulate AI processing
    setTimeout(() => {
      setNutritionData(mockNutritionData);
      setShowResults(true);
      setIsScanning(false);
    }, 2000);
  };

  const handleSaveToLog = () => {
    Alert.alert(
      'Meal Saved!',
      'Your meal has been added to your nutrition log.',
      [{ text: 'OK', onPress: () => setShowResults(false) }]
    );
  };

  const renderNutritionResults = () => (
    <Modal
      visible={showResults}
      animationType="slide"
      presentationStyle="pageSheet"
    >
      <View style={styles.resultsContainer}>
        <View style={styles.resultsHeader}>
          <Text style={styles.resultsTitle}>Nutrition Analysis</Text>
          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => setShowResults(false)}
          >
            <IconSymbol name="xmark" size={24} color="#64748B" />
          </TouchableOpacity>
        </View>

        <ScrollView style={styles.resultsContent}>
          {nutritionData && (
            <>
              <View style={styles.foodInfo}>
                <Text style={styles.foodName}>{nutritionData.name}</Text>
                <View style={styles.confidenceContainer}>
                  <IconSymbol name="checkmark.circle.fill" size={20} color="#10B981" />
                  <Text style={styles.confidenceText}>
                    {Math.round(nutritionData.confidence * 100)}% confident
                  </Text>
                </View>
              </View>

              <View style={styles.nutritionGrid}>
                <View style={styles.nutritionCard}>
                  <Text style={styles.nutritionValue}>{nutritionData.calories}</Text>
                  <Text style={styles.nutritionLabel}>Calories</Text>
                </View>
                <View style={styles.nutritionCard}>
                  <Text style={styles.nutritionValue}>{nutritionData.protein}g</Text>
                  <Text style={styles.nutritionLabel}>Protein</Text>
                </View>
                <View style={styles.nutritionCard}>
                  <Text style={styles.nutritionValue}>{nutritionData.carbs}g</Text>
                  <Text style={styles.nutritionLabel}>Carbs</Text>
                </View>
                <View style={styles.nutritionCard}>
                  <Text style={styles.nutritionValue}>{nutritionData.fat}g</Text>
                  <Text style={styles.nutritionLabel}>Fat</Text>
                </View>
                <View style={styles.nutritionCard}>
                  <Text style={styles.nutritionValue}>{nutritionData.fiber}g</Text>
                  <Text style={styles.nutritionLabel}>Fiber</Text>
                </View>
                <View style={styles.nutritionCard}>
                  <Text style={styles.nutritionValue}>{nutritionData.sugar}g</Text>
                  <Text style={styles.nutritionLabel}>Sugar</Text>
                </View>
              </View>

              <View style={styles.servingInfo}>
                <Text style={styles.servingLabel}>Per {nutritionData.servingSize}</Text>
                <Text style={styles.servingNote}>
                  Tap to adjust serving size or add to meal log
                </Text>
              </View>

              <View style={styles.actionButtons}>
                <TouchableOpacity style={styles.saveButton} onPress={handleSaveToLog}>
                  <IconSymbol name="plus.circle.fill" size={20} color="#FFFFFF" />
                  <Text style={styles.saveButtonText}>Add to Meal Log</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.shareButton}>
                  <IconSymbol name="square.and.arrow.up" size={20} color="#FF6B6B" />
                  <Text style={styles.shareButtonText}>Share</Text>
                </TouchableOpacity>
              </View>
            </>
          )}
        </ScrollView>
      </View>
    </Modal>
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      
      <CameraView style={styles.camera} facing={facing}>
        <View style={styles.cameraOverlay}>
          <View style={styles.topBar}>
            <Text style={styles.instruction}>
              Point your camera at food to get nutrition info
            </Text>
          </View>

          <View style={styles.scanArea}>
            <View style={styles.scanBorder} />
            {isScanning && (
              <View style={styles.scanningOverlay}>
                <Text style={styles.scanningText}>Analyzing...</Text>
              </View>
            )}
          </View>

          <View style={styles.bottomControls}>
            <TouchableOpacity style={styles.flipButton} onPress={toggleCameraFacing}>
              <IconSymbol name="camera.rotate" size={24} color="#FFFFFF" />
            </TouchableOpacity>
            
            <TouchableOpacity
              style={[styles.scanButton, isScanning && styles.scanButtonDisabled]}
              onPress={handleScan}
              disabled={isScanning}
            >
              <View style={styles.scanButtonInner}>
                <IconSymbol name="viewfinder" size={32} color="#FFFFFF" />
              </View>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.galleryButton}>
              <IconSymbol name="photo" size={24} color="#FFFFFF" />
            </TouchableOpacity>
          </View>
        </View>
      </CameraView>

      {renderNutritionResults()}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  permissionContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  permissionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginTop: 20,
    marginBottom: 10,
  },
  permissionText: {
    fontSize: 16,
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 30,
    lineHeight: 24,
  },
  permissionButton: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 25,
  },
  permissionButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FF6B6B',
  },
  camera: {
    flex: 1,
  },
  cameraOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  topBar: {
    paddingTop: 60,
    paddingHorizontal: 20,
    paddingBottom: 20,
    alignItems: 'center',
  },
  instruction: {
    fontSize: 16,
    color: '#FFFFFF',
    textAlign: 'center',
    fontWeight: '500',
  },
  scanArea: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 40,
  },
  scanBorder: {
    width: 250,
    height: 250,
    borderWidth: 2,
    borderColor: '#FFFFFF',
    borderRadius: 20,
    backgroundColor: 'transparent',
  },
  scanningOverlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 107, 107, 0.8)',
    borderRadius: 20,
  },
  scanningText: {
    fontSize: 18,
    color: '#FFFFFF',
    fontWeight: '600',
  },
  bottomControls: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingBottom: 50,
    paddingHorizontal: 20,
  },
  flipButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  scanButton: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#FF6B6B',
    justifyContent: 'center',
    alignItems: 'center',
  },
  scanButtonDisabled: {
    opacity: 0.6,
  },
  scanButtonInner: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  galleryButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  resultsContainer: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  resultsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    paddingTop: 60,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  resultsTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1E293B',
  },
  closeButton: {
    padding: 8,
  },
  resultsContent: {
    flex: 1,
    padding: 20,
  },
  foodInfo: {
    alignItems: 'center',
    marginBottom: 30,
  },
  foodName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1E293B',
    marginBottom: 10,
  },
  confidenceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  confidenceText: {
    fontSize: 14,
    color: '#10B981',
    marginLeft: 5,
    fontWeight: '600',
  },
  nutritionGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 30,
  },
  nutritionCard: {
    width: '48%',
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 15,
    alignItems: 'center',
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  nutritionValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FF6B6B',
    marginBottom: 5,
  },
  nutritionLabel: {
    fontSize: 12,
    color: '#64748B',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  servingInfo: {
    alignItems: 'center',
    marginBottom: 30,
  },
  servingLabel: {
    fontSize: 16,
    color: '#64748B',
    marginBottom: 5,
  },
  servingNote: {
    fontSize: 12,
    color: '#94A3B8',
    textAlign: 'center',
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  saveButton: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#FF6B6B',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  saveButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  shareButton: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 10,
    borderWidth: 2,
    borderColor: '#FF6B6B',
  },
  shareButtonText: {
    color: '#FF6B6B',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
});
