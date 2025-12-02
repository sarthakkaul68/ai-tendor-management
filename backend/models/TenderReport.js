const mongoose = require("mongoose");

const TenderReportSchema = new mongoose.Schema(
  {
    reportId: { type: String, required: true, unique: true },
    filename: { type: String, required: true },
    uploadedAt: { type: Date, required: true },
    analysis: {
      type: Map,
      of: String,
      required: true,
    },
    winningRate: { type: Number, default: null },
  },
  { timestamps: true }
);

module.exports = mongoose.model("TenderReport", TenderReportSchema, "tender_reports");
