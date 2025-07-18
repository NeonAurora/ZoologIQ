// Services/supabase/audioService.js
import { supabase } from './config';

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