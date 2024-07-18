import mongoose, { Document, Schema } from "mongoose";

export interface IVTONImage extends Document {
  userId: Schema.Types.ObjectId;
  humanImgUrl: string;
  garmImgUrl: string;
  outputImageUrl: string;
  createdAt: Date;
}

const VTONImageSchema: Schema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  humanImgUrl: { type: String, required: true },
  garmImgUrl: { type: String, required: true },
  outputImageUrl: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model<IVTONImage>("VTONImage", VTONImageSchema);
