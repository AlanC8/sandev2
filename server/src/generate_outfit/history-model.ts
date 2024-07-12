import mongoose, { Schema, Document } from "mongoose";
import { IUser } from "../auth/models/User";

interface IOutfitHistory extends Document {
  user: mongoose.Types.ObjectId | IUser;
  generatedOutfits: mongoose.Types.ObjectId[];
  generatedAt: Date;
}

const OutfitHistorySchema: Schema = new Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  generatedOutfits: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "OutFitGenerator",
      required: true,
    },
  ],
  generatedAt: { type: Date, default: Date.now },
});

const OutfitHistory = mongoose.model<IOutfitHistory>(
  "OutfitHistory",
  OutfitHistorySchema
);

export default OutfitHistory;
