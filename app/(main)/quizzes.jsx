import React from 'react';
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
  StyleSheet,
  useColorScheme,
  Image,
  RefreshControl,
} from 'react-native';
import { useRouter } from 'expo-router';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';

// Updated import - using our new hook
import { useQuizzes } from '@/hooks/useQuizzes';

export default function QuizzesListPage() {
  const { quizzes, loading } = useQuizzes({ realTime: true });
  const router = useRouter();
  const isDark = useColorScheme() === 'dark';
  const [refreshing, setRefreshing] = React.useState(false);

  // Convert object to array for FlatList
  const data = React.useMemo(() => {
    if (!quizzes) return [];
    
    return Object.entries(quizzes).map(([id, quiz]) => ({
      id,
      ...quiz,
    }));
  }, [quizzes]);

  const onRefresh = React.useCallback(async () => {
    setRefreshing(true);
    // The useQuizzes hook will automatically refresh via real-time subscription
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  }, []);

  if (loading && !quizzes) {
    return (
      <ThemedView style={styles.center}>
        <ActivityIndicator size="large" color="#0a7ea4" />
        <ThemedText style={styles.loadingText}>Loading quizzes...</ThemedText>
      </ThemedView>
    );
  }

  if (data.length === 0) {
    return (
      <ThemedView style={styles.center}>
        <View style={styles.emptyStateContainer}>
          <Text style={styles.emptyStateIcon}>📚</Text>
          <ThemedText style={styles.noQuizzesText}>
            No quizzes available yet.
          </ThemedText>
          <ThemedText style={styles.noQuizzesSubtext}>
            Check back later or contact your administrator.
          </ThemedText>
          <TouchableOpacity 
            style={styles.refreshButton}
            onPress={onRefresh}
          >
            <ThemedText style={styles.refreshButtonText}>
              Refresh
            </ThemedText>
          </TouchableOpacity>
        </View>
      </ThemedView>
    );
  }

  const renderQuizCard = ({ item }) => (
    <TouchableOpacity
      style={[styles.card, isDark && styles.cardDark]}
      onPress={() => router.push(`/quizDetail?quizId=${item.id}`)}
      activeOpacity={0.7}
    >
      <View style={styles.cardContent}>
        <View style={styles.cardHeader}>
          <ThemedText style={styles.title} numberOfLines={2}>
            {item.title}
          </ThemedText>
        </View>
        
        {item.description && (
          <ThemedText style={styles.description} numberOfLines={2}>
            {item.description}
          </ThemedText>
        )}
        
        <View style={styles.statsRow}>
          <View style={styles.statItem}>
            <ThemedText style={styles.statValue}>
              {item.questions?.length || 0}
            </ThemedText>
            <ThemedText style={styles.statLabel}>
              {item.questions?.length === 1 ? 'Question' : 'Questions'}
            </ThemedText>
          </View>
          
          {item.category && (
            <View style={styles.categoryBadge}>
              <ThemedText style={styles.categoryText}>
                {item.category}
              </ThemedText>
            </View>
          )}
        </View>
        
        <View style={styles.footerRow}>
          <ThemedText style={styles.authorText}>
            by {item.createdBy ? 'Admin' : 'Unknown'}
          </ThemedText>
          <ThemedText style={styles.dateText}>
            {item.createdAt ? new Date(item.createdAt).toLocaleDateString() : 'Unknown date'}
          </ThemedText>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <ThemedView style={styles.container}>
      <View style={styles.header}>
        <ThemedText type="subtitle" style={styles.headerText}>
          Available Quizzes
        </ThemedText>
        <ThemedText style={styles.headerSubtext}>
          {data.length} quiz{data.length !== 1 ? 'es' : ''} available
        </ThemedText>
      </View>
      
      <FlatList
        data={data}
        renderItem={renderQuizCard}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={['#0a7ea4']}
            tintColor="#0a7ea4"
          />
        }
        ItemSeparatorComponent={() => <View style={{ height: 16 }} />}
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 8,
  },
  headerText: {
    marginBottom: 4,
  },
  headerSubtext: {
    opacity: 0.7,
    fontSize: 14,
  },
  list: {
    padding: 16,
    paddingTop: 8,
    paddingBottom: 40,
  },
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
  },
  emptyStateContainer: {
    alignItems: 'center',
    maxWidth: 300,
  },
  emptyStateIcon: {
    fontSize: 48,
    marginBottom: 16,
  },
  noQuizzesText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center',
  },
  noQuizzesSubtext: {
    fontSize: 16,
    opacity: 0.7,
    marginBottom: 24,
    textAlign: 'center',
    lineHeight: 22,
  },
  refreshButton: {
    backgroundColor: '#0a7ea4',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  refreshButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardDark: {
    backgroundColor: '#252525',
  },
  cardContent: {
    padding: 16,
    gap: 12,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    flex: 1,
    marginRight: 12,
    lineHeight: 24,
  },
  description: {
    fontSize: 14,
    opacity: 0.8,
    lineHeight: 20,
  },
  difficultyBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  easyBadge: {
    backgroundColor: '#a8e6cf',
  },
  mediumBadge: {
    backgroundColor: '#fdffb6',
  },
  hardBadge: {
    backgroundColor: '#ffcfd2',
  },
  difficultyText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#333',
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  statValue: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  statLabel: {
    fontSize: 14,
    opacity: 0.7,
  },
  categoryBadge: {
    backgroundColor: '#e1f5fe',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  categoryText: {
    fontSize: 12,
    color: '#0a7ea4',
    fontWeight: '500',
  },
  footerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  authorText: {
    fontSize: 12,
    opacity: 0.6,
  },
  dateText: {
    fontSize: 12,
    opacity: 0.6,
  },
});