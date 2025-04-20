import { StyleSheet } from 'react-native';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { useAuth } from '@/context/AuthContext';

export default function HomePage() {
  const { user } = useAuth();
  
  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title">Welcome to Home Page</ThemedText>
      
      {user ? (
        <ThemedText style={styles.welcomeText}>
          Hello, {user.name || user.email || 'User'}! You are signed in.
        </ThemedText>
      ) : (
        <ThemedText style={styles.welcomeText}>
          Sign in using the button in the header to access your profile.
        </ThemedText>
      )}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 40,
    paddingHorizontal: 20,
  },
  welcomeText: {
    marginTop: 20,
    textAlign: 'center',
    fontSize: 16,
  }
});