import { useMemo, useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import { Priority, useTasks } from "../../context/TaskContext";

type PriorityFilter = "all" | Priority;
const FILTERS: PriorityFilter[] = ["all", "low", "medium", "high"];
const PRIORITIES: Priority[] = ["low", "medium", "high"];

export default function Index() {
  const {
    tasks,
    motivationText,
    setMotivationText,
    addTask,
    toggleTask,
    updateTaskText,
    setTaskPriority,
    deleteTask,
  } = useTasks();
  const [newTaskText, setNewTaskText] = useState("");
  const [priorityFilter, setPriorityFilter] = useState<PriorityFilter>("all");
  const [editingTaskId, setEditingTaskId] = useState<number | null>(null);
  const [editingText, setEditingText] = useState("");

  const totalTasks = tasks.length;
  const completedTasks = useMemo(() => tasks.filter((task) => task.completed).length, [tasks]);
  const percentage = totalTasks === 0 ? 0 : Math.round((completedTasks / totalTasks) * 100);
  const filteredTasks = useMemo(
    () => (priorityFilter === "all" ? tasks : tasks.filter((task) => task.priority === priorityFilter)),
    [tasks, priorityFilter]
  );

  const handleAddTask = () => {
    const trimmedText = newTaskText.trim();
    if (!trimmedText) return;

    addTask(trimmedText);
    setNewTaskText("");
  };

  const startEditing = (task: (typeof tasks)[number]) => {
    setEditingTaskId(task.id);
    setEditingText(task.text);
  };

  const saveEditing = (id: number) => {
    const trimmedText = editingText.trim();
    if (!trimmedText) return;

    updateTaskText(id, trimmedText);
    setEditingTaskId(null);
    setEditingText("");
  };

  const cancelEditing = () => {
    setEditingTaskId(null);
    setEditingText("");
  };

  const handleDeleteTask = (id: number) => {
    deleteTask(id);
    if (editingTaskId === id) {
      cancelEditing();
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Today's Tasks</Text>
      <TextInput
        value={motivationText}
        onChangeText={setMotivationText}
        style={styles.motivationInput}
        placeholder="ARHHHHHH"
        placeholderTextColor="#9CA3AF"
      />
      <View style={styles.progressHeader}>
        <Text style={styles.metaText}>
          {completedTasks}/{totalTasks} completed
        </Text>
        <Text style={styles.metaText}>{percentage}%</Text>
      </View>
      <View style={styles.track}>
        <View style={[styles.fill, { width: `${percentage}%` }]} />
      </View>

      <View style={styles.inputRow}>
        <TextInput
          value={newTaskText}
          onChangeText={setNewTaskText}
          placeholder="Type a task..."
          placeholderTextColor="#7A7A7A"
          style={styles.input}
          onSubmitEditing={handleAddTask}
          returnKeyType="done"
        />
        <Pressable onPress={handleAddTask} style={styles.addButton}>
          <Text style={styles.addButtonText}>Add</Text>
        </Pressable>
      </View>

      <Text style={styles.sectionLabel}>Filter tasks by priority </Text>
      <View style={styles.filterRow}>
        {FILTERS.map((filter) => (
          <Pressable
            key={filter}
            onPress={() => setPriorityFilter(filter)}
            style={[
              styles.filterChip,
              filter === "medium" && styles.priorityChipMedium,
              filter === "high" && styles.priorityChipHigh,
              priorityFilter === filter && styles.priorityChipActive,
            ]}
          >
            <Text
              style={[
                styles.priorityChipText,
                priorityFilter === filter && styles.priorityChipTextActive,
              ]}
            >
              {filter.toUpperCase()}
            </Text>
          </Pressable>
        ))}
      </View>

      <ScrollView style={styles.list} contentContainerStyle={styles.listContent}>
        {filteredTasks.map((task) => {
          const isEditing = editingTaskId === task.id;

          return (
            <View
              key={task.id}
              style={[
                styles.taskCard,
                task.priority === "low" && styles.taskCardLow,
                task.priority === "medium" && styles.taskCardMedium,
                task.priority === "high" && styles.taskCardHigh,
              ]}
            >
              <Pressable onPress={() => toggleTask(task.id)} style={styles.checkButton}>
                <Text style={styles.checkMark}>{task.completed ? "X" : ""}</Text>
              </Pressable>

              <View style={styles.taskMain}>
                {isEditing ? (
                  <TextInput
                    value={editingText}
                    onChangeText={setEditingText}
                    style={styles.editInput}
                    autoFocus
                  />
                ) : (
                  <Text style={[styles.taskText, task.completed && styles.taskDone]}>{task.text}</Text>
                )}

                <View style={styles.taskPriorityRow}>
                  {PRIORITIES.map((priority) => (
                    <Pressable
                      key={`${task.id}-${priority}`}
                      onPress={() => setTaskPriority(task.id, priority)}
                      style={[
                        styles.taskPriorityChip,
                        priority === "medium" && styles.priorityChipMedium,
                        priority === "high" && styles.priorityChipHigh,
                        task.priority === priority && styles.priorityChipActive,
                      ]}
                    >
                      <Text
                        style={[
                          styles.taskPriorityText,
                          task.priority === priority && styles.priorityChipTextActive,
                        ]}
                      >
                        {priority}
                      </Text>
                    </Pressable>
                  ))}
                </View>
              </View>

              {isEditing ? (
                <View style={styles.actions}>
                  <Pressable onPress={() => saveEditing(task.id)} style={styles.actionButton}>
                    <Text style={styles.actionText}>Save</Text>
                  </Pressable>
                  <Pressable onPress={cancelEditing} style={styles.actionButton}>
                    <Text style={styles.actionText}>Cancel</Text>
                  </Pressable>
                </View>
              ) : (
                <View style={styles.actions}>
                  <Pressable onPress={() => startEditing(task)} style={styles.actionButton}>
                    <Text style={styles.actionText}>Edit</Text>
                  </Pressable>
                  <Pressable onPress={() => handleDeleteTask(task.id)} style={styles.deleteButton}>
                    <Text style={styles.deleteText}>Delete</Text>
                  </Pressable>
                </View>
              )}
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 68,
    paddingHorizontal: 20,
    backgroundColor: "#fff7f9",
  },
  title: {
    fontSize: 32,
    fontWeight: "700",
    marginBottom: 8,
  },
  motivationInput: {
    alignSelf: "flex-start",
    maxWidth: "75%",
    backgroundColor: "#f6fdfe",
    borderColor: "#ffffff",
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 6,
    fontSize: 20,
    color: "#7C4A62",
    marginBottom: 12,
  },
  progressHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  metaText: {
    fontSize: 14,
    color: "#333",
  },
  track: {
    width: "100%",
    height: 10,
    borderRadius: 999,
    backgroundColor: "#E5E7EB",
    overflow: "hidden",
  },
  fill: {
    height: "100%",
    borderRadius: 999,
    backgroundColor: "#d684e7",
  },
  inputRow: {
    marginTop: 16,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  input: {
    flex: 1,
    height: 44,
    borderRadius: 10,
    backgroundColor: "#fff",
    paddingHorizontal: 12,
    fontSize: 16,
  },
  addButton: {
    height: 44,
    paddingHorizontal: 14,
    borderRadius: 10,
    backgroundColor: "#e86e8d",
    alignItems: "center",
    justifyContent: "center",
  },
  addButtonText: {
    color: "#fff",
    fontWeight: "700",
  },
  sectionLabel: {
    marginTop: 10,
    fontSize: 12,
    color: "#4B5563",
    fontWeight: "700",
  },
  filterRow: {
    marginTop: 6,
    flexDirection: "row",
    gap: 8,
  },
  filterChip: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 999,
    backgroundColor: "#F3F4F6",
  },
  priorityChipMedium: {
    backgroundColor: "#FEF3C7",
  },
  priorityChipHigh: {
    backgroundColor: "#FFE4E6",
  },
  priorityChipActive: {
    borderWidth: 2,
    borderColor: "#111827",
  },
  priorityChipText: {
    fontSize: 11,
    color: "#374151",
    fontWeight: "700",
  },
  priorityChipTextActive: {
    color: "#111827",
  },
  list: {
    marginTop: 12,
    flex: 1,
  },
  listContent: {
    paddingBottom: 24,
    gap: 10,
  },
  taskCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 12,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    borderWidth: 1,
    borderColor: "#F3F4F6",
  },
  taskCardLow: {
    backgroundColor: "#F5F7FB",
    borderColor: "#E6EAF2",
  },
  taskCardMedium: {
    backgroundColor: "#FFF4D9",
    borderColor: "#F5E2AE",
  },
  taskCardHigh: {
    backgroundColor: "#FDE8ED",
    borderColor: "#F4C9D6",
  },
  checkButton: {
    width: 24,
    height: 24,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: "#640a55",
    alignItems: "center",
    justifyContent: "center",
  },
  checkMark: {
    color: "#5a1255",
    fontWeight: "700",
  },
  taskMain: {
    flex: 1,
  },
  taskText: {
    fontSize: 16,
    color: "#1F2937",
  },
  taskDone: {
    textDecorationLine: "line-through",
    color: "#6B7280",
  },
  editInput: {
    fontSize: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#CBD5E1",
    paddingVertical: 2,
  },
  taskPriorityRow: {
    marginTop: 8,
    flexDirection: "row",
    gap: 6,
  },
  taskPriorityChip: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 999,
    backgroundColor: "#EEF2FF",
  },
  taskPriorityText: {
    fontSize: 11,
    color: "#374151",
    fontWeight: "600",
  },
  actions: {
    flexDirection: "row",
    gap: 8,
  },
  actionButton: {
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderRadius: 8,
    backgroundColor: "#E8EEF8",
  },
  actionText: {
    color: "#df749f",
    fontSize: 12,
    fontWeight: "600",
  },
  deleteButton: {
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderRadius: 8,
    backgroundColor: "#FFE4E6",
  },
  deleteText: {
    color: "#BE123C",
    fontSize: 12,
    fontWeight: "600",
  },
});
