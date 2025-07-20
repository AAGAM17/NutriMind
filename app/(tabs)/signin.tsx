import { ActivityIndicator, Alert, Platform, Text, View } from 'react-native';

export default function SignInScreen() {
  if (Platform.OS === 'web') {
    const { useUser, SignIn } = require('@clerk/clerk-react');
    const { user, isLoaded } = useUser();

    if (!isLoaded) {
      return <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}><Text>Loading...</Text></View>;
    }
    if (user) {
      return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text>You are already signed in.</Text>
        </View>
      );
    }
    return (
      <View style={{ flex: 1, justifyContent: 'center' }}>
        <SignIn />
      </View>
    );
  }

  const { useAuth } = require('@clerk/clerk-expo');
  const { isSignedIn, isLoaded } = useAuth();

  if (!isLoaded) {
    return <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}><Text>Loading...</Text></View>;
  }
  if (isSignedIn) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>You are already signed in.</Text>
      </View>
    );
  }

  const { WebView } = require('react-native-webview');
  return (
    <WebView
      source={{ uri: 'https://powerful-drake-38.accounts.dev/sign-in' }}
      style={{ flex: 1, backgroundColor: '#fff' }}
      startInLoadingState={true}
      renderLoading={() => (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff' }}>
          <ActivityIndicator size="large" color="#FF6B6B" />
          <Text>Loading sign-in page...</Text>
        </View>
      )}
      onError={(syntheticEvent: any) => {
        const { nativeEvent } = syntheticEvent;
        Alert.alert('WebView error', nativeEvent.description || 'Failed to load sign-in page.');
        console.error('WebView error:', nativeEvent);
      }}
    />
  );
} 
