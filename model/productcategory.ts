import { model, Schema } from "mongoose";

interface IcategorySchema {
    name: string,
    avatar: string,
    backgroup_color: string,
}


const categorySchema = new Schema<IcategorySchema>({
  name: {
    type: String,
    required: true,
    trim: true,
    minlength: 1,
  },
  avatar: {
    type: String,
    required: true,
    trim: true,
  },
  backgroup_color: {
    type: String,
    required: true,
    trim: true,
  },
 
});

const Category = model<IcategorySchema>('Category', categorySchema);

export default  Category;