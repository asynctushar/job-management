const jobService = require("../services/job.service");

module.exports = (io, socket) => {
    // Provider accepts a job
    socket.on("job:accept", ({ jobId }) => {
        const job = jobService.acceptJob(jobId);

        if (job) {
            // Notify all providers that the job is closed
            io.emit("job:closed", { job, message: "Job is closed."});
        } else {
            socket.emit("job:error", { message: "Job already accepted or invalid" });
        }
    });
};
