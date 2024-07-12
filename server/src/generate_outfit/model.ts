import mongoose from "mongoose";

const ClothingItemSchema = new mongoose.Schema({
  image: { type: String, required: true },
  name: { type: String, required: true },
  price: { type: String, required: true },
});

const OutFitGeneratorSchema = new mongoose.Schema({
  headwear: { type: ClothingItemSchema, required: true },
  topwear: { type: [ClothingItemSchema], required: true },
  bottom: { type: ClothingItemSchema, required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  title: { type: String, required: true },
  generatedAt: { type: Date, default: Date.now },
});

const OutFitGenerator = mongoose.model('OutFitGenerator', OutFitGeneratorSchema);

export default OutFitGenerator;