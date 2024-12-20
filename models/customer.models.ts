import { Schema, Types, model } from "mongoose";

const customerSchema = new Schema({
  user_id: {
    type: Types.ObjectId,
    required: true
  },
  debt: {
    type: Number,
    default: 0
  },
  credit: {
    type: Number,
    default: 0
  }
})

const Customer = model("Customer", customerSchema)

export default Customer
