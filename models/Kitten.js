import mongoose from "mongoose";

const kittySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
});

const Kitten = mongoose.model("Kitten", kittySchema);

export default Kitten;
