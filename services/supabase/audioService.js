// Services/supabase/audioService.js
import { supabase } from './config';
import { AUDIO_URLS, getAudioUrl } from '@/constants/AudioUrls';

/**
 * Update category with audio URLs
 * @param {string} categoryId - Category UUID
 * @param {string} audioUrlEn - English audio URL
 * @param {string} audioUrlMs - Malay audio URL (optional)
 * @returns {Promise<boolean>} Success status
 */
export const updateCategoryAudio = async (categoryId, audioUrlEn, audioUrlMs = null) => {
  try {
    const updateData = { lesson_audio_en: audioUrlEn };
    if (audioUrlMs) {
      updateData.lesson_audio_ms = audioUrlMs;
    }

    const { error } = await supabase
      .from('quiz_categories')
      .update(updateData)
      .eq('id', categoryId);

    if (error) {
      console.error('Error updating category audio:', error);
      return false;
    }

    console.log('Category audio updated successfully');
    return true;
  } catch (error) {
    console.error('Error updating category audio:', error);
    return false;
  }
};

/**
 * Get audio URLs for a category
 * @param {string} categorySlug - Category slug (e.g., 'tiger', 'turtle', 'tapir')
 * @returns {Promise<object>} Audio URLs object
 */
export const getCategoryAudio = async (categorySlug) => {
  try {
    const { data, error } = await supabase
      .from('quiz_categories')
      .select('lesson_audio_en, lesson_audio_ms')
      .eq('slug', categorySlug)
      .single();

    if (error) {
      console.error('Error fetching category audio:', error);
      return { en: null, ms: null };
    }

    return {
      en: data.lesson_audio_en,
      ms: data.lesson_audio_ms
    };
  } catch (error) {
    console.error('Error fetching category audio:', error);
    return { en: null, ms: null };
  }
};

/**
 * Get audio URLs with fallback to constants
 * @param {string} categorySlug - Category slug (e.g., 'tiger', 'turtle', 'tapir')
 * @returns {Promise<object>} Audio URLs object with fallback support
 */
export const getCategoryAudioWithFallback = async (categorySlug) => {
  try {
    // First try to get from database
    const dbAudio = await getCategoryAudio(categorySlug);
    
    // If database has both URLs, return them
    if (dbAudio.en && dbAudio.ms) {
      return dbAudio;
    }
    
    // Otherwise, use constants as fallback
    const fallbackAudio = {
      en: getAudioUrl(categorySlug, 'english'),
      ms: getAudioUrl(categorySlug, 'malay')
    };
    
    // Merge database and fallback (database takes priority)
    return {
      en: dbAudio.en || fallbackAudio.en,
      ms: dbAudio.ms || fallbackAudio.ms
    };
  } catch (error) {
    console.error('Error fetching category audio with fallback:', error);
    
    // Final fallback to constants
    return {
      en: getAudioUrl(categorySlug, 'english'),
      ms: getAudioUrl(categorySlug, 'malay')
    };
  }
};

/**
 * Initialize/Update all categories with audio URLs from constants
 * Useful for setting up or resetting audio URLs
 * @returns {Promise<boolean>} Success status
 */
export const initializeAllCategoryAudio = async () => {
  try {
    const topics = ['tiger', 'tapir', 'turtle'];
    const updates = [];
    
    for (const topic of topics) {
      const audioUrls = AUDIO_URLS[topic];
      if (audioUrls) {
        // Get category ID by slug
        const { data: category } = await supabase
          .from('quiz_categories')
          .select('id')
          .eq('slug', topic)
          .single();
        
        if (category) {
          updates.push(
            supabase
              .from('quiz_categories')
              .update({
                lesson_audio_en: audioUrls.english,
                lesson_audio_ms: audioUrls.malay
              })
              .eq('id', category.id)
          );
        }
      }
    }
    
    // Execute all updates
    const results = await Promise.all(updates);
    const hasError = results.some(result => result.error);
    
    if (hasError) {
      console.error('Some audio updates failed');
      return false;
    }
    
    console.log('All category audio URLs initialized successfully');
    return true;
  } catch (error) {
    console.error('Error initializing category audio:', error);
    return false;
  }
};

/**
 * Remove audio URLs from category
 * @param {string} categoryId - Category UUID
 * @param {string} language - 'en', 'ms', or 'both'
 * @returns {Promise<boolean>} Success status
 */
export const removeCategoryAudio = async (categoryId, language = 'both') => {
  try {
    let updateData = {};
    
    if (language === 'en' || language === 'both') {
      updateData.lesson_audio_en = null;
    }
    if (language === 'ms' || language === 'both') {
      updateData.lesson_audio_ms = null;
    }

    const { error } = await supabase
      .from('quiz_categories')
      .update(updateData)
      .eq('id', categoryId);

    if (error) {
      console.error('Error removing category audio:', error);
      return false;
    }

    console.log('Category audio removed successfully');
    return true;
  } catch (error) {
    console.error('Error removing category audio:', error);
    return false;
  }
};