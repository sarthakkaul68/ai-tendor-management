const mongoose = require('mongoose');

const WorkflowSchema = new mongoose.Schema({
  title: { type: String, required: true },
  days: { type: Number, default: 0 },
  code: { type: String, required: true, unique: true }
}, {
  collection: 'workflow' 
});

module.exports = mongoose.model('Workflow', WorkflowSchema);
