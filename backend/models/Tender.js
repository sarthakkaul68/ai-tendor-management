const mongoose = require('mongoose');
const { Schema } = mongoose;

const FileSchema = new Schema({
  originalName: String,
  filename: String,
  path: String,
  mimeType: String,
  size: Number,
});

const TenderSchema = new Schema({
  tenderId: { type: String, unique: true },
  name: { type: String, required: true },           
  version: { type: String },                        
  clientName: { type: String },
  creator: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  assignedGroup: { type: String },                  
  assignedTo: { type: Schema.Types.ObjectId, ref: 'User', default: null },

  demoUrl: { type: String },
  status: { type: String,
     enum: ['Open','In-Progress','Overdue','Closed'],
    default: 'Open'
   },                         
  startDate: { type: Date },
  endDate: { type: Date },

  billingType: { type: String },                    
  fixedPrice: { type: Number, default: 0 },
  estimateHours: { type: String },                  
  // autoProgress: { type: Boolean, default: false },

  document: FileSchema,

  assignmentStatus: {
    type: String,
    enum: ['pending','assigned','auto-assigned'],
    default: 'pending'
  },
  createdAt: { type: Date, default: Date.now },
  deadlineForAssignment: { type: Date }

});

module.exports = mongoose.model('Tender', TenderSchema);
