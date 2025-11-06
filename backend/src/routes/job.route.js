const express = require("express");
const { createJob, getJobs, deleteJob } = require("../controllers/job.controller");
const router = express.Router();

router.post("/", createJob);
router.get("/", getJobs);
router.delete("/:id", deleteJob);

module.exports = router;
