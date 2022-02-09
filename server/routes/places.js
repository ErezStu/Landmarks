const router = require("express").Router();
const Place = require("../models/Place");

router.post("/", async (req, res) => {
  const newPlace = new Place(req.body);

  try {
    const savePlace = await newPlace.save();
    res.status(200).json(savePlace);
  } catch (err) {
    res.status(500).json("error: " + err);
  }
});

router.get("/", async (req, res) => {
  try {
    const places = await Place.find();
    res.status(200).json(places);
  } catch (err) {
    res.status(500).json("error: " + err);
  }
});

router.delete("/delete/:id", async (req, res) => {
  try {
    const placeId = await Place.findByIdAndDelete(req.params.id);
    res.status(200).json(placeId);
  } catch (err) {
    res.status(500).json("error: " + err);
  }
});

module.exports = router;
