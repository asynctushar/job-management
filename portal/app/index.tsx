import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from "react-native";
import axios from "axios";
import { API_BASE_URL } from "./config/api";

export default function Index() {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [loading, setLoading] = useState(false);

  const handlePostJob = async () => {

    if (!title || !category) {
      Alert.alert("Missing fields", "Please enter both title and category");
      return;
    }

    try {
      setLoading(true);
      await axios.post(`${API_BASE_URL}/api/jobs`, { title, category });
      Alert.alert("✅ Success", "Job posted successfully!");
      setTitle("");
      setCategory("");
    } catch (err) {
      console.error(err);
      Alert.alert("❌ Error", "Failed to post job");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Post a Job</Text>

      <TextInput
        style={styles.input}
        placeholder="Job Title"
        value={title}
        onChangeText={setTitle}
      />

      <TextInput
        style={styles.input}
        placeholder="Category"
        value={category}
        onChangeText={setCategory}
      />

      <TouchableOpacity
        style={[styles.button, loading && styles.disabled]}
        disabled={loading}
        onPress={handlePostJob}
      >
        <Text style={styles.buttonText}>{loading ? "Posting..." : "Post Job"}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: "center",
    backgroundColor: "#f9fafb",
  },
  heading: {
    fontSize: 26,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
    color: "#111827",
  },
  input: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#d1d5db",
    borderRadius: 10,
    padding: 12,
    marginBottom: 15,
    fontSize: 16,
  },
  button: {
    backgroundColor: "#2563eb",
    padding: 15,
    borderRadius: 10,
  },
  disabled: { opacity: 0.6 },
  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontSize: 18,
    fontWeight: "600",
  },
});
