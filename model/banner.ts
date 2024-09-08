import { model, Schema } from "mongoose";

interface IbannerSchema {
    avatar: string
}


const bannerSchema = new Schema<IbannerSchema>({
  avatar: {
    type: String,
    required: true,
    trim: true,
  },
 
});

const Banner = model<IbannerSchema>('Banner', bannerSchema);
export default Banner;