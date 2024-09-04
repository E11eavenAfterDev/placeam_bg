
import { model, Schema , SchemaTypes, Types} from "mongoose";
import aggregatePaginate from "mongoose-aggregate-paginate-v2"



interface IkycSchema {
    _id: Types.ObjectId,
    bio_data: {
        firstname:  string,
          lastname:  string,
        email:  string,
    },
    id_proof :{ 
        document_type:  string,
          document_front_view:  string,
          document_back_view: string,
    },
    verify_kyc:  boolean,
    kyc_submitted:  boolean,
  
}


const kycSchema = new Schema<IkycSchema>(
  {
    _id: {
        type: SchemaTypes.ObjectId,
        ref: "user",
        required: true,
      },

    bio_data: {
        firstname: {
            type: String,
            // required: [true, 'Please add user name'],
          },
          lastname: {
            type: String,
            // required: [true, 'Please add user name'],
          },
        email: {
            type: String,
            required: [true, 'Please add the user email address'],
            // unique: [true, 'Email address already in used'],
          },
    },

    id_proof :{ 
        document_type: {
            type: String,
            // required: [true, 'Please add user name'],
          },
          document_front_view: {
            type: String,
            // required: [true, 'Please add user name'],
          },
          document_back_view: {
            type: String,
            // required: [true, 'Please add the user email address'],
            // unique: [true, 'Email address already in used'],
          },
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
