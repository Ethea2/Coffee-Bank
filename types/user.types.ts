import { Types } from "mongoose";

export interface IUser {
  _id?: Types.ObjectId | String
  username: String
  password: String
}
