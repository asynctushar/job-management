require("dotenv").config();
const express = require("express");
const cors = require("cors");
const jobRoutes = require("./routes/job.route");

const createApp = (io) => {
    const app = express();

    app.use(express.json());
    app.use(cors({ origin: "*", credentials: true }));

    // Inject io into request
    app.use((req, res, next) => {
        req.io = io;
        next();
    });

    // Routes
    app.use("/api/jobs", jobRoutes);

    return app;
};

module.exports = createApp;
