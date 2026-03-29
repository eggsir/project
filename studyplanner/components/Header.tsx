import { StyleSheet, View } from 'react-native';

import { Text } from './Themed';

type HeaderProps = {
  completedTasks: number;
  totalTasks: number;
};

export default function Header({ completedTasks, totalTasks }: HeaderProps) {
  const safeCompleted = Math.max(0, completedTasks);
  const safeTotal = Math.max(0, totalTasks);
  const percentage = safeTotal === 0 ? 0 : Math.min(100, Math.round((safeCompleted / safeTotal) * 100));
    
    return (
    <View style={styles.wrapper}>
      <Text style={styles.title}>Today's Tasks</Text>
      <View style={styles.progressHeader}>
        <Text style={styles.progressText}>
          {safeCompleted}/{safeTotal} completed
        </Text>
        <Text style={styles.progressText}>{percentage}%</Text>
      </View>
      <View style={styles.track}>
        <View style={[styles.fill, { width: `${percentage}%` }]} />
      </View>
        </View>
    );
}

const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 12,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 16,
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  progressText: {
    fontSize: 14,
    opacity: 0.75,
  },
  track: {
    height: 10,
    borderRadius: 999,
    backgroundColor: '#E5E7EB',
    overflow: 'hidden',
  },
  fill: {
    height: '100%',
    borderRadius: 999,
    backgroundColor: '#2f95dc',
  },
});
