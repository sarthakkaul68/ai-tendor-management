const cron = require('node-cron');
const Tender = require('../models/Tender');
const User = require('../models/User');

cron.schedule('0 * * * *', async () => {
  try {
    const now = new Date();
    const pending = await Tender.find({ assignedTo: null, deadlineForAssignment: { $lt: now } });
    if (!pending.length) return;

    const hod = await User.findOne({ role: 'HOD' });
    if (!hod) return console.log('No HOD found to auto-assign');

    for (const tender of pending) {
      tender.assignedTo = hod._id;
      tender.assignmentStatus = 'auto-assigned';
      await tender.save();
    }
  } catch (err) {
    console.error('Scheduler error', err);
  }
});
