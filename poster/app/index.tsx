import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Alert,
  TextInput,
  TouchableOpacity
} from "react-native";
import axios from "axios";
import { Job } from "./types/job.type";
import io, { Socket } from "socket.io-client";
import JobItem from "./JobItem";

const API_BASE_URL = process.env.EXPO_PUBLIC_API_BASE_URL;

export default function Index() {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [timeInHours, setTimeInHours] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [jobs, setJobs] = useState<Job[]>([]);
  const socketRef = useRef<Socket | null>(null);


  // Initialize socket once
  useEffect(() => {
    if (!socketRef.current) {
      socketRef.current = io(API_BASE_URL, { transports: ["websocket"] });
    }
    const socket = socketRef.current;

    const onConnect = () => {
      console.log("✅ Socket connected:", socket.id);
    };

    const onClosed = ({ job }: { job: Job; }) => {
      setJobs((prev) => prev.map((j) => (j.id === job.id ? job : j)));
    };


    socket.on("connect", onConnect);
    socket.on("job:closed", onClosed);

    // Cleanup when component unmounts
    return () => {
      socket.off("job:closed", onClosed);
      socket.off("connect", onConnect);
    };
  }, []);


  const handlePostJob = async () => {
    if (!title || !category) {
      Alert.alert("Missing fields", "Please fill title and category");
      return;
    }
    const hours = Number(timeInHours);
    if (!hours || hours <= 0) {
      Alert.alert("Invalid expiry", "Expiration time must be a positive number (hours)");
      return;
    }
    setLoading(true);
    try {
      const res = await axios.post(`${API_BASE_URL}/api/jobs`, { title, category, timeInHours: hours });
      setJobs((prev) => [...prev, res.data.job]);
      setTitle("");
      setCategory("");
      setTimeInHours("");
      Alert.alert("Job posted");
    } catch (err: any) {
      console.error(err);
      Alert.alert("Error", err?.response?.data?.message || "Failed to post job");
    } finally {
      setLoading(false);
    }
  };

  // delete job
  const handleDelete = async (jobId: string) => {
    setLoading(true);
    try {
      await axios.delete(`${API_BASE_URL}/api/jobs/${jobId}`);
      setJobs((prev) => prev.filter((j) => j.id !== jobId));
      Alert.alert("Job deleted");
    } catch (err: any) {
      Alert.alert("Error", err?.response?.data?.message || "Failed to delete");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Post a Job</Text>

      <TextInput style={styles.input} placeholder="Title" value={title} onChangeText={setTitle} />
      <TextInput style={styles.input} placeholder="Category" value={category} onChangeText={setCategory} />
      <TextInput style={styles.input} placeholder="Expire in (hours)" value={timeInHours} keyboardType="numeric" onChangeText={setTimeInHours} />

      <TouchableOpacity style={[styles.button, loading && { opacity: 0.6 }]} onPress={handlePostJob} disabled={loading}>
        <Text style={styles.buttonText}>Post Job</Text>
      </TouchableOpacity>

      <Text style={[styles.heading, { marginTop: 20 }]}>My Created Jobs</Text>

      <FlatList data={jobs} keyExtractor={(i) => i.id} renderItem={({ item }: { item: Job; }) => {
        return (
          <JobItem item={item} loading={loading} handleDelete={handleDelete} />
        );
      }} ListEmptyComponent={<Text style={styles.empty}>No jobs yet</Text>} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#f3f4f6" },
  heading: { fontSize: 20, fontWeight: "700", textAlign: "center", marginBottom: 12 },
  input: { backgroundColor: "#fff", padding: 12, borderRadius: 10, marginBottom: 10 },
  button: { backgroundColor: "#2563eb", padding: 14, borderRadius: 10, alignItems: "center" },
  buttonText: { color: "#fff", fontWeight: "700" },
  title: { fontSize: 16, fontWeight: "700" },
  category: { color: "#6b7280" },
  empty: { textAlign: "center", marginTop: 20, color: "#9ca3af" },
});