import { Types } from "mongoose";

export interface ICustomer {
  _id?: Types.ObjectId | string
  user_id: string
  debt: Number
  credit: Number
  name: string
}
