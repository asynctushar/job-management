const { v4: uuidv4 } = require("uuid");

class JobService {
    constructor() {
        this.jobs = [];
    }

    createJob({ title, category }) {
        const job = {
            id: uuidv4(),
            title,
            category,
            status: "PENDING",
        };
        this.jobs.push(job);
        return job;
    }

    acceptJob(jobId) {
        const job = this.jobs.find((j) => j.id === jobId);
        if (job && job.status === "PENDING") {
            job.status = "ACCEPTED";
            return job;
        }
        return null;
    }

    getJobs() {
        return this.jobs;
    }
}

module.exports = new JobService();
