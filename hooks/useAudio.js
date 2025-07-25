// hooks/useAudio.js
import { useState, useEffect } from 'react';
import { getCategoryAudioWithFallback } from '@/services/supabase/audioService';

export const useAudio = (categorySlug, currentLanguage) => {
  const [audioUrls, setAudioUrls] = useState({ en: null, ms: null });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAudio = async () => {
      if (!categorySlug) return;
      
      setLoading(true);
      const urls = await getCategoryAudioWithFallback(categorySlug);
      setAudioUrls(urls);
      setLoading(false);
    };

    fetchAudio();
  }, [categorySlug]);

  const currentAudioUrl = audioUrls[currentLanguage] || audioUrls.en;

  return {
    audioUrls,
    currentAudioUrl,
    loading
  };
};