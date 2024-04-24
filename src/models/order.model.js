
import { model, Schema } from 'mongoose';

const orderSchema= new Schema({
    
    name :{type: String, required:true},
    title: {type:String, required: true},
    items: {type:String, required: true},
    price:{type:Number, required:true},
    orderID:{type:String, required:true},
    details:{type:String, required:true},
    orderQuantity:{type:Number, required: true},
    country: { type: String},
    deliveryLocation:{type:String, required:true},
   status:{type:String, required:true},
    
})
export const OrderModel= model('Order', orderSchema, 'orders');