
import { model, Schema , Types} from "mongoose";
import aggregatePaginate from "mongoose-aggregate-paginate-v2"



interface IkycSchema {
    _id: Types.ObjectId,
    user: Types.ObjectId,
    bio_data: {
        firstname:  string,
          lastname:  string,
        email:  string,
        address: string
    },
    id_proof:{ 
        document_type:  string,
          document_front_view:  string,
          document_back_view: string,
    },
    payment_data:{
      bank_name: string,
      account_number: string,
      account_name: string
  },
    verify_kyc?:  boolean,
    kyc_submitted?:  boolean,
  
}


const kycSchema = new Schema<IkycSchema>(
  {
    _id: Schema.Types.ObjectId,
    user: {
        type: Schema.Types.ObjectId,
        ref: "user",
        required: true,
      },

    bio_data: {
        firstname: {
            type: String,
            default: ""
          },
          lastname: {
            type: String,
            default: ""
          },
        email: {
            type: String,
            default: ""
          },
        address: {
            type: String,
            default: ""
          },
    },

    id_proof :{ 
        document_type: {
            type: String,
          },
          document_front_view: {
            type: String,
          },
          document_back_view: {
            type: String,
          },
    },
    payment_data:{
      bank_name: String,
      account_number: String,
      account_name: String
  },
    verify_kyc: {
      type: Boolean,
      default: false,
    },
    kyc_submitted: {
      type: Boolean,
      default: false,
    },
  
  },
  {
    timestamps: true,
  }
);



kycSchema.plugin(aggregatePaginate);

const KycModel = model<IkycSchema>('kyc', kycSchema);
export default KycModel
