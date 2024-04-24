import { Schema, model } from "mongoose";

const productSchema = new Schema ({
    name : { type: String, required:true},
    description : { type:String , required:true},
    category : {type:String, required:true},
    price : {type:String , required: true},
    image: {type:String, required:true},
    qty: {type:String, required:true}
})
export const ProductModel = model('Product', productSchema,'products');