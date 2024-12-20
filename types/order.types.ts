import { Types } from "mongoose";

export interface IOrder {
  _id?: Types.ObjectId | String
  user_id: Types.ObjectId | String
  order_description: String
  order_price: Number
  order_title: Number
}
