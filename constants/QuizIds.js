// constants/QuizIds.js
// Centralized quiz IDs for all learning topics to avoid hardcoding across components

export const QUIZ_IDS = {
  tiger: "e9e0bd5c-f3d4-4962-abc3-3d37258900a9",
  tapir: "1a171e85-0d51-4f7b-acfe-0561ddb09788", 
  turtle: "8d54d8c3-4ab1-48e1-bf94-53eccd5aea41"
};

// Helper function to get quiz ID by topic
export const getQuizIdByTopic = (topic) => {
  return QUIZ_IDS[topic] || null;
};