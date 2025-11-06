export type JobStatus = "PENDING" | "ACCEPTED";

export interface Job {
    id: string;
    title: string;
    category: string;
    status: JobStatus;
    createdAt: string; // ISO
    expireAt: string;  // ISO
    acceptedBy?: string | null;
    acceptedAt?: string | null;
}
