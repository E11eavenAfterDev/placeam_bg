
import { model, Schema , Types} from "mongoose";
import aggregatePaginate from "mongoose-aggregate-paginate-v2"



interface IpickupSchema {

    user: Types.ObjectId,
    product: Types.ObjectId,
     pickup_detail: {
        date: Date,
        location: string,
        latitude: number,
        longtitude: number,
        received_date: Date
     },
     sold_price: number  
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

      pickup_detail: {
        date: Date,
        location: String,
        latitude: Number,
        longtitude: Number,
        received_date: Date
     },
     sold_price: { 
              type: Number,
              min: 0.01,
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