// components/lesson/turtle/sections/TurtleIntroduction.jsx
import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Colors } from '@/constants/Colors';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

export default function TurtleIntroduction({ currentLanguage = 'en' }) {
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === 'dark';

  // 🔥 BILINGUAL CONTENT - Based on your provided content
  const content = {
    en: {
      // Hero Section
      heroTitle: "Meet the Green Sea Turtle",
      heroSubtitle: "Chelonia mydas",
      heroDescription: "The Green Sea Turtle is a gentle giant of the ocean, named not for its shell but for the green fat beneath it, thanks to its seagrass diet! Found in warm coastal waters and coral reefs, this turtle can grow up to 1 meter and weigh as much as 160 kg.",
      
      // Section Headers
      quickFacts: "Quick Facts",
      ecologicalRole: "Ecological Role",
      biodiversityImportance: "Why Green Sea Turtles Matter in Biodiversity",
      conservationStatus: "Conservation Challenge",
      
      // Basic Info
      basicInfo: [
        { label: 'Common Name', value: 'Green Sea Turtle', icon: 'pets' },
        { label: 'Scientific Name', value: 'Chelonia mydas', icon: 'science' },
        { label: 'Habitat', value: 'Warm oceans, coastal areas, coral reefs', icon: 'waves' },
        { label: 'Physical Features', value: 'Smooth, greenish shell; up to 160 kg, ~1 meter', icon: 'straighten' },
        { label: 'Diet', value: 'Mainly seagrasses and algae', icon: 'grass' },
        { label: 'Reproduction', value: '80–120 eggs per clutch on sandy beaches', icon: 'child_care' },
        { label: 'Lifespan', value: 'About 60–70 years', icon: 'schedule' },
        { label: 'Conservation Status', value: 'Endangered', icon: 'warning' },
      ],
      
      // Ecological Role
      ecologicalRoles: [
        {
          icon: 'grass',
          title: 'Seagrass Maintenance',
          description: 'Grazing helps maintain healthy seagrass meadows, promoting growth and preventing overgrowth',
        },
        {
          icon: 'water',
          title: 'Coral Reef Health',
          description: 'Controls algae on coral reefs, allowing corals to thrive and maintain reef ecosystems',
        },
        {
          icon: 'sync',
          title: 'Nutrient Cycling',
          description: 'Movement between nesting beaches and feeding grounds distributes nutrients, enriching ecosystems',
        },
        {
          icon: 'restaurant',
          title: 'Food Web Dynamics',
          description: 'Eggs and hatchlings are a food source for predators like crabs, birds, and fish',
        },
        {
          icon: 'diversity_3',
          title: 'Biodiversity Support',
          description: 'Seagrass meadows and coral reefs, supported by turtles, provide habitats for diverse marine life',
        },
        {
          icon: 'monitor_heart',
          title: 'Indicator Species',
          description: 'Acts as a biological indicator of ocean health due to its sensitivity to habitat changes',
        }
      ],
      
      // Biodiversity Points
      biodiversityPoints: [
        'Grazing by Chelonia mydas keeps seagrass meadows healthy, preventing overgrowth and fostering biodiversity',
        'Controls algae on coral reefs, promoting a balanced environment for corals and marine life',
        'Transports nutrients between nesting beaches and feeding grounds, enriching ecosystems',
        'Eggs and hatchlings are a vital food source for predators such as birds, crabs, and fish',
        'Maintains seagrass beds that serve as habitats for numerous marine organisms',
        'Acts as an indicator species, reflecting the health of marine ecosystems'
      ],
      
      
      // Conservation CTA
      ctaTitle: "Conservation Challenge",
      ctaText: "These fantastic creatures play a crucial role in maintaining the ocean's health. By munching on seagrass and algae, they prevent overgrowth and allow marine ecosystems to thrive. Their long migrations—from feeding spots to nesting beaches—also help spread nutrients across the seas. Green Sea Turtles live for 60–70 years, but they face many threats like habitat loss, plastic pollution, fishing nets, and climate change. Despite being endangered, conservation efforts around the world—from Malaysia to Costa Rica—are giving them a fighting chance. By protecting beaches, reducing plastic use, and supporting eco-friendly tourism, we can help save this ancient mariner—and the vibrant world it supports."
    },
    ms: {
      // Hero Section
      heroTitle: "Kenali Penyu Agar",
      heroSubtitle: "Chelonia mydas",
      heroDescription: "Penyu Agar ialah gergasi lembut lautan, dinamakan bukan kerana cengkerangnya tetapi kerana lemak hijau di bawahnya—hasil daripada diet rumpai lautnya! Ia ditemui di perairan pantai yang hangat dan terumbu karang, dan boleh membesar sehingga 1 meter panjang serta mencapai berat sehingga 160 kg.",
      
      // Section Headers
      quickFacts: "Fakta Pantas",
      ecologicalRole: "Peranan Ekologi",
      biodiversityImportance: "Mengapa Penyu Agar Penting dalam Kepelbagaian Biologi",
      conservationStatus: "Cabaran Pemuliharaan",
      
      // Basic Info
      basicInfo: [
        { label: 'Nama Biasa', value: 'Penyu Agar', icon: 'pets' },
        { label: 'Nama Saintifik', value: 'Chelonia mydas', icon: 'science' },
        { label: 'Habitat', value: 'Lautan tropika, kawasan pantai, terumbu karang', icon: 'waves' },
        { label: 'Ciri Fizikal', value: 'Cengkerang licin kehijauan; hingga 160 kg, ~1 meter', icon: 'straighten' },
        { label: 'Diet', value: 'Terutamanya rumpai laut dan alga', icon: 'grass' },
        { label: 'Pembiakan', value: '80–120 biji telur setiap sarang di pantai berpasir', icon: 'child_care' },
        { label: 'Jangka Hayat', value: 'Kira-kira 60–70 tahun', icon: 'schedule' },
        { label: 'Status Pemuliharaan', value: 'Terancam', icon: 'warning' },
      ],
      
      // Ecological Role
      ecologicalRoles: [
        {
          icon: 'grass',
          title: 'Penyelenggaraan Rumpai Laut',
          description: 'Pemakanan membantu mengekalkan padang rumpai laut yang sihat, menggalakkan pertumbuhan dan mencegah pertumbuhan berlebihan',
        },
        {
          icon: 'water',
          title: 'Kesihatan Terumbu Karang',
          description: 'Mengawal alga di terumbu karang, membolehkan karang hidup subur dan mengekalkan ekosistem terumbu',
        },
        {
          icon: 'sync',
          title: 'Kitaran Nutrien',
          description: 'Pergerakan antara pantai penetasan dan kawasan makan mengedarkan nutrien, memperkayakan ekosistem',
        },
        {
          icon: 'restaurant',
          title: 'Dinamik Rangkaian Makanan',
          description: 'Telur dan anak penyu menjadi sumber makanan kepada pemangsa seperti ketam, burung, dan ikan',
        },
        {
          icon: 'diversity_3',
          title: 'Sokongan Kepelbagaian Biologi',
          description: 'Padang rumpai laut dan terumbu karang yang disokong oleh penyu menyediakan habitat untuk pelbagai hidupan marin',
        },
        {
          icon: 'monitor_heart',
          title: 'Spesies Penunjuk',
          description: 'Bertindak sebagai penunjuk biologi terhadap kesihatan laut kerana kepekaannya terhadap perubahan habitat',
        }
      ],
      
      // Biodiversity Points
      biodiversityPoints: [
        'Pemakanan oleh Chelonia mydas membantu mengekalkan padang rumpai laut yang sihat, mencegah pertumbuhan berlebihan dan menyokong kepelbagaian biologi',
        'Mengawal pertumbuhan alga di terumbu karang, mewujudkan persekitaran seimbang untuk karang dan hidupan marin',
        'Mengangkut nutrien antara pantai penetasan dan kawasan makan, memperkayakan ekosistem',
        'Telur dan anak penyu menjadi sumber makanan penting kepada pemangsa seperti burung, ketam, dan ikan',
        'Mengekalkan padang rumpai laut yang menjadi habitat bagi pelbagai organisma laut',
        'Bertindak sebagai spesies penunjuk, mencerminkan kesihatan ekosistem marin'
      ],
      
      
      // Conservation CTA
      ctaTitle: "Cabaran Pemuliharaan",
      ctaText: "Makhluk menakjubkan ini memainkan peranan penting dalam mengekalkan kesihatan lautan. Dengan memakan rumpai laut dan alga, mereka mengelakkan pertumbuhan berlebihan dan membolehkan ekosistem marin berkembang maju. Migrasi mereka yang jauh—dari kawasan makan ke pantai penetasan—juga membantu menyebarkan nutrien ke seluruh lautan. Penyu Agar hidup selama 60–70 tahun, tetapi menghadapi pelbagai ancaman seperti kehilangan habitat, pencemaran plastik, jaring perikanan, dan perubahan iklim. Walaupun berstatus terancam, usaha pemuliharaan di seluruh dunia—dari Malaysia hingga Costa Rica—memberikan mereka peluang untuk terus hidup. Dengan melindungi pantai, mengurangkan penggunaan plastik, dan menyokong pelancongan mesra alam, kita dapat membantu menyelamatkan pelayar purba ini—dan dunia laut yang penuh warna yang disokongnya."
    }
  };

  const text = content[currentLanguage] || content.en;

  return (
    <ScrollView 
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      showsVerticalScrollIndicator={false}
    >
      {/* Hero Section */}
      <View style={[
        styles.heroCard,
        { 
          backgroundColor: isDark ? Colors.dark.surface : Colors.light.surface,
          borderColor: isDark ? Colors.dark.border : Colors.light.border,
          borderLeftColor: isDark ? Colors.dark.tint : Colors.light.tint
        }
      ]}>
        <View style={styles.heroHeader}>
          <ThemedText style={styles.heroEmoji}>🐢</ThemedText>
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
          { color: isDark ? Colors.dark.textSecondary : Colors.light.textSecondary }
        ]}>
          {text.heroDescription}
        </ThemedText>
      </View>

      {/* Quick Facts */}
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
                  { 
                    color: info.label.toLowerCase().includes('status') || info.label.toLowerCase().includes('pemuliharaan')
                      ? '#FF5722' 
                      : (isDark ? Colors.dark.text : Colors.light.text)
                  }
                ]}>
                  {info.value}
                </ThemedText>
              </View>
            </View>
          ))}
        </View>
      </View>

      {/* Ecological Role */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <MaterialIcons 
            name="eco" 
            size={20} 
            color={isDark ? Colors.dark.tint : Colors.light.tint} 
          />
          <ThemedText style={[
            styles.sectionTitle,
            { color: isDark ? Colors.dark.text : Colors.light.text }
          ]}>
            {text.ecologicalRole}
          </ThemedText>
        </View>
        
        <View style={styles.rolesGrid}>
          {text.ecologicalRoles.map((role, index) => (
            <View key={index} style={[
              styles.roleCard,
              { 
                backgroundColor: isDark ? Colors.dark.surface : Colors.light.surface,
                borderColor: isDark ? Colors.dark.border : Colors.light.border
              }
            ]}>
              <View style={[
                styles.roleIcon,
                { backgroundColor: isDark ? Colors.dark.tint + '20' : Colors.light.tint + '20' }
              ]}>
                <MaterialIcons 
                  name={role.icon} 
                  size={18} 
                  color={isDark ? Colors.dark.tint : Colors.light.tint} 
                />
              </View>
              <View style={styles.roleContent}>
                <ThemedText style={[
                  styles.roleTitle,
                  { color: isDark ? Colors.dark.text : Colors.light.text }
                ]}>
                  {role.title}
                </ThemedText>
                <ThemedText style={[
                  styles.roleDesc,
                  { color: isDark ? Colors.dark.textSecondary : Colors.light.textSecondary }
                ]}>
                  {role.description}
                </ThemedText>
              </View>
            </View>
          ))}
        </View>
      </View>

      {/* Biodiversity Importance */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <MaterialIcons 
            name="diversity_3" 
            size={20} 
            color={isDark ? Colors.dark.tint : Colors.light.tint} 
          />
          <ThemedText style={[
            styles.sectionTitle,
            { color: isDark ? Colors.dark.text : Colors.light.text }
          ]}>
            {text.biodiversityImportance}
          </ThemedText>
        </View>
        
        <View style={[
          styles.biodiversityCard,
          { 
            backgroundColor: isDark ? Colors.dark.surface : Colors.light.surface,
            borderColor: isDark ? Colors.dark.border : Colors.light.border
          }
        ]}>
          <View style={styles.biodiversityList}>
            {text.biodiversityPoints.map((point, index) => (
              <View key={index} style={styles.biodiversityItem}>
                <View style={[
                  styles.biodiversityBullet,
                  { backgroundColor: isDark ? Colors.dark.tint : Colors.light.tint }
                ]} />
                <ThemedText style={[
                  styles.biodiversityText,
                  { color: isDark ? Colors.dark.text : Colors.light.text }
                ]}>
                  {point}
                </ThemedText>
              </View>
            ))}
          </View>
        </View>
      </View>


      {/* Conservation Call to Action */}
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
            name="shield" 
            size={20} 
            color={isDark ? Colors.dark.tint : Colors.light.tint} 
          />
          <ThemedText style={[
            styles.ctaTitle,
            { color: isDark ? Colors.dark.text : Colors.light.text }
          ]}>
            {text.ctaTitle}
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
  contentContainer: {
    padding: 20,
    paddingBottom: 40,
  },

  // Hero Section
  heroCard: {
    borderRadius: 12,
    padding: 20,
    borderWidth: 1,
    borderLeftWidth: 4,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  heroHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  heroEmoji: {
    fontSize: 28,
    marginRight: 16,
  },
  heroTitleContainer: {
    flex: 1,
  },
  heroTitle: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 4,
  },
  heroSubtitle: {
    fontSize: 16,
    fontStyle: 'italic',
    opacity: 0.8,
  },
  heroDescription: {
    fontSize: 16,
    lineHeight: 24,
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
    fontSize: 20,
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
    fontWeight: '600',
    marginBottom: 4,
    textTransform: 'uppercase',
    opacity: 0.7,
  },
  infoValue: {
    fontSize: 15,
    fontWeight: '500',
    lineHeight: 20,
  },

  // Roles Grid
  rolesGrid: {
    gap: 12,
  },
  roleCard: {
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
  roleIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
    marginTop: 2,
  },
  roleContent: {
    flex: 1,
  },
  roleTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  roleDesc: {
    fontSize: 14,
    lineHeight: 20,
  },

  // Biodiversity Section
  biodiversityCard: {
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  biodiversityList: {
    gap: 12,
  },
  biodiversityItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  biodiversityBullet: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginTop: 8,
    marginRight: 12,
  },
  biodiversityText: {
    fontSize: 15,
    lineHeight: 22,
    flex: 1,
  },


  // Call to Action
  ctaCard: {
    borderRadius: 12,
    padding: 20,
    borderWidth: 1,
    borderLeftWidth: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  ctaHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,
  },
  ctaTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  ctaText: {
    fontSize: 16,
    lineHeight: 24,
  },
});