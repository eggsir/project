import { StyleSheet } from 'react-native';

import Header from '../../components/Header';
import { View } from '../../components/Themed';

export default function TabOneScreen() {
  const totalTasks = 8;
  const completedTasks = 3;

  return (
    <View style={styles.container}>
      <Header completedTasks={completedTasks} totalTasks={totalTasks} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'stretch',
  },
});
