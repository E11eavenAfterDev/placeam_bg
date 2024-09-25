
import { model, Schema , Types} from "mongoose";
import aggregatePaginate from "mongoose-aggregate-paginate-v2"


interface IbidSchema {
    user: Types.ObjectId,
    bidder: Types.ObjectId,
    product: Types.ObjectId,
    bidStatus: "Approved" | "Rejected",
    amount: number,
    message: string
}


const bidSchema = new Schema<IbidSchema>(
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
      bidder: {
        type: Schema.Types.ObjectId,
        ref: "user",
        required: true,
      },
      bidStatus: {
        type: String,
        enum: ["Approved", "Rejected"]
      },
      amount: Number,
      message: String
  },
  {
    timestamps: true,
  }
);



bidSchema.plugin(aggregatePaginate);

const Bid = model<IbidSchema>('Bid', bidSchema);
export default Bid