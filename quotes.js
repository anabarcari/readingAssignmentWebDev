const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
});

const userModel = mongoose.model("quote", userSchema);

const express = require("express");
const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const response = await userModel.find().exec();
    return res.render("quotes", { quotes: response });
  } catch (error) {
    return res.render("quotes", { quotes: [] });
  }
});
router.post("/quote", async (req, res, next) => {
  const payload = req.body;

  console.log("----------------------------------");
  console.log("payload", payload);
  console.log("----------------------------------");

  try {
    const request = new userModel(payload);
    const data = await request.save();

    console.log("----------------------------------");
    console.log("data", data);
    console.log("----------------------------------");

    return res.redirect("/");
  } catch (error) {
    return res.redirect("/");
  }
});

module.exports = router;
