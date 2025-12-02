const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Tender = require('../models/Tender');
const User = require('../models/User');
const auth = require("../middleware/authMiddleware");

const multer = require('multer');
const path = require('path');
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, path.join(__dirname, '..', 'tender-uploads')),
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname)
});
const upload = multer({ storage, limits: { fileSize: 40 * 1024 * 1024 } });



async function generateTenderId() {
  let isUnique = false;
  let tenderId = '';

  while (!isUnique) {
    const randomNum = Math.floor(Math.random() * 100000);
    const padded = randomNum.toString().padStart(5, '0');
    tenderId = 'TE' + padded;

       const exists = await Tender.findOne({ tenderId });
    if (!exists) 
      {isUnique = true};
  }
  return tenderId;
}



router.post('/create', auth, upload.single('document'), async (req, res) => {
  try {
    const {
      name, version, clientName,
      assignedGroup, assignedTo: assignedToRaw,
      demoUrl, status, startDate, endDate,
      billingType, fixedPrice, estimateHours,
      // autoProgress
    } = req.body;

    const createdAt = new Date();
    const deadlineForAssignment = new Date(createdAt.getTime() + 5*24*60*60*1000);

    let assignedTo = null;
    let assignmentStatus = 'pending';

    if (assignedToRaw) {
      let candidate = null;
      if (mongoose.Types.ObjectId.isValid(assignedToRaw)) {
        candidate = await User.findById(assignedToRaw);
      }
     
      if (candidate) {
        if (candidate.available) {
          assignedTo = candidate._id;
          assignmentStatus = 'assigned';
           candidate.available = false;
            await candidate.save();
        }
      }
    } 
  

    let document = null;
    if (req.file) {
      document = {
        originalName: req.file.originalname,
        filename: req.file.filename,
        path: '/uploads/' + req.file.filename,
        mimeType: req.file.mimetype,
        size: req.file.size
      };
    }

     const tenderId = await generateTenderId();
     const userId = req.user._id; 
     console.log(userId)

    const tender = new Tender({
      tenderId,    
      name,
      version,
      clientName,
      creator: userId,
      assignedGroup,
      assignedTo,
      demoUrl,
      status,
      startDate: startDate ? new Date(startDate) : undefined,
      endDate: endDate ? new Date(endDate) : undefined,
      billingType,
      fixedPrice: fixedPrice ? Number(fixedPrice) : 0,
      estimateHours,
      // autoProgress: autoProgress === 'true' || autoProgress === true,
      document,
      assignmentStatus,
      createdAt,
      deadlineForAssignment
    });

    await tender.save();
     return res.status(201).json({
      success: true,
      message: 'Tender created successfully!',
      tenderId: tender._id
    });

  } catch (err) {
    console.error(err);

    return res.status(500).json({
      success: false,
      message: 'Failed to create tender. Please try again.',
      error: err.message
    });
  }
});



router.get('/listing', async (req, res) => {
  try {
    const projects = await Tender.find().populate('creator', 'name email')
    .populate('assignedTo', 'name email') .sort({ createdAt: -1 }); ; 
    res.status(200).json(projects);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});


router.get('/:id/document', async (req, res) => {
  try {
    const tender = await Tender.findById(req.params.id);
    // console.log('tender ki info',tender)
    if (!tender || !tender.document) {
      return res.status(404).json({ message: 'Document not found' });
    }

    const filePath = path.join(__dirname, '../tender-uploads', tender.document.filename);
    res.sendFile(filePath);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to fetch document', error: err.message });
  }
});

module.exports = router;
