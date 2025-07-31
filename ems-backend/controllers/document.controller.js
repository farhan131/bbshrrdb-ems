const Document = require("../models/document.model");
const path = require("path");

// Upload a new document
exports.uploadDocument = async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: "No file uploaded" });

    const document = await Document.create({
      userId: req.user.id,
      title: req.body.title,
      filePath: req.file.path,
      fileType: req.file.mimetype,
    });

    res.status(201).json(document);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Employee: view own documents
exports.getMyDocuments = async (req, res) => {
  try {
    const documents = await Document.findAll({ where: { userId: req.user.id } });
    res.json(documents);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Admin: view all documents
exports.getAllDocuments = async (req, res) => {
  try {
    const documents = await Document.findAll();
    res.json(documents);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
