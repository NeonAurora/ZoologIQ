// components/lesson/turtle/sections/TurtleBiodiversity.jsx

import React from 'react';
import { ScrollView, View, StyleSheet } from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { ThemedText } from '@/components/ThemedText';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Colors } from '@/constants/Colors';

const getBiodiversityIcon = (aspect) => {
  const t = aspect.toLowerCase();
  if (t.includes('seagrass maintenance') || t.includes('penyelenggaraan rumpai laut')) return 'spa';
  if (t.includes('coral reef health') || t.includes('kesihatan terumbu karang')) return 'water';
  if (t.includes('nutrient cycling') || t.includes('kitaran nutrien')) return 'autorenew';
  if (t.includes('food web dynamics') || t.includes('dinamik rangkaian makanan')) return 'restaurant';
  if (t.includes('biodiversity support') || t.includes('sokongan biodiversiti')) return 'groups';
  if (t.includes('indicator species') || t.includes('spesies penunjuk')) return 'analytics';
  return 'eco';
};

export default function TurtleBiodiversity({ currentLanguage = 'en' }) {
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === 'dark';

  const renderTextWithScientificNames = (text, style) => {
    if (!text || typeof text !== 'string') {
      return <ThemedText style={style}>{text}</ThemedText>;
    }

    const scientificNamePattern = /(Chelonia\s+mydas)/g;
    const parts = text.split(scientificNamePattern);
    
    if (parts.length === 1) {
      return <ThemedText style={style}>{text}</ThemedText>;
    }
    
    return (
      <ThemedText style={style}>
        {parts.map((part, index) => {
          if (scientificNamePattern.test(part)) {
            return (
              <ThemedText
                key={index}
                style={[
                  style,
                  { 
                    fontStyle: 'italic',
                    color: isDark ? Colors.dark.textSecondary : Colors.light.textSecondary
                  }
                ]}
              >
                {part}
              </ThemedText>
            );
          }
          return part;
        })}
      </ThemedText>
    );
  };

  const content = {
    en: {
      roleTitle: 'Role of Chelonia mydas (Green Sea turtle) in Biodiversity',
      roleData: [
        { 
          aspect: 'Seagrass Maintenance', 
          description: 'Grazing helps maintain healthy seagrass meadows, promoting growth and preventing overgrowth.' 
        },
        { 
          aspect: 'Coral Reef Health', 
          description: 'Controls algae on coral reefs, allowing corals to thrive and maintain reef ecosystems.' 
        },
        { 
          aspect: 'Nutrient Cycling', 
          description: 'Movement between nesting beaches and feeding grounds distributes nutrients, enriching ecosystems.' 
        },
        { 
          aspect: 'Food Web Dynamics', 
          description: 'Eggs and hatchlings are a food source for predators like crabs, birds, and fish.' 
        },
        { 
          aspect: 'Biodiversity Support', 
          description: 'Seagrass meadows and coral reefs, supported by turtles, provide habitats for diverse marine life.' 
        },
        { 
          aspect: 'Indicator Species', 
          description: 'Acts as a biological indicator of ocean health due to its sensitivity to habitat changes.' 
        }
      ]
    },
    ms: {
      roleTitle: 'Peranan Chelonia mydas (Penyu Agar) dalam Biodiversiti',
      roleData: [
        { 
          aspect: 'Penyelenggaraan Rumpai Laut', 
          description: 'Ragut membantu mengekalkan padang rumpai laut yang sihat, menggalakkan pertumbuhan dan mencegah pertumbuhan berlebihan.' 
        },
        { 
          aspect: 'Kesihatan Terumbu Karang', 
          description: 'Mengawal alga pada terumbu karang, membolehkan karang berkembang maju dan mengekalkan ekosistem terumbu.' 
        },
        { 
          aspect: 'Kitaran Nutrien', 
          description: 'Pergerakan antara pantai bersarang dan tempat makan mengagihkan nutrien, memperkaya ekosistem.' 
        },
        { 
          aspect: 'Dinamik Rangkaian Makanan', 
          description: 'Telur dan anak penyu adalah sumber makanan untuk pemangsa seperti ketam, burung dan ikan.' 
        },
        { 
          aspect: 'Sokongan Biodiversiti', 
          description: 'Padang rumpai laut dan terumbu karang, disokong oleh penyu, menyediakan habitat untuk hidupan marin yang pelbagai.' 
        },
        { 
          aspect: 'Spesies Penunjuk', 
          description: 'Bertindak sebagai penunjuk biologi kesihatan lautan kerana kepekaannya terhadap perubahan habitat.' 
        }
      ]
    }
  };

  const text = content[currentLanguage] || content.en;

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <MaterialIcons
            name="eco"
            size={20}
            color={isDark ? Colors.dark.tint : Colors.light.tint}
          />
          {renderTextWithScientificNames(
            text.roleTitle,
            [styles.sectionTitle, { color: isDark ? Colors.dark.text : Colors.light.text }]
          )}
        </View>
        {text.roleData.map((item, i) => (
          <View
            key={`role-${i}`}
            style={[
              styles.card,
              {
                backgroundColor: isDark ? Colors.dark.surface : Colors.light.surface,
                borderColor: isDark ? Colors.dark.border : Colors.light.border
              }
            ]}
          >
            <MaterialIcons
              name={getBiodiversityIcon(item.aspect)}
              size={24}
              color={isDark ? Colors.dark.tint : Colors.light.tint}
              style={styles.cardIcon}
            />
            <View style={styles.cardContent}>
              <ThemedText style={[styles.cardTitle, { color: isDark ? Colors.dark.text : Colors.light.text }]}>
                {item.aspect}
              </ThemedText>
              {renderTextWithScientificNames(
                item.description,
                [styles.cardDescription, { color: isDark ? Colors.dark.textSecondary : Colors.light.textSecondary }]
              )}
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { padding: 16, paddingBottom: 32 },

  section: { marginBottom: 24 },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 16
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    flex: 1
  },

  card: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    padding: 16,
    marginBottom: 12,
    borderRadius: 12,
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2
  },
  cardIcon: { marginRight: 16, marginTop: 4 },
  cardContent: { flex: 1 },
  cardTitle: { fontSize: 16, fontWeight: '600', marginBottom: 4 },
  cardDescription: { fontSize: 14, lineHeight: 20 }
});