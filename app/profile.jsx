import React from 'react';
import { StyleSheet, Pressable, Image } from 'react-native';
import { useAuth } from '@/Context/AuthContext';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { useRouter } from 'expo-router';

export default function ProfileScreen() {
  const { user, signOut, loading } = useAuth();
  const router = useRouter();

  // If not authenticated, redirect to home
  React.useEffect(() => {
    if (!user && !loading) {
      router.replace('/');
    }
  }, [user, loading]);

  const handleSignOut = async () => {
    console.log("Sign out initiated");
    await signOut();
    
    // Navigate to the logout page
    console.log("Sign out completed, navigating to Home Page");
  };

  if (loading || !user) {
    return (
      <ThemedView style={styles.container}>
        <ThemedText>Loading...</ThemedText>
      </ThemedView>
    );
  }

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title">Profile</ThemedText>
      
      <ThemedView style={styles.card}>
        <ThemedText type="subtitle">Welcome, {user.name || user.email || 'User'}!</ThemedText>
        
        {user.email && (
          <ThemedText style={styles.detail}>Email: {user.email}</ThemedText>
        )}
        
        {user.picture && (
          <ThemedView style={styles.pictureContainer}>
            <ThemedText style={styles.detail}>Profile Picture:</ThemedText>
            <Image source={{ uri: user.picture }} style={styles.picture} />
          </ThemedView>
        )}
      </ThemedView>
      
      <Pressable 
        style={styles.button} 
        onPress={handleSignOut}
      >
        <ThemedText style={styles.buttonText}>Sign Out</ThemedText>
      </Pressable>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  card: {
    marginVertical: 20,
    padding: 15,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  detail: {
    marginTop: 10,
  },
  pictureContainer: {
    marginTop: 15,
    alignItems: 'center',
  },
  picture: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginTop: 10,
  },
  button: {
    backgroundColor: '#E74C3C',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});