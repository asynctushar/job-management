const jobService = require("../services/job.service");

module.exports = (io, socket) => {
    socket.on("job:accept", ({ jobId, providerName } = {}) => {
        try {
            const job = jobService.acceptJob(jobId, providerName || "provider");
            // if accept succeeded, broadcast closed
            io.emit("job:closed", { job, message: "Job accepted" });
        } catch (err) {
            // send error back to the requester
            socket.emit("job:error", { message: err.message });
        }
    });
};
