import { Types } from "mongoose";

export interface ITransaction {
  _id?: Types.ObjectId | String
  user_id: Types.ObjectId | String
  customer_id: Types.ObjectId | String
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
