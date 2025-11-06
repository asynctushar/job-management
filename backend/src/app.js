require("dotenv").config();
const express = require("express");
const cors = require("cors");
const jobRoutes = require("./routes/job.route");

const createApp = (io) => {
    const app = express();

    app.use(express.json());
    app.use(cors({ origin: "*", credentials: true }));

    // Attach io to req so controllers can broadcast
    app.use((req, res, next) => {
        req.io = io;
        next();
    });

    app.use("/api/jobs", jobRoutes);

    // basic health check
    app.get("/health", (_, res) => res.json({ status: "ok" }));

    return app;
};

module.exports = createApp;
