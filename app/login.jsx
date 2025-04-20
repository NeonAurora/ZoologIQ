import React from 'react';
import { View, StyleSheet, ActivityIndicator, Pressable, Image } from 'react-native';
import { useAuth } from '@/Context/AuthContext';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { useRouter } from 'expo-router';

export default function LoginScreen() {
  const { signIn, loading, user } = useAuth();
  const router = useRouter();

  // If user is already logged in, redirect to profile
  React.useEffect(() => {
    if (user) {
      router.replace('/profile');
    }
  }, [user]);

  const handleLogin = async () => {
    try {
      await signIn();
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  return (
    <ThemedView style={styles.container}>
      <View style={styles.logoContainer}>
        <Image 
          source={require('@/assets/images/partial-react-logo.png')} 
          style={styles.logo} 
          resizeMode="contain"
        />
      </View>

      <ThemedText type="title" style={styles.title}>Welcome</ThemedText>
      <ThemedText style={styles.subtitle}>Please sign in to continue</ThemedText>
      
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" style={styles.loader} />
      ) : (
        <Pressable 
          style={styles.button} 
          onPress={handleLogin}
        >
          <ThemedText style={styles.buttonText}>Sign In with Auth0</ThemedText>
        </Pressable>
      )}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  logoContainer: {
    marginBottom: 40,
  },
  logo: {
    width: 150,
    height: 150,
  },
  title: {
    fontSize: 28,
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 30,
    textAlign: 'center',
  },
  loader: {
    marginTop: 20,
  },
  button: {
    backgroundColor: '#2E86DE',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 8,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});