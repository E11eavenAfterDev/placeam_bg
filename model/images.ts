import { model, Schema } from "mongoose";

interface IimagesSchema {
    url: string
    public_id: string
}


const imagesSchema = new Schema<IimagesSchema>({
  url: {
    type: String,
    required: true,
    trim: true,
  },
  public_id: {
    type: String,
    required: true,
    trim: true,
  },
});

const AllPlaceAmImage = model<IimagesSchema>('Images', imagesSchema);
export default AllPlaceAmImage;