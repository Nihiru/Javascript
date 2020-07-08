const express = require("express");
const bodyParser = require("body-parser");
const multer = require("multer");
const MongoClient = require("mongodb").MongoClient;

app.use(bodyParser.urlencoded({ extended: true }));

const app = express();

const myurl = "mongodb://localhost:27017";

MongoClient.connect(myurl, (err, client) => {
  if (err) return console.log(err);
  db = client.db("test");
  app.listen(3000, () => {
    console.log("listening on 3000");
  });
});
app.get("/", (req, res) => res.json({ message: "Welcome" }));

app.listen(4004, () => console.log("server started on port 4004"));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

// set storage
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads");
  },
  fileName: function () {
    cb(null, file.fieldname + "-" + Date.now());
  },
});

var upload = multer({ storage: storage });

//Uploading single file
app.post("/uploadfile", upload.single("myFile"), (req, res, next) => {
  const file = req.file;
  if (!file) {
    const error = new Error("Please upload a file");
    error.httpStatusCode = 400;
    return next(error);
  }
  res.send(file);
});

//Uploading multiple files
app.post("/uploadmultiple", upload.array("myFiles", 12), (req, res, next) => {
  const files = req.files;
  if (!files) {
    const error = new Error("Please choose files");
    error.httpStatusCode = 400;
    return next(error);
  }

  res.send(files);
});

//Uploading an image
app.post("/uploadphoto", upload.single("picture"), (req, res) => {
  var img = fs.readFileSync(req.file.path);
  var encode_image = img.toString("base64");
  // Define a JSONobject for the image attributes for saving to database

  var finalImg = {
    contentType: req.file.mimetype,
    image: new Buffer(encode_image, "base64"),
  };
  db.collection("quotes").insertOne(finalImg, (err, result) => {
    console.log(result);

    if (err) return console.log(err);

    console.log("saved to database");
    res.redirect("/");
  });
});

app.get("/photos", (req, res) => {
  db.collection("mycollection")
    .find()
    .toArray((err, result) => {
      const imgArray = result.map((element) => element._id);
      console.log(imgArray);

      if (err) return console.log(err);
      res.send(imgArray);
    });
});

app.get("/photo/:id", (req, res) => {
  var filename = req.params.id;

  db.collection("mycollection").findOne(
    { _id: ObjectId(filename) },
    (err, result) => {
      if (err) return console.log(err);

      res.contentType("image/jpeg");
      res.send(result.image.buffer);
    }
  );
});
