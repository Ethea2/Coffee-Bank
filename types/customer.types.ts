import { Types } from "mongoose";

export interface ICustomer {
  _id?: Types.ObjectId | String
  user_id: Types.ObjectId | String
  debt: Number
  credit: Number
}


