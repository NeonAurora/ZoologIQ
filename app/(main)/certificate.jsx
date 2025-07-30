// app/(main)/certificate.jsx
import React from 'react';
import { ScrollView } from 'react-native';
import { ThemedView } from '@/components/ThemedView';
import StaticCertificate from '@/components/certificates/StaticCertificate';
import { useAuth } from '@/contexts/AuthContext';

export default function CertificatePage() {
  const { user, supabaseData } = useAuth();
  
  const handleCertificateGenerated = (url, certificateData) => {
    console.log('Certificate generated:', url);
    console.log('Certificate data:', certificateData);
    // You can save this to your database if needed
  };

  return (
    <ThemedView style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <StaticCertificate
          recipientName={supabaseData?.name || user?.name || "Student"}
          courseTitle="WildguardMY Animal Learning"
          completionDate={new Date().toLocaleDateString()}
          instructorName="WildguardMY Education Team"
          onCertificateGenerated={handleCertificateGenerated}
        />
      </ScrollView>
    </ThemedView>
  );
}