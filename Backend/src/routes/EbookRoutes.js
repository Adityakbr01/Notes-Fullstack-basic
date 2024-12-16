const express = require("express");
const router = express.Router();
const EbookSchema = require("../models/EbookModels");
const adminAuth = require("../middleware/isAdmin");
const isAuthenticated = require("../routes/isAuthenticated");
const isLogin = require("../middleware/isLogin");
const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const fs = require("fs");
const https = require("https");
const NodeCache = require("node-cache");



const cache = new NodeCache({ stdTTL: 300 });

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Folder to store uploaded files temporarily
  },
  filename: (req, file, cb) => {
    cb(
      null,
      file.fieldname + "-" + Date.now() + "." + file.mimetype.split("/")[1]
    );
  },
});
const upload = multer({ storage: storage });


// GET route with caching
router.get("/", async (req, res) => {
  try {
    // Check if ebooks are cached
    const cachedEbooks = cache.get("allEbooks");

    if (cachedEbooks) {
      return res.status(200).json(cachedEbooks); // Return cached data
    }

    console.log("Cache miss");

    // If not cached, fetch from database
    const ebooks = await EbookSchema.find();

    // Cache the result
    cache.set("allEbooks", ebooks);

    res.status(200).json(ebooks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET route for a specific Ebook by ID with caching
router.get("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    // Check if the specific ebook is cached
    const cachedEbook = cache.get(`ebook_${id}`);

    if (cachedEbook) {
      console.log("Cache hit for ID:", id);
      return res.status(200).json(cachedEbook); // Return cached data
    }

    console.log("Cache miss for ID:", id);

    // If not cached, fetch from database
    const ebook = await EbookSchema.findById(id);

    if (!ebook) {
      return res.status(404).json({ message: "Ebook not found" });
    }

    // Cache the result
    cache.set(`ebook_${id}`, ebook);

    res.status(200).json(ebook);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// router.get("/download/:id", async (req, res) => {
//   const id = req.params.id;
//   try {
//     const ebook = await EbookSchema.findById(id);
//     if (!ebook) return res.status(404).json({ message: "Ebook not found" });

//     const fileUrl = ebook.pdfFile;

//     // Set the response headers to indicate a file download
//     res.setHeader("Content-Type", "application/pdf");
//     res.setHeader(
//       "Content-Disposition",
//       `attachment; filename="${encodeURIComponent(ebook.name)}.pdf"`
//     );

//     // Stream the PDF from Cloudinary
//     https.get(fileUrl, (fileStream) => {
//       fileStream.pipe(res);
//     }).on("error", (error) => {
//       console.error("Error streaming file:", error);
//       res.status(500).json({ error: "Failed to download file" });
//     });
//   } catch (error) {
//     console.error("Error:", error.message);
//     res.status(500).json({ error: error.message });
//   }
// });
router.get("/download/:id",isLogin, async (req, res) => {
  const id = req.params.id;
  try {
    const ebook = await EbookSchema.findById(id);
    if (!ebook) return res.status(404).json({ message: "Ebook not found" });

    // Redirect to the Cloudinary URL
    res.redirect(ebook.pdfFile);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post(
  "/add",
  isLogin,
 adminAuth,
  upload.fields([{ name: "image" }, { name: "pdfFile" }]),
  async (req, res) => {
    try {
      const { name, description,language,price } = req.body;

      // File paths from Multer
      const imageFilePath = req.files.image[0].path;
      const pdfFilePath = req.files.pdfFile[0].path;

      // Upload image to Cloudinary
      const imageResult = await cloudinary.uploader.upload(imageFilePath, {
        resource_type: "image",
      });

      // Upload PDF to Cloudinary
      const pdfResult = await cloudinary.uploader.upload(pdfFilePath, {
        resource_type: "raw",
      });

      // Save data to MongoDB
      const newEbook = new EbookSchema({
        name,
        image: imageResult.secure_url, // Cloudinary image URL
        pdfFile: pdfResult.secure_url, // Cloudinary PDF URL
        description,
        price,
        language,
      });

      await newEbook.save();

      // Delete temporary files
      fs.unlink(imageFilePath, (err) => {
        if (err) console.error("Error deleting image file:", err);
      });
      fs.unlink(pdfFilePath, (err) => {
        if (err) console.error("Error deleting PDF file:", err);
      });

      // Clear the cache
    cache.del("allEbooks");

      res.status(201).json({
        message: "Ebook added successfully",
        item: newEbook,
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
);

router.post("/update/:id", isLogin, adminAuth, async (req, res) => {
  try {
    const id = req.params.id;
    const { name, description, image } = req.body;

    const updatedEbook = await EbookSchema.findByIdAndUpdate(
      id,
      { name, description, image },
      { new: true, runValidators: true } // Return the updated document and validate inputs
    );

    if (!updatedEbook) {
      return res.status(404).json({ message: "Ebook not found" });
    }

    res
      .status(200)
      .json({ message: "Ebook updated successfully", item: updatedEbook });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.delete("/delete/:id", isLogin, adminAuth, async (req, res) => {
  const id = req.params.id;
  try {
    const ebook = await EbookSchema.findByIdAndDelete(id);
    if (!ebook) {
      return res.status(404).json({ message: "Ebook not found" });
    }
    res.status(200).json(ebook);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
