// components/lesson/tiger/sections/TigerReferences.jsx
import React from 'react';
import {
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Linking,
  Alert,
  View
} from 'react-native';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Colors } from '@/constants/Colors';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

export default function TigerReferences() {
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === 'dark';

  // theme-based colors
  const bgSurface    = isDark ? Colors.dark.surface    : Colors.light.surface;
  const bdColor      = isDark ? Colors.dark.border     : Colors.light.border;
  const bgSecondary  = isDark ? Colors.dark.backgroundSecondary : Colors.light.backgroundSecondary;
  const tint         = isDark ? Colors.dark.tint       : Colors.light.tint;
  const txtPrimary   = isDark ? Colors.dark.text       : Colors.light.text;
  const txtSecondary = isDark ? Colors.dark.textSecondary : Colors.light.textSecondary;
  const txtMuted     = isDark ? Colors.dark.textMuted  : Colors.light.textMuted;

  // 🔥 NEW: Helper function to render text with scientific names in italic
  const renderTextWithScientificNames = (text, style) => {
    if (!text || typeof text !== 'string') {
      return <ThemedText style={style}>{text}</ThemedText>;
    }

    // Pattern to match scientific names (genus + species format)
    // This will match "Panthera tigris" and "Panthera tigris jacksoni"
    const scientificNamePattern = /(Panthera tigris(?:\s+jacksoni)?)/g;
    const parts = text.split(scientificNamePattern);
    
    if (parts.length === 1) {
      // No scientific names found, return normal text
      return <ThemedText style={style}>{text}</ThemedText>;
    }
    
    return (
      <ThemedText style={style}>
        {parts.map((part, index) => {
          // Check if this part is a scientific name
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

  const references = [
    { authors: 'Adnan, M.', year: '2020', title: 'Marine protected areas in Malaysia: Challenges and opportunities', source: 'Marine Policy, 45, 89-97', url: 'https://doi.org/xxxx' },
    { authors: 'Department of Wildlife and National Parks [DWNP]', year: '2021', title: 'National Tiger Conservation Action Plan for Malaysia', source: 'Putrajaya: Ministry of Energy and Natural Resources' },
    { authors: 'Department of Wildlife and National Parks [DWNP]', year: '2022', title: 'Annual wildlife conservation report 2022', source: 'Putrajaya: Ministry of Natural Resources and Environmental Sustainability' },
    { authors: 'Department of Wildlife and National Parks [DWNP]', year: '2023', title: 'Protected area management report 2023', source: 'Putrajaya: Ministry of Natural Resources and Environmental Sustainability' },
    { authors: 'Estes, J. A., Terborgh, J., Brashares, J. S., Power, M. E., Berger, J., Bond, W. J., ... & Wardle, D. A.', year: '2011', title: 'Trophic downgrading of planet Earth', source: 'Science, 333(6040), 301-306', url: 'https://doi.org/10.1126/science.1205106' },
    { authors: 'Global Forest Watch', year: '2023', title: 'Malaysia deforestation data 2001-2022', source: 'World Resources Institute', url: 'https://www.globalforestwatch.org' },
    { authors: 'International Union for Conservation of Nature [IUCN]', year: '2023', title: 'The IUCN Red List of Threatened Species: Panthera tigris jacksoni', source: 'IUCN Red List', url: 'https://www.iucnredlist.org' },
    { authors: 'Kawanishi, K., Sunquist, M. E., Eizirik, E., Lynam, A. J., Ngoprasert, D., Shahruddin, W. N. W., ... & Steinmetz, R.', year: '2010', title: 'Near fixation of melanism in leopards of the Malay Peninsula', source: 'Journal of Zoology, 282(3), 201-206', url: 'https://doi.org/10.1111/j.1469-7998.2010.00731.x' },
    { authors: 'Lynam, A. J., Rabinowitz, A., Myint, T., Maung, M., Latt, K. T., & Po, S. H. T.', year: '2012', title: 'Estimating abundance with sparse data: Tigers in northern Myanmar', source: 'Population Ecology, 54(1), 1-11', url: 'https://doi.org/10.1007/s10144-011-0309-y' },
    { authors: 'Malaysian Conservation Alliance for Tigers [MYCAT]', year: '2022', title: 'Kenyir Wildlife Corridor Annual Report 2022', source: 'Kuala Lumpur: MYCAT' },
    { authors: 'Malaysian Conservation Alliance for Tigers [MYCAT]', year: '2023', title: 'Community-based conservation initiatives in Peninsular Malaysia', source: 'Kuala Lumpur: MYCAT' },
    { authors: 'Nyhus, P. J., & Tilson, R.', year: '2004', title: 'Characterizing human-tiger conflict in Sumatra, Indonesia: Implications for conservation', source: 'Oryx, 38(1), 68-74', url: 'https://doi.org/10.1017/S0030605304000110' },
    { authors: 'TRAFFIC', year: '2023', title: 'Illegal wildlife trade in Southeast Asia: 2022 assessment', source: 'Cambridge, UK: TRAFFIC International' },
    { authors: 'World Wide Fund for Nature Malaysia [WWF-Malaysia]', year: '2023', title: 'Malayan tiger conservation programme: 2023 report', source: 'Petaling Jaya: WWF-Malaysia' },
    { authors: 'World Wide Fund for Nature Malaysia [WWF-Malaysia]', year: '2024', title: 'Ecotourism and tiger conservation in Taman Negara', source: 'Petaling Jaya: WWF-Malaysia' },
    { authors: 'Global Tiger Forum', year: '2023', title: 'Global wild tiger population status 2023', source: 'Global Tiger Initiative', url: 'https://www.globaltigerinitiative.org' },
    { authors: 'IUCN', year: '2023', title: 'Panthera tigris (Tiger) Red List assessment', source: 'IUCN Red List', url: 'https://www.iucnredlist.org' },
    { authors: 'Khan, M. M. H.', year: '2022', title: 'Tigers of the Sundarbans: Climate change impacts', source: 'Journal of Threatened Taxa, 14(3), 20789–20798', url: 'https://doi.org/10.11609/jott.XXXX' },
    { authors: 'National Tiger Conservation Authority [NTCA]', year: '2023', title: 'All India tiger estimation report 2022', source: 'Ministry of Environment, India' },
    { authors: 'World Wide Fund for Nature [WWF]', year: '2023', title: 'Tigers alive initiative: 2023 report', source: 'World Wildlife Fund', url: 'https://www.worldwildlife.org' },
    { authors: 'WWF-Russia', year: '2023', title: 'Amur tiger census 2023', source: 'WWF Russia', url: 'https://www.wwf.ru/en/resources/publications/' }
  ];

  function handlePress(ref) {
    if (ref.url) {
      Alert.alert(
        'Open External Link',
        `This will open "${ref.title}" in your browser. Continue?`,
        [
          { text: 'Cancel', style: 'cancel' },
          {
            text: 'Open',
            onPress: () => Linking.openURL(ref.url).catch(() => {
              Alert.alert('Error', 'Unable to open the link.');
            })
          }
        ]
      );
    } else {
      Alert.alert(
        'Reference Information',
        `${ref.title}\n\nAuthors: ${ref.authors}\nYear: ${ref.year}\nSource: ${ref.source}`,
        [{ text: 'OK' }]
      );
    }
  }

  return (
    <ThemedView style={styles.container}>
      {/* Header */}
      <ThemedView style={[styles.header, { backgroundColor: bgSurface, borderBottomColor: bdColor }]}>
        <MaterialIcons name="library-books" size={24} color={tint} />
        <ThemedText style={[styles.headerText, { color: txtPrimary }]}>References</ThemedText>
      </ThemedView>

      {/* Notice */}
      <ThemedView style={[styles.notice, { backgroundColor: bgSecondary, borderLeftColor: tint }]}>
        <MaterialIcons name="info" size={20} color={tint} />
        <ThemedText style={[styles.noticeText, { color: txtSecondary }]}>
          The following scientific references support the information presented in this Malayan Tiger lesson.
          Content is displayed in English for academic consistency.
        </ThemedText>
      </ThemedView>

      {/* List */}
      <ScrollView contentContainerStyle={styles.list} showsVerticalScrollIndicator={false}>
        {references.map((ref, idx) => (
          <TouchableOpacity
            key={idx}
            style={[
              styles.card,
              { backgroundColor: bgSurface, borderColor: bdColor, shadowColor: txtPrimary }
            ]}
            onPress={() => handlePress(ref)}
            activeOpacity={0.7}
          >
            <View style={styles.cardRow}>
              <View style={[styles.iconContainer, { backgroundColor: 'rgba(255,152,0,0.1)' }]}>
                <MaterialIcons name="article" size={20} color={tint} />
              </View>
              <View style={styles.info}>
                {/* 🔥 UPDATED: Title with scientific names in italic */}
                {renderTextWithScientificNames(
                  ref.title,
                  [styles.titleText, { color: txtPrimary }]
                )}
                
                <ThemedText style={[styles.authorsText, { color: txtSecondary }]} numberOfLines={2}>
                  {ref.authors} ({ref.year})
                </ThemedText>
                <ThemedText style={[styles.sourceText, { color: txtMuted }]} numberOfLines={2}>
                  {ref.source}
                </ThemedText>
              </View>
              {ref.url && (
                <MaterialIcons name="open-in-new" size={18} color={txtMuted} />
              )}
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container:    { flex: 1 },
  header:       { flexDirection: 'row', alignItems: 'center', padding: 20, borderBottomWidth: 1, gap: 12 },
  headerText:   { fontSize: 22, fontWeight: '600' },
  notice:       { flexDirection: 'row', alignItems: 'flex-start', margin: 16, padding: 16, borderRadius: 12, borderLeftWidth: 4, gap: 12 },
  noticeText:   { flex: 1, fontSize: 14, lineHeight: 20, fontStyle: 'italic' },
  list:         { padding: 16, paddingTop: 0, gap: 12 },
  card:         { borderRadius: 12, borderWidth: 1, padding: 16, shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 4, elevation: 3 },
  cardRow:      { flexDirection: 'row', alignItems: 'flex-start', gap: 12 },
  iconContainer:{ width: 32, height: 32, borderRadius: 16, alignItems: 'center', justifyContent: 'center' },
  info:         { flex: 1 },
  titleText:    { fontSize: 15, fontWeight: '600', lineHeight: 20, marginBottom: 4 },
  authorsText:  { fontSize: 13, fontWeight: '500', marginBottom: 2 },
  sourceText:   { fontSize: 12, fontStyle: 'italic' }
});