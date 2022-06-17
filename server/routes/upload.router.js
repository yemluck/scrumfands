require('dotenv').config();
const express = require('express');
const multer = require('multer');
const pool = require('../modules/pool');
const router = express.Router();



// needed for s3
const fs = require('fs');
const utils = require('util');
const unlinkFile = utils.promisify(fs.unlink);

// multer upload 
const upload = multer({ dest: 'public/images' });

// import function from s3.js
const { uploadFile } = require('../s3')


// const fileStorageEngine = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, 'public/images')
//     },
//     filename: (req, file, cb) => {
//         cb(null, Date.now() + '--' + file.originalname)
//     }
// })


const {
    rejectUnauthenticated,
} = require('../modules/authentication-middleware');

//const encryptLib = require('../modules/encryption');

//const userStrategy = require('../strategies/user.strategy');




// Handles Axios request for itineraries
router.get('/', rejectUnauthenticated, (req, res) => {
    // Send back user object from the session (previously queried from the database)
    res.send(req.user);
    console.log('reg.user id is', req.user.id);

});

router.post('/upload', upload.single('image'), async (req, res, next) => {
    //console.log('req.body is', req.body);
    console.log('req.file is ***', req.file);
    const result = await uploadFile(req.file);

    // function to delete after file is successfully uploaded
    // to s3
    await unlinkFile(req.file.path)

    // post response into database for easy get
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
        .catch ((err) => {
            console.log('Upload photo failed', err);
            res.sendStatus(500)
        })
  
})

router.get('/upload', rejectUnauthenticated, (req, res) => {
    const queryText = `
        SELECT *
        FROM "image"
        WHERE "user_id" = $1
        ORDER BY "upload_time" DESC
    `
    const queryParam = [ req.user.id ]

    pool.query(queryText, queryParam)
        .then (result => {
            res.send(result.rows[0])
        })
        .catch (err => {
            console.log('Error getting photos', err);
            res.sendStatus(500)
            
        })
})

module.exports = router