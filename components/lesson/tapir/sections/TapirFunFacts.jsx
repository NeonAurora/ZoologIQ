// components/lesson/tapir/sections/TapirFunFacts.jsx
import React from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity, Alert, Platform } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Colors } from '@/constants/Colors';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';

export default function TapirFunFacts({ currentLanguage = 'en' }) {
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === 'dark';

  // 🔥 SAFETY: Helper function to ensure we render strings
  const safeRender = (value, fallback = '') => {
    if (typeof value === 'string') return value;
    if (typeof value === 'number') return value.toString();
    if (value === null || value === undefined) return fallback;
    // If it's an object, return fallback to prevent rendering error
    return fallback;
  };

  // 🔒 HARDCODED PDF URL - Replace with your actual PDF URL
  const PDF_DOWNLOAD_URL = "https://ttzwlqozaglnczfdjhnl.supabase.co/storage/v1/object/public/lesson-materials/pdfs/1751086346171.pdf";

  const handleDownloadPDF = async () => {
    try {
      if (Platform.OS === 'web') {
        // Web download
        const link = document.createElement('a');
        link.href = PDF_DOWNLOAD_URL;
        link.download = 'tapir-facts-guide.pdf';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } else {
        // Mobile download
        const downloadResumable = FileSystem.createDownloadResumable(
          PDF_DOWNLOAD_URL,
          FileSystem.documentDirectory + 'tapir-facts-guide.pdf'
        );

        try {
          const { uri } = await downloadResumable.downloadAsync();
          
          // Check if sharing is available
          const isAvailable = await Sharing.isAvailableAsync();
          
          Alert.alert(
            text.downloadComplete,
            '', // ← Empty message
            [
              { text: text.cancel, style: 'default' },
              ...(isAvailable ? [{ 
                text: text.open, 
                onPress: async () => {
                  try {
                    await Sharing.shareAsync(uri, {
                      mimeType: 'application/pdf',
                      dialogTitle: text.openTapirFactsGuide
                    });
                  } catch (shareError) {
                    console.error('Error opening file:', shareError);
                    Alert.alert(text.error, text.unableToOpenFile);
                  }
                },
                style: 'default'
              }] : [])
            ]
          );
        } catch (error) {
          console.error('Download failed:', error);
          Alert.alert(text.downloadFailed, text.unableToDownload);
        }
      }
    } catch (error) {
      console.error('Download error:', error);
      Alert.alert(text.error, text.downloadError);
    }
  };

  // 🔥 NEW: Bilingual content structure
  const content = {
    en: {
      // Section Headers
      amazingTapirFacts: 'Amazing Tapir Facts',
      uniqueAbilities: 'Unique Abilities',
      babyTapirFacts: 'Baby Tapir Facts',
      culturalSignificance: 'Cultural Significance',
      tapirRecordsStats: 'Tapir Records & Stats',
      quirkyBehaviors: 'Quirky Behaviors',
      howTapirsCompare: 'How Tapirs Compare',
      mindBlowingFact: 'Mind-Blowing Fact!',
      downloadPDF: 'Download PDF',
      
      // Alert messages
      downloadComplete: 'Download Complete',
      cancel: 'Cancel',
      open: 'Open',
      error: 'Error',
      downloadFailed: 'Download Failed',
      openTapirFactsGuide: 'Open Tapir Facts Guide',
      unableToOpenFile: 'Unable to open the file. You can find it in your Downloads folder.',
      unableToDownload: 'Unable to download the file. Please try again.',
      downloadError: 'An error occurred while downloading the file.',
      
      // Amazing Facts
      amazingFacts: [
        {
          emoji: '🦖',
          title: 'Living Fossils',
          fact: 'Tapirs have existed for over 20 million years, outliving ice ages and mass extinctions',
          detail: 'They\'ve remained virtually unchanged, earning them the title "living fossils"'
        },
        {
          emoji: '🎨',
          title: 'Nature\'s Paintbrush',
          fact: 'Their black-and-white coloration serves as disruptive camouflage in moonlit forests',
          detail: 'The pattern confuses predators like tigers by breaking up their outline'
        },
        {
          emoji: '🤿',
          title: 'Snorkel Noses',
          fact: 'Their flexible snouts can act like snorkels when swimming',
          detail: 'A trait shared with their distant cousins, elephants'
        },
        {
          emoji: '🌱',
          title: 'Seed Superheroes',
          fact: 'One tapir can disperse thousands of seeds daily',
          detail: 'Earning them the nickname "gardeners of the forest"'
        },
        {
          emoji: '🌙',
          title: 'Nighttime Ninjas',
          fact: 'They\'re strictly nocturnal, using star-lit paths to navigate dense jungles',
          detail: 'Their night vision is specially adapted for forest navigation'
        },
        {
          emoji: '🐴',
          title: 'Odd Relatives',
          fact: 'Despite looking like pigs, they\'re closest to horses and rhinos',
          detail: 'All belong to the Perissodactyla order (odd-toed ungulates)'
        }
      ],
      
      // Unique Abilities
      uniqueAbilities: [
        {
          icon: 'pool',
          ability: 'Underwater Walking',
          description: 'Can walk along riverbeds underwater to escape predators',
          amazement: 'Like aquatic acrobats!'
        },
        {
          icon: 'radio',
          ability: 'Silent Communication',
          description: 'Talk through high-pitched whistles inaudible to humans',
          amazement: 'Secret tapir language!'
        },
        {
          icon: 'nature',
          ability: 'Built-in GPS',
          description: 'Remember complex forest trails and water sources with precision',
          amazement: 'Natural navigation system!'
        },
        {
          icon: 'psychology',
          ability: 'Trunk Dexterity',
          description: 'Use their snout like a fifth limb to grab objects',
          amazement: 'Multi-tool nose!'
        }
      ],
      
      // Baby Facts
      babyFacts: [
        {
          fact: 'Baby Camouflage',
          description: 'Calves are born with striped and spotted coats that fade by 6 months',
          emoji: '🦓'
        },
        {
          fact: 'Swimming Champions',
          description: 'Can swim within hours of birth - crucial in flood-prone rainforests',
          emoji: '🏊‍♂️'
        },
        {
          fact: 'Fast Growers',
          description: 'Triple their weight in the first few weeks of life',
          emoji: '📈'
        },
        {
          fact: 'Early Independence',
          description: 'Start eating plants at just 2 weeks old',
          emoji: '🌿'
        }
      ],
      
      // Cultural Significance
      culturalSignificance: [
        {
          aspect: 'National Symbol',
          description: 'Featured on Malaysia\'s 50-ringgit banknote',
          significance: 'Represents national pride in wildlife conservation',
          icon: 'attach-money'
        },
        {
          aspect: 'Indigenous Lore',
          description: 'Important in Orang Asli traditional stories and beliefs',
          significance: 'Symbol of forest wisdom and harmony',
          icon: 'auto-stories'
        },
        {
          aspect: 'Conservation Icon',
          description: 'Flagship species for Malaysian wildlife protection campaigns',
          significance: 'Raises awareness for entire ecosystem conservation',
          icon: 'campaign'
        },
        {
          aspect: 'Ecotourism Star',
          description: 'Major attraction for wildlife tourists in Southeast Asia',
          significance: 'Generates income while promoting conservation',
          icon: 'camera-alt'
        }
      ],
      
      // Records & Stats
      recordsAndStats: [
        {
          record: 'Longest Gestation',
          stat: '13-14 months',
          detail: 'One of the longest among land mammals',
          icon: 'schedule'
        },
        {
          record: 'Swimming Speed',
          stat: 'Up to 10 km/h',
          detail: 'Faster than most humans can swim',
          icon: 'pool'
        },
        {
          record: 'Daily Foraging',
          stat: '6-8 hours',
          detail: 'Spends most of the night eating',
          icon: 'restaurant'
        },
        {
          record: 'Territory Size',
          stat: '1-4 km²',
          detail: 'Varies based on habitat quality',
          icon: 'map'
        },
        {
          record: 'Seed Dispersal',
          stat: '1,000+ seeds/day',
          detail: 'Essential for forest regeneration',
          icon: 'eco'
        },
        {
          record: 'Weight Range',
          stat: '250-320 kg',
          detail: 'Largest tapir species in the world',
          icon: 'fitness-center'
        }
      ],
      
      // Quirky Behaviors
      quirkyBehaviors: [
        {
          behavior: 'Mud Spa Treatments',
          description: 'Love rolling in mud to cool down and protect skin from insects',
          frequency: 'Daily routine'
        },
        {
          behavior: 'Scent Marking Rituals',
          description: 'Use urine spraying and gland secretions to mark territory',
          frequency: 'Regular communication'
        },
        {
          behavior: 'Solo Dining',
          description: 'Prefer to eat alone, avoiding competition for food',
          frequency: 'Lifelong habit'
        },
        {
          behavior: 'Morning Hide-and-Seek',
          description: 'Find hidden spots to rest during the day',
          frequency: 'Daily disappearing act'
        }
      ],
      
      // Comparisons
      comparisons: [
        {
          comparison: 'vs. Elephants',
          similarity: 'Both have prehensile trunks/snouts',
          difference: 'Tapirs are much smaller and nocturnal'
        },
        {
          comparison: 'vs. Rhinos',
          similarity: 'Both are odd-toed ungulates',
          difference: 'Tapirs are herbivorous browsers vs. grazers'
        },
        {
          comparison: 'vs. Pigs',
          similarity: 'Similar body shape and size',
          difference: 'Not related - just convergent evolution'
        },
        {
          comparison: 'vs. Humans',
          similarity: 'Both are intelligent problem-solvers',
          difference: 'Tapirs have much better swimming skills!'
        }
      ],
      
      // Final Fact
      finalFactText: '🇲🇾 **Malaysia\'s 50-ringgit banknote features the Malayan tapir**, making it one of the few animals to be honored on national currency! This recognition highlights the tapir\'s importance as Malaysia\'s gentle forest guardian and symbol of conservation success.'
    },
    
    ms: {
      // Section Headers
      amazingTapirFacts: 'Fakta Menarik Tapir',
      uniqueAbilities: 'Kebolehan Unik',
      babyTapirFacts: 'Fakta Bayi Tapir',
      culturalSignificance: 'Kepentingan Budaya',
      tapirRecordsStats: 'Rekod & Statistik Tapir',
      quirkyBehaviors: 'Tingkah Laku Unik',
      howTapirsCompare: 'Perbandingan Tapir',
      mindBlowingFact: 'Fakta Menakjubkan!',
      downloadPDF: 'Muat Turun PDF',
      
      // Alert messages
      downloadComplete: 'Muat Turun Selesai',
      cancel: 'Batal',
      open: 'Buka',
      error: 'Ralat',
      downloadFailed: 'Muat Turun Gagal',
      openTapirFactsGuide: 'Buka Panduan Fakta Tapir',
      unableToOpenFile: 'Tidak dapat membuka fail. Anda boleh dapati ia dalam folder Muat Turun.',
      unableToDownload: 'Tidak dapat memuat turun fail. Sila cuba lagi.',
      downloadError: 'Ralat berlaku semasa memuat turun fail.',
      
      // Amazing Facts
      amazingFacts: [
        {
          emoji: '🦖',
          title: 'Fosil Hidup',
          fact: 'Tapir telah wujud selama lebih 20 juta tahun, melebihi zaman ais dan kepupusan besar',
          detail: 'Mereka kekal hampir tidak berubah, menjadikan mereka "fosil hidup"'
        },
        {
          emoji: '🎨',
          title: 'Berus Cat Alam',
          fact: 'Warna hitam-putih mereka berfungsi sebagai penyamaran yang mengelirukan dalam hutan bermandikan cahaya bulan',
          detail: 'Corak ini mengelirukan pemangsa seperti harimau dengan memecahkan siluet mereka'
        },
        {
          emoji: '🤿',
          title: 'Hidung Snorkel',
          fact: 'Muncung fleksibel mereka boleh berfungsi seperti snorkel ketika berenang',
          detail: 'Sifat yang dikongsi dengan sepupu jauh mereka, gajah'
        },
        {
          emoji: '🌱',
          title: 'Pahlawan Benih',
          fact: 'Seekor tapir boleh menyebarkan beribu-ribu biji benih setiap hari',
          detail: 'Menjadikan mereka digelar "tukang kebun hutan"'
        },
        {
          emoji: '🌙',
          title: 'Ninja Malam',
          fact: 'Mereka benar-benar nokturnal, menggunakan jalan bertuah bintang untuk menavigasi hutan tebal',
          detail: 'Penglihatan malam mereka disesuaikan khas untuk navigasi hutan'
        },
        {
          emoji: '🐴',
          title: 'Saudara Pelik',
          fact: 'Walaupun kelihatan seperti babi, mereka paling rapat dengan kuda dan badak',
          detail: 'Semua tergolong dalam order Perissodactyla (ungulata jari ganjil)'
        }
      ],
      
      // Unique Abilities
      uniqueAbilities: [
        {
          icon: 'pool',
          ability: 'Berjalan Bawah Air',
          description: 'Boleh berjalan di sepanjang dasar sungai di bawah air untuk melarikan diri dari pemangsa',
          amazement: 'Seperti aktivit akuatik!'
        },
        {
          icon: 'radio',
          ability: 'Komunikasi Senyap',
          description: 'Bercakap melalui siulan bernada tinggi yang tidak boleh didengar manusia',
          amazement: 'Bahasa rahsia tapir!'
        },
        {
          icon: 'nature',
          ability: 'GPS Terbina',
          description: 'Mengingati jejak hutan yang kompleks dan sumber air dengan tepat',
          amazement: 'Sistem navigasi semula jadi!'
        },
        {
          icon: 'psychology',
          ability: 'Ketangkasan Belalai',
          description: 'Menggunakan muncung mereka seperti anggota kelima untuk memegang objek',
          amazement: 'Hidung pelbagai guna!'
        }
      ],
      
      // Baby Facts
      babyFacts: [
        {
          fact: 'Penyamaran Bayi',
          description: 'Anak dilahirkan dengan bulu belang dan bertompok yang pudar menjelang 6 bulan',
          emoji: '🦓'
        },
        {
          fact: 'Juara Renang',
          description: 'Boleh berenang dalam beberapa jam selepas dilahirkan - penting dalam hutan hujan mudah banjir',
          emoji: '🏊‍♂️'
        },
        {
          fact: 'Pertumbuhan Cepat',
          description: 'Menambah berat badan tiga kali ganda dalam beberapa minggu pertama kehidupan',
          emoji: '📈'
        },
        {
          fact: 'Kemandirian Awal',
          description: 'Mula memakan tumbuhan pada usia hanya 2 minggu',
          emoji: '🌿'
        }
      ],
      
      // Cultural Significance
      culturalSignificance: [
        {
          aspect: 'Simbol Kebangsaan',
          description: 'Dipaparkan pada wang kertas 50-ringgit Malaysia',
          significance: 'Mewakili kebanggaan negara dalam pemuliharaan hidupan liar',
          icon: 'attach-money'
        },
        {
          aspect: 'Cerita Orang Asli',
          description: 'Penting dalam cerita tradisional dan kepercayaan Orang Asli',
          significance: 'Simbol kebijaksanaan hutan dan keharmonian',
          icon: 'auto-stories'
        },
        {
          aspect: 'Ikon Pemuliharaan',
          description: 'Spesies bendera untuk kempen perlindungan hidupan liar Malaysia',
          significance: 'Meningkatkan kesedaran untuk pemuliharaan seluruh ekosistem',
          icon: 'campaign'
        },
        {
          aspect: 'Bintang Eko-pelancongan',
          description: 'Tarikan utama untuk pelancong hidupan liar di Asia Tenggara',
          significance: 'Menjana pendapatan sambil mempromosikan pemuliharaan',
          icon: 'camera-alt'
        }
      ],
      
      // Records & Stats
      recordsAndStats: [
        {
          record: 'Kehamilan Terpanjang',
          stat: '13-14 bulan',
          detail: 'Salah satu yang terpanjang di kalangan mamalia darat',
          icon: 'schedule'
        },
        {
          record: 'Kelajuan Renang',
          stat: 'Sehingga 10 km/j',
          detail: 'Lebih laju daripada kebanyakan manusia berenang',
          icon: 'pool'
        },
        {
          record: 'Mencari Makan Harian',
          stat: '6-8 jam',
          detail: 'Menghabiskan sebahagian besar malam untuk makan',
          icon: 'restaurant'
        },
        {
          record: 'Saiz Wilayah',
          stat: '1-4 km²',
          detail: 'Berbeza berdasarkan kualiti habitat',
          icon: 'map'
        },
        {
          record: 'Penyebaran Benih',
          stat: '1,000+ benih/hari',
          detail: 'Penting untuk pertumbuhan semula hutan',
          icon: 'eco'
        },
        {
          record: 'Julat Berat',
          stat: '250-320 kg',
          detail: 'Spesies tapir terbesar di dunia',
          icon: 'fitness-center'
        }
      ],
      
      // Quirky Behaviors
      quirkyBehaviors: [
        {
          behavior: 'Rawatan Spa Lumpur',
          description: 'Suka berguling dalam lumpur untuk menyejukkan badan dan melindungi kulit dari serangga',
          frequency: 'Rutin harian'
        },
        {
          behavior: 'Ritual Penandaan Bau',
          description: 'Menggunakan semburan air kencing dan rembesan kelenjar untuk menanda wilayah',
          frequency: 'Komunikasi tetap'
        },
        {
          behavior: 'Makan Bersendirian',
          description: 'Lebih suka makan sendirian, mengelakkan persaingan untuk makanan',
          frequency: 'Tabiat sepanjang hayat'
        },
        {
          behavior: 'Sorok-sorok Pagi',
          description: 'Mencari tempat tersembunyi untuk berehat pada siang hari',
          frequency: 'Aksi menghilang harian'
        }
      ],
      
      // Comparisons
      comparisons: [
        {
          comparison: 'lawan Gajah',
          similarity: 'Kedua-duanya mempunyai belalai/muncung prehensil',
          difference: 'Tapir jauh lebih kecil dan nokturnal'
        },
        {
          comparison: 'lawan Badak',
          similarity: 'Kedua-duanya adalah ungulata jari ganjil',
          difference: 'Tapir adalah pemakan tumbuhan vs. pemakan rumput'
        },
        {
          comparison: 'lawan Babi',
          similarity: 'Bentuk badan dan saiz yang serupa',
          difference: 'Tidak berkaitan - hanya evolusi konvergen'
        },
        {
          comparison: 'lawan Manusia',
          similarity: 'Kedua-duanya adalah penyelesai masalah yang pintar',
          difference: 'Tapir mempunyai kemahiran renang yang jauh lebih baik!'
        }
      ],
      
      // Final Fact
      finalFactText: '🇲🇾 **Wang kertas 50-ringgit Malaysia memaparkan tapir Malaya**, menjadikannya salah satu daripada sedikit haiwan yang dihormati pada mata wang negara! Pengiktirafan ini menyerlahkan kepentingan tapir sebagai penjaga hutan Malaysia yang lembut dan simbol kejayaan pemuliharaan.'
    }
  };

  const language = currentLanguage; // <- from prop, not supabase
  const text = content[language] || content.en;

  // 🔥 SAFETY: Ensure arrays exist before mapping
  const safeAmazingFacts = Array.isArray(text.amazingFacts) ? text.amazingFacts : [];
  const safeUniqueAbilities = Array.isArray(text.uniqueAbilities) ? text.uniqueAbilities : [];
  const safeBabyFacts = Array.isArray(text.babyFacts) ? text.babyFacts : [];
  const safeCulturalSignificance = Array.isArray(text.culturalSignificance) ? text.culturalSignificance : [];
  const safeRecordsAndStats = Array.isArray(text.recordsAndStats) ? text.recordsAndStats : [];
  const safeQuirkyBehaviors = Array.isArray(text.quirkyBehaviors) ? text.quirkyBehaviors : [];
  const safeComparisons = Array.isArray(text.comparisons) ? text.comparisons : [];

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* Amazing Facts */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <MaterialIcons 
            name="auto-awesome" 
            size={20} 
            color={isDark ? Colors.dark.tint : Colors.light.tint} 
          />
          <ThemedText style={[
            styles.sectionTitle,
            { color: isDark ? Colors.dark.text : Colors.light.text }
          ]}>
            {safeRender(text.amazingTapirFacts)}
          </ThemedText>
        </View>
        
        <View style={styles.factsGrid}>
          {safeAmazingFacts.map((fact, index) => (
            <View key={index} style={[
              styles.factCard,
              { 
                backgroundColor: isDark ? Colors.dark.surface : Colors.light.surface,
                borderColor: isDark ? Colors.dark.border : Colors.light.border
              }
            ]}>
              <View style={styles.factHeader}>
                <ThemedText style={styles.factEmoji}>{safeRender(fact.emoji)}</ThemedText>
                <ThemedText style={[
                  styles.factTitle,
                  { color: isDark ? Colors.dark.text : Colors.light.text }
                ]}>
                  {safeRender(fact.title)}
                </ThemedText>
              </View>
              <ThemedText style={[
                styles.factText,
                { color: isDark ? Colors.dark.textSecondary : Colors.light.textSecondary }
              ]}>
                {safeRender(fact.fact)}
              </ThemedText>
              <View style={[
                styles.factDetail,
                { backgroundColor: isDark ? Colors.dark.backgroundSecondary : '#F8F9FA' }
              ]}>
                <ThemedText style={[
                  styles.factDetailText,
                  { color: isDark ? Colors.dark.text : Colors.light.text }
                ]}>
                  💡 {safeRender(fact.detail)}
                </ThemedText>
              </View>
            </View>
          ))}
        </View>
      </View>

      {/* Unique Abilities */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <MaterialIcons 
            name="stars" 
            size={20} 
            color={isDark ? Colors.dark.tint : Colors.light.tint} 
          />
          <ThemedText style={[
            styles.sectionTitle,
            { color: isDark ? Colors.dark.text : Colors.light.text }
          ]}>
            {safeRender(text.uniqueAbilities)}
          </ThemedText>
        </View>
        
        <View style={styles.abilitiesGrid}>
          {safeUniqueAbilities.map((ability, index) => (
            <View key={index} style={[
              styles.abilityCard,
              { 
                backgroundColor: isDark ? Colors.dark.surface : Colors.light.surface,
                borderColor: isDark ? Colors.dark.border : Colors.light.border
              }
            ]}>
              <View style={styles.abilityHeader}>
                <View style={[
                  styles.abilityIcon,
                  { backgroundColor: '#9C27B020' }
                ]}>
                  <MaterialIcons 
                    name={ability.icon} 
                    size={20} 
                    color="#9C27B0" 
                  />
                </View>
                <ThemedText style={[
                  styles.abilityTitle,
                  { color: isDark ? Colors.dark.text : Colors.light.text }
                ]}>
                  {safeRender(ability.ability)}
                </ThemedText>
              </View>
              <ThemedText style={[
                styles.abilityDesc,
                { color: isDark ? Colors.dark.textSecondary : Colors.light.textSecondary }
              ]}>
                {safeRender(ability.description)}
              </ThemedText>
              <ThemedText style={[
                styles.abilityAmazement,
                { color: '#9C27B0' }
              ]}>
                ✨ {safeRender(ability.amazement)}
              </ThemedText>
            </View>
          ))}
        </View>
      </View>

      {/* Baby Facts */}
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
            {safeRender(text.babyTapirFacts)}
          </ThemedText>
        </View>
        
        <View style={styles.babyGrid}>
          {safeBabyFacts.map((baby, index) => (
            <View key={index} style={[
              styles.babyCard,
              { 
                backgroundColor: isDark ? Colors.dark.surface : Colors.light.surface,
                borderColor: isDark ? Colors.dark.border : Colors.light.border
              }
            ]}>
              <View style={styles.babyHeader}>
                <ThemedText style={styles.babyEmoji}>{safeRender(baby.emoji)}</ThemedText>
                <ThemedText style={[
                  styles.babyFact,
                  { color: isDark ? Colors.dark.text : Colors.light.text }
                ]}>
                  {safeRender(baby.fact)}
                </ThemedText>
              </View>
              <ThemedText style={[
                styles.babyDesc,
                { color: isDark ? Colors.dark.textSecondary : Colors.light.textSecondary }
              ]}>
                {safeRender(baby.description)}
              </ThemedText>
            </View>
          ))}
        </View>
      </View>

      {/* Cultural Significance */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <MaterialIcons 
            name="public" 
            size={20} 
            color={isDark ? Colors.dark.tint : Colors.light.tint} 
          />
          <ThemedText style={[
            styles.sectionTitle,
            { color: isDark ? Colors.dark.text : Colors.light.text }
          ]}>
            {safeRender(text.culturalSignificance)}
          </ThemedText>
        </View>
        
        <View style={styles.culturalGrid}>
          {safeCulturalSignificance.map((culture, index) => (
            <View key={index} style={[
              styles.cultureCard,
              { 
                backgroundColor: isDark ? Colors.dark.surface : Colors.light.surface,
                borderColor: isDark ? Colors.dark.border : Colors.light.border
              }
            ]}>
              <View style={styles.cultureHeader}>
                <View style={[
                  styles.cultureIcon,
                  { backgroundColor: isDark ? Colors.dark.tint + '20' : Colors.light.tint + '20' }
                ]}>
                  <MaterialIcons 
                    name={culture.icon} 
                    size={20} 
                    color={isDark ? Colors.dark.tint : Colors.light.tint} 
                  />
                </View>
                <ThemedText style={[
                  styles.cultureAspect,
                  { color: isDark ? Colors.dark.text : Colors.light.text }
                ]}>
                  {safeRender(culture.aspect)}
                </ThemedText>
              </View>
              <ThemedText style={[
                styles.cultureDesc,
                { color: isDark ? Colors.dark.textSecondary : Colors.light.textSecondary }
              ]}>
                {safeRender(culture.description)}
              </ThemedText>
              <View style={[
                styles.significanceBox,
                { backgroundColor: isDark ? Colors.dark.tint + '10' : Colors.light.tint + '10' }
              ]}>
                <ThemedText style={[
                  styles.significanceText,
                  { color: isDark ? Colors.dark.text : Colors.light.text }
                ]}>
                  🌟 {safeRender(culture.significance)}
                </ThemedText>
              </View>
            </View>
          ))}
        </View>
      </View>

      {/* Records & Stats */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <MaterialIcons 
            name="trending-up" 
            size={20} 
            color={isDark ? Colors.dark.tint : Colors.light.tint} 
          />
          <ThemedText style={[
            styles.sectionTitle,
            { color: isDark ? Colors.dark.text : Colors.light.text }
          ]}>
            {safeRender(text.tapirRecordsStats)}
          </ThemedText>
        </View>
        
        <View style={styles.recordsGrid}>
          {safeRecordsAndStats.map((record, index) => (
            <View key={index} style={[
              styles.recordCard,
              { 
                backgroundColor: isDark ? Colors.dark.surface : Colors.light.surface,
                borderColor: isDark ? Colors.dark.border : Colors.light.border
              }
            ]}>
              <View style={styles.recordHeader}>
                <MaterialIcons 
                  name={record.icon} 
                  size={24} 
                  color="#4CAF50" 
                />
                <View style={styles.recordInfo}>
                  <ThemedText style={[
                    styles.recordTitle,
                    { color: isDark ? Colors.dark.text : Colors.light.text }
                  ]}>
                    {safeRender(record.record)}
                  </ThemedText>
                  <ThemedText style={[
                    styles.recordStat,
                    { color: '#4CAF50' }
                  ]}>
                    {safeRender(record.stat)}
                  </ThemedText>
                </View>
              </View>
              <ThemedText style={[
                styles.recordDetail,
                { color: isDark ? Colors.dark.textSecondary : Colors.light.textSecondary }
              ]}>
                {safeRender(record.detail)}
              </ThemedText>
            </View>
          ))}
        </View>
      </View>

      {/* Quirky Behaviors */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <MaterialIcons 
            name="psychology" 
            size={20} 
            color={isDark ? Colors.dark.tint : Colors.light.tint} 
          />
          <ThemedText style={[
            styles.sectionTitle,
            { color: isDark ? Colors.dark.text : Colors.light.text }
          ]}>
            {safeRender(text.quirkyBehaviors)}
          </ThemedText>
        </View>
        
        <View style={styles.behaviorsGrid}>
          {safeQuirkyBehaviors.map((behavior, index) => (
            <View key={index} style={[
              styles.behaviorCard,
              { 
                backgroundColor: isDark ? Colors.dark.surface : Colors.light.surface,
                borderColor: isDark ? Colors.dark.border : Colors.light.border
              }
            ]}>
              <ThemedText style={[
                styles.behaviorTitle,
                { color: isDark ? Colors.dark.text : Colors.light.text }
              ]}>
                🎭 {safeRender(behavior.behavior)}
              </ThemedText>
              <ThemedText style={[
                styles.behaviorDesc,
                { color: isDark ? Colors.dark.textSecondary : Colors.light.textSecondary }
              ]}>
                {safeRender(behavior.description)}
              </ThemedText>
              <ThemedText style={[
                styles.behaviorFrequency,
                { color: isDark ? Colors.dark.textMuted : '#666' }
              ]}>
                📅 {safeRender(behavior.frequency)}
              </ThemedText>
            </View>
          ))}
        </View>
      </View>

      {/* Animal Comparisons */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <MaterialIcons 
            name="compare" 
            size={20} 
            color={isDark ? Colors.dark.tint : Colors.light.tint} 
          />
          <ThemedText style={[
            styles.sectionTitle,
            { color: isDark ? Colors.dark.text : Colors.light.text }
          ]}>
            {safeRender(text.howTapirsCompare)}
          </ThemedText>
        </View>
        
        <View style={styles.comparisonsGrid}>
          {safeComparisons.map((comp, index) => (
            <View key={index} style={[
              styles.comparisonCard,
              { 
                backgroundColor: isDark ? Colors.dark.surface : Colors.light.surface,
                borderColor: isDark ? Colors.dark.border : Colors.light.border
              }
            ]}>
              <ThemedText style={[
                styles.comparisonTitle,
                { color: isDark ? Colors.dark.text : Colors.light.text }
              ]}>
                🆚 Tapir {safeRender(comp.comparison)}
              </ThemedText>
              <View style={styles.comparisonDetails}>
                <View style={[
                  styles.similarityBox,
                  { backgroundColor: '#4CAF5010' }
                ]}>
                  <ThemedText style={[
                    styles.similarityText,
                    { color: isDark ? Colors.dark.text : Colors.light.text }
                  ]}>
                    ✅ {safeRender(comp.similarity)}
                  </ThemedText>
                </View>
                <View style={[
                  styles.differenceBox,
                  { backgroundColor: '#2196F310' }
                ]}>
                  <ThemedText style={[
                    styles.differenceText,
                    { color: isDark ? Colors.dark.text : Colors.light.text }
                  ]}>
                    🔄 {safeRender(comp.difference)}
                  </ThemedText>
                </View>
              </View>
            </View>
          ))}
        </View>
      </View>

      {/* Final Fun Fact */}
      <View style={[
        styles.finalFactCard,
        { 
          backgroundColor: isDark ? Colors.dark.surface : Colors.light.surface,
          borderColor: isDark ? Colors.dark.border : Colors.light.border,
          borderLeftColor: '#FF9800'
        }
      ]}>
        <View style={styles.finalFactHeader}>
          <MaterialIcons 
            name="celebration" 
            size={24} 
            color="#FF9800" 
          />
          <ThemedText style={[
            styles.finalFactTitle,
            { color: isDark ? Colors.dark.text : Colors.light.text }
          ]}>
            {safeRender(text.mindBlowingFact)}
          </ThemedText>
        </View>
        <ThemedText style={[
          styles.finalFactText,
          { color: isDark ? Colors.dark.textSecondary : Colors.light.textSecondary }
        ]}>
          {safeRender(text.finalFactText)}
        </ThemedText>
      </View>

      {/* 🔥 Simple Download Button */}
      <View style={styles.downloadSection}>
        <TouchableOpacity 
          style={[
            styles.simpleDownloadButton,
            { backgroundColor: isDark ? Colors.dark.tint : Colors.light.tint }
          ]}
          onPress={handleDownloadPDF}
          activeOpacity={0.8}
        >
          <MaterialIcons name="file-download" size={18} color="#fff" />
          <ThemedText style={styles.simpleDownloadText}>{safeRender(text.downloadPDF)}</ThemedText>
        </TouchableOpacity>
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
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
  },

  // Facts Grid
  factsGrid: {
    gap: 16,
  },
  factCard: {
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  factHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  factEmoji: {
    fontSize: 24,
    marginRight: 12,
  },
  factTitle: {
    fontSize: 16,
    fontWeight: '600',
    flex: 1,
  },
  factText: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 8,
  },
  factDetail: {
    padding: 8,
    borderRadius: 6,
  },
  factDetailText: {
    fontSize: 13,
    lineHeight: 18,
  },

  // Abilities Grid
  abilitiesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  abilityCard: {
    width: '48%',
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
    minHeight: 120,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  abilityHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  abilityIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },
  abilityTitle: {
    fontSize: 13,
    fontWeight: '600',
    flex: 1,
  },
  abilityDesc: {
    fontSize: 12,
    lineHeight: 16,
    marginBottom: 6,
  },
  abilityAmazement: {
    fontSize: 11,
    fontWeight: '500',
  },

  // Baby Grid
  babyGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  babyCard: {
    width: '48%',
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
    minHeight: 100,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  babyHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  babyEmoji: {
    fontSize: 20,
    marginRight: 8,
  },
  babyFact: {
    fontSize: 13,
    fontWeight: '600',
    flex: 1,
  },
  babyDesc: {
    fontSize: 12,
    lineHeight: 16,
  },

  // Cultural Grid
  culturalGrid: {
    gap: 12,
  },
  cultureCard: {
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  cultureHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  cultureIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  cultureAspect: {
    fontSize: 16,
    fontWeight: '600',
    flex: 1,
  },
  cultureDesc: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 8,
  },
  significanceBox: {
    padding: 8,
    borderRadius: 6,
  },
  significanceText: {
    fontSize: 13,
    lineHeight: 18,
  },

  // Records Grid
  recordsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  recordCard: {
    width: '48%',
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
    minHeight: 100,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  recordHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  recordInfo: {
    marginLeft: 8,
    flex: 1,
  },
  recordTitle: {
    fontSize: 13,
    fontWeight: '600',
    marginBottom: 2,
  },
  recordStat: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  recordDetail: {
    fontSize: 12,
    lineHeight: 16,
  },

  // Behaviors Grid
  behaviorsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  behaviorCard: {
    width: '48%',
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
    minHeight: 100,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  behaviorTitle: {
    fontSize: 13,
    fontWeight: '600',
    marginBottom: 6,
  },
  behaviorDesc: {
    fontSize: 12,
    lineHeight: 16,
    marginBottom: 4,
  },
  behaviorFrequency: {
    fontSize: 11,
  },

  // Comparisons Grid
  comparisonsGrid: {
    gap: 12,
  },
  comparisonCard: {
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  comparisonTitle: {
    fontSize: 15,
    fontWeight: '600',
    marginBottom: 12,
  },
  comparisonDetails: {
    gap: 8,
  },
  similarityBox: {
    padding: 8,
    borderRadius: 6,
  },
  similarityText: {
    fontSize: 13,
    lineHeight: 18,
  },
  differenceBox: {
    padding: 8,
    borderRadius: 6,
  },
  differenceText: {
    fontSize: 13,
    lineHeight: 18,
  },

  // Final Fact Card
  finalFactCard: {
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderLeftWidth: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  finalFactHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,
  },
  finalFactTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  finalFactText: {
    fontSize: 15,
    lineHeight: 22,
  },
  downloadSection: {
    alignItems: 'center',
    marginTop: 16,
    marginBottom: 8,
  },
  simpleDownloadButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    gap: 6,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  simpleDownloadText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
});