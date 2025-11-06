const jobService = require("../services/job.service");

exports.createJob = (req, res) => {
    try {
        const { title, category, timeInHours } = req.body;

        if (!title || !category) {
            return res.status(400).json({ message: "Title and category are required" });
        }
        if (timeInHours === undefined || timeInHours === null) {
            return res.status(400).json({ message: "Please provide expiration time (timeInHours)" });
        }
        if (typeof timeInHours !== "number" || isNaN(timeInHours) || timeInHours <= 0) {
            return res.status(400).json({ message: "Expiration time should be a positive number (hours)" });
        }

        const job = jobService.createJob({ title, category, timeInHours });

        // Broadcast new job
        req.io.emit("job:new", job);

        return res.status(201).json({ job });
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
};

exports.getJobs = (_req, res) => {
    const jobs = jobService.getJobs();
    return res.status(200).json(jobs);
};

exports.deleteJob = (req, res) => {
    try {
        const jobId = req.params.id;
        const job = jobService.deleteJob(jobId);

        // Broadcast deletion
        req.io.emit("job:deleted", { job, message: "Job deleted by poster" });

        return res.status(200).json({ job });
    } catch (err) {
        return res.status(400).json({ message: err.message });
    }
};
