import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Alert
} from "react-native";
import axios, { AxiosError } from "axios";
import { Job } from "./types/job.type";
import io, { Socket } from "socket.io-client";
import JobItem from "./JobItem";

const API_BASE_URL = process.env.EXPO_PUBLIC_API_BASE_URL;

export default function Index() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const socketRef = useRef<Socket | null>(null);


  // Fetch jobs once
  useEffect(() => {
    (async () => {
      try {
        const res = await axios.get(`${API_BASE_URL}/api/jobs`);
        setJobs(res.data);

      } catch (err) {
        if (err instanceof AxiosError && err.response && err.response.data) {
          Alert.alert(err.response.data.message);
        } else if (err instanceof AxiosError) {
          Alert.alert(err.message);
        } else {
          Alert.alert("Something went wrong");
        }
      }

    })();
  }, []);

  // Initialize socket once
  useEffect(() => {
    if (!socketRef.current) {
      socketRef.current = io(API_BASE_URL, { transports: ["websocket"] });

    }
    const socket = socketRef.current;

    const onConnect = () => {
      console.log("✅ Socket connected:", socket.id);
    };
    const onNew = (job: Job) => setJobs((prev) => [job, ...prev]);
    const onClosed = ({ job }: { job: Job; }) => setJobs((prev) => prev.map((j) => j.id === job.id ? job : j));
    const onDeleted = ({ job }: { job: Job; }) => setJobs((prev) => prev.filter((j) => j.id !== job.id));
    const onError = ({ message }: { message: string; }) => Alert.alert("Job error", message);

    socket.on("connect", onConnect);
    socket.on("job:new", onNew);
    socket.on("job:closed", onClosed);
    socket.on("job:deleted", onDeleted);
    socket.on("job:error", onError);

    return () => {
      socket.off("job:new", onNew);
      socket.off("job:closed", onClosed);
      socket.off("job:deleted", onDeleted);
      socket.off("job:error", onError);
      socket.off("connect", onConnect);
    };
  }, []);


  // Accept job (emit socket event)
  const handleAccept = (jobId: string) => {
    if (!socketRef.current) return;

    socketRef.current.emit("job:accept", { jobId });
  };

  // Reject job (locally)
  const handleReject = (jobId: string) => {
    setJobs((prev) => prev.filter((j) => j.id !== jobId));
  };


  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Available Jobs</Text>
      <FlatList data={jobs} keyExtractor={(i) => i.id} renderItem={({ item }: { item: Job; }) => {
        return (
          <JobItem item={item} handleAccept={handleAccept} handleReject={handleReject} />
        );
      }} ListEmptyComponent={<Text style={styles.empty}>No pending jobs</Text>} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#f8fafc" },
  heading: { fontSize: 20, fontWeight: "700", textAlign: "center", marginBottom: 12 },
  empty: { textAlign: "center", marginTop: 20, color: "#9ca3af" },
});