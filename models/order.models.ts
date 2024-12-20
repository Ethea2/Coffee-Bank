import { Types, model, Schema } from "mongoose";

const orderSchema = new Schema({
  user_id: {
    type: Types.ObjectId,
    required: true,
  },
  order_description: {
    type: String,
    require: true
  },
  order_price: {
    type: Number,
    required: true,
  },
  order_title: {
    type: String,
    required: true
  }
})

const Order = model("Order", orderSchema)

export default Order
