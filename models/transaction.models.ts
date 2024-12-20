import { Schema, Types, model } from "mongoose"


const transactionSchema = new Schema({
  user_id: {
    type: Types.ObjectId,
    required: true
  },
  customer_id: {
    type: Types.ObjectId,
    required: true
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
