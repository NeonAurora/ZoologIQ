// components/lesson/tiger/sections/TigerEcology.jsx
import React from 'react';
import { ScrollView, View, StyleSheet } from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { ThemedText } from '@/components/ThemedText';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Colors } from '@/constants/Colors';

export default function TigerEcology({ currentLanguage = 'en' }) {
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === 'dark';

  const content = {
    en: {
      ecologyTitle: "Malayan Tiger's Role in Biodiversity",
      biodiversityCards: [
        { 
          title: "Ecosystem Balance", 
          description: "Maintains ecosystem balance by controlling prey populations (e.g., deer, wild boar), preventing overgrazing and habitat degradation (WWF-Malaysia, 2023)", 
          icon: "balance" 
        },
        { 
          title: "Umbrella Species", 
          description: "Tigers are an umbrella species, which means they protect many other species that live in the same rainforest ecosystem, such as birds, insects, and plants (WWF-Malaysia, 2021)", 
          icon: "forest" 
        },
        { 
          title: "Health Indicator", 
          description: "Their presence signals intact, biodiverse forests; decline reflects ecosystem stress (Goodrich et al., 2022)", 
          icon: "health-and-safety" 
        }
      ],
      importanceTitle: "Why Malayan Tigers Matter",
      importanceCards: [
        { 
          title: "National Symbol", 
          description: "Malayan tigers are prominently featured on Malaysia's coat of arms and other national insignia, symbolizing strength and national heritage, and they are widely recognized as the country's national animal (Government of Malaysia & partners, 2008)", 
          icon: "flag" 
        },
        { 
          title: "Economic Value", 
          description: "Malayan tigers help the Ecotourism sector to generate income for local communities", 
          icon: "payments" 
        },
        { 
          title: "Evolutionary Uniqueness", 
          description: "Malayan tigers are one of six surviving tiger subspecies, defined by distinct genetic differences, so losing them would erase a unique evolutionary lineage (Luo et al., 2018)", 
          icon: "biotech" 
        }
      ]
    },
    ms: {
      ecologyTitle: "Peranan Harimau Malaya dalam Biodiversiti",
      biodiversityCards: [
        { 
          title: "Keseimbangan Ekosistem", 
          description: "Mengekalkan keseimbangan ekosistem dengan mengawal populasi mangsa (cth., rusa, babi hutan), mencegah ragut berlebihan dan kemerosotan habitat (WWF-Malaysia, 2023)", 
          icon: "balance" 
        },
        { 
          title: "Spesies Payung", 
          description: "Harimau adalah spesies payung, yang bermaksud mereka melindungi banyak spesies lain yang hidup dalam ekosistem hutan hujan yang sama, seperti burung, serangga, dan tumbuhan (WWF-Malaysia, 2021)", 
          icon: "forest" 
        },
        { 
          title: "Petunjuk Kesihatan", 
          description: "Kehadiran mereka menandakan hutan biodiversiti yang utuh; penurunan mencerminkan tekanan ekosistem (Goodrich et al., 2022)", 
          icon: "health-and-safety" 
        }
      ],
      importanceTitle: "Mengapa Harimau Malaya Penting",
      importanceCards: [
        { 
          title: "Simbol Kebangsaan", 
          description: "Harimau Malaya dipaparkan dengan ketara pada jata negara Malaysia dan lambang kebangsaan lain, melambangkan kekuatan dan warisan negara, dan mereka diiktiraf secara meluas sebagai haiwan kebangsaan negara (Kerajaan Malaysia & rakan kongsi, 2008)", 
          icon: "flag" 
        },
        { 
          title: "Nilai Ekonomi", 
          description: "Harimau Malaya membantu sektor Ekopelancongan menjana pendapatan untuk komuniti tempatan", 
          icon: "payments" 
        },
        { 
          title: "Keunikan Evolusi", 
          description: "Harimau Malaya adalah salah satu daripada enam subspesies harimau yang masih hidup, ditakrifkan oleh perbezaan genetik yang berbeza, jadi kehilangan mereka akan memadamkan keturunan evolusi yang unik (Luo et al., 2018)", 
          icon: "biotech" 
        }
      ]
    }
  };

  const text = content[currentLanguage] || content.en;

  const Section = ({ icon, title, data }) => (
    <View style={styles.section}>
      <View style={styles.header}>
        <MaterialIcons
          name={icon}
          size={20}
          color={isDark ? Colors.dark.tint : Colors.light.tint}
        />
        <ThemedText
          style={[
            styles.headerText,
            { color: isDark ? Colors.dark.text : Colors.light.text }
          ]}
        >
          {title}
        </ThemedText>
      </View>
      <View style={styles.grid}>
        {data.map(({ icon, title, description }, i) => (
          <View
            key={i}
            style={[
              styles.card,
              {
                backgroundColor: isDark
                  ? Colors.dark.surface
                  : Colors.light.surface,
                borderColor: isDark ? Colors.dark.border : Colors.light.border
              }
            ]}
          >
            <MaterialIcons
              name={icon}
              size={24}
              color={isDark ? Colors.dark.tint : Colors.light.tint}
              style={styles.cardIcon}
            />
            <View style={styles.cardContent}>
              <ThemedText
                style={[
                  styles.cardTitle,
                  { color: isDark ? Colors.dark.text : Colors.light.text }
                ]}
              >
                {title}
              </ThemedText>
              <ThemedText
                style={[
                  styles.cardDescription,
                  { color: isDark ? Colors.dark.textSecondary : Colors.light.textSecondary }
                ]}
              >
                {description}
              </ThemedText>
            </View>
          </View>
        ))}
      </View>
    </View>
  );

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Section
        icon="eco"
        title={text.ecologyTitle}
        data={text.biodiversityCards}
      />
      <Section
        icon="star"
        title={text.importanceTitle}
        data={text.importanceCards}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { padding: 16, paddingBottom: 32 },

  section: { marginBottom: 24 },
  header: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 12 },
  headerText: { fontSize: 18, fontWeight: '600' },

  grid: { gap: 12 },
  card: {
    flexDirection: 'row',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    alignItems: 'flex-start',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2
  },
  cardIcon: { marginRight: 16, marginTop: 2 },
  cardContent: { flex: 1 },
  cardTitle: { fontSize: 15, fontWeight: '600', marginBottom: 4 },
  cardDescription: { fontSize: 13, lineHeight: 18 }
});