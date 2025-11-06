const { v4: uuidv4 } = require("uuid");

class JobService {
    constructor() {
        this.jobs = [];
    }

    createJob({ title, category, timeInHours }) {
        const now = Date.now();
        const job = {
            id: uuidv4(),
            title,
            category,
            status: "PENDING",
            createdAt: new Date(now).toISOString(),
            expireAt: new Date(now + timeInHours * 60 * 60 * 1000).toISOString(),
            acceptedBy: null,
            acceptedAt: null,
        };
        this.jobs.push(job);
        return job;
    }

    acceptJob(jobId, providerName = "provider") {
        const job = this.jobs.find((j) => j.id === jobId);
        if (!job) throw new Error("Job not found");

        // expiration check: if expireAt <= now, the job is expired
        if (new Date(job.expireAt).getTime() <= Date.now()) {
            throw new Error("Job expired");
        }

        if (job.status === "ACCEPTED") {
            throw new Error("Job already accepted");
        }

        // mark accepted
        job.status = "ACCEPTED";
        job.acceptedBy = providerName;
        job.acceptedAt = new Date().toISOString();

        return job;
    }

    getJobs() {
        // return a shallow copy to avoid external mutation
        return this.jobs.map((j) => ({ ...j }));
    }

    deleteJob(jobId) {
        const job = this.jobs.find((j) => j.id === jobId);
        if (!job) throw new Error("Job not found");
        if (job.status === "ACCEPTED") throw new Error("Cannot delete: job already accepted");

        // remove it
        this.jobs = this.jobs.filter((j) => j.id !== jobId);
        return job;
    }
}

module.exports = new JobService();
