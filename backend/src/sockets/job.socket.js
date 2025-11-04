const jobService = require("../services/job.service");

module.exports = (io, socket) => {
    // Provider accepts a job
    socket.on("job:accept", ({ jobId, providerName }) => {
        const job = jobService.acceptJob(jobId, providerName);

        if (job) {
            // Notify all providers that the job is closed
            io.emit("job:closed", { jobId, acceptedBy: providerName });
        } else {
            socket.emit("job:error", { message: "Job already accepted or invalid" });
        }
    });

    // Provider rejects a job (local UI only, but can handle server logic if needed)
    socket.on("job:reject", ({ jobId }) => {
        console.log(`Provider ${socket.id} rejected job ${jobId}`);
        // No need to broadcast; handled locally by provider app
    });
};
