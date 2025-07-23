# ZoologIQ - Project Analysis & Context

## Project Overview
ZoologIQ is a React Native educational app focused on wildlife conservation learning, specifically covering three Malaysian species: Malayan Tiger, Malayan Tapir, and Green Sea Turtle. The app features a **simplified pre-assessment unlock system** that replaced the previous complex session-based learning approach.

## Architecture Summary

### Technology Stack
- **Frontend**: React Native with Expo
- **Authentication**: Auth0 with JWT tokens
- **Backend**: Supabase (PostgreSQL database + Storage)
- **UI Framework**: React Native Paper + Material Icons
- **State Management**: React Context + Custom Hooks
- **Cross-Platform**: iOS, Android, and Web support

---

## Learning System Architecture (UPDATED)

### NEW: Pre-Assessment Unlock System
The app now uses a **simple pre-assessment unlock system** that replaces the previous complex session-based learning:

#### Business Rules:
1. **One Pre-Test Per Topic**: Users take a single pre-assessment quiz for each animal topic
2. **Lesson Access**: Completing the pre-test immediately unlocks all lesson content for that topic
3. **Post-Test Access**: Unlimited post-tests become available after pre-test completion
4. **Improvement Tracking**: All post-test scores are compared against the original pre-test score
5. **No Session Management**: No complex learning sessions, progress tracking, or time-based restrictions

#### Database Schema (Session Types):
- `pre_study`: Pre-assessment quizzes (one per topic)
- `post_study`: Post-assessment quizzes (unlimited)
- `regular`: General knowledge quizzes

---

## App Directory Structure

### Root Layout (`app/_layout.jsx`)
- Main app wrapper with AuthProvider and PaperProvider
- Custom theme integration with light/dark mode support
- Font loading (SpaceMono) and splash screen management
- Combined theming for React Navigation and Paper components

### Authentication Group (`app/(auth)/`)
- **callback.jsx**: Auth callback handler with loading indicator and automatic home redirect
- **logout.jsx**: Authentication logout handling

### Main App Group (`app/(main)/`)
Uses Expo Router with drawer navigation pattern:

#### Core Pages:
- **index.jsx**: Home page with learning topic cards, bilingual content, and user status handling
- **profile.jsx**: User profile management and settings
- **createQuiz.jsx**: Quiz creation interface (admin functionality)

#### Learning Pages:
- **tigerLesson.jsx, tapirLesson.jsx, turtleLesson.jsx**: Species-specific lesson pages (simplified, no session props)

#### Quiz Pages:
- **quizzes.jsx**: Quiz listing with real-time updates
- **quizDetail.jsx**: Individual quiz details and metadata
- **quizPlay.jsx**: Interactive quiz gameplay with pre/post-test logic

#### Additional Pages:
- **editProfile.jsx**: Profile editing functionality
- **certificate.jsx**: Certificate generation and sharing
- **acknowledgement.jsx**: Credits and acknowledgments
- **onboardingInstructions.jsx**: First-time user guidance
- **(admin)/fileUpload.jsx**: Admin file upload functionality

#### Layout Features:
- Custom header with user authentication status
- Dropdown menu for authenticated users
- Dynamic theme-aware styling
- Cross-platform navigation drawer

---

## Components Architecture (UPDATED)

### Base Components
- **ThemedText.tsx** & **ThemedView.tsx**: Core themed components with light/dark mode support
- **DrawerContent.jsx**: Navigation drawer with lesson access control based on pre-assessment completion
- **Collapsible.tsx**, **ExternalLink.tsx**, **HapticTab.tsx**: Utility components

### Specialized Component Groups

#### Audio Components (`/audio/`)
- **AudioPlayer.jsx**: Multi-language audio player with accessibility features

#### Certificate Components (`/certificates/`)
- **StaticCertificate.jsx**: Professional certificate generation with Supabase storage integration

#### Quiz Creation Components (`/createQuiz/`)
- **QuizDetails.jsx**: Category and difficulty selection
- **QuizTitleSection.jsx**: Quiz metadata management
- **QuestionsSection.jsx**: Question management interface
- **QuestionCard.jsx**: Individual question editing
- **AddQuestionModal.jsx**: New question creation modal
- **ImagePicker.jsx**: Image selection for questions
- **PointsControl.jsx**: Point value management

