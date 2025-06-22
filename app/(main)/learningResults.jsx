// app/(main)/learningResults.jsx
import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useColorScheme } from '@/hooks/useColorScheme';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { Colors } from '@/constants/Colors';
import { ActivityIndicator } from 'react-native-paper';
import { getLearningSession, completePostQuiz } from '@/services/supabase';

export default function LearningResultsPage() {
  const { sessionId } = useLocalSearchParams();
  const router = useRouter();
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === 'dark';
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);

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
        console.log('Ensuring session is marked as completed...');
        // The session should already be completed by the post-quiz, but this is a safety net
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
      <ThemedView style={styles.container}>
        <ActivityIndicator 
          size="large" 
          color={isDark ? Colors.dark.tint : Colors.light.tint} 
        />
        <ThemedText style={[
          styles.loadingText,
          { color: isDark ? Colors.dark.text : Colors.light.text }
        ]}>
          Loading your results...
        </ThemedText>
      </ThemedView>
    );
  }

  if (!session) {
    return (
      <ThemedView style={styles.container}>
        <ThemedText style={[
          styles.errorText,
          { color: isDark ? Colors.dark.text : Colors.light.text }
        ]}>
          Session not found
        </ThemedText>
      </ThemedView>
    );
  }

  const improvement = calculateImprovement();

  return (
    <ThemedView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <ThemedText 
          type="title" 
          style={[
            styles.title,
            { color: isDark ? Colors.dark.text : Colors.light.text }
          ]}
        >
          🎉 Learning Journey Complete!
        </ThemedText>
        
        <ThemedText style={[
          styles.subtitle,
          { color: isDark ? Colors.dark.textSecondary : Colors.light.textSecondary }
        ]}>
          {session.quiz_categories?.name || 'Topic'} Learning Session
        </ThemedText>

        {improvement && (
          <View style={[
            styles.resultsCard,
            { 
              backgroundColor: isDark ? Colors.dark.surface : Colors.light.backgroundSecondary,
              borderColor: isDark ? Colors.dark.border : Colors.light.border
            }
          ]}>
            <ImprovementIndicator improvement={improvement} isDark={isDark} />
            
            <View style={styles.scoresContainer}>
              <ScoreCard
                title="Pre-Lesson Score"
                score={improvement.preScore}
                maxScore={improvement.maxScore}
                icon="📝"
                color="#FF9800"
                isDark={isDark}
              />
              
              <ScoreCard
                title="Post-Lesson Score"
                score={improvement.postScore}
                maxScore={improvement.maxScore}
                icon="🎯"
                color="#4CAF50"
                isDark={isDark}
              />
            </View>
            
            <View style={styles.improvementSummary}>
              <ThemedText style={[
                styles.improvementText,
                { color: isDark ? Colors.dark.text : Colors.light.text }
              ]}>
                {improvement.improvement >= 0 ? 
                  `You improved by ${improvement.improvement} points!` :
                  `You scored ${Math.abs(improvement.improvement)} points lower this time.`
                }
              </ThemedText>
              
              {improvement.improvementPercentage > 0 && (
                <ThemedText style={[
                  styles.percentageText,
                  { color: isDark ? Colors.dark.textSecondary : Colors.light.textSecondary }
                ]}>
                  That's a {improvement.improvementPercentage}% improvement! 🚀
                </ThemedText>
              )}
            </View>
          </View>
        )}

        <SessionSummary session={session} isDark={isDark} />
        
        <View style={styles.actionButtons}>
          <TouchableOpacity 
            style={[
              styles.newTopicButton,
              { backgroundColor: isDark ? '#45a049' : '#4CAF50' }
            ]}
            onPress={() => router.push('/quizzes')}
            activeOpacity={0.8}
          >
            <ThemedText style={styles.buttonText}>
              🌟 Explore More Topics
            </ThemedText>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[
              styles.retakeButton,
              { backgroundColor: isDark ? '#1976D2' : '#2196F3' }
            ]}
            onPress={() => router.push(`/startLearning?topic=${session.quiz_categories?.slug}&quizId=${session.pre_study_quiz_id}`)}
            activeOpacity={0.8}
          >
            <ThemedText style={styles.buttonText}>
              🔄 Retake This Topic
            </ThemedText>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </ThemedView>
  );
}

// Component for visual improvement indicator
function ImprovementIndicator({ improvement, isDark }) {
  const getImprovementLevel = () => {
    if (improvement.improvementPercentage >= 20) return { level: 'Excellent', color: '#4CAF50', emoji: '🌟' };
    if (improvement.improvementPercentage >= 10) return { level: 'Great', color: '#8BC34A', emoji: '🎉' };
    if (improvement.improvementPercentage >= 5) return { level: 'Good', color: '#FFC107', emoji: '👍' };
    if (improvement.improvementPercentage >= 0) return { level: 'Keep Learning', color: '#FF9800', emoji: '📚' };
    return { level: 'Try Again', color: '#F44336', emoji: '💪' };
  };

  const level = getImprovementLevel();

  return (
    <View style={[
      styles.improvementIndicator, 
      { 
        backgroundColor: level.color + (isDark ? '30' : '20'),
        borderColor: isDark ? Colors.dark.border : Colors.light.border
      }
    ]}>
      <ThemedText style={styles.improvementEmoji}>{level.emoji}</ThemedText>
      <ThemedText style={[styles.improvementLevel, { color: level.color }]}>
        {level.level}
      </ThemedText>
    </View>
  );
}

// Individual score card component
function ScoreCard({ title, score, maxScore, icon, color, isDark }) {
  const percentage = maxScore > 0 ? Math.round((score / maxScore) * 100) : 0;
  
  return (
    <View style={[
      styles.scoreCard, 
      { 
        borderLeftColor: color,
        backgroundColor: isDark ? Colors.dark.backgroundSecondary : Colors.light.surface,
        borderColor: isDark ? Colors.dark.border : Colors.light.border
      }
    ]}>
      <ThemedText style={styles.scoreIcon}>{icon}</ThemedText>
      <ThemedText style={[
        styles.scoreTitle,
        { color: isDark ? Colors.dark.textSecondary : Colors.light.textSecondary }
      ]}>
        {title}
      </ThemedText>
      <ThemedText style={[styles.scoreValue, { color }]}>
        {score}/{maxScore}
      </ThemedText>
      <ThemedText style={[
        styles.scorePercentage,
        { color: isDark ? Colors.dark.textMuted : Colors.light.textMuted }
      ]}>
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
    
    return `${minutes} minutes`;
  };

  return (
    <View style={[
      styles.summaryCard,
      { 
        backgroundColor: isDark ? Colors.dark.surface : Colors.light.backgroundSecondary,
        borderColor: isDark ? Colors.dark.border : Colors.light.border
      }
    ]}>
      <ThemedText style={[
        styles.summaryTitle,
        { color: isDark ? Colors.dark.text : Colors.light.text }
      ]}>
        📊 Session Summary
      </ThemedText>
      
      <View style={[
        styles.summaryItem,
        { borderBottomColor: isDark ? Colors.dark.border : Colors.light.border }
      ]}>
        <ThemedText style={[
          styles.summaryLabel,
          { color: isDark ? Colors.dark.text : Colors.light.text }
        ]}>
          Topic:
        </ThemedText>
        <ThemedText style={[
          styles.summaryValue,
          { color: isDark ? Colors.dark.textSecondary : Colors.light.textSecondary }
        ]}>
          {session.quiz_categories?.name || 'Unknown'}
        </ThemedText>
      </View>
      
      <View style={[
        styles.summaryItem,
        { borderBottomColor: isDark ? Colors.dark.border : Colors.light.border }
      ]}>
        <ThemedText style={[
          styles.summaryLabel,
          { color: isDark ? Colors.dark.text : Colors.light.text }
        ]}>
          Study Duration:
        </ThemedText>
        <ThemedText style={[
          styles.summaryValue,
          { color: isDark ? Colors.dark.textSecondary : Colors.light.textSecondary }
        ]}>
          {formatDuration(session.study_started_at, session.study_completed_at)}
        </ThemedText>
      </View>
      
      <View style={[
        styles.summaryItem,
        { borderBottomColor: 'transparent' }
      ]}>
        <ThemedText style={[
          styles.summaryLabel,
          { color: isDark ? Colors.dark.text : Colors.light.text }
        ]}>
          Session Date:
        </ThemedText>
        <ThemedText style={[
          styles.summaryValue,
          { color: isDark ? Colors.dark.textSecondary : Colors.light.textSecondary }
        ]}>
          {new Date(session.created_at).toLocaleDateString()}
        </ThemedText>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: 20,
    paddingBottom: 40,
  },
  title: {
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    textAlign: 'center',
    fontSize: 18,
    marginBottom: 24,
  },
  loadingText: {
    marginTop: 16,
    textAlign: 'center',
  },
  errorText: {
    textAlign: 'center',
    fontSize: 16,
  },
  resultsCard: {
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  improvementIndicator: {
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    marginBottom: 20,
    borderWidth: 1,
  },
  improvementEmoji: {
    fontSize: 32,
    marginBottom: 8,
  },
  improvementLevel: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  scoresContainer: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 20,
  },
  scoreCard: {
    flex: 1,
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    borderLeftWidth: 4,
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  scoreIcon: {
    fontSize: 24,
    marginBottom: 8,
  },
  scoreTitle: {
    fontSize: 14,
    marginBottom: 8,
    textAlign: 'center',
  },
  scoreValue: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  scorePercentage: {
    fontSize: 16,
  },
  improvementSummary: {
    alignItems: 'center',
  },
  improvementText: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 4,
  },
  percentageText: {
    fontSize: 14,
    textAlign: 'center',
  },
  summaryCard: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  summaryTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  summaryItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: 1,
  },
  summaryLabel: {
    fontWeight: '500',
  },
  summaryValue: {
    // Color set dynamically
  },
  actionButtons: {
    gap: 12,
  },
  newTopicButton: {
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  retakeButton: {
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});