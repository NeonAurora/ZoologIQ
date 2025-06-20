// Centralized service exports for easy imports throughout the app

// Database operations (Supabase)
export {
  // User operations
  saveUserData,
  getUserData,
  updateUserData,
  subscribeToUserData,
  
  // Quiz operations
  getAllQuizzes,
  getQuizById,
  saveQuiz,
  subscribeToQuizzes,
  
  // Quiz results
  saveQuizResult,
  getUserQuizResults,
  
  // Study sessions
  createStudySession,
  updateStudySession,
  
  // Categories
  getAllCategories,
  
  // Utilities
  getQuizStats,
  getUserCategoryProgress
} from './supabase/database';

// Storage operations (Supabase)
export {
  uploadImage,
  deleteImage
} from './supabase/storage';

// Authentication (Auth0)
export {
  login,
  getUserInfo,
  logout
} from './AuthService';

// Supabase client (for direct access if needed)
export { supabase } from './supabase/config';