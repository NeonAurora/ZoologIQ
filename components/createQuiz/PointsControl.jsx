import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';

export default function PointsControl({ 
  label, 
  value, 
  onChange, 
  min = 0, 
  max = 20, 
  isDark = false,
  color = '#0a7ea4'
}) {
  
  const handleDecrease = () => {
    if (value > min) {
      onChange(value - 1);
    }
  };

  const handleIncrease = () => {
    if (value < max) {
      onChange(value + 1);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={[
        styles.label, 
        isDark && styles.labelDark,
        { color: color }
      ]}>
        {label}: {value}
      </Text>
      
      <View style={styles.controls}>
        <Pressable 
          style={[
            styles.button,
            { backgroundColor: color },
            value <= min && styles.disabledButton
          ]} 
          onPress={handleDecrease}
          disabled={value <= min}
        >
          <Text style={styles.buttonText}>−</Text>
        </Pressable>
        
        <Text style={[styles.value, isDark && styles.valueDark]}>
          {value}
        </Text>
        
        <Pressable 
          style={[
            styles.button,
            { backgroundColor: color },
            value >= max && styles.disabledButton
          ]} 
          onPress={handleIncrease}
          disabled={value >= max}
        >
          <Text style={styles.buttonText}>+</Text>
        </Pressable>
      </View>
      
      {min !== undefined && max !== undefined && (
        <Text style={[styles.range, isDark && styles.rangeDark]}>
          Range: {min} - {max}
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 8,
    textAlign: 'center',
  },
  labelDark: {
    color: '#eee',
  },
  controls: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 16,
  },
  button: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  disabledButton: {
    backgroundColor: '#cccccc',
    opacity: 0.5,
  },
  buttonText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    lineHeight: 20,
  },
  value: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    minWidth: 40,
    textAlign: 'center',
  },
  valueDark: {
    color: '#eee',
  },
  range: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
    marginTop: 4,
  },
  rangeDark: {
    color: '#aaa',
  },
});