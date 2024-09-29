
import { model, Schema , Types} from "mongoose";
import aggregatePaginate from "mongoose-aggregate-paginate-v2"


interface ITransactionSchema {
    user: Types.ObjectId,
    product: Types.ObjectId[],
    orderId: string,
    transactionStatus: "Received" | "Shipped" | "Delivered",
    deliveryPin: string,
    deliveryFee: number,
}


const TransactionSchema = new Schema<ITransactionSchema>(
  {
    product: [{
        type: Schema.Types.ObjectId,
        ref: "Product",
        required: true,
      }],
     user: {
        type: Schema.Types.ObjectId,
        ref: "user",
        required: true,
      },
      orderId: String,
    //   totalCost: Number,
      transactionStatus: {
        type: String,
        enum: ["Received", "Shipped", "Delivered"]
      },
      deliveryPin: String,
      deliveryFee: Number,
      
  },
  {
    timestamps: true,
  }
);



TransactionSchema.plugin(aggregatePaginate);

const Transaction = model<ITransactionSchema>('transaction', TransactionSchema);
export default Transaction