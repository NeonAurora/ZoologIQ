// contexts/CertificateContext.jsx
import React, { createContext, useContext, useState, useCallback } from 'react';
import { isCertificateEligible } from '@/services/supabase';

const CertificateContext = createContext();

export const useCertificate = () => {
  const context = useContext(CertificateContext);
  if (!context) {
    throw new Error('useCertificate must be used within a CertificateProvider');
  }
  return context;
};

export const CertificateProvider = ({ children }) => {
  const [certificateEligible, setCertificateEligible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [initialized, setInitialized] = useState(false);

  // Check certificate eligibility (only when needed)
  const checkCertificateEligibility = useCallback(async (userId) => {
    if (!userId) {
      setCertificateEligible(false);
      setInitialized(true);
      return false;
    }

    try {
      setLoading(true);
      console.log('🔍 Checking certificate eligibility for user:', userId);
      
      const eligible = await isCertificateEligible(userId);
      setCertificateEligible(eligible);
      setInitialized(true);
      
      console.log('✅ Certificate eligibility result:', eligible);
      return eligible;
    } catch (error) {
      console.error('❌ Error checking certificate eligibility:', error);
      setCertificateEligible(false);
      setInitialized(true);
      return false;
    } finally {
      setLoading(false);
    }
  }, []);

  // Update certificate status (called when quiz is completed)
  const updateCertificateStatus = useCallback(async (userId) => {
    console.log('🎓 Quiz completed - updating certificate status...');
    const newStatus = await checkCertificateEligibility(userId);
    return newStatus;
  }, [checkCertificateEligibility]);

  // Reset certificate status (called when user changes)
  const resetCertificateStatus = useCallback(() => {
    console.log('🔄 Resetting certificate status');
    setCertificateEligible(false);
    setInitialized(false);
    setLoading(false);
  }, []);

  const value = {
    certificateEligible,
    loading,
    initialized,
    checkCertificateEligibility,
    updateCertificateStatus,
    resetCertificateStatus
  };

  return (
    <CertificateContext.Provider value={value}>
      {children}
    </CertificateContext.Provider>
  );
};