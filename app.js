const express = require('express');
const fileUpload = require('express-fileupload');
const path = require('path');
const fs = require('fs');
const { spawn } = require('child_process');

const app = express();

app.use(fileUpload());
app.use(express.static(path.join(__dirname, 'public')));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  res.render('index');
});

app.post('/upload', (req, res) => {
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send('No files were uploaded.');
  }

  // Get an array of all uploaded PDF files
  const pdfs = req.files.pdfs instanceof Array ? req.files.pdfs : [req.files.pdfs];

  // Process each PDF file
  pdfs.forEach((pdf, index) => {
    const fileName = `pdf-${index + 1}.pdf`;
    pdf.mv(`pdfs/${fileName}`, err => {
      if (err) {
        return res.status(500).send(err);
      }
    });
  });

  // Move the syllabus file to the syllabus folder
  const syllabus = req.files.syllabus;
  const syllabusFileName = 'syllabus.pdf';
  syllabus.mv(`syllabus/${syllabusFileName}`, err => {
    if (err) {
      return res.status(500).send(err);
    }
  });

  // Run the Python script to generate a response
  const pythonProcess = spawn('python', ['generate_response.py']);

  // Send the response to the client when the Python script completes
  pythonProcess.stdout.on('data', data => {
    const responseText = data.toString();
    const clusterQuestionText = fs.readFileSync('cluster_question.txt', 'utf-8');
    const replyText = fs.readFileSync('reply.txt', 'utf-8');
    res.render('response', { responseText, clusterQuestionText, replyText });
  });

  pythonProcess.stderr.on('data', data => {
    console.error(`Python script error: ${data}`);
  });

  pythonProcess.on('exit', code => {
    console.log(`Python script exited with code ${code}`);
  });
});

app.listen(3000, () => {
  console.log('Server listening on port 3000');
});
