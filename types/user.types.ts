import { Types } from "mongoose";

export interface IUser {
  _id?: Types.ObjectId | string
  username: string
  password: string
}
