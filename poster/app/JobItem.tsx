import React from 'react';
import { Job } from "./types/job.type";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import useCountdown from './hooks/useCountdown';

const JobItem = ({
    item,
    loading,
    handleDelete
}: {
    item: Job;
    loading: boolean;
    handleDelete: (id: string) => void;
}) => {
    const { human } = useCountdown(item.expireAt);

    const statusColor =
        item.status === "ACCEPTED" ? "#10b981" : "#a8b910ff";

    return (
        <View style={styles.card}>
            {/* Title + Status */}
            <View style={styles.rowBetween}>
                <Text style={styles.title}>{item.title}</Text>
                <View style={[styles.statusBadge, { backgroundColor: statusColor }]}>
                    <Text style={styles.statusText}>{item.status}</Text>
                </View>
            </View>

            {/* Category */}
            <Text style={styles.category}>Category: {item.category}</Text>

            {/* Footer */}
            <View style={styles.actions}>
                <View style={styles.timerBadge}>
                    <Text style={styles.timerText}>⏳ {human}</Text>
                </View>

                <TouchableOpacity
                    style={[
                        styles.deleteBtn,
                        (item.status === "ACCEPTED" || loading) && { opacity: 0.5 }
                    ]}
                    disabled={item.status === "ACCEPTED" || loading}
                    onPress={() => handleDelete(item.id)}
                >
                    <Text style={styles.deleteText}>Delete</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};


const styles = StyleSheet.create({
    card: {
        backgroundColor: "#ffffff",
        borderRadius: 14,
        padding: 16,
        marginBottom: 16,
        shadowColor: "#000",
        shadowOpacity: 0.08,
        shadowOffset: { width: 0, height: 3 },
        shadowRadius: 6,
        elevation: 2
    },

    rowBetween: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },

    title: {
        fontSize: 18,
        fontWeight: "700",
        color: "#111827"
    },

    statusBadge: {
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 8
    },

    statusText: {
        color: "#fff",
        fontWeight: "700",
        fontSize: 12
    },

    category: {
        marginTop: 8,
        fontSize: 14,
        color: "#6b7280"
    },

    actions: {
        marginTop: 14,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center" // ✅ aligns timer + button perfectly
    },

    timerBadge: {
        backgroundColor: "#e0f2fe",
        paddingHorizontal: 10,
        paddingVertical: 6,
        borderRadius: 8
    },

    timerText: {
        color: "#0369a1",
        fontWeight: "600",
        fontSize: 13
    },

    deleteBtn: {
        backgroundColor: "#ef4444",
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 8
    },

    deleteText: {
        color: "#fff",
        fontWeight: "700",
        fontSize: 13
    }
});

export default JobItem;
