import React from 'react';
import { Job } from "./types/job.type";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import useCountdown from './hooks/useCountdown';

const JobItem = ({
    item,
    handleAccept,
    handleReject
}: {
    item: Job;
    handleAccept: (id: string) => void;
    handleReject: (id: string) => void;
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

            {/* Footer: Timer + Actions */}
            <View style={styles.footer}>
                <View style={styles.timerBadge}>
                    <Text style={styles.timerText}>⏳ {human}</Text>
                </View>

                {/* Buttons */}
                <View style={styles.actions}>
                    <TouchableOpacity
                        style={[
                            styles.acceptBtn,
                            item.status === "ACCEPTED" && { opacity: 0.7 }
                        ]}
                        disabled={item.status === "ACCEPTED"}
                        onPress={() => handleAccept(item.id)}
                    >
                        <Text style={styles.btnText}>Accept</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[
                            styles.rejectBtn,
                        ]}
                        onPress={() => handleReject(item.id)}
                    >
                        <Text style={styles.btnText}>Clear</Text>
                    </TouchableOpacity>
                </View>
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

    footer: {
        marginTop: 16,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"
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

    actions: {
        flexDirection: "row",
        alignItems: "center",
        gap: 10
    },

    acceptBtn: {
        backgroundColor: "#1074f7ff",
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 8
    },

    rejectBtn: {
        backgroundColor: "#ef4444",
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 8
    },

    btnText: {
        color: "#fff",
        fontWeight: "700",
        fontSize: 13
    }
});

export default JobItem;
