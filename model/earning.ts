
import { model, Schema , Types} from "mongoose";
import aggregatePaginate from "mongoose-aggregate-paginate-v2"


interface IEarnSchema {
    user: Types.ObjectId,
    product: Types.ObjectId
}


const EarnSchema = new Schema<IEarnSchema>(
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
      }
  },
  {
    timestamps: true,
  }
);



EarnSchema.plugin(aggregatePaginate);

const Earn = model<IEarnSchema>('earning', EarnSchema);
export default Earn