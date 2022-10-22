const express = require("express");
const multer = require('multer');

const carouselController = require("../controllers/carousel");
const inMemoryStorage = multer.memoryStorage();
const singleFileUpload = multer({ storage: inMemoryStorage });

module.exports = (app) => {
    const router = express.Router();

    // Upload image route
    router.post('/upload-image/', singleFileUpload.single('image'), carouselController.imageUpload)
    // Upload title , subtitle and image url
    router.post("/", carouselController.uploadfile);
    // Read the file
    router.get("/", carouselController.readImage);

    app.use("/api/carousel", router);
};
