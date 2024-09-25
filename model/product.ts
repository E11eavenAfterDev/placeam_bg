
import { model, Schema , Types} from "mongoose";
import aggregatePaginate from "mongoose-aggregate-paginate-v2"

interface IproductSchema {
    user: Types.ObjectId,
      category: string,
      status: "Available" | "Sold" | "unAvailable",
      isNegotiable: boolean,
     product_detail: {
        name: string,
        size: number,
        description: string,
        price: number,
        images: []
     },
     productType: "dashbroad" | "rental",
     rentalPeriod: "day" | "week" | "month" | "year"
}



const productSchema = new Schema<IproductSchema>(
  {
    user: {
        type: Schema.Types.ObjectId,
        ref: "user",
        required: true,
      },
      category: String,
      status: {
        type: String,
        default: "Available",
        enum: ["Available", "Sold", "unAvailable"]
      },
      isNegotiable: Boolean,
     product_detail: {
        name: String,
        size:  Number,
        description: String,
        price: Number,
        images: []
     },
     productType: {
      type: String,
      enum:["dashbroad", "instore", "rental"]
     },
     rentalPeriod: {
      type: String,
      enum:["day", "week", "month", "year"]
     }
  },{timestamps: true, autoIndex: false}
);


productSchema.plugin(aggregatePaginate);

productSchema.index({'$**': 'text' }); // Full-text search index for name
productSchema.index({ "product_detail.price": 1 }); // Ascending index for price filtering

export const Product = model<IproductSchema>('Product', productSchema);




















// const mongoose = require('mongoose');

// interface IproductSchema {

// }

// const productSchema = new Schema<IproductSchema>({
//         user: {
//         type: Schema.Types.ObjectId,
//         ref: "user",
//         required: true,
//       },
     

//       category: {
//         type: String,
//         enum: ['Books', 'Electronics', 'Clothing'], // Predefined categories
//       },
//       productType: {
//         type: String,
//         enum: ["donation", "stock", "bid", "rental"]
//       },

//   name: {
//     type: String,
//     required: true,
//     trim: true,
//     minlength: 1,
//   },

//   description: {
//     type: String,
//     required: true,
//     trim: true,
//   },
//   price: {
//     type: Number,
//     required: true,
//     min: 0.01,
//   },
  
 
//   // Use nested schemas for complex or variant-specific attributes
//   variants: [{
//     size: {
//       type: String,
//     },
//     color: {
//       type: String,
//     },
//     stock: {
//       type: Number,
//       min: 0,
//     },
//     price: { // Variant-specific price (optional)
//       type: Number,
//       min: 0.01,
//     },
//   }],
//   images: [{
//     type: String,
//     trim: true,
//   }],
// });

// productSchema.index({'$**': 'text' }); // Full-text search index for name
// productSchema.index({ price: 1 }); // Ascending index for price filtering



// export default model<IproductSchema>('Product', productSchema);