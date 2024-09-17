import { model, Schema,Types } from "mongoose";

interface IdonationSchema {
    user: Types.ObjectId,
    category: string,
    pickup_date: Date,
    pickup_location: string,
    longtitude: number,
    latitude: number,
}


const donationSchema = new Schema<IdonationSchema>({
    user: {
        type: Schema.Types.ObjectId,
        ref: "user",
        required: true,
      },
  category: {
    type: String,
    required: true,
    trim: true
  },
  pickup_date: {
    type: Date,
    required: true,
    trim: true,
  },
  pickup_location: {
    type: String,
    required: true,
    trim: true,
  },
  
  longtitude: {
    type: Number,
    required: true,
    trim: true,
  },
  latitude: {
    type: Number,
    required: true,
    trim: true,
  },

 
});

const Donation = model<IdonationSchema>('Donation', donationSchema);

export default  Donation;