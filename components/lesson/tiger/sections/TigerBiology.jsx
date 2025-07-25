// components/lesson/tiger/sections/TigerBiology.jsx
import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Colors } from '@/constants/Colors';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

export default function TigerBiology({ currentLanguage = 'en' }) {
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === 'dark';

  // 🔥 BILINGUAL CONTENT - Structured from Tiger content
  const content = {
    en: {
      // Section Headers
      factSheet: 'Fact Sheet',
      classification: 'Scientific Classification',
      keyAdaptations: 'Key Adaptations',
      physiologyFacts: 'Physiology & Behavior Facts',
      reproductionFamily: 'Reproduction & Family Life',
      
      // Fact Sheet Data
      factSheetData: [
        { label: 'Scientific Name', value: 'Panthera tigris jacksoni' },
        { label: 'Conservation Status', value: 'Critically Endangered (IUCN Red List)' },
        { label: 'Population', value: 'Fewer than 150 individuals in the wild (2023)' },
        { label: 'Habitat', value: 'Tropical rainforests of Peninsular Malaysia' },
        { label: 'Male Size', value: '2.5–2.8 m long, 120–130 kg' },
        { label: 'Female Size', value: '~2.3 m long, 80–100 kg' },
        { label: 'Diet', value: 'Carnivorous (deer, wild boar, sun bears, livestock)' },
        { label: 'Lifespan', value: '15–20 years in wild; up to 25 in captivity' },
        { label: 'Territory Size', value: '50–150 km² per adult' },
        { label: 'Bite Force', value: '1,000 psi (can crush bones)' },
        { label: 'Jump Distance', value: 'Over 5 meters in one leap' },
        { label: 'Swimming Ability', value: 'Excellent swimmers, unlike most cats' },
      ],
      
      // Taxonomy
      taxonomy: [
        { rank: 'Kingdom', name: 'Animalia', common: 'Animals' },
        { rank: 'Phylum', name: 'Chordata', common: 'Vertebrates' },
        { rank: 'Class', name: 'Mammalia', common: 'Mammals' },
        { rank: 'Order', name: 'Carnivora', common: 'Carnivores' },
        { rank: 'Family', name: 'Felidae', common: 'Cats' },
        { rank: 'Genus', name: 'Panthera', common: 'Big Cats' },
        { rank: 'Species', name: 'Panthera tigris', common: 'Tiger' },
        { rank: 'Subspecies', name: 'P. t. jacksoni', common: 'Malayan Tiger' },
      ],

      // Key Adaptations
      adaptations: [
        {
          icon: 'pets',
          title: 'Powerful Bite',
          description: '1,000 psi bite force can crush bones—perfect for taking down large prey',
          color: '#FF6B35'
        },
        {
          icon: 'pool',
          title: 'Swimming Star',
          description: 'Unlike most cats, they love water and swim to cool off or hunt aquatic prey',
          color: '#2196F3'
        },
        {
          icon: 'visibility',
          title: 'Night Vision Pro',
          description: 'Eyes glow in dark due to reflective layer (tapetum lucidum) for perfect night hunting',
          color: '#4CAF50'
        },
        {
          icon: 'straighten',
          title: 'Mini but Mighty',
          description: 'Smallest mainland tiger subspecies yet can leap over 5 meters in one jump',
          color: '#9C27B0'
        },
        {
          icon: 'palette',
          title: 'Camouflage Kings',
          description: 'Orange-and-black stripes blend perfectly with sunlight and shadows in forests',
          color: '#FF9800'
        },
        {
          icon: 'record-voice-over',
          title: 'Chatty Cats',
          description: 'Communicate with roars, growls, and "chuffing" sounds (friendly greeting)',
          color: '#795548'
        }
      ],

      // Physiology Facts
      physiologyFactsData: [
        'No two tigers have the same stripe pattern—just like human fingerprints',
        'Their jaw strength (1,000 psi) can crush bones with ease',
        'Night vision is 6x better than humans thanks to reflective eye layer',
        'Can sprint up to 65 km/h in short bursts when hunting',
        'Whiskers detect tiny air movements to sense prey in darkness',
        'Territorial markers: spray urine and scratch trees to mark territory',
        'Mini but Mighty: smallest mainland tiger subspecies yet can leap over 5 meters',
        'Swimming Stars: unlike most cats, they love water and swim to cool off'
      ],

      // Reproduction & Family
      reproductionFacts: [
        'Slow Breeders: Females give birth to 2–4 cubs every 2–3 years',
        'Pregnancy lasts 3–4 months before cubs are born',
        'Super Moms: Cubs stay with mothers for 18–24 months to learn hunting',
        'Dad\'s Role: Males don\'t raise cubs but protect territory from rivals',
        'Solo Travelers: Adults live alone, needing 50–150 km² of territory',
        'Smart Hunters: They mimic prey calls (e.g., deer sounds) to lure them closer'
      ]
    },
    
    ms: {
      // Section Headers
      factSheet: 'Lembaran Fakta',
      classification: 'Klasifikasi Saintifik',
      keyAdaptations: 'Adaptasi Utama',
      physiologyFacts: 'Fakta Fisiologi & Tingkah Laku',
      reproductionFamily: 'Pembiakan & Kehidupan Keluarga',
      
      // Fact Sheet Data
      factSheetData: [
        { label: 'Nama Saintifik', value: 'Panthera tigris jacksoni' },
        { label: 'Status Pemuliharaan', value: 'Kritikal Terancam (Senarai Merah IUCN)' },
        { label: 'Populasi', value: 'Kurang daripada 150 individu di alam liar (2023)' },
        { label: 'Habitat', value: 'Hutan hujan tropika di Semenanjung Malaysia' },
        { label: 'Saiz Jantan', value: '2.5–2.8 m panjang, 120–130 kg' },
        { label: 'Saiz Betina', value: '~2.3 m panjang, 80–100 kg' },
        { label: 'Diet', value: 'Karnivor (rusa, babi hutan, beruang matahari, ternakan)' },
        { label: 'Jangka Hayat', value: '15–20 tahun di alam liar; sehingga 25 tahun dalam kurungan' },
        { label: 'Saiz Wilayah', value: '50–150 km² setiap dewasa' },
        { label: 'Kekuatan Gigitan', value: '1,000 psi (mampu mematahkan tulang)' },
        { label: 'Jarak Lompatan', value: 'Lebih 5 meter dalam satu lompatan' },
        { label: 'Kemampuan Berenang', value: 'Perenang handal, tidak seperti kebanyakan kucing' },
      ],
      
      // Taxonomy
      taxonomy: [
        { rank: 'Kingdom', name: 'Animalia', common: 'Haiwan' },
        { rank: 'Filum', name: 'Chordata', common: 'Vertebrat' },
        { rank: 'Kelas', name: 'Mammalia', common: 'Mamalia' },
        { rank: 'Order', name: 'Carnivora', common: 'Karnivor' },
        { rank: 'Keluarga', name: 'Felidae', common: 'Kucing' },
        { rank: 'Genus', name: 'Panthera', common: 'Kucing Besar' },
        { rank: 'Spesies', name: 'Panthera tigris', common: 'Harimau' },
        { rank: 'Subspesies', name: 'P. t. jacksoni', common: 'Harimau Malaya' },
      ],

      // Key Adaptations
      adaptations: [
        {
          icon: 'pets',
          title: 'Gigitan Kuat',
          description: 'Kekuatan gigitan 1,000 psi mampu mematahkan tulang—sempurna untuk menumbangkan mangsa besar',
          color: '#FF6B35'
        },
        {
          icon: 'pool',
          title: 'Perenang Handal',
          description: 'Tidak seperti kebanyakan kucing, mereka suka air dan berenang untuk menyejukkan badan atau memburu',
          color: '#2196F3'
        },
        {
          icon: 'visibility',
          title: 'Pakar Penglihatan Malam',
          description: 'Mata bersinar dalam gelap kerana lapisan pemantul (tapetum lucidum) untuk pemburuan malam sempurna',
          color: '#4CAF50'
        },
        {
          icon: 'straighten',
          title: 'Kecil tapi Gagah',
          description: 'Subspesies harimau tanah besar terkecil tetapi mampu melompat lebih 5 meter',
          color: '#9C27B0'
        },
        {
          icon: 'palette',
          title: 'Raja Penyamaran',
          description: 'Belang oren-hitam menyamai sempurna dengan cahaya matahari dan bayang-bayang di hutan',
          color: '#FF9800'
        },
        {
          icon: 'record-voice-over',
          title: 'Kucing yang Bercakap-cakap',
          description: 'Berkomunikasi dengan raungan, geraman, dan bunyi "chuffing" (sapaan mesra)',
          color: '#795548'
        }
      ],

      // Physiology Facts
      physiologyFactsData: [
        'Tiada dua harimau yang mempunyai corak belang sama—seperti cap jari manusia',
        'Kekuatan rahang mereka (1,000 psi) mampu mematahkan tulang dengan mudah',
        'Penglihatan malam 6x lebih baik daripada manusia kerana lapisan mata pemantul',
        'Boleh berlari sehingga 65 km/j dalam jarak pendek semasa memburu',
        'Misai mengesan pergerakan udara kecil untuk merasai mangsa dalam kegelapan',
        'Penanda wilayah: menyembur air kencing dan mencakar pokok untuk menanda wilayah',
        'Kecil tapi Gagah: subspesies harimau tanah besar terkecil namun boleh melompat lebih 5 meter',
        'Perenang Handal: tidak seperti kebanyakan kucing, mereka suka air dan berenang untuk menyejukkan badan'
      ],

      // Reproduction & Family
      reproductionFacts: [
        'Pembiak Lambat: Betina melahirkan 2–4 anak setiap 2–3 tahun',
        'Mengandung selama 3–4 bulan sebelum anak dilahirkan',
        'Ibu yang Hebat: Anak tinggal dengan ibu selama 18–24 bulan untuk belajar memburu',
        'Peranan Bapa: Jantan tidak membesarkan anak tetapi melindungi wilayah dari saingan',
        'Pengembara Solo: Dewasa hidup bersendirian, memerlukan wilayah 50–150 km²',
        'Pemburu Bijak: Meniru panggilan mangsa (contohnya bunyi rusa) untuk memikat mendekat'
      ]
    }
  };

  const text = content[currentLanguage] || content.en;
  
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* Fact Sheet Section */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <MaterialIcons 
            name="description" 
            size={20} 
            color={isDark ? Colors.dark.tint : Colors.light.tint} 
          />
          <ThemedText style={[
            styles.sectionTitle,
            { color: isDark ? Colors.dark.text : Colors.light.text }
          ]}>
            {text.factSheet}
          </ThemedText>
        </View>
        
        <View style={[
          styles.factSheet,
          { 
            backgroundColor: isDark ? Colors.dark.surface : Colors.light.surface,
            borderColor: isDark ? Colors.dark.border : Colors.light.border
          }
        ]}>
          {text.factSheetData.map((fact, index) => (
            <View key={index} style={[
              styles.factRow,
              index !== text.factSheetData.length - 1 && {
                borderBottomColor: isDark ? Colors.dark.border : Colors.light.border,
                borderBottomWidth: 1
              }
            ]}>
              <ThemedText style={[
                styles.factLabel,
                { color: isDark ? Colors.dark.textSecondary : Colors.light.textSecondary }
              ]}>
                {fact.label}
              </ThemedText>
              <ThemedText style={[
                styles.factValue,
                { color: isDark ? Colors.dark.text : Colors.light.text }
              ]}>
                {fact.value}
              </ThemedText>
            </View>
          ))}
        </View>
      </View>

      {/* Taxonomy Section */}
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
            {text.classification}
          </ThemedText>
        </View>
        
        <View style={[
          styles.taxonomyTable,
          { 
            backgroundColor: isDark ? Colors.dark.surface : Colors.light.surface,
            borderColor: isDark ? Colors.dark.border : Colors.light.border
          }
        ]}>
          {text.taxonomy.map((tax, index) => (
            <View key={index} style={[
              styles.taxonomyRow,
              index !== text.taxonomy.length - 1 && {
                borderBottomColor: isDark ? Colors.dark.border : Colors.light.border,
                borderBottomWidth: 1
              }
            ]}>
              <ThemedText style={[
                styles.taxonomyRank,
                { color: isDark ? Colors.dark.textSecondary : Colors.light.textSecondary }
              ]}>
                {tax.rank}
              </ThemedText>
              <ThemedText style={[
                styles.taxonomyName,
                { color: isDark ? Colors.dark.text : Colors.light.text }
              ]}>
                {tax.name}
              </ThemedText>
              <ThemedText style={[
                styles.taxonomyCommon,
                { color: isDark ? Colors.dark.textSecondary : Colors.light.textSecondary }
              ]}>
                {tax.common}
              </ThemedText>
            </View>
          ))}
        </View>
      </View>

      {/* Adaptations Section */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <MaterialIcons 
            name="fitness-center" 
            size={20} 
            color={isDark ? Colors.dark.tint : Colors.light.tint} 
          />
          <ThemedText style={[
            styles.sectionTitle,
            { color: isDark ? Colors.dark.text : Colors.light.text }
          ]}>
            {text.keyAdaptations}
          </ThemedText>
        </View>
        
        <View style={styles.adaptationsGrid}>
          {text.adaptations.map((adaptation, index) => (
            <View key={index} style={[
              styles.adaptationCard,
              { 
                backgroundColor: isDark ? Colors.dark.surface : Colors.light.surface,
                borderColor: isDark ? Colors.dark.border : Colors.light.border
              }
            ]}>
              <View style={[
                styles.adaptationIcon,
                { backgroundColor: adaptation.color + '20' }
              ]}>
                <MaterialIcons 
                  name={adaptation.icon} 
                  size={24} 
                  color={adaptation.color} 
                />
              </View>
              <View style={styles.adaptationContent}>
                <ThemedText style={[
                  styles.adaptationTitle,
                  { color: isDark ? Colors.dark.text : Colors.light.text }
                ]}>
                  {adaptation.title}
                </ThemedText>
                <ThemedText style={[
                  styles.adaptationDesc,
                  { color: isDark ? Colors.dark.textSecondary : Colors.light.textSecondary }
                ]}>
                  {adaptation.description}
                </ThemedText>
              </View>
            </View>
          ))}
        </View>
      </View>

      {/* Physiology Facts Section */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <MaterialIcons 
            name="biotech" 
            size={20} 
            color={isDark ? Colors.dark.tint : Colors.light.tint} 
          />
          <ThemedText style={[
            styles.sectionTitle,
            { color: isDark ? Colors.dark.text : Colors.light.text }
          ]}>
            {text.physiologyFacts}
          </ThemedText>
        </View>
        
        <View style={[
          styles.factsContainer,
          { 
            backgroundColor: isDark ? Colors.dark.surface : Colors.light.surface,
            borderColor: isDark ? Colors.dark.border : Colors.light.border
          }
        ]}>
          {text.physiologyFactsData.map((fact, index) => (
            <View key={index} style={styles.factItem}>
              <View style={[
                styles.factBullet,
                { backgroundColor: isDark ? Colors.dark.tint : Colors.light.tint }
              ]} />
              <ThemedText style={[
                styles.factText,
                { color: isDark ? Colors.dark.text : Colors.light.text }
              ]}>
                {fact}
              </ThemedText>
            </View>
          ))}
        </View>
      </View>

      {/* Reproduction & Family Section */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <MaterialIcons 
            name="family-restroom" 
            size={20} 
            color={isDark ? Colors.dark.tint : Colors.light.tint} 
          />
          <ThemedText style={[
            styles.sectionTitle,
            { color: isDark ? Colors.dark.text : Colors.light.text }
          ]}>
            {text.reproductionFamily}
          </ThemedText>
        </View>
        
        <View style={[
          styles.factsContainer,
          { 
            backgroundColor: isDark ? Colors.dark.surface : Colors.light.surface,
            borderColor: isDark ? Colors.dark.border : Colors.light.border
          }
        ]}>
          {text.reproductionFacts.map((fact, index) => (
            <View key={index} style={styles.factItem}>
              <View style={[
                styles.factBullet,
                { backgroundColor: isDark ? Colors.dark.tint : Colors.light.tint }
              ]} />
              <ThemedText style={[
                styles.factText,
                { color: isDark ? Colors.dark.text : Colors.light.text }
              ]}>
                {fact}
              </ThemedText>
            </View>
          ))}
        </View>
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
  
  // Section Structure
  section: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
  },

  // Fact Sheet
  factSheet: {
    borderRadius: 12,
    borderWidth: 1,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  factRow: {
    flexDirection: 'row',
    paddingVertical: 12,
    paddingHorizontal: 16,
    minHeight: 48,
    alignItems: 'center',
  },
  factLabel: {
    fontSize: 14,
    fontWeight: '500',
    flex: 1,
    marginRight: 12,
  },
  factValue: {
    fontSize: 14,
    flex: 2,
    textAlign: 'right',
  },

  // Taxonomy Table
  taxonomyTable: {
    borderRadius: 12,
    borderWidth: 1,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  taxonomyRow: {
    flexDirection: 'row',
    paddingVertical: 10,
    paddingHorizontal: 16,
    minHeight: 44,
    alignItems: 'center',
  },
  taxonomyRank: {
    fontSize: 13,
    fontWeight: '600',
    flex: 1,
  },
  taxonomyName: {
    fontSize: 13,
    fontStyle: 'italic',
    flex: 1.5,
  },
  taxonomyCommon: {
    fontSize: 13,
    flex: 1,
    textAlign: 'right',
  },

  // Adaptations Grid
  adaptationsGrid: {
    gap: 12,
  },
  adaptationCard: {
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
  adaptationIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  adaptationContent: {
    flex: 1,
  },
  adaptationTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  adaptationDesc: {
    fontSize: 14,
    lineHeight: 20,
  },

  // Facts Container
  factsContainer: {
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  factItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  factBullet: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginTop: 8,
    marginRight: 12,
  },
  factText: {
    fontSize: 15,
    lineHeight: 22,
    flex: 1,
  },
});