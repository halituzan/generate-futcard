import mongoose from "mongoose";
const Schema = mongoose.Schema;
const countrySchema = new Schema({
  id: {
    type: Number,
  },
  name: {
    type: String,
  },
  isoAlpha2: {
    type: String,
  },
  isoAlpha3: {
    type: String,
  },
  isoNumeric: {
    type: Number,
  },
  flag: {
    type: String,
  },
});

const Countries =
  mongoose.models?.Countries || mongoose.model("Countries", countrySchema);

export default Countries;
