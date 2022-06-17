require('dotenv').config();
const express = require('express');
const multer = require('multer');
//const S3 = require('aws-sdk/clients/s3');
const pool = require('../modules/pool');

// libraries needed to delete express storage
// after successful upload
const fs = require('fs');
const utils = require('util');
const unlinkFile = utils.promisify(fs.unlink);

const router = express.Router();



// location to upload file on server
// once I know multer-s3, this won't be needed
const upload = multer({ dest: 'public/images' })

// import function from s3.js
const { uploadFile } = require('../s3')

// Post
router.post('/photo', upload.single('picture'), async (req, res, next) => {
    console.log('this is req.file', req.file);
    // response from s3 named result
    const result = await uploadFile(req.file);

    // function to delete after file is successfully uploaded
    // to s3
    await unlinkFile(req.file.path)

    //console.log('this is the result from s3:', result);

    // Post into database, for easy get
    const queryText = `
        INSERT INTO "image"
            ("path", "user_id")
        VALUES
            ($1, $2)
    `
    const queryParams = [
        result.Location,
        req.user.id
    ]

    pool.query(queryText, queryParams)
        .then(() => res.sendStatus(201))
        .catch((err) => {
            console.log('Upload photo failed', err);
            res.sendStatus(500)
        })
    
})


module.exports = router