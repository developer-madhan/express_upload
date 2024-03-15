const express = require('express');
const multer = require('multer');
const app = express();
const port = 5000;

// Set up multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
});

const upload = multer({ storage: storage });

// Define endpoint for file upload
app.post('/upload', upload.single('profileImage'), (req, res) => {
  // Handle uploaded file
  res.send('File uploaded successfully');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
