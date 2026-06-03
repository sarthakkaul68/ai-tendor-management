require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const multer = require('multer');
require('dotenv').config(); 

const app = express();
app.use(express.json());

// app.use(cors());
const allowedOrigins = process.env.ALLOWED_ORIGINS.split(','); 

app.use(cors({
  origin: function(origin, callback){
    if(!origin) return callback(null, true); 

    if(allowedOrigins.indexOf(origin) === -1){
      const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
  credentials: true 
}));

const uploadPath = path.join(__dirname, 'tender-uploads');

if (!fs.existsSync(uploadPath)) {
  fs.mkdirSync(uploadPath, { recursive: true });
  console.log(`Folder created: ${uploadPath}`);
} else {
  console.log(`Folder already exists: ${uploadPath}`);
}

app.use('/uploads', express.static(uploadPath));


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, 'uploads'));
  },
  filename: function (req, file, cb) {
    const unique = Date.now() + '-' + Math.round(Math.random()*1e9);
    cb(null, unique + '-' + file.originalname);
  }
});
const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 } 
});


const dns = require("dns");
dns.setServers(["1.1.1.1", "8.8.8.8"]);

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true, useUnifiedTopology: true
})
.then(()=> console.log('MongoDB connected'))
.catch(err => console.error('MongoDB error', err));

app.get('/', (req, res) => res.send('API running'));

app.use('/api/tenders', require('./routes/tenders'));
app.use('/api/users', require('./routes/users'));
app.use("/api/auth", require("./routes/auth"));
app.use('/api/workflows', require('./routes/workflow'));
app.use("/api/tender-reports",  require("./routes/tenderReports"));

require('./schedulers/autoAssignScheduler'); 

const PORT = process.env.PORT || 3008;
app.listen(PORT, ()=> console.log(`Server started on ${PORT}`));
