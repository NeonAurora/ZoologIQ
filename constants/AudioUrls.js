// constants/AudioUrls.js
// Centralized audio URLs for all lesson topics in both languages

export const AUDIO_URLS = {
  tapir: {
    english: "https://ttzwlqozaglnczfdjhnl.supabase.co/storage/v1/object/public/lesson-materials/audio/1752830971046.mp3",
    malay: "https://ttzwlqozaglnczfdjhnl.supabase.co/storage/v1/object/public/lesson-materials/audio/1752832401154.mp3"
  },
  tiger: {
    english: "https://ttzwlqozaglnczfdjhnl.supabase.co/storage/v1/object/public/lesson-materials/audio/1752832645865.mp3",
    malay: "https://ttzwlqozaglnczfdjhnl.supabase.co/storage/v1/object/public/lesson-materials/audio/1752832665072.mp3"
  },
  turtle: {
    english: "https://ttzwlqozaglnczfdjhnl.supabase.co/storage/v1/object/public/lesson-materials/audio/1752832964739.mp3",
    malay: "https://ttzwlqozaglnczfdjhnl.supabase.co/storage/v1/object/public/lesson-materials/audio/1752832984608.mp3"
  }
};

// Helper function to get audio URL by topic and language
export const getAudioUrl = (topic, language = 'english') => {
  const validTopics = ['tapir', 'tiger', 'turtle'];
  const validLanguages = ['english', 'malay'];
  
  if (!validTopics.includes(topic)) {
    console.warn(`Invalid topic: ${topic}. Valid topics are: ${validTopics.join(', ')}`);
    return null;
  }
  
  if (!validLanguages.includes(language)) {
    console.warn(`Invalid language: ${language}. Valid languages are: ${validLanguages.join(', ')}`);
    return null;
  }
  
  return AUDIO_URLS[topic]?.[language] || null;
};

// Helper function to get all audio URLs for a topic
export const getTopicAudioUrls = (topic) => {
  const validTopics = ['tapir', 'tiger', 'turtle'];
  
  if (!validTopics.includes(topic)) {
    console.warn(`Invalid topic: ${topic}. Valid topics are: ${validTopics.join(', ')}`);
    return null;
  }
  
  return AUDIO_URLS[topic] || null;
};