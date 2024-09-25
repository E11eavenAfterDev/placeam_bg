
import { model, Schema , Types} from "mongoose";
import aggregatePaginate from "mongoose-aggregate-paginate-v2"



interface IpickupSchema {

    user: Types.ObjectId,
    dispatch: Types.ObjectId,
    product: Types.ObjectId,
     pickup_detail: {
        pickup_date: Date,
        pickup_location: string,
        latitude: number,
        longtitude: number,
        received_date: Date
     },
     productStatus: "picked" | "returned"
     dispatch_detail: {
      pickupDate: Date,
      productVerify: boolean
    },

}


const pickupSchema = new Schema<IpickupSchema>(
  {
    product: {
        type: Schema.Types.ObjectId,
        ref: "Product",
        required: true,
      },
    user: {
        type: Schema.Types.ObjectId,
        ref: "user",
        required: true,
      },
      dispatch: {
        type: Schema.Types.ObjectId,
        ref: "user",
      },
      productStatus: {
        type: String,
        enum: ["picked", "returned"]
      },
      dispatch_detail: {
        pickupDate: Date,
        productVerify: {
          type: Boolean,
          default: false
        }
      },
      pickup_detail: {
        pickupDate: Date,
        pickup_location: String,
        latitude: Number,
        longtitude: Number,
        received_date: Date
     },
    
  },
  {
    timestamps: true,
  }
);



pickupSchema.plugin(aggregatePaginate);

pickupSchema.index({'$**': 'text' }); // Full-text search index for name
pickupSchema.index({ "sold_price": 1 }); // Ascending index for price filtering


const Pickup = model<IpickupSchema>('Pickup', pickupSchema);
export default Pickup