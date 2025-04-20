import React from 'react';
import { ActivityIndicator, StyleSheet } from 'react-native';
import { ThemedView } from '@/components/ThemedView';

export default function CallbackScreen() {
  return (
    <ThemedView style={styles.container}>
      <ActivityIndicator size="large" color="#0000ff" />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
});