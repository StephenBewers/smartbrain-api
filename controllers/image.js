const dotenv = require('dotenv');
const Clarifai = require("clarifai");

dotenv.config();

const app = new Clarifai.App({
  apiKey: process.env.CLARIFAI_API_KEY,
});

const handleApiCall = (req, res) => {
  app.models
    .predict(
      {
        id: 'face-detection',
        name: 'face-detection',
        version: '6dc7e46bc9124c5c8824be4822abe105',
        type: 'visual-detector',
      }, req.body.input)
  .then(data => {
    res.json(data);
  })
  .catch(err => res.status(400).json("Unable to use API"));
};

const handleImage = (req, res, db) => {
  const { id, faces } = req.body;
  db("users")
    .where("id", "=", id)
    .increment("entries", faces)
    .returning("entries")
    .then((entries) => {
      res.json(entries[0].entries);
    })
    .catch((err) => res.status(400).json("Unable to get entries"));
};

module.exports = {
  handleImage: handleImage,
  handleApiCall: handleApiCall
};
