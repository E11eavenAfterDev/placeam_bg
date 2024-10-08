
import { model, Schema } from "mongoose";
import aggregatePaginate from "mongoose-aggregate-paginate-v2"
import { IuserSchema } from "../types";







const userSchema = new Schema<IuserSchema>(
  {
    avatar: {
      type: String,
      default:
        'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png',
    },
  public_id: {
      type: String,
      default:
        'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png',
    },
    email: {
      type: String,
      required: [true, 'Please add the user email address'],
      unique: [true, 'Email address already in used'],
    },
    password: {
      type: String,
      required: [true, 'Please add the user password'],
    },
    fullname: {
      type: String,
      required: [true, 'Please add user name'],
    },
    phone_number: {
      type: String,
      default: '0X0000000',
    },
    account_type: {
      type: String,
      enum: [
        "User",
        'Admin',
      ],
      default: 'User',
      require: [true, 'All fields are required'],
    },
    verify_account: {
      type: Boolean,
      default: false,
    },
  
  },
  {
    timestamps: true,
  }
);



userSchema.plugin(aggregatePaginate);

export default model<IuserSchema>('user', userSchema);
