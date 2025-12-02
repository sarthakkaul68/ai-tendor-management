const mongoose = require('mongoose');
const { Schema } = mongoose;

// const UserSchema = new Schema({
//   name: String,
//   email: String,
//   password: String,
//   role: { type: String, enum: ['employee','hod','admin'], default: 'employee' },
//   available: { type: Boolean, default: true },
// });

const UserSchema = new Schema({
  employeeId: { type: String, required: true, unique: true }, 
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  mobile: { type: String, required: true }, 
  role: { type: String, enum: ['Employee','HOD','Admin'], default: 'Employee' },
  division: { type: String }, 
  department: { type: String }, 
  lastLogin: { type: Date }, 
  available: { type: Boolean, default: true }, 
}, { timestamps: true });


module.exports = mongoose.model('User', UserSchema);