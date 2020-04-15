let express = require("express");
let router = express.Router();
const ini = require("ini");
const fs = require("fs-extra");
let submissionController = require("../../controllers/submission/submissionController");
const multer = require("multer");
const path = require("path");
const shortId = require("shortid");
const sanitizeFileName = require("sanitize-filename");
let uploadId;

// SET STORAGE
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    uploadId = shortId.generate();
    console.log(uploadId);
    let path = `./tmp/${uploadId}`;
    if (!fs.existsSync(path)) {
      fs.mkdirSync(path);
    }
    cb(null, path);
  },
  filename: function(req, file, cb) {
    let fileName = file.originalname.replace(
      path.extname(file.originalname),
      ""
    );
    cb(null, sanitizeFileName(fileName + path.extname(file.originalname))); //Appending extension
  }
});

const filefilter = () => {};
const limits = {
  fileSize: 1000 * 1024 * 60
};

const upload = multer({ storage, limits }).array("images", 12);
const noUpload = multer().none();

router.post("/submit", noUpload, async (req, res) => {
  // let formData = {};
  let formData = req.body;
  // [...req.body].forEach(data => {
  //   console.log(data);
  // });
  console.log(formData);

  let response = await submissionController.submitForm(formData);

  res.end();
});

/* This is the endpoint that handles the upload. FilePond expects a unique id returned
   so it can request an undo if needed. The filename prop works well for this. */
// router.post("/submit/image", upload.array("images", 12), function(
//   req,
//   res,
//   next
// ) {
//   // req.files is array of `photos` files
//   console.log(req.files);
//   // req.body will contain the text fields, if there were any
//   console.log(req.body);
//   res.send([req.files[0].filename]);
// });

/* This is the endpoint that handles the upload. FilePond expects a unique id returned
   so it can request an undo if needed. The filename prop works well for this. */
// router.post("/submit/image", upload.array("images", 12), function(
//   req,
//   res,
//   next
// ) {
//   // req.files is array of `photos` files
//   console.log(req.files);
//   // req.body will contain the text fields, if there were any
//   console.log(req.body);
//   res.send([req.files[0].filename]);
// });
/* This is the endpoint that handles the upload. FilePond expects a unique id returned
   so it can request an undo if needed. The filename prop works well for this. */
router.post("/process", (req, res) => {
  upload(req, res, err => {
    if (err instanceof multer.MulterError) {
      // A Multer error occurred when uploading.
      console.log(err.message);
      res.send(400);
    } else if (err) {
      // An unknown error occurred when uploading.
      console.log(req.files);
      // req.body will contain the text fields, if there were any
      console.log(req.body);
      res.send([req.files[0].filename]);
    } else {
      // An unknown error occurred when uploading.
      console.log(req.files);
      // req.body will contain the text fields, if there were any
      console.log(req.body);
      res.send(uploadId);
      // res.send([req.files[0].filename]);
    }
    // req.files is array of `photos` files
  });
});
router.delete("/revert", (req, res) => {
  let path = `./tmp/${req.body}`;
  try {
    fs.removeSync(path);
  } catch (e) {
    console.log(e);
  }
});
module.exports = router;