#### Learning Components (`/learning/`) - **UPDATED**
- **PreAssessmentChecker.jsx**: Simple component that checks pre-assessment completion and provides topic access control
- **❌ REMOVED**: All complex session-based learning components (LearningSessionStarter, ActiveSessionCard, SessionHeader, etc.)

#### Lesson Components (`/lesson/`) - **SIMPLIFIED**
Three animal-specific modules with streamlined architecture:

**Common Structure per Animal:**
- **Layout Component**: Main container with language switching, audio integration, sidebar navigation (no session management)
- **Content Component**: Content orchestration and section management
- **Navigation Component**: Simplified navigation controls (no quiz/session integration)
- **Sidebar Component**: Animated sidebar menu with progress tracking

**Section Organization:**
- **Tiger**: Introduction, Biology, Ecology, Conservation, References (5 sections)
- **Tapir**: Introduction, Physiology, Ecology, Conservation, Population, Fun Facts, References (7 sections)
- **Turtle**: Introduction, Biology, Behavior, Reproduction, Biodiversity, Threats, Conservation, References (8 sections)

**Features**: Full bilingual support, theme-aware styling, audio integration, responsive design with animations

#### Quiz Components (`/quiz/`)
- **QuizContent.jsx**: Main quiz container with navigation
- **QuestionCard.jsx**: Individual question display with answer validation
- **QuizHeader.jsx**: Quiz title and progress display
- **QuizNavigation.jsx**: Question navigation controls
- **QuizResults.jsx**: Results display with improvement analytics for pre/post tests
- **LanguageToggle.jsx**: Language switching component

#### UI Components (`/ui/`)
- **IconSymbol.tsx**: Cross-platform icon system (SF Symbols on iOS, Material Icons elsewhere)
- **TabBarBackground.tsx**: Platform-specific tab styling

---

## Frontend Organization

### Constants (`/constants/`)
- **Colors.ts**: Comprehensive theming system with semantic color names
  - Brand colors consistent across themes
  - Light/dark mode semantic colors
  - Testable gray shade system for dark backgrounds
  - TypeScript definitions for theme safety

### Contexts (`/contexts/`)
- **AuthContext.js**: Centralized authentication state management
  - Auth0 integration with cross-platform token storage
  - Supabase user data synchronization
  - Onboarding status tracking
  - User profile update methods
  - Session management with automatic cleanup

### Hooks (`/hooks/`)
- **useThemeColor.ts**: Advanced theming hook with multiple utilities
- **useColorScheme.ts/.web.ts**: Platform-specific color scheme detection
- **useQuiz.js**: Quiz data fetching with error handling
- **useQuizzes.js**: Real-time quiz collection management
- **useAudio.js**: Audio content management for lessons
- **useUserData.js**: User profile data management
- **useTheme.js**: Theme management utilities

---

## Services Architecture (UPDATED)

### Supabase Services (`/services/supabase/`) - **CLEANED UP**
- **config.js**: Supabase client configuration
- **index.js**: Centralized service exports (no session service exports)

#### Database Services:
- **quizService.js**: 
  - Bilingual quiz support with JSONB fields
  - Category-based organization
  - Real-time subscriptions
  - Question management with answer indexing
- **userService.js**:
  - Auth0 user linking via `auth0_user_id`
  - **Pre-assessment completion tracking** (key feature)
  - Profile management with real-time updates
- **quizResultService.js**: **UPDATED**
  - Session type tracking (`pre_study`, `post_study`, `regular`)
  - Improvement calculation between pre and post tests
  - Fixed database schema consistency issues
  - Proper category name handling (JSONB to string conversion)
- **categoryService.js**:
  - Bilingual category support
  - Slug-based routing
  - Active/inactive status management
- **audioService.js**:
  - Category-specific audio content (English/Malay)
  - Audio URL management
- **storage.js**:
  - Multi-bucket file management (quiz-images, lesson-materials, certificates)
  - Cross-platform upload handling
  - Base64 and File object support
- **utilityService.js**: **NEW FUNCTIONS**
  - `getUserOverallProgress()`: Complete progress overview across all topics
  - `getTopicAccessStatus()`: Topic access control based on pre-assessments
  - `getTopicQuizSummary()`: Quiz attempts summary per topic
  - `checkFeatureAccess()`: Feature access validation (lessons, post-tests)
  - `getCategoryIdBySlug()`: Category lookup by topic slug

#### ❌ REMOVED Services:
- **learningSessionService.js**: Completely removed (complex session management no longer needed)

---

## Key Features & Patterns (UPDATED)

### Simplified Learning Flow
1. **Topic Selection**: User browses available animal topics
2. **Pre-Assessment**: User takes a single quiz to test current knowledge
3. **Lesson Unlock**: Completing pre-assessment unlocks all lesson content
4. **Lesson Learning**: User can freely navigate through lesson sections
5. **Post-Assessment**: Unlimited post-tests to measure improvement
6. **Progress Tracking**: Simple completion status based on pre-assessment

### Bilingual Support
- Structured content objects with English/Malay translations
- User preference-based language switching
- JSONB database fields for multilingual content
- Backward compatibility with legacy string-based data

### Theming System
- Comprehensive light/dark mode support
- Semantic color naming convention
- Testable color system for UI consistency
- Platform-aware styling

### Cross-Platform Compatibility
- Platform-specific storage handling (localStorage vs SecureStore)
- Authentication redirect handling per platform
- File upload adaptation for web vs mobile
- Icon system abstraction

### Real-Time Data Integration
- Supabase subscriptions for live updates
- User data change propagation
- Quiz data synchronization
- Optimistic UI updates

### Error Handling & Logging
- Comprehensive try-catch blocks throughout services
- Detailed console logging for debugging
- Graceful fallbacks for missing data
- User-friendly error messages

---

## Data Flow Summary (UPDATED)

1. **Authentication**: Auth0 → JWT storage → Supabase user lookup/creation → Context state management
2. **Learning**: Topic selection → Pre-assessment → Lesson access unlock → Post-assessment (unlimited) → Improvement tracking
3. **Quiz System**: Quiz fetching → Bilingual content delivery → Answer submission → Result storage → Analytics
4. **Progress Tracking**: Pre-assessment completion → Lesson access control → Certificate eligibility

---

## Recent Changes (Final Cleanup Session)

### Session-Based System Removal
- **Removed Components**: All complex learning session components (8 files deleted)
  - LearningSessionStarter, ActiveSessionCard, SessionHeader
  - NewSessionCard, HistoryCard, ConfirmationModal
  - SessionProgressIndicator, LearningTopicCard
- **Updated Navigation Components**: Simplified Tiger, Tapir, and Turtle navigation
  - Removed session-related props (sessionId, quizId)
  - Simplified completion handlers
  - Removed complex error handling for session operations
- **Updated Lesson Layouts**: Removed session imports and simplified prop handling
- **Updated Lesson Pages**: Removed session parameter passing

### Database Schema Fixes
- **Session Type Consistency**: Fixed mismatch between code (`pre-lesson`/`post-lesson`) and database (`pre_study`/`post_study`)
- **Category Name Handling**: Fixed JSONB to string conversion issues
- **Missing Fields**: Added `started_at` field to quiz results

### Service Architecture Cleanup
- **Removed**: Junk learning session service file
- **Updated**: Service exports to remove old session functions
- **Maintained**: Clean utilityService with new pre-assessment functions

### Import/Export Cleanup
- **Removed**: All unused learning component imports
- **Updated**: Service index exports (no session service references)
- **Simplified**: Lesson component prop structures

---

## Development Notes

### Current Branch: `microTweaking`
- Completed transformation from session-based to pre-assessment system
- All old session-related code removed
- Database schema consistency achieved
- Component architecture simplified

### Architecture Benefits
- **Reduced Complexity**: No complex session lifecycle management
- **Better UX**: Immediate lesson access after pre-assessment
- **Simplified Maintenance**: Fewer components and services to maintain
- **Clear Data Flow**: Straightforward pre→lesson→post progression

### Testing Framework
- Component tests in `components/__tests__/`
- Snapshot testing for UI consistency
- Cross-platform testing considerations

### Build Configuration
- **EAS Build** configuration in `eas.json`
- **App Configuration** in `app.json`
- **TypeScript** configuration in `tsconfig.json`
- **Package Management** with npm/package-lock.json

This updated analysis reflects the complete transformation to a simplified pre-assessment unlock system with all legacy session-based code removed and database schema consistency achieved.