const axios = require("axios");
const uploadFileToBlob = require("../utils/imageUpolad")
const { QueryTypes } = require('sequelize');
//const db = require('')

exports.imageUpload = async (req, res, next) => {

    try {
        // images is a directory in the container
        const image = await uploadFileToBlob('images', req.file);
        return res.json(image);

    } catch (error) {
        next(error);
    }
};


exports.uploadfile = async (req, res, next) => {

    let { title, sub_title, imageURL } = req.body;
    try {
        const upload = await upload_db(title, sub_title, imageURL)
        return res.status(201).json({
            status: true,
            message: "Create Success",
        })
    } catch (e) {
        if (e.response) {
            res.status(e.response.status).json({
                status: false,
                status_code: e.response.status,
                message: e
            })
        } else {
            res.status(500).json({
                status: false,
                message: "Internal server error",
            });
        }
    }
}


exports.readImage = async (req, res, next) => {

    let { nocount } = req.query
    try {
        const QUERY = `SELECT * FROM slides ORDER BY id DESC LIMIT ${nocount}`;
        const [results, metadata] = await db.sequelize.query(QUERY, null, { type: QueryTypes.SELECT })
        return res.status(200).json({
            status: true,
            message: "images send success",
            data: results,
        })
    } catch (e) {
        if (e.response) {
            res.status(e.response.status).json({
                status: false,
                status_code: e.response.status,
                message: e
            })
        } else {
            res.status(500).json({
                status: false,
                message: "Internal server error",
            });
        }
    }
}