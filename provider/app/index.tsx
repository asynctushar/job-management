import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet
} from "react-native";
import axios from "axios";
import { Job } from "./types/job.type";
import io, { Socket } from "socket.io-client";
import { API_BASE_URL } from "./config/api";


export default function Index() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const socketRef = useRef<Socket | null>(null);



  // Accept job (emit socket event)
  const handleAccept = (jobId: string) => {
    if (!socketRef.current) return;

    socketRef.current.emit("job:accept", { jobId });
  };

  // Reject job (locally)
  const handleReject = (jobId: string) => {
    setJobs((prev) => prev.filter((j) => j.id !== jobId));
  };


  // Fetch jobs once
  useEffect(() => {
    (async () => {
      const res = await axios.get(`${API_BASE_URL}/api/jobs`);
      setJobs(res.data.filter((job: Job) => job.status === "PENDING"));

    })();
  }, []);

  // Initialize socket once
  useEffect(() => {
    if (!socketRef.current) {
      socketRef.current = io(API_BASE_URL, { transports: ["websocket"] });

    }

    const socket = socketRef.current;

    socket.on("connect", () => {
      console.log("✅ Socket connected:", socket.id);
    });

    socket.on("job:new", (job: Job) => {
      setJobs((prev) => [...prev, job]);
    });

    socket.on("job:closed", ({ job }) => {
      setJobs((prev) => prev.filter((j) => j.id !== job.id));
    });

    socket.on("job:error", (err) => {
      console.warn("⚠️ job:error", err.message);
    });

    // Cleanup when component unmounts
    return () => {
      if (socketRef.current) {
        console.log("🧹 Disconnecting socket:", socketRef.current.id);

        socket.off("job:new");
        socket.off("job:closed");
        socket.off("job:error");
        socketRef.current.disconnect();
        socketRef.current = null;
      }
    };
  }, []);


  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Available Jobs</Text>
      {jobs.length === 0 ? (
        <Text style={styles.empty}>No pending jobs</Text>
      ) : (
        <FlatList
          data={jobs}
          keyExtractor={(item) => item.id}
          renderItem={
            ({ item }: { item: Job; }) => (
              <View style={styles.jobCard}>
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.category}>{item.category}</Text>
                <View style={styles.actions}>
                  <TouchableOpacity
                    style={[styles.button, styles.accept]}
                    onPress={() => handleAccept(item.id)}
                  >
                    <Text style={styles.buttonText}>Accept </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[styles.button, styles.reject]}
                    onPress={() => handleReject(item.id)}
                  >
                    <Text style={styles.buttonText}>Reject </Text>
                  </TouchableOpacity>
                </View>
              </View>
            )
          }
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9fafb",
    padding: 20,
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 15,
    textAlign: "center",
  },
  jobCard: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 6,
  },
  category: {
    fontSize: 16,
    color: "#6b7280",
    marginBottom: 12,
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  button: {
    flex: 1,
    padding: 10,
    borderRadius: 8,
    marginHorizontal: 4,
  },
  accept: { backgroundColor: "#22c55e" },
  reject: { backgroundColor: "#ef4444" },
  buttonText: {
    color: "#fff",
    fontWeight: "600",
    textAlign: "center",
  },
  empty: {
    textAlign: "center",
    color: "#9ca3af",
    marginTop: 30,
  },
});
