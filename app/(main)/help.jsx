// components/Help.jsx (or app/(main)/help.jsx if it's a page)
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Linking,
  Alert,
  Platform
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Colors } from '@/constants/Colors';

export default function Help() {
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === 'dark';

  const handleEmailContact = async () => {
    const email = 'mahidihossen@outlook.com';
    const subject = 'WildguardMY App - Support Request';
    const body = 'Hello Dr. Mahidi,\n\nI need help with the WildguardMY app.\n\n';
    
    const emailUrl = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    
    try {
      const supported = await Linking.canOpenURL(emailUrl);
      if (supported) {
        await Linking.openURL(emailUrl);
      } else {
        Alert.alert(
          'Email Not Available',
          `Please send an email to: ${email}`,
          [
            { text: 'Copy Email', onPress: () => Clipboard.setString(email) },
            { text: 'OK', style: 'default' }
          ]
        );
      }
    } catch (error) {
      Alert.alert('Error', 'Unable to open email client.');
    }
  };

  const HelpSection = ({ title, children, icon }) => (
    <View style={[styles.section, { borderColor: isDark ? Colors.dark.border : Colors.light.border }]}>
      <View style={styles.sectionHeader}>
        <MaterialIcons 
          name={icon} 
          size={24} 
          color={isDark ? Colors.dark.tint : Colors.light.tint} 
        />
        <Text style={[styles.sectionTitle, { color: isDark ? Colors.dark.text : Colors.light.text }]}>
          {title}
        </Text>
      </View>
      <View style={styles.sectionContent}>
        {children}
      </View>
    </View>
  );

  const FAQItem = ({ question, answer }) => (
    <View style={styles.faqItem}>
      <Text style={[styles.faqQuestion, { color: isDark ? Colors.dark.text : Colors.light.text }]}>
        Q: {question}
      </Text>
      <Text style={[styles.faqAnswer, { color: isDark ? Colors.dark.text : Colors.light.text }]}>
        A: {answer}
      </Text>
    </View>
  );

  return (
    <ScrollView 
      style={[styles.container, { backgroundColor: isDark ? Colors.dark.background : Colors.light.background }]}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      {/* Header */}
      <View style={styles.header}>
        <MaterialIcons 
          name="help" 
          size={48} 
          color={isDark ? Colors.dark.tint : Colors.light.tint} 
        />
        <Text style={[styles.headerTitle, { color: isDark ? Colors.dark.text : Colors.light.text }]}>
          Help & Support
        </Text>
        <Text style={[styles.headerSubtitle, { color: isDark ? Colors.dark.text : Colors.light.text }]}>
          Get assistance with WildguardMY
        </Text>
      </View>

      {/* Contact Information */}
      <HelpSection title="Contact Developer" icon="person">
        <View style={styles.contactCard}>
          <View style={styles.contactHeader}>
            <MaterialIcons 
              name="school" 
              size={32} 
              color={isDark ? Colors.dark.tint : Colors.light.tint} 
            />
            <View style={styles.contactInfo}>
              <Text style={[styles.contactName, { color: isDark ? Colors.dark.text : Colors.light.text }]}>
                Mahidi Hossen Hannan
              </Text>
              <Text style={[styles.contactTitle, { color: isDark ? Colors.dark.tint : Colors.light.tint }]}>
                PhD Researcher in Biodiversity & Natural Resources
              </Text>
            </View>
          </View>
          
          <View style={styles.contactDetails}>
            <View style={styles.contactItem}>
              <MaterialIcons 
                name="business" 
                size={20} 
                color={isDark ? '#888' : '#666'} 
              />
              <Text style={[styles.contactText, { color: isDark ? Colors.dark.text : Colors.light.text }]}>
                Department of Biology, Faculty of Science
              </Text>
            </View>
            
            <View style={styles.contactItem}>
              <MaterialIcons 
                name="location-on" 
                size={20} 
                color={isDark ? '#888' : '#666'} 
              />
              <Text style={[styles.contactText, { color: isDark ? Colors.dark.text : Colors.light.text }]}>
                Universiti Putra Malaysia (UPM)
              </Text>
            </View>
            
            <TouchableOpacity 
              style={[styles.emailButton, { backgroundColor: isDark ? Colors.dark.tint : Colors.light.tint }]}
              onPress={handleEmailContact}
            >
              <MaterialIcons name="email" size={20} color="white" />
              <Text style={styles.emailButtonText}>
                mahidihossen@outlook.com
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </HelpSection>

      {/* App Information */}
      <HelpSection title="About WildguardMY" icon="info">
        <Text style={[styles.aboutText, { color: isDark ? Colors.dark.text : Colors.light.text }]}>
          WildguardMY is an educational platform designed to enhance your knowledge of zoology and biodiversity. 
          Learn about various animal species, take interactive quizzes, and earn certificates upon completion 
          of learning modules.
        </Text>
        
        <View style={styles.featuresList}>
          <View style={styles.featureItem}>
            <MaterialIcons name="quiz" size={20} color={isDark ? Colors.dark.tint : Colors.light.tint} />
            <Text style={[styles.featureText, { color: isDark ? Colors.dark.text : Colors.light.text }]}>
              Interactive Quizzes
            </Text>
          </View>
          <View style={styles.featureItem}>
            <MaterialIcons name="card-membership" size={20} color={isDark ? Colors.dark.tint : Colors.light.tint} />
            <Text style={[styles.featureText, { color: isDark ? Colors.dark.text : Colors.light.text }]}>
              Digital Certificates
            </Text>
          </View>
          <View style={styles.featureItem}>
            <MaterialIcons name="trending-up" size={20} color={isDark ? Colors.dark.tint : Colors.light.tint} />
            <Text style={[styles.featureText, { color: isDark ? Colors.dark.text : Colors.light.text }]}>
              Progress Tracking
            </Text>
          </View>
          <View style={styles.featureItem}>
            <MaterialIcons name="nature" size={20} color={isDark ? Colors.dark.tint : Colors.light.tint} />
            <Text style={[styles.featureText, { color: isDark ? Colors.dark.text : Colors.light.text }]}>
              Biodiversity Learning
            </Text>
          </View>
        </View>
      </HelpSection>

      {/* FAQ Section */}
      <HelpSection title="Frequently Asked Questions" icon="help-outline">
        <FAQItem 
          question="How do I generate a certificate?"
          answer="Complete all quizzes in a learning module with a passing score, then navigate to the Certificate section to generate and download your digital certificate."
        />
        
        <FAQItem 
          question="What happens if I fail a quiz?"
          answer="You can retake quizzes multiple times. Your best score will be recorded, and you need to achieve the minimum passing score to unlock the certificate."
        />
        
        <FAQItem 
          question="Can I access the app offline?"
          answer="Some content may be available offline after initial download, but internet connection is required for quizzes and certificate generation."
        />
      </HelpSection>

      {/* Getting Started */}
      <HelpSection title="Getting Started" icon="play-circle-outline">
        <View style={styles.stepsList}>
          <View style={styles.stepItem}>
            <View style={[styles.stepNumber, { backgroundColor: isDark ? Colors.dark.tint : Colors.light.tint }]}>
              <Text style={styles.stepNumberText}>1</Text>
            </View>
            <View style={styles.stepContent}>
              <Text style={[styles.stepTitle, { color: isDark ? Colors.dark.text : Colors.light.text }]}>
                Choose a Learning Module
              </Text>
              <Text style={[styles.stepDescription, { color: isDark ? '#888' : '#666' }]}>
                Browse available topics and select a module that interests you
              </Text>
            </View>
          </View>
          
          <View style={styles.stepItem}>
            <View style={[styles.stepNumber, { backgroundColor: isDark ? Colors.dark.tint : Colors.light.tint }]}>
              <Text style={styles.stepNumberText}>2</Text>
            </View>
            <View style={styles.stepContent}>
              <Text style={[styles.stepTitle, { color: isDark ? Colors.dark.text : Colors.light.text }]}>
                Take Interactive Quizzes
              </Text>
              <Text style={[styles.stepDescription, { color: isDark ? '#888' : '#666' }]}>
                Complete quizzes for each topic with a minimum passing score
              </Text>
            </View>
          </View>
          
          <View style={styles.stepItem}>
            <View style={[styles.stepNumber, { backgroundColor: isDark ? Colors.dark.tint : Colors.light.tint }]}>
              <Text style={styles.stepNumberText}>3</Text>
            </View>
            <View style={styles.stepContent}>
              <Text style={[styles.stepTitle, { color: isDark ? Colors.dark.text : Colors.light.text }]}>
                Earn Your Certificate
              </Text>
              <Text style={[styles.stepDescription, { color: isDark ? '#888' : '#666' }]}>
                Generate and download your digital certificate upon completion
              </Text>
            </View>
          </View>
        </View>
      </HelpSection>

      {/* Technical Support */}
      <HelpSection title="Technical Support" icon="build">
        <Text style={[styles.supportText, { color: isDark ? Colors.dark.text : Colors.light.text }]}>
          If you encounter any technical issues or have suggestions for improvement, 
          please don't hesitate to contact our developer using the email button above.
        </Text>
        
        <View style={styles.supportInfo}>
          <Text style={[styles.supportLabel, { color: isDark ? '#888' : '#666' }]}>
            App Version: 1.0.0
          </Text>
          <Text style={[styles.supportLabel, { color: isDark ? '#888' : '#666' }]}>
            Platform: {Platform.OS === 'ios' ? 'iOS' : Platform.OS === 'android' ? 'Android' : 'Web'}
          </Text>
        </View>
      </HelpSection>

      {/* Footer */}
      <View style={styles.footer}>
        <Text style={[styles.footerText, { color: isDark ? '#888' : '#666' }]}>
          © 2024 WildguardMY - Universiti Putra Malaysia
        </Text>
        <Text style={[styles.footerText, { color: isDark ? '#888' : '#666' }]}>
          Developed with ❤️ for biodiversity education
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: 20,
  },
  header: {
    alignItems: 'center',
    marginBottom: 30,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 5,
  },
  headerSubtitle: {
    fontSize: 16,
    opacity: 0.7,
  },
  section: {
    marginBottom: 25,
    borderWidth: 1,
    borderRadius: 12,
    overflow: 'hidden',
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: 'rgba(0,0,0,0.03)',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginLeft: 12,
  },
  sectionContent: {
    padding: 16,
  },
  
  // Contact Card Styles
  contactCard: {
    borderRadius: 8,
  },
  contactHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  contactInfo: {
    flex: 1,
    marginLeft: 12,
  },
  contactName: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  contactTitle: {
    fontSize: 14,
    fontWeight: '500',
    lineHeight: 20,
  },
  contactDetails: {
    gap: 12,
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  contactText: {
    fontSize: 14,
    flex: 1,
  },
  emailButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
    borderRadius: 8,
    marginTop: 8,
    gap: 8,
  },
  emailButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '500',
  },
  
  // About Section
  aboutText: {
    fontSize: 14,
    lineHeight: 22,
    marginBottom: 16,
  },
  featuresList: {
    gap: 12,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  featureText: {
    fontSize: 14,
    fontWeight: '500',
  },
  
  // FAQ Styles
  faqItem: {
    marginBottom: 16,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.1)',
  },
  faqQuestion: {
    fontSize: 15,
    fontWeight: '600',
    marginBottom: 6,
  },
  faqAnswer: {
    fontSize: 14,
    lineHeight: 20,
    opacity: 0.8,
  },
  
  // Steps Styles
  stepsList: {
    gap: 20,
  },
  stepItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 16,
  },
  stepNumber: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  stepNumberText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  stepContent: {
    flex: 1,
  },
  stepTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  stepDescription: {
    fontSize: 14,
    lineHeight: 20,
  },
  
  // Support Section
  supportText: {
    fontSize: 14,
    lineHeight: 22,
    marginBottom: 16,
  },
  supportInfo: {
    gap: 4,
  },
  supportLabel: {
    fontSize: 12,
    fontStyle: 'italic',
  },
  
  // Footer
  footer: {
    alignItems: 'center',
    marginTop: 20,
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: 'rgba(0,0,0,0.1)',
    gap: 4,
  },
  footerText: {
    fontSize: 12,
    textAlign: 'center',
  },
});