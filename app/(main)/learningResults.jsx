// app/(main)/learningResults.jsx
import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useColorScheme } from '@/hooks/useColorScheme';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { Colors } from '@/constants/Colors';
import { ActivityIndicator } from 'react-native-paper';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { getLearningSession, finalizeSessionCompletion } from '@/services/supabase';

export default function LearningResultsPage() {
  const { sessionId } = useLocalSearchParams();
  const router = useRouter();
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === 'dark';
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showQuizComparison, setShowQuizComparison] = useState(false);

  useEffect(() => {
    if (sessionId) {
      fetchSessionData();
    }
  }, [sessionId]);

  const fetchSessionData = async () => {
    try {
      const sessionData = await getLearningSession(sessionId);
      setSession(sessionData);
      
      if (sessionData && sessionData.session_status !== 'post_quiz_completed') {
        console.log('Finalizing session completion...');
        await finalizeSessionCompletion(sessionId);
        const updatedSession = await getLearningSession(sessionId);
        setSession(updatedSession);
      }
    } catch (error) {
      console.error('Error fetching session data:', error);
    } finally {
      setLoading(false);
    }
  };

  const calculateImprovement = () => {
    if (!session?.pre_study_result || !session?.post_study_result) {
      return null;
    }

    const preScore = session.pre_study_result.score;
    const postScore = session.post_study_result.score;
    const maxScore = session.post_study_result.max_possible_score;
    
    const improvement = postScore - preScore;
    const improvementPercentage = maxScore > 0 ? (improvement / maxScore) * 100 : 0;
    
    return {
      preScore,
      postScore,
      maxScore,
      improvement,
      improvementPercentage: Math.round(improvementPercentage * 10) / 10
    };
  };

  if (loading) {
    return (
      <ThemedView style={styles.loadingContainer}>
        <ActivityIndicator 
          size="large" 
          color={isDark ? Colors.dark.tint : Colors.light.tint} 
        />
        <ThemedText style={styles.loadingText}>
          Loading Results
        </ThemedText>
      </ThemedView>
    );
  }

  if (!session) {
    return (
      <ThemedView style={styles.errorContainer}>
        <MaterialIcons 
          name="error-outline" 
          size={48} 
          color={isDark ? Colors.dark.textMuted : Colors.light.textMuted} 
        />
        <ThemedText style={styles.errorText}>
          Session not found
        </ThemedText>
      </ThemedView>
    );
  }

  const improvement = calculateImprovement();

  return (
    <ThemedView style={styles.container}>
      <ScrollView 
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <MaterialIcons 
            name="check-circle" 
            size={40} 
            color={isDark ? Colors.dark.tint : Colors.light.tint} 
          />
          <ThemedText type="title" style={styles.title}>
            Learning Complete
          </ThemedText>
          <ThemedText style={styles.subtitle}>
            {session.quiz_categories?.name || 'Topic'} Session
          </ThemedText>
        </View>

        {improvement && (
          <>
            {/* Score Comparison */}
            <View style={[
              styles.scoreCard,
              { 
                backgroundColor: isDark ? Colors.dark.surface : Colors.light.surface,
                borderColor: isDark ? Colors.dark.border : Colors.light.border
              }
            ]}>
              <View style={styles.scoreHeader}>
                <ThemedText style={styles.cardTitle}>Score Comparison</ThemedText>
                <ImprovementBadge improvement={improvement} isDark={isDark} />
              </View>
              
              <View style={styles.scoresRow}>
                <ScoreItem
                  label="Before"
                  score={improvement.preScore}
                  maxScore={improvement.maxScore}
                  iconName="quiz"
                  isDark={isDark}
                />
                
                <View style={styles.arrowContainer}>
                  <MaterialIcons 
                    name="arrow-forward" 
                    size={24} 
                    color={isDark ? Colors.dark.textMuted : Colors.light.textMuted} 
                  />
                </View>
                
                <ScoreItem
                  label="After"
                  score={improvement.postScore}
                  maxScore={improvement.maxScore}
                  iconName="school"
                  isDark={isDark}
                  isHighlighted
                />
              </View>
              
              <View style={styles.improvementSummary}>
                <ThemedText style={styles.improvementText}>
                  {improvement.improvement >= 0 ? 
                    `+${improvement.improvement} points improvement` :
                    `${improvement.improvement} points difference`
                  }
                </ThemedText>
                
                {improvement.improvementPercentage > 0 && (
                  <ThemedText style={styles.percentageText}>
                    {improvement.improvementPercentage}% better
                  </ThemedText>
                )}
              </View>
            </View>

            {/* Quiz Comparison Section */}
            <QuizComparisonSection 
              session={session} 
              isDark={isDark}
              showComparison={showQuizComparison}
              onToggleComparison={() => setShowQuizComparison(!showQuizComparison)}
            />

            {/* Session Details */}
            <SessionSummary session={session} isDark={isDark} />
          </>
        )}
        
        {/* Action Buttons */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity 
            style={[
              styles.primaryButton,
              { backgroundColor: isDark ? Colors.dark.tint : Colors.light.tint }
            ]}
            onPress={() => router.push('/')}
            activeOpacity={0.8}
          >
            <MaterialIcons name="explore" size={20} color="#fff" />
            <ThemedText style={styles.buttonText}>
              Explore Topics
            </ThemedText>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[
              styles.secondaryButton,
              { 
                borderColor: isDark ? Colors.dark.border : Colors.light.border,
                backgroundColor: isDark ? Colors.dark.surface : Colors.light.surface
              }
            ]}
            onPress={() => {
              const timestamp = Date.now();
              router.push(`/startLearning?topic=${session.quiz_categories?.slug}&quizId=${session.pre_study_quiz_id}&refresh=${timestamp}`);
            }}
            activeOpacity={0.8}
          >
            <MaterialIcons 
              name="refresh" 
              size={20} 
              color={isDark ? Colors.dark.text : Colors.light.text} 
            />
            <ThemedText style={[
              styles.secondaryButtonText,
              { color: isDark ? Colors.dark.text : Colors.light.text }
            ]}>
              Retake
            </ThemedText>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </ThemedView>
  );
}

// Quiz Comparison Section Component
function QuizComparisonSection({ session, isDark, showComparison, onToggleComparison }) {
  const preAnswers = session.pre_study_result?.user_answers || [];
  const postAnswers = session.post_study_result?.user_answers || [];
  
  // Calculate improvements
  const improvements = preAnswers.map((preAnswer, index) => {
    const postAnswer = postAnswers[index];
    if (!postAnswer) return null;
    
    const improved = !preAnswer.is_correct && postAnswer.is_correct;
    const regressed = preAnswer.is_correct && !postAnswer.is_correct;
    const maintained = preAnswer.is_correct && postAnswer.is_correct;
    
    return {
      questionIndex: index,
      preAnswer,
      postAnswer,
      improved,
      regressed,
      maintained,
      status: improved ? 'improved' : regressed ? 'regressed' : maintained ? 'maintained' : 'missed'
    };
  }).filter(Boolean);

  const stats = {
    improved: improvements.filter(i => i.improved).length,
    regressed: improvements.filter(i => i.regressed).length,
    maintained: improvements.filter(i => i.maintained).length,
    total: improvements.length
  };

  return (
    <View style={[
      styles.comparisonCard,
      { 
        backgroundColor: isDark ? Colors.dark.surface : Colors.light.surface,
        borderColor: isDark ? Colors.dark.border : Colors.light.border
      }
    ]}>
      <TouchableOpacity 
        style={styles.comparisonHeader} 
        onPress={onToggleComparison}
        activeOpacity={0.7}
      >
        <View style={styles.comparisonTitleRow}>
          <MaterialIcons 
            name="compare" 
            size={20} 
            color={isDark ? Colors.dark.textSecondary : Colors.light.textSecondary} 
          />
          <ThemedText style={styles.cardTitle}>Quiz Comparison</ThemedText>
        </View>
        
        <View style={styles.comparisonStats}>
          <View style={styles.statBadge}>
            <MaterialIcons name="trending-up" size={14} color="#4CAF50" />
            <ThemedText style={[styles.statText, { color: '#4CAF50' }]}>
              {stats.improved}
            </ThemedText>
          </View>
          
          <MaterialIcons 
            name={showComparison ? "expand-less" : "expand-more"} 
            size={24} 
            color={isDark ? Colors.dark.textSecondary : Colors.light.textSecondary} 
          />
        </View>
      </TouchableOpacity>

      {showComparison && (
        <View style={styles.comparisonContent}>
          {/* Quick Stats */}
          <View style={styles.quickStats}>
            <StatItem 
              icon="trending-up" 
              label="Improved" 
              value={stats.improved} 
              color="#4CAF50" 
            />
            <StatItem 
              icon="trending-down" 
              label="Missed" 
              value={stats.regressed} 
              color="#F44336" 
            />
            <StatItem 
              icon="check-circle" 
              label="Maintained" 
              value={stats.maintained} 
              color="#2196F3" 
            />
          </View>

          {/* Question by Question Comparison */}
          <View style={styles.questionsList}>
            {improvements.map((item, index) => (
              <QuestionComparisonItem 
                key={index}
                item={item} 
                questionNumber={index + 1}
                isDark={isDark}
              />
            ))}
          </View>
        </View>
      )}
    </View>
  );
}

// Individual Question Comparison Item
function QuestionComparisonItem({ item, questionNumber, isDark }) {
  const { preAnswer, postAnswer, status } = item;
  
  const getStatusColor = (status) => {
    switch (status) {
      case 'improved': return '#4CAF50';
      case 'regressed': return '#F44336';
      case 'maintained': return '#2196F3';
      default: return isDark ? Colors.dark.textMuted : Colors.light.textMuted;
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'improved': return 'trending-up';
      case 'regressed': return 'trending-down';
      case 'maintained': return 'check-circle';
      default: return 'remove-circle';
    }
  };

  return (
    <View style={[
      styles.questionItem,
      { borderColor: isDark ? Colors.dark.border : Colors.light.border }
    ]}>
      <View style={styles.questionHeader}>
        <View style={styles.questionNumberContainer}>
          <ThemedText style={styles.questionNumber}>Q{questionNumber}</ThemedText>
        </View>
        
        <View style={[
          styles.statusBadge,
          { backgroundColor: getStatusColor(status) + '20' }
        ]}>
          <MaterialIcons 
            name={getStatusIcon(status)} 
            size={14} 
            color={getStatusColor(status)} 
          />
        </View>
      </View>

      <ThemedText style={styles.questionText} numberOfLines={2}>
        {preAnswer.question_text}
      </ThemedText>

      <View style={styles.answersComparison}>
        {/* Pre-Quiz Answer */}
        <View style={styles.answerColumn}>
          <ThemedText style={styles.answerLabel}>Before</ThemedText>
          <View style={[
            styles.answerItem,
            { 
              backgroundColor: preAnswer.is_correct ? '#4CAF5020' : '#F4433620',
              borderColor: preAnswer.is_correct ? '#4CAF50' : '#F44336'
            }
          ]}>
            <MaterialIcons 
              name={preAnswer.is_correct ? "check" : "close"} 
              size={16} 
              color={preAnswer.is_correct ? '#4CAF50' : '#F44336'} 
            />
            <ThemedText style={styles.answerText} numberOfLines={1}>
              {preAnswer.user_answer}
            </ThemedText>
          </View>
        </View>

        {/* Arrow */}
        <View style={styles.arrowSmall}>
          <MaterialIcons 
            name="arrow-forward" 
            size={16} 
            color={isDark ? Colors.dark.textMuted : Colors.light.textMuted} 
          />
        </View>

        {/* Post-Quiz Answer */}
        <View style={styles.answerColumn}>
          <ThemedText style={styles.answerLabel}>After</ThemedText>
          <View style={[
            styles.answerItem,
            { 
              backgroundColor: postAnswer.is_correct ? '#4CAF5020' : '#F4433620',
              borderColor: postAnswer.is_correct ? '#4CAF50' : '#F44336'
            }
          ]}>
            <MaterialIcons 
              name={postAnswer.is_correct ? "check" : "close"} 
              size={16} 
              color={postAnswer.is_correct ? '#4CAF50' : '#F44336'} 
            />
            <ThemedText style={styles.answerText} numberOfLines={1}>
              {postAnswer.user_answer}
            </ThemedText>
          </View>
        </View>
      </View>

      {/* Correct Answer (if both were wrong) */}
      {!preAnswer.is_correct && !postAnswer.is_correct && (
        <View style={styles.correctAnswerContainer}>
          <ThemedText style={styles.correctAnswerLabel}>Correct Answer:</ThemedText>
          <ThemedText style={styles.correctAnswerText}>
            {preAnswer.correct_answer}
          </ThemedText>
        </View>
      )}
    </View>
  );
}

// Quick stat item component
function StatItem({ icon, label, value, color }) {
  return (
    <View style={styles.statItem}>
      <MaterialIcons name={icon} size={16} color={color} />
      <ThemedText style={styles.statLabel}>{label}</ThemedText>
      <ThemedText style={[styles.statValue, { color }]}>{value}</ThemedText>
    </View>
  );
}

// Improvement badge component
function ImprovementBadge({ improvement, isDark }) {
  const getImprovementLevel = () => {
    if (improvement.improvementPercentage >= 20) return { level: 'Excellent', color: '#4CAF50' };
    if (improvement.improvementPercentage >= 10) return { level: 'Great', color: '#8BC34A' };
    if (improvement.improvementPercentage >= 5) return { level: 'Good', color: '#FFC107' };
    if (improvement.improvementPercentage >= 0) return { level: 'Progress', color: '#FF9800' };
    return { level: 'Review', color: '#F44336' };
  };

  const level = getImprovementLevel();

  return (
    <View style={[
      styles.improvementBadge,
      { backgroundColor: level.color + '20', borderColor: level.color }
    ]}>
      <ThemedText style={[styles.badgeText, { color: level.color }]}>
        {level.level}
      </ThemedText>
    </View>
  );
}

// Individual score item component
function ScoreItem({ label, score, maxScore, iconName, isDark, isHighlighted = false }) {
  const percentage = maxScore > 0 ? Math.round((score / maxScore) * 100) : 0;
  
  return (
    <View style={[
      styles.scoreItem,
      isHighlighted && { 
        backgroundColor: isDark ? Colors.dark.backgroundSecondary : Colors.light.backgroundSecondary 
      }
    ]}>
      <MaterialIcons 
        name={iconName} 
        size={20} 
        color={isDark ? Colors.dark.textSecondary : Colors.light.textSecondary} 
      />
      <ThemedText style={styles.scoreLabel}>{label}</ThemedText>
      <ThemedText style={styles.scoreValue}>
        {score}/{maxScore}
      </ThemedText>
      <ThemedText style={styles.scorePercentage}>
        {percentage}%
      </ThemedText>
    </View>
  );
}

// Session summary component
function SessionSummary({ session, isDark }) {
  const formatDuration = (startTime, endTime) => {
    if (!startTime || !endTime) return 'N/A';
    
    const start = new Date(startTime);
    const end = new Date(endTime);
    const minutes = Math.round((end - start) / (1000 * 60));
    
    return `${minutes}m`;
  };

  const summaryItems = [
    {
      icon: 'category',
      label: 'Topic',
      value: session.quiz_categories?.name || 'Unknown'
    },
    {
      icon: 'schedule',
      label: 'Duration',
      value: formatDuration(session.study_started_at, session.study_completed_at)
    },
    {
      icon: 'today',
      label: 'Date',
      value: new Date(session.created_at).toLocaleDateString()
    }
  ];

  return (
    <View style={[
      styles.summaryCard,
      { 
        backgroundColor: isDark ? Colors.dark.surface : Colors.light.surface,
        borderColor: isDark ? Colors.dark.border : Colors.light.border
      }
    ]}>
      <ThemedText style={styles.cardTitle}>Session Details</ThemedText>
      
      <View style={styles.summaryGrid}>
        {summaryItems.map((item, index) => (
          <View key={index} style={styles.summaryItem}>
            <View style={styles.summaryItemHeader}>
              <MaterialIcons 
                name={item.icon} 
                size={16} 
                color={isDark ? Colors.dark.textSecondary : Colors.light.textSecondary} 
              />
              <ThemedText style={styles.summaryLabel}>
                {item.label}
              </ThemedText>
            </View>
            <ThemedText style={styles.summaryValue}>
              {item.value}
            </ThemedText>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: 16,
    paddingBottom: 32,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 16,
  },
  loadingText: {
    fontSize: 16,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 16,
    padding: 20,
  },
  errorText: {
    fontSize: 16,
    textAlign: 'center',
  },
  
  // Header
  header: {
    alignItems: 'center',
    marginBottom: 24,
    gap: 8,
  },
  title: {
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    opacity: 0.7,
    textAlign: 'center',
  },
  
  // Cards
  scoreCard: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  comparisonCard: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  summaryCard: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
  },
  
  // Score section
  scoreHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  improvementBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    borderWidth: 1,
  },
  badgeText: {
    fontSize: 12,
    fontWeight: '600',
  },
  scoresRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  scoreItem: {
    flex: 1,
    alignItems: 'center',
    padding: 12,
    borderRadius: 8,
    gap: 4,
  },
  arrowContainer: {
    paddingHorizontal: 12,
  },
  scoreLabel: {
    fontSize: 12,
    opacity: 0.7,
  },
  scoreValue: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  scorePercentage: {
    fontSize: 14,
    opacity: 0.8,
  },
  improvementSummary: {
    alignItems: 'center',
    gap: 4,
  },
  improvementText: {
    fontSize: 16,
    fontWeight: '500',
    textAlign: 'center',
  },
  percentageText: {
    fontSize: 14,
    opacity: 0.7,
    textAlign: 'center',
  },

  // Quiz Comparison Section
  comparisonHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 0,
  },
  comparisonTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  comparisonStats: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  statBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 8,
    paddingVertical: 4,
    backgroundColor: '#4CAF5020',
    borderRadius: 12,
  },
  statText: {
    fontSize: 12,
    fontWeight: '600',
  },
  comparisonContent: {
    marginTop: 16,
  },
  quickStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
    paddingVertical: 12,
    backgroundColor: 'rgba(128, 128, 128, 0.05)',
    borderRadius: 8,
  },
  statItem: {
    alignItems: 'center',
    gap: 4,
  },
  statLabel: {
    fontSize: 12,
    opacity: 0.7,
  },
  statValue: {
    fontSize: 16,
    fontWeight: 'bold',
  },

  // Question Items
  questionsList: {
    gap: 12,
  },
  questionItem: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
  },
  questionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  questionNumberContainer: {
    backgroundColor: 'rgba(128, 128, 128, 0.1)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  questionNumber: {
    fontSize: 12,
    fontWeight: '600',
  },
  statusBadge: {
    padding: 6,
    borderRadius: 12,
  },
  questionText: {
    fontSize: 14,
    marginBottom: 12,
    lineHeight: 20,
  },
  answersComparison: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  answerColumn: {
    flex: 1,
  },
  answerLabel: {
    fontSize: 12,
    opacity: 0.7,
    marginBottom: 6,
  },
  answerItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    padding: 8,
    borderRadius: 6,
    borderWidth: 1,
  },
  answerText: {
    fontSize: 13,
    flex: 1,
  },
  arrowSmall: {
    paddingHorizontal: 4,
  },
  correctAnswerContainer: {
    marginTop: 12,
    padding: 8,
    backgroundColor: 'rgba(33, 150, 243, 0.1)',
    borderRadius: 6,
  },
  correctAnswerLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: '#2196F3',
    marginBottom: 4,
  },
  correctAnswerText: {
    fontSize: 14,
    color: '#2196F3',
  },
  
  // Summary section
  summaryGrid: {
    gap: 12,
  },
  summaryItem: {
    gap: 4,
  },
  summaryItemHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  summaryLabel: {
    fontSize: 14,
    opacity: 0.7,
  },
  summaryValue: {
    fontSize: 16,
    fontWeight: '500',
  },
  
  // Buttons
  buttonContainer: {
    gap: 12,
  },
  primaryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 12,
    gap: 8,
    minHeight: 48,
  },
  secondaryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    gap: 8,
    minHeight: 48,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  secondaryButtonText: {
    fontSize: 16,
    fontWeight: '500',
  },
});