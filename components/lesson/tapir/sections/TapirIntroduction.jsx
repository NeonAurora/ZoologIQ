// components/lesson/tapir/sections/TapirIntroduction.jsx
import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Colors } from '@/constants/Colors';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

export default function TapirIntroduction({ currentLanguage = 'en' }) {
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === 'dark';

  // 🔥 BILINGUAL CONTENT - Structured from your provided content
  const content = {
    en: {
      // Hero Section
      heroTitle: "Malaysia's Gentle Forest Guardian",
      heroSubtitle: "The Malayan Tapir (Tapirus indicus)",
      heroDescription: "With its striking black-and-white \"panda-like\" coloring and shy personality, the Malayan tapir is one of Southeast Asia's most unique and ancient mammals. Often called the \"forest gardener\", this elusive creature plays a crucial role in maintaining healthy rainforests.",
      criticalStatus: "**Critical Status:** Fewer than 2,500 individuals remain in the wild, with Malaysia being their last stronghold.",
      
      // Section Headers
      quickFacts: "Quick Facts",
      whatMakesSpecial: "What Makes Tapirs Special",
      whyMatters: "Why the Malayan Tapir Matters",
      scientificClassification: "Scientific Classification",
      bePartOfSolution: "Be Part of the Solution",
      
      // Basic Info
      basicInfo: [
        { label: 'Scientific Name', value: 'Tapirus indicus', icon: 'science' },
        { label: 'Conservation Status', value: 'Endangered (IUCN)', icon: 'warning' },
        { label: 'Population', value: '< 2,500 in wild', icon: 'groups' },
        { label: 'Lifespan', value: '25-30 years', icon: 'schedule' },
      ],
      
      // Key Features
      keyFeatures: [
        {
          icon: 'palette',
          title: 'Distinctive Coloring',
          description: 'Black and white "panda-like" pattern for camouflage',
          color: '#9C27B0'
        },
        {
          icon: 'nature',
          title: 'Forest Gardener',
          description: 'Spreads thousands of seeds daily, maintaining forest diversity',
          color: '#4CAF50'
        },
        {
          icon: 'location-on',
          title: 'Asian Endemic',
          description: 'Only tapir species in Asia, found in Malaysia, Thailand, and Sumatra',
          color: '#FF9800'
        },
        {
          icon: 'visibility-off',
          title: 'Nocturnal & Shy',
          description: 'Active at night, avoiding human contact',
          color: '#3F51B5'
        }
      ],
      
      // Why It Matters
      whyItMatters: [
        {
          icon: 'eco',
          title: 'Ecosystem Engineer',
          description: 'Controls plant growth and maintains forest balance through selective browsing'
        },
        {
          icon: 'health-and-safety',
          title: 'Biodiversity Indicator',
          description: 'Healthy tapir populations signal well-functioning ecosystems'
        },
        {
          icon: 'history',
          title: 'Living Fossil',
          description: 'Survived 20+ million years, representing ancient evolutionary lineage'
        },
        {
          icon: 'public',
          title: 'Cultural Symbol',
          description: 'Featured on Malaysia\'s 50-ringgit banknote as conservation icon'
        }
      ],
      
      // Taxonomy
      taxonomy: [
        { rank: 'Kingdom', name: 'Animalia' },
        { rank: 'Phylum', name: 'Chordata' },
        { rank: 'Class', name: 'Mammalia' },
        { rank: 'Order', name: 'Perissodactyla' },
        { rank: 'Family', name: 'Tapiridae' },
        { rank: 'Genus', name: 'Tapirus' },
        { rank: 'Species', name: 'T. indicus' }
      ],
      
      // Call to Action
      ctaText: "By learning about the Malayan tapir, you're already contributing to conservation efforts. Knowledge leads to awareness, and awareness leads to action that can help save this remarkable species."
    },
    
    ms: {
      // Hero Section
      heroTitle: "Penjaga Hutan Malaysia yang Lembut",
      heroSubtitle: "Tapir Malaya (Tapirus indicus)",
      heroDescription: "Dengan warna hitam-putihnya yang mencolok seperti panda dan sifat pemalu, tapir Malaya adalah salah satu mamalia paling unik dan purba di Asia Tenggara. Sering dijuluki \"tukang kebun hutan\", makhluk misterius ini memainkan peranan penting dalam mengekalkan kesihatan hutan hujan.",
      criticalStatus: "**Status Kritikal:** Kurang daripada 2,500 ekor masih tinggal di alam liar, dengan Malaysia menjadi kubu terakhirnya.",
      
      // Section Headers
      quickFacts: "Fakta Pantas",
      whatMakesSpecial: "Apa yang Menjadikan Tapir Istimewa",
      whyMatters: "Mengapa Tapir Malaya Penting",
      scientificClassification: "Klasifikasi Saintifik",
      bePartOfSolution: "Menjadi Sebahagian Penyelesaian",
      
      // Basic Info
      basicInfo: [
        { label: 'Nama Saintifik', value: 'Tapirus indicus', icon: 'science' },
        { label: 'Status Pemuliharaan', value: 'Terancam (IUCN)', icon: 'warning' },
        { label: 'Populasi', value: '< 2,500 di alam liar', icon: 'groups' },
        { label: 'Jangka Hayat', value: '25-30 tahun', icon: 'schedule' },
      ],
      
      // Key Features
      keyFeatures: [
        {
          icon: 'palette',
          title: 'Warna Tersendiri',
          description: 'Corak hitam-putih seperti "panda" untuk penyamaran',
          color: '#9C27B0'
        },
        {
          icon: 'nature',
          title: 'Tukang Kebun Hutan',
          description: 'Menyebarkan beribu-ribu biji benih setiap hari, mengekalkan kepelbagaian hutan',
          color: '#4CAF50'
        },
        {
          icon: 'location-on',
          title: 'Endemik Asia',
          description: 'Satu-satunya spesies tapir di Asia, ditemui di Malaysia, Thailand, dan Sumatera',
          color: '#FF9800'
        },
        {
          icon: 'visibility-off',
          title: 'Nokturnal & Pemalu',
          description: 'Aktif pada waktu malam, mengelakkan hubungan dengan manusia',
          color: '#3F51B5'
        }
      ],
      
      // Why It Matters
      whyItMatters: [
        {
          icon: 'eco',
          title: 'Jurutera Ekosistem',
          description: 'Mengawal pertumbuhan tumbuhan dan mengekalkan keseimbangan hutan melalui pemakanan terpilih'
        },
        {
          icon: 'health-and-safety',
          title: 'Petunjuk Biodiversiti',
          description: 'Populasi tapir yang sihat menandakan ekosistem yang berfungsi dengan baik'
        },
        {
          icon: 'history',
          title: 'Fosil Hidup',
          description: 'Bertahan selama 20+ juta tahun, mewakili keturunan evolusi purba'
        },
        {
          icon: 'public',
          title: 'Simbol Budaya',
          description: 'Dipaparkan pada wang kertas 50-ringgit Malaysia sebagai ikon pemuliharaan'
        }
      ],
      
      // Taxonomy
      taxonomy: [
        { rank: 'Kingdom', name: 'Animalia' },
        { rank: 'Filum', name: 'Chordata' },
        { rank: 'Kelas', name: 'Mammalia' },
        { rank: 'Order', name: 'Perissodactyla' },
        { rank: 'Keluarga', name: 'Tapiridae' },
        { rank: 'Genus', name: 'Tapirus' },
        { rank: 'Spesies', name: 'T. indicus' }
      ],
      
      // Call to Action
      ctaText: "Dengan mempelajari tentang tapir Malaya, anda sudah menyumbang kepada usaha pemuliharaan. Pengetahuan membawa kepada kesedaran, dan kesedaran membawa kepada tindakan yang boleh membantu menyelamatkan spesies luar biasa ini."
    }
  };

  const text = content[currentLanguage] || content.en;

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* Hero Introduction */}
      <View style={[
        styles.heroCard,
        { 
          backgroundColor: isDark ? Colors.dark.surface : Colors.light.surface,
          borderColor: isDark ? Colors.dark.border : Colors.light.border
        }
      ]}>
        <View style={styles.heroHeader}>
          <ThemedText style={styles.heroEmoji}>🦌</ThemedText>
          <View style={styles.heroTitleContainer}>
            <ThemedText style={[
              styles.heroTitle,
              { color: isDark ? Colors.dark.text : Colors.light.text }
            ]}>
              {text.heroTitle}
            </ThemedText>
            <ThemedText style={[
              styles.heroSubtitle,
              { color: isDark ? Colors.dark.textSecondary : Colors.light.textSecondary }
            ]}>
              {text.heroSubtitle}
            </ThemedText>
          </View>
        </View>
        
        <ThemedText style={[
          styles.heroDescription,
          { color: isDark ? Colors.dark.text : Colors.light.text }
        ]}>
          {text.heroDescription}
        </ThemedText>

        <View style={[
          styles.alertBox,
          { 
            backgroundColor: isDark ? '#B71C1C20' : '#FFEBEE',
            borderLeftColor: '#F44336'
          }
        ]}>
          <MaterialIcons name="warning" size={20} color="#F44336" />
          <ThemedText style={[
            styles.alertText,
            { color: isDark ? Colors.dark.text : Colors.light.text }
          ]}>
            {text.criticalStatus}
          </ThemedText>
        </View>
      </View>

      {/* Basic Information */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <MaterialIcons 
            name="info" 
            size={20} 
            color={isDark ? Colors.dark.tint : Colors.light.tint} 
          />
          <ThemedText style={[
            styles.sectionTitle,
            { color: isDark ? Colors.dark.text : Colors.light.text }
          ]}>
            {text.quickFacts}
          </ThemedText>
        </View>
        
        <View style={styles.infoGrid}>
          {text.basicInfo.map((info, index) => (
            <View key={index} style={[
              styles.infoCard,
              { 
                backgroundColor: isDark ? Colors.dark.surface : Colors.light.surface,
                borderColor: isDark ? Colors.dark.border : Colors.light.border
              }
            ]}>
              <View style={[
                styles.infoIcon,
                { backgroundColor: isDark ? Colors.dark.tint + '20' : Colors.light.tint + '20' }
              ]}>
                <MaterialIcons 
                  name={info.icon} 
                  size={20} 
                  color={isDark ? Colors.dark.tint : Colors.light.tint} 
                />
              </View>
              <View style={styles.infoContent}>
                <ThemedText style={[
                  styles.infoLabel,
                  { color: isDark ? Colors.dark.textSecondary : Colors.light.textSecondary }
                ]}>
                  {info.label}
                </ThemedText>
                <ThemedText style={[
                  styles.infoValue,
                  { color: isDark ? Colors.dark.text : Colors.light.text }
                ]}>
                  {info.value}
                </ThemedText>
              </View>
            </View>
          ))}
        </View>
      </View>

      {/* Key Features */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <MaterialIcons 
            name="star" 
            size={20} 
            color={isDark ? Colors.dark.tint : Colors.light.tint} 
          />
          <ThemedText style={[
            styles.sectionTitle,
            { color: isDark ? Colors.dark.text : Colors.light.text }
          ]}>
            {text.whatMakesSpecial}
          </ThemedText>
        </View>
        
        <View style={styles.featuresGrid}>
          {text.keyFeatures.map((feature, index) => (
            <View key={index} style={[
              styles.featureCard,
              { 
                backgroundColor: isDark ? Colors.dark.surface : Colors.light.surface,
                borderColor: isDark ? Colors.dark.border : Colors.light.border
              }
            ]}>
              <View style={[
                styles.featureIcon,
                { backgroundColor: feature.color + '20' }
              ]}>
                <MaterialIcons 
                  name={feature.icon} 
                  size={20} 
                  color={feature.color} 
                />
              </View>
              <View style={styles.featureContent}>
                <ThemedText style={[
                  styles.featureTitle,
                  { color: isDark ? Colors.dark.text : Colors.light.text }
                ]}>
                  {feature.title}
                </ThemedText>
                <ThemedText style={[
                  styles.featureDesc,
                  { color: isDark ? Colors.dark.textSecondary : Colors.light.textSecondary }
                ]}>
                  {feature.description}
                </ThemedText>
              </View>
            </View>
          ))}
        </View>
      </View>

      {/* Why Tapirs Matter */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <MaterialIcons 
            name="favorite" 
            size={20} 
            color={isDark ? Colors.dark.tint : Colors.light.tint} 
          />
          <ThemedText style={[
            styles.sectionTitle,
            { color: isDark ? Colors.dark.text : Colors.light.text }
          ]}>
            {text.whyMatters}
          </ThemedText>
        </View>
        
        <View style={styles.importanceList}>
          {text.whyItMatters.map((item, index) => (
            <View key={index} style={[
              styles.importanceItem,
              { 
                backgroundColor: isDark ? Colors.dark.surface : Colors.light.surface,
                borderColor: isDark ? Colors.dark.border : Colors.light.border
              }
            ]}>
              <View style={[
                styles.importanceIcon,
                { backgroundColor: isDark ? Colors.dark.tint + '20' : Colors.light.tint + '20' }
              ]}>
                <MaterialIcons 
                  name={item.icon} 
                  size={18} 
                  color={isDark ? Colors.dark.tint : Colors.light.tint} 
                />
              </View>
              <View style={styles.importanceContent}>
                <ThemedText style={[
                  styles.importanceTitle,
                  { color: isDark ? Colors.dark.text : Colors.light.text }
                ]}>
                  {item.title}
                </ThemedText>
                <ThemedText style={[
                  styles.importanceDesc,
                  { color: isDark ? Colors.dark.textSecondary : Colors.light.textSecondary }
                ]}>
                  {item.description}
                </ThemedText>
              </View>
            </View>
          ))}
        </View>
      </View>

      {/* Taxonomic Classification */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <MaterialIcons 
            name="account-tree" 
            size={20} 
            color={isDark ? Colors.dark.tint : Colors.light.tint} 
          />
          <ThemedText style={[
            styles.sectionTitle,
            { color: isDark ? Colors.dark.text : Colors.light.text }
          ]}>
            {text.scientificClassification}
          </ThemedText>
        </View>
        
        <View style={[
          styles.taxonomyCard,
          { 
            backgroundColor: isDark ? Colors.dark.surface : Colors.light.surface,
            borderColor: isDark ? Colors.dark.border : Colors.light.border
          }
        ]}>
          {text.taxonomy.map((item, index) => (
            <View key={index} style={styles.taxonomyRow}>
              <ThemedText style={[
                styles.taxonomyRank,
                { color: isDark ? Colors.dark.textSecondary : Colors.light.textSecondary }
              ]}>
                {item.rank}:
              </ThemedText>
              <ThemedText style={[
                styles.taxonomyName,
                { color: isDark ? Colors.dark.text : Colors.light.text }
              ]}>
                {item.name}
              </ThemedText>
            </View>
          ))}
        </View>
      </View>

      {/* Call to Action */}
      <View style={[
        styles.ctaCard,
        { 
          backgroundColor: isDark ? Colors.dark.surface : Colors.light.surface,
          borderColor: isDark ? Colors.dark.border : Colors.light.border,
          borderLeftColor: isDark ? Colors.dark.tint : Colors.light.tint
        }
      ]}>
        <View style={styles.ctaHeader}>
          <MaterialIcons 
            name="lightbulb" 
            size={20} 
            color={isDark ? Colors.dark.tint : Colors.light.tint} 
          />
          <ThemedText style={[
            styles.ctaTitle,
            { color: isDark ? Colors.dark.text : Colors.light.text }
          ]}>
            {text.bePartOfSolution}
          </ThemedText>
        </View>
        <ThemedText style={[
          styles.ctaText,
          { color: isDark ? Colors.dark.textSecondary : Colors.light.textSecondary }
        ]}>
          {text.ctaText}
        </ThemedText>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: 16,
    paddingBottom: 32,
  },

  // Hero Section
  heroCard: {
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  heroHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  heroEmoji: {
    fontSize: 32,
    marginRight: 16,
  },
  heroTitleContainer: {
    flex: 1,
  },
  heroTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  heroSubtitle: {
    fontSize: 16,
    fontStyle: 'italic',
  },
  heroDescription: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 16,
  },
  alertBox: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    padding: 12,
    borderRadius: 8,
    borderLeftWidth: 4,
  },
  alertText: {
    fontSize: 14,
    lineHeight: 20,
    marginLeft: 8,
    flex: 1,
  },

  // Section Structure
  section: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
  },

  // Info Grid
  infoGrid: {
    gap: 12,
  },
  infoCard: {
    flexDirection: 'row',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  infoIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  infoContent: {
    flex: 1,
  },
  infoLabel: {
    fontSize: 12,
    marginBottom: 2,
  },
  infoValue: {
    fontSize: 16,
    fontWeight: '600',
  },

  // Features Grid
  featuresGrid: {
    gap: 12,
  },
  featureCard: {
    flexDirection: 'row',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  featureIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  featureContent: {
    flex: 1,
  },
  featureTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  featureDesc: {
    fontSize: 14,
    lineHeight: 20,
  },

  // Importance List
  importanceList: {
    gap: 12,
  },
  importanceItem: {
    flexDirection: 'row',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    alignItems: 'flex-start',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  importanceIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
    marginTop: 2,
  },
  importanceContent: {
    flex: 1,
  },
  importanceTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  importanceDesc: {
    fontSize: 14,
    lineHeight: 20,
  },

  // Taxonomy
  taxonomyCard: {
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  taxonomyRow: {
    flexDirection: 'row',
    paddingVertical: 6,
  },
  taxonomyRank: {
    fontSize: 14,
    width: 80,
  },
  taxonomyName: {
    fontSize: 14,
    fontWeight: '500',
    flex: 1,
  },

  // Call to Action
  ctaCard: {
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderLeftWidth: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  ctaHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,
  },
  ctaTitle: {
    fontSize: 16,
    fontWeight: '600',
  },
  ctaText: {
    fontSize: 15,
    lineHeight: 22,
  },
});