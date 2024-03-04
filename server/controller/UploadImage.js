const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');
const SVGtoPDF = require('svg-to-pdfkit');
const express = require('express');

exports.UploadImage = async (req, res) => {
    try {
        const imagePath = req.file.path;

        const doc = new PDFDocument();

        let pdfName = 'pdf-' + Date.now()+'.pdf';


        const pdfPath = path.join(__dirname, '..', `/uploads/pdfs/${pdfName}`);

        const pdfFileStream = fs.createWriteStream(pdfPath);
        doc.pipe(pdfFileStream);

        // Pipe the PDF content directly to the response
        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', `attachment; filename=${pdfName}`);
        
        doc.pipe(res);
        
        // Add the image to the PDF based on the image format
        if (req.file.mimetype === 'image/png' || req.file.mimetype === 'image/jpeg') {
            doc.image(imagePath, 20, 20, { width: 555.28, align: 'center', valign: 'center' });
        }
        else if (req.file.mimetype === 'image/svg+xml') {
            const svgContent = fs.readFileSync(imagePath, 'utf-8');
            SVGtoPDF(doc, svgContent, 20, 20, { width: 555.28, align: 'center', valign: 'center' });
        }
        else {
            console.error('Unsupported image format:', req.file.mimetype);
            res.status(400).send('Unsupported image format');
            return;
        }

        doc.end();

        // Close the file stream when the PDF is finished writing
        pdfFileStream.on('finish', () => {
            console.log('PDF successfully created and saved on the server.');
        });

        // Set the cookie with key "auth" and value "pdfName"
        const options = {
            expires: new Date(Date.now() + 3*24*60*60*1000), 
            httpOnly: true
        }

        pdfFileStream.on('error', (error) => {
            console.error('Error saving PDF:', error.message);
        });



    } catch (err) {
        console.error('Server error:', err.message);
        res.status(500).send('Server error');
    }
};
