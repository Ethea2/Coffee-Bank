import { Schema, Types, model } from "mongoose"


const transactionSchema = new Schema({
  user_id: {
    type: String,
    required: true
  },
  customer_id: {
    type: String,
    required: true
  },
  order_id: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number
  },
  total_price: {
    type: Number
  },
}, { timestamps: true })

const Transaction = model("Transaction", transactionSchema)

export default Transaction
