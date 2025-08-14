// Services/supabase/index.js
// Centralized exports for all Supabase services

// User operations
export {
  saveUserData,
  getUserData,
  updateUserData,
  subscribeToUserData,
  // Pre-assessment operations
  updatePreAssessmentStatus,
  getPreAssessmentStatus,
  hasCompletedPreAssessment,
  getCompletedTopics,
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
  getUserQuizResults,
  // Pre/Post test operations
  getPreTestScore,
  savePostTestResult,
  getQuizResultsByType,
  getAllPostTestAttempts,
  getBestPostTestScore,
  getImprovementData
} from './quizResultService';

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
  // New progress and access utilities
  getUserOverallProgress,
  getTopicAccessStatus,
  getTopicQuizSummary,
  checkFeatureAccess,
  getCategoryIdBySlug,

  isCertificateEligible,
  getCertificateEligibilityDetails
} from './utilityService';

// Storage operations (Supabase)
export { 
  uploadImage, 
  deleteImage,
  uploadPdf,
  deletePdf,
  uploadAudio,
  deleteAudio,
  uploadCertificate,
  deleteCertificate,
  uploadFile
} from './storage';

export {
  updateCategoryAudio,
  getCategoryAudio,
  removeCategoryAudio
} from './audioService';

// Database automation (Admin only)
export {
  resetAndPopulateDatabase,
  getDatabaseStatus
} from './databaseAutomationService';

export {
  exportSingleTable,
  exportMultipleTables,
  getAvailableTables,
} from './export';

// Config
export { supabase } from './config';