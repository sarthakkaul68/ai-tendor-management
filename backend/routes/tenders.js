const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Tender = require('../models/Tender');
const User = require('../models/User');
const auth = require("../middleware/authMiddleware");
const { OpenRouter } = require("@openrouter/sdk");

const axios = require("axios");


const multer = require('multer');

const memoryStorage = multer.memoryStorage();
const uploadMemory = multer({ storage: multer.memoryStorage() });
const pdfParse = require("pdf-parse");



const path = require('path');
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, path.join(__dirname, '..', 'tender-uploads')),
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname)
});
const upload = multer({ storage, limits: { fileSize: 40 * 1024 * 1024 } });

const openrouter = new OpenRouter({
  apiKey: process.env.OPENROUTER_API_KEY
});

async function generateTenderId() {
  let isUnique = false;
  let tenderId = '';

  while (!isUnique) {
    const randomNum = Math.floor(Math.random() * 100000);
    const padded = randomNum.toString().padStart(5, '0');
    tenderId = 'TE' + padded;

    const exists = await Tender.findOne({ tenderId });
    if (!exists) { isUnique = true };
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
    const deadlineForAssignment = new Date(createdAt.getTime() + 5 * 24 * 60 * 60 * 1000);

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
      .populate('assignedTo', 'name email').sort({ createdAt: -1 });;
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



router.post("/analyze", uploadMemory.single("file"), async (req, res) => {
  try {
    console.log("pdfParse module:", pdfParse);
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    let tenderText = "";

    if (req.file.mimetype === "application/pdf") {

      const data = await pdfParse(req.file.buffer);
      tenderText = data.text;
    } else {
      tenderText = req.file.buffer.toString("utf-8");
    }

    const trimmedText = tenderText.slice(0, 12000);

    const response = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        model: "openai/gpt-4o-mini",
        messages: [
          {
            role: "user",
            content: `Return ONLY valid JSON. No explanation.

{
  "objective": "",
  "requirement": "",
  "goal": "",
  "scope": "",
  "brief description": "",
  "closing date": "",
  "agreement": "",
  "estimation cost": "",
  "BOQ": "",
  "bid submission date": ""
}

Document:
${trimmedText}`
          }
        ]
      },
      {
        headers: {
          "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "Content-Type": "application/json"
        }
      }
    );

    const aiResult = response.data.choices[0].message.content;

    res.json({ success: true, data: aiResult });

  } catch (error) {
    console.error("Tender Analysis Error:", error);
    res.status(500).json({ message: "Error analyzing tender" });
  }
}

);



module.exports = router;
