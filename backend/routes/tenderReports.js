const express = require("express");
const router = express.Router();
const TenderReport = require("../models/TenderReport");

router.post("/", async (req, res) => {
  try {
    const { reportId, filename, uploadedAt, analysis, winningRate } = req.body;

    if (!reportId || !filename || !uploadedAt || !analysis) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // Check if report already exists
    const existing = await TenderReport.findOne({ reportId });
    if (existing) {
      return res.status(400).json({ message: "Report already saved" });
    }

    const newReport = new TenderReport({
      reportId,
      filename,
      uploadedAt,
      analysis,
      winningRate,
    });

    await newReport.save();
    res.status(201).json({ message: "Analysis saved successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
