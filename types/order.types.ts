import { Types } from "mongoose";

export interface IOrder {
  _id?: Types.ObjectId | string
  user_id: string
  order_description: string
  order_price: Number
  order_title: Number
}
