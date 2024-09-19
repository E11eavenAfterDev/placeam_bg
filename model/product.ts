
import { model, Schema , Types} from "mongoose";
import aggregatePaginate from "mongoose-aggregate-paginate-v2"

interface IproductSchema {

    user: Types.ObjectId,
    product_type: "sell" | "rental",
      category: string,
      status: "Available" | "Sold" | "Not Available",
      isNegotiable: boolean,
     product_detail: {
        name: string,
        size: number,
        description: string,
        price: number,
        // images: []
     },
     pickup_detail: {
        date: Date,
        location: string,
        latitude: number,
        longtitude: number,
        received_date: Date
     }
    //  sold_price: number
}



const productSchema = new Schema<IproductSchema>(
  {
    user: {
        type: Schema.Types.ObjectId,
        ref: "user",
        required: true,
      },
      category: {
        type: String
      },
      status: {
        type: String,
        default: "Available",
        enum: ["Available", "Sold", "Not Available"]
      },
      isNegotiable: {
        type: Boolean
      },
     product_detail: {
        name: {
          type: String
        },
        size: {
          type: Number
        },
        description: {
          type: String
        },
        price: { 
            type: Number,
            // required: true,
            // min: 0.01,
          },
        images: []
     },
  }
);



const rentalSchema = new Schema({
//  ...productSchema,
  // product_type: {
  //   type: String,
  //   default: "rental"
  // },
  pickup_detail: {
    date: Date,
    location: String,
    latitude: Number,
    longtitude: Number
 },


})


interface IsellingProductSchema {
  product_type: string,
  product: IproductSchema
}
 

const sellingProductSchema = new Schema<IsellingProductSchema>({
  product: productSchema,
  product_type: {
    type: String,
    default: "sell"
  },
})


productSchema.plugin(aggregatePaginate);

productSchema.index({'$**': 'text' }); // Full-text search index for name
productSchema.index({ "product_detail.price": 1 }); // Ascending index for price filtering


// export const Product = model<IproductSchema>('Product', productSchema);
export const Rental = model<IproductSchema>('Rental', rentalSchema);
export const SellingProduct = model<IsellingProductSchema>('SellingProduct', sellingProductSchema);























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