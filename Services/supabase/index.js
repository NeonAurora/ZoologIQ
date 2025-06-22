// Centralized exports for all Supabase services

// User operations
export {
  saveUserData,
  getUserData,
  updateUserData,
  subscribeToUserData
} from './userService';

// Quiz operations
export {
  getAllQuizzes,
  getQuizById,
  saveQuiz,
  subscribeToQuizzes
} from './quizService';

// Quiz results
export {
  saveQuizResult,
  getUserQuizResults
} from './quizResultService';

// Learning sessions
export {
  createLearningSession,
  getActiveLearningSession,
  getLearningSession,
  completePreQuiz,
  startLesson,
  completeLesson,
  completePostQuiz,
  getUserLearningSessions,
  getCompletedLearningSessions,
  checkSessionAvailability,
  getNextAction,
  getLearningAnalytics,
  resetLearningSession,
  startStudyPhase,
  markSectionCompleted,
  getSessionProgress,
  getUserCompletedSessions,
  finalizeSessionCompletion,
  abandonSession
} from './learningSessionService';

// Categories
export {
  getAllCategories,
  getCategoryBySlug,
  createCategory
} from './categoryService';

// Utilities
export {
  getQuizStats,
  getUserCategoryProgress,
  createStudySession,
  updateStudySession
} from './utilityService';

// Storage operations (Supabase)
export {
  uploadImage,
  deleteImage
} from './storage';

// Config
export { supabase } from './config';