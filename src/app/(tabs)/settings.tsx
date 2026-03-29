import { useEffect, useState } from "react";
import { Alert, Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { useTasks } from "../../context/TaskContext";

const SettingsScreen = () => {
  const { clearAllTasks, motivationText, setMotivationText, tasks } = useTasks();
  const [draftMotivation, setDraftMotivation] = useState(motivationText);

  useEffect(() => {
    setDraftMotivation(motivationText);
  }, [motivationText]);

  const saveMotivation = () => {
    setMotivationText(draftMotivation.trim() || "ARHHHHHH");
  };

  const confirmClearTasks = () => {
    Alert.alert("Clear all tasks?", "This will remove every task from your list.", [
      { text: "Cancel", style: "cancel" },
      { text: "Clear", style: "destructive", onPress: clearAllTasks },
    ]);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Settings</Text>

      <View style={styles.card}>
        <Text style={styles.label}>Words to yourself</Text>
        <TextInput
          value={draftMotivation}
          onChangeText={setDraftMotivation}
          placeholder="ARHHHHHH"
          placeholderTextColor="#9CA3AF"
          style={styles.input}
        />
        <Pressable style={styles.saveButton} onPress={saveMotivation}>
          <Text style={styles.saveButtonText}>Save message</Text>
        </Pressable>
      </View>

      <View style={styles.card}>
        <Text style={styles.label}>Task actions</Text>
        <Text style={styles.helperText}>Current tasks: {tasks.length}</Text>
        <Pressable style={styles.clearButton} onPress={confirmClearTasks}>
          <Text style={styles.clearButtonText}>Clear all tasks</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default SettingsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FAE6EB",
    paddingHorizontal: 20,
    paddingTop: 72,
  },
  title: {
    fontSize: 32,
    fontWeight: "700",
    marginBottom: 16,
  },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    padding: 14,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#F2D8E2",
  },
  label: {
    fontSize: 14,
    fontWeight: "700",
    color: "#374151",
    marginBottom: 8,
  },
  helperText: {
    fontSize: 12,
    color: "#6B7280",
    marginBottom: 10,
  },
  input: {
    height: 44,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    backgroundColor: "#FFF8E7",
    paddingHorizontal: 12,
    fontSize: 14,
    color: "#7C4A62",
    marginBottom: 10,
  },
  saveButton: {
    borderRadius: 10,
    paddingVertical: 10,
    alignItems: "center",
    backgroundColor: "#E86E8D",
  },
  saveButtonText: {
    color: "#FFFFFF",
    fontWeight: "700",
    fontSize: 14,
  },
  clearButton: {
    borderRadius: 10,
    paddingVertical: 10,
    alignItems: "center",
    backgroundColor: "#FECACA",
  },
  clearButtonText: {
    color: "#991B1B",
    fontWeight: "700",
    fontSize: 14,
  },
});
