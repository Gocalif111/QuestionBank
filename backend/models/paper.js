const mongoose = require("mongoose");

const paperSchema = new mongoose.Schema({
  year: {
    type: Number,
    enum: [1, 2, 3, 4],
    required: true
  },
  branch: {
    type: String,
    enum: ["IT", "EE", "CE"],
    required: true
  },
  semester: {
    type: Number,
    enum: [1, 2, 3, 4, 5, 6, 7, 8],
    required: true
  },
  subject: {
    type: String,
    required: true
  },
  cloudinaryUrl: {
    type: String,
    required: true
  },
  publicId: {
    type: String,
    required: true
  }
}, { timestamps: true });

module.exports = mongoose.model("Paper", paperSchema);
