const mongoose = require("mongoose");

const weatherSchema = new mongoose.Schema({
  date: { type: Date, required: true },
  city: { type: String, required: true },
  temperature: { type: Number, required: true },
  description: { type: String, required: true },
});

const clothingItemSchema = new mongoose.Schema({
  image: { type: String, required: true },
  name: { type: String, required: true },
  price: { type: String, required: true },
});

const outfitSchema = new mongoose.Schema({
  date: { type: Date, required: true },
  city: { type: String, required: true },
  headwear: { type: clothingItemSchema, required: true },
  topwear: { type: [clothingItemSchema], required: true },
  bottom: { type: clothingItemSchema, required: true },
});

const Weather = mongoose.model("Weather", weatherSchema);
const Outfit = mongoose.model("Outfit", outfitSchema);

export { Weather, Outfit };
