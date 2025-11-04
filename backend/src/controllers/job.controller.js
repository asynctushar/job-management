const jobService = require("../services/job.service");

exports.createJob = (req, res) => {
    const { title, category } = req.body;

    if (!title || !category) {
        return res.status(400).json({ message: "Title and category are required" });
    }

    const job = jobService.createJob({ title, category });

    // 🔥 Broadcast to all connected clients
    req.io.emit("job:new", job);

    res.status(201).json(job);
};
