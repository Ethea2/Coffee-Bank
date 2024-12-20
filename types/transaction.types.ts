import { Types } from "mongoose";

export interface ITransaction {
  _id?: Types.ObjectId | string
  user_id: string
  customer_id: string
  order_id: string
  quantity: Number
  total_price: Number
  transaction_date?: Date
}
//   user_id: {
//     type: Types.ObjectId,
//     required: true
//   },
//   customer_id: {
//     type: Types.ObjectId,
//     required: true
//   },
//   quantity: {
//     type: Number
//   },
//   total_price: {
//     type: Number
//   },
// }, { timestamps: true })
