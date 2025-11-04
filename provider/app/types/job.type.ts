export type JobStatus = "PENDING" | "ACCEPTED";

export interface Job {
    id: string;
    title: string;
    category: string;
    status: JobStatus;
}
