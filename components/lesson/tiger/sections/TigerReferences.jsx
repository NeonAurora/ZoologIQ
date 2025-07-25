import React from 'react';
import { StyleSheet, ScrollView, TouchableOpacity, Linking, Alert } from 'react-native';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { useThemeColor } from '@/hooks/useThemeColor';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

export default function TigerReferences() {
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === 'dark';
  
  // Tiger-specific references from assets/lessonContents/tiger.txt
  const references = [
    {
      authors: 'Adnan, M.',
      year: '2020',
      title: 'Marine protected areas in Malaysia: Challenges and opportunities',
      source: 'Marine Policy, 45, 89-97',
      url: 'https://doi.org/xxxx'
    },
    {
      authors: 'Department of Wildlife and National Parks [DWNP]',
      year: '2021',
      title: 'National Tiger Conservation Action Plan for Malaysia',
      source: 'Putrajaya: Ministry of Energy and Natural Resources'
    },
    {
      authors: 'Department of Wildlife and National Parks [DWNP]',
      year: '2022',
      title: 'Annual wildlife conservation report 2022',
      source: 'Putrajaya: Ministry of Natural Resources and Environmental Sustainability'
    },
    {
      authors: 'Department of Wildlife and National Parks [DWNP]',
      year: '2023',
      title: 'Protected area management report 2023',
      source: 'Putrajaya: Ministry of Natural Resources and Environmental Sustainability'
    },
    {
      authors: 'Estes, J. A., Terborgh, J., Brashares, J. S., Power, M. E., Berger, J., Bond, W. J., ... & Wardle, D. A.',
      year: '2011',
      title: 'Trophic downgrading of planet Earth',
      source: 'Science, 333(6040), 301-306',
      url: 'https://doi.org/10.1126/science.1205106'
    },
    {
      authors: 'Global Forest Watch',
      year: '2023',
      title: 'Malaysia deforestation data 2001-2022',
      source: 'World Resources Institute',
      url: 'https://www.globalforestwatch.org'
    },
    {
      authors: 'International Union for Conservation of Nature [IUCN]',
      year: '2023',
      title: 'The IUCN Red List of Threatened Species: Panthera tigris jacksoni',
      source: 'IUCN Red List',
      url: 'https://www.iucnredlist.org'
    },
    {
      authors: 'Kawanishi, K., Sunquist, M. E., Eizirik, E., Lynam, A. J., Ngoprasert, D., Shahruddin, W. N. W., ... & Steinmetz, R.',
      year: '2010',
      title: 'Near fixation of melanism in leopards of the Malay Peninsula',
      source: 'Journal of Zoology, 282(3), 201-206',
      url: 'https://doi.org/10.1111/j.1469-7998.2010.00731.x'
    },
    {
      authors: 'Lynam, A. J., Rabinowitz, A., Myint, T., Maung, M., Latt, K. T., & Po, S. H. T.',
      year: '2012',
      title: 'Estimating abundance with sparse data: Tigers in northern Myanmar',
      source: 'Population Ecology, 54(1), 1-11',
      url: 'https://doi.org/10.1007/s10144-011-0309-y'
    },
    {
      authors: 'Malaysian Conservation Alliance for Tigers [MYCAT]',
      year: '2022',
      title: 'Kenyir Wildlife Corridor Annual Report 2022',
      source: 'Kuala Lumpur: MYCAT'
    },
    {
      authors: 'Malaysian Conservation Alliance for Tigers [MYCAT]',
      year: '2023',
      title: 'Community-based conservation initiatives in Peninsular Malaysia',
      source: 'Kuala Lumpur: MYCAT'
    },
    {
      authors: 'Nyhus, P. J., & Tilson, R.',
      year: '2004',
      title: 'Characterizing human-tiger conflict in Sumatra, Indonesia: Implications for conservation',
      source: 'Oryx, 38(1), 68-74',
      url: 'https://doi.org/10.1017/S0030605304000110'
    },
    {
      authors: 'TRAFFIC',
      year: '2023',
      title: 'Illegal wildlife trade in Southeast Asia: 2022 assessment',
      source: 'Cambridge, UK: TRAFFIC International'
    },
    {
      authors: 'World Wide Fund for Nature Malaysia [WWF-Malaysia]',
      year: '2023',
      title: 'Malayan tiger conservation programme: 2023 report',
      source: 'Petaling Jaya: WWF-Malaysia'
    },
    {
      authors: 'World Wide Fund for Nature Malaysia [WWF-Malaysia]',
      year: '2024',
      title: 'Ecotourism and tiger conservation in Taman Negara',
      source: 'Petaling Jaya: WWF-Malaysia'
    },
    {
      authors: 'Global Tiger Forum',
      year: '2023',
      title: 'Global wild tiger population status 2023',
      source: 'Global Tiger Initiative',
      url: 'https://www.globaltigerinitiative.org'
    },
    {
      authors: 'IUCN',
      year: '2023',
      title: 'Panthera tigris (Tiger) Red List assessment',
      source: 'IUCN Red List',
      url: 'https://www.iucnredlist.org'
    },
    {
      authors: 'Khan, M. M. H.',
      year: '2022',
      title: 'Tigers of the Sundarbans: Climate change impacts',
      source: 'Journal of Threatened Taxa, 14(3), 20789–20798',
      url: 'https://doi.org/10.11609/jott.XXXX'
    },
    {
      authors: 'National Tiger Conservation Authority [NTCA]',
      year: '2023',
      title: 'All India tiger estimation report 2022',
      source: 'Ministry of Environment, India'
    },
    {
      authors: 'World Wide Fund for Nature [WWF]',
      year: '2023',
      title: 'Tigers alive initiative: 2023 report',
      source: 'World Wildlife Fund',
      url: 'https://www.worldwildlife.org'
    },
    {
      authors: 'WWF-Russia',
      year: '2023',
      title: 'Amur tiger census 2023',
      source: 'WWF Russia',
      url: 'https://www.wwf.ru/en/resources/publications/'
    }
  ];
  
  const handleReferencePress = (reference) => {
    if (reference.url) {
      Alert.alert(
        'Open External Link',
        `This will open "${reference.title}" in your browser. Continue?`,
        [
          { text: 'Cancel', style: 'cancel' },
          { 
            text: 'Open', 
            onPress: () => {
              Linking.openURL(reference.url).catch(err => {
                console.error('Failed to open URL:', err);
                Alert.alert('Error', 'Unable to open the link. Please try again later.');
              });
            }
          }
        ]
      );
    } else {
      Alert.alert(
        'Reference Information',
        `${reference.title}\n\nAuthors: ${reference.authors}\nYear: ${reference.year}\nSource: ${reference.source}`,
        [{ text: 'OK' }]
      );
    }
  };

  return (
    <ThemedView style={styles.container}>
      <ThemedView style={[
        styles.headerSection,
        { 
          backgroundColor: isDark ? Colors.dark.surface : Colors.light.surface,
          borderBottomColor: isDark ? Colors.dark.border : Colors.light.border 
        }
      ]}>
        <MaterialIcons name="library-books" size={24} color={isDark ? Colors.dark.tint : Colors.light.tint} />
        <ThemedText style={[
          styles.sectionTitle,
          { color: isDark ? Colors.dark.text : Colors.light.text }
        ]}>
          References
        </ThemedText>
      </ThemedView>
      
      <ThemedView style={[
        styles.noticeCard,
        { 
          backgroundColor: isDark ? Colors.dark.backgroundSecondary : Colors.light.backgroundSecondary,
          borderLeftColor: isDark ? Colors.dark.tint : Colors.light.tint 
        }
      ]}>
        <MaterialIcons name="info" size={20} color={isDark ? Colors.dark.tint : Colors.light.tint} />
        <ThemedText style={[
          styles.noticeText,
          { color: isDark ? Colors.dark.textSecondary : Colors.light.textSecondary }
        ]}>
          The following scientific references support the information presented in this Malayan Tiger lesson. 
          Content is displayed in English for academic consistency.
        </ThemedText>
      </ThemedView>

      <ScrollView 
        style={styles.referencesScrollView}
        contentContainerStyle={styles.referencesContent}
        showsVerticalScrollIndicator={false}
      >
        {references.map((reference, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.referenceCard,
              { 
                backgroundColor: isDark ? Colors.dark.surface : Colors.light.surface,
                borderColor: isDark ? Colors.dark.border : Colors.light.border,
                shadowColor: isDark ? Colors.dark.text : Colors.light.text,
              }
            ]}
            onPress={() => handleReferencePress(reference)}
            activeOpacity={0.7}
          >
            <ThemedView style={styles.referenceHeader}>
              <ThemedView style={styles.referenceIcon}>
                <MaterialIcons 
                  name="article" 
                  size={20} 
                  color={isDark ? Colors.dark.tint : Colors.light.tint} 
                />
              </ThemedView>
              
              <ThemedView style={styles.referenceInfo}>
                <ThemedText style={[
                  styles.referenceTitle,
                  { color: isDark ? Colors.dark.text : Colors.light.text }
                ]} numberOfLines={2}>
                  {reference.title}
                </ThemedText>
                
                <ThemedText style={[
                  styles.referenceAuthors,
                  { color: isDark ? Colors.dark.textSecondary : Colors.light.textSecondary }
                ]} numberOfLines={2}>
                  {reference.authors} ({reference.year})
                </ThemedText>
                
                <ThemedText style={[
                  styles.referenceSource,
                  { color: isDark ? Colors.dark.textMuted : Colors.light.textMuted }
                ]} numberOfLines={2}>
                  {reference.source}
                </ThemedText>
              </ThemedView>
              
              {reference.url && (
                <MaterialIcons 
                  name="open-in-new" 
                  size={18} 
                  color={isDark ? Colors.dark.textMuted : Colors.light.textMuted} 
                />
              )}
            </ThemedView>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerSection: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    gap: 12,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: '600',
  },
  
  noticeCard: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    margin: 16,
    padding: 16,
    borderRadius: 12,
    borderLeftWidth: 4,
    gap: 12,
  },
  noticeText: {
    flex: 1,
    fontSize: 14,
    lineHeight: 20,
    fontStyle: 'italic',
  },
  
  referencesScrollView: {
    flex: 1,
  },
  referencesContent: {
    padding: 16,
    paddingTop: 0,
    gap: 12,
  },
  
  referenceCard: {
    borderRadius: 12,
    borderWidth: 1,
    padding: 16,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  referenceHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
  },
  referenceIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 152, 0, 0.1)',
  },
  referenceInfo: {
    flex: 1,
  },
  referenceTitle: {
    fontSize: 15,
    fontWeight: '600',
    lineHeight: 20,
    marginBottom: 4,
  },
  referenceAuthors: {
    fontSize: 13,
    fontWeight: '500',
    marginBottom: 2,
  },
  referenceSource: {
    fontSize: 12,
    fontStyle: 'italic',
  },
});