const express = require('express');
const multer = require('multer');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = 5000;

// Enable CORS for Angular
app.use(cors());
app.use(express.json());

// Define Synology server upload path
const UPLOAD_DIR = '/Digital Team/clients/Collins North Gate';

// Ensure the directory exists
if (!fs.existsSync(UPLOAD_DIR)) {
    fs.mkdirSync(UPLOAD_DIR, { recursive: true });
}

// Configure multer for file uploads
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, UPLOAD_DIR); // Store files in Synology folder
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname)); // Unique filename
    }
});

const upload = multer({ storage: storage });

// API Endpoint for File Uploads
app.post('/upload', upload.single('file'), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ success: false, message: 'No file uploaded.' });
    }
    const fileUrl = `http://192.168.1.8/files/${req.file.filename}`;
    res.json({ success: true, fileUrl });
});

// Serve Uploaded Files
app.use('/files', express.static(UPLOAD_DIR));

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
