// components/lesson/tiger/sections/TigerIntroduction.jsx
import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Colors } from '@/constants/Colors';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

export default function TigerIntroduction({ currentLanguage = 'en' }) {
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === 'dark';

  // 🔥 BILINGUAL CONTENT - Structured from your provided Tiger content
  const content = {
    en: {
      // Hero Section
      heroTitle: "Malaysia's Critically Endangered National Symbol",
      heroSubtitle: "The Malayan Tiger (Panthera tigris jacksoni)",
      heroDescription: "Malaysia's critically endangered national symbol, with fewer than 150 remaining in the wild. These apex predators maintain healthy forests by controlling prey populations, while their habitats provide clean water and store carbon. Threatened by habitat loss, poaching, and human conflict, their survival depends on immediate conservation action. Everyone in Malaysia can help protect these iconic stripes for future generations.",
      criticalStatus: "**Critical Status:** Fewer than 150 individuals remain in the wild, making this one of the world's most endangered tiger subspecies.",
      
      // Section Headers
      quickFacts: "Quick Facts",
      whatMakesSpecial: "What Makes Malayan Tigers Special",
      whyMatters: "Why the Malayan Tiger Matters",
      scientificClassification: "Scientific Classification",
      bePartOfSolution: "Be Part of the Solution",
      
      // Basic Info
      basicInfo: [
        { label: 'Scientific Name', value: 'Panthera tigris jacksoni', icon: 'science' },
        { label: 'Conservation Status', value: 'Critically Endangered (IUCN)', icon: 'warning' },
        { label: 'Population', value: '< 150 in wild', icon: 'groups' },
        { label: 'Lifespan', value: '15-20 years in wild', icon: 'schedule' },
      ],
      
      // Key Features
      keyFeatures: [
        {
          icon: 'straighten',
          title: 'Smallest Mainland Tiger',
          description: 'Males: 2.5-2.8m long, 120-130kg. Smaller than other tiger subspecies',
          color: '#FF9800'
        },
        {
          icon: 'palette',
          title: 'Distinctive Coloring',
          description: 'Darker orange coat with black stripes, unique fingerprint-like patterns',
          color: '#9C27B0'
        },
        {
          icon: 'visibility',
          title: 'Night Vision Expert',
          description: 'Eyes glow in dark due to reflective layer, perfect night hunters',
          color: '#3F51B5'
        },
        {
          icon: 'pool',
          title: 'Swimming Star',
          description: 'Unlike most cats, they love water and swim to cool off or hunt',
          color: '#00BCD4'
        }
      ],
      
      // Why It Matters
      whyItMatters: [
        {
          icon: 'eco',
          title: 'Ecosystem Engineer',
          description: 'Regulates prey populations, preventing overgrazing and maintaining forest balance'
        },
        {
          icon: 'eco',
          title: 'Ecosystem Engineer',
          description: 'Protecting tiger habitats safeguards countless other species'
        },
        {
          icon: 'eco',
          title: 'Ecosystem Engineer',
          description: 'Indirectly aids forest regeneration by influencing herbivore behavior, which shapes plant distribution'
        },
        {
          icon: 'eco',
          title: 'Ecosystem Engineer',
          description: 'It is deeply rooted in Indigenous folklore '
        },
        {
          icon: 'eco',
          title: 'Ecosystem Engineer',
          description: 'Healthy tiger habitats support agriculture and clean water sources'
        },
        {
          icon: 'flag',
          title: 'National Heritage',
          description: 'Featured on Malaysia\'s coat of arms and currency, representing strength and heritage'
        },
        {
          icon: 'health-and-safety',
          title: 'Biodiversity Indicator',
          description: 'Healthy tiger populations signal well-functioning, biodiverse ecosystems'
        },
        {
          icon: 'account-balance',
          title: 'Economic Value',
          description: 'Ecotourism generates RM5 million for local communities through tiger-friendly tourism'
        },
        {
          icon: 'public',
          title: 'Climate Guardian',
          description: 'Protecting tiger forests stores carbon—Malaysia\'s rainforests absorb ~1.2 billion tons annually'
        },
        {
          icon: 'biotech',
          title: 'Unique Genetics',
          description: 'One of only 6 surviving tiger subspecies with distinct DNA—losing them erases unique evolution'
        }
      ],
      
      // Taxonomy
      taxonomy: [
        { rank: 'Kingdom', name: 'Animalia' },
        { rank: 'Phylum', name: 'Chordata' },
        { rank: 'Class', name: 'Mammalia' },
        { rank: 'Order', name: 'Carnivora' },
        { rank: 'Family', name: 'Felidae' },
        { rank: 'Genus', name: 'Panthera' },
        { rank: 'Species', name: 'P. tigris' },
        { rank: 'Subspecies', name: 'P. t. jacksoni' }
      ],
      
      // Call to Action
      ctaText: "Every Malaysian can help protect these iconic stripes for future generations. By learning about the Malayan tiger, you're already contributing to conservation efforts. Knowledge leads to awareness, and awareness leads to action that can save this remarkable species."
    },
    
    ms: {
      // Hero Section
      heroTitle: "Simbol Kebangsaan Malaysia yang Kritikal Terancam",
      heroSubtitle: "Harimau Malaya (Panthera tigris jacksoni)",
      heroDescription: "Harimau Malaya (Panthera tigris jacksoni) adalah simbol kebangsaan Malaysia yang kini berada dalam keadaan kritikal terancam, dengan kurang daripada 150 ekor yang masih tinggal di hutan. Predator puncak ini mengekalkan kesihatan hutan dengan mengawal populasi mangsa, sementara habitat mereka menyediakan air bersih dan menyimpan karbon. Terancam oleh kehilangan habitat, pemburuan haram, dan konflik dengan manusia, kelangsungan hidup mereka bergantung pada tindakan pemuliharaan segera. Setiap rakyat Malaysia boleh membantu melindungi belang ikonik ini untuk generasi akan datang.",
      criticalStatus: "**Status Kritikal:** Kurang daripada 150 individu masih tinggal di alam liar, menjadikan ini salah satu subspesies harimau paling terancam di dunia.",
      
      // Section Headers
      quickFacts: "Fakta Pantas",
      whatMakesSpecial: "Apa yang Menjadikan Harimau Malaya Istimewa",
      whyMatters: "Mengapa Harimau Malaya Penting",
      scientificClassification: "Klasifikasi Saintifik",
      bePartOfSolution: "Menjadi Sebahagian Penyelesaian",
      
      // Basic Info
      basicInfo: [
        { label: 'Nama Saintifik', value: 'Panthera tigris jacksoni', icon: 'science' },
        { label: 'Status Pemuliharaan', value: 'Kritikal Terancam (IUCN)', icon: 'warning' },
        { label: 'Populasi', value: '< 150 di alam liar', icon: 'groups' },
        { label: 'Jangka Hayat', value: '15-20 tahun di alam liar', icon: 'schedule' },
      ],
      
      // Key Features
      keyFeatures: [
        {
          icon: 'straighten',
          title: 'Harimau Tanah Besar Terkecil',
          description: 'Jantan: 2.5-2.8m panjang, 120-130kg. Lebih kecil daripada subspesies harimau lain',
          color: '#FF9800'
        },
        {
          icon: 'palette',
          title: 'Warna Tersendiri',
          description: 'Bulu oren gelap dengan belang hitam, corak unik seperti cap jari',
          color: '#9C27B0'
        },
        {
          icon: 'visibility',
          title: 'Pakar Penglihatan Malam',
          description: 'Mata bersinar dalam gelap kerana lapisan pemantul, pemburu malam yang sempurna',
          color: '#3F51B5'
        },
        {
          icon: 'pool',
          title: 'Perenang Handal',
          description: 'Tidak seperti kebanyakan kucing, mereka suka air dan berenang untuk menyejukkan badan',
          color: '#00BCD4'
        }
      ],
      
      // Why It Matters
      whyItMatters: [
        {
          icon: 'eco',
          title: 'Jurutera Ekosistem',
          description: 'Mengawal populasi mangsa, mencegah overgrazing dan mengekalkan keseimbangan hutan'
        },
        {
          icon: 'flag',
          title: 'Warisan Kebangsaan',
          description: 'Dipaparkan pada jata negara dan mata wang Malaysia, melambangkan kekuatan dan warisan'
        },
        {
          icon: 'health-and-safety',
          title: 'Petunjuk Biodiversiti',
          description: 'Populasi harimau yang sihat menandakan ekosistem yang berfungsi baik dan kaya biodiversiti'
        },
        {
          icon: 'account-balance',
          title: 'Nilai Ekonomi',
          description: 'Ekopelancongan menjana RM5 juta untuk komuniti tempatan melalui pelancongan mesra harimau'
        },
        {
          icon: 'public',
          title: 'Penjaga Iklim',
          description: 'Melindungi hutan harimau menyimpan karbon—hutan hujan Malaysia menyerap ~1.2 bilion tan setiap tahun'
        },
        {
          icon: 'biotech',
          title: 'Genetik Unik',
          description: 'Salah satu daripada 6 subspesies harimau yang masih wujud dengan DNA tersendiri—kehilangan mereka memadamkan evolusi unik'
        }
      ],
      
      // Taxonomy
      taxonomy: [
        { rank: 'Kingdom', name: 'Animalia' },
        { rank: 'Filum', name: 'Chordata' },
        { rank: 'Kelas', name: 'Mammalia' },
        { rank: 'Order', name: 'Carnivora' },
        { rank: 'Keluarga', name: 'Felidae' },
        { rank: 'Genus', name: 'Panthera' },
        { rank: 'Spesies', name: 'P. tigris' },
        { rank: 'Subspesies', name: 'P. t. jacksoni' }
      ],
      
      // Call to Action
      ctaText: "Setiap rakyat Malaysia boleh membantu melindungi belang ikonik ini untuk generasi akan datang. Dengan mempelajari tentang harimau Malaya, anda sudah menyumbang kepada usaha pemuliharaan. Pengetahuan membawa kepada kesedaran, dan kesedaran membawa kepada tindakan yang boleh menyelamatkan spesies luar biasa ini."
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
          <ThemedText style={styles.heroEmoji}>🐅</ThemedText>
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

      {/* Why Tigers Matter */}
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
    width: 90,
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