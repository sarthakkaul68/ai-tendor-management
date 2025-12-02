const express = require('express');
const router = express.Router();
const Workflow = require('../models/Workflow');

// GET all workflows
router.get('/', async (req, res) => {
  try {
    const workflows = await Workflow.find();
    res.json(workflows);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});



router.put('/:id', async (req, res) => {
  try {
    const { days } = req.body;

    if (days === undefined || isNaN(days)) {
      return res.status(400).json({ message: 'Invalid days value' });
    }

    const workflow = await Workflow.findByIdAndUpdate(
      req.params.id,
      { days: Number(days) },
      { new: true }
    );

    if (!workflow) {
      return res.status(404).json({ message: 'Workflow not found' });
    }

    res.status(200).json(workflow);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to update workflow', error: err.message });
  }
});

module.exports = router;
