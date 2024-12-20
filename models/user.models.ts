import { IUser } from "@/types/user.types";
import { Model, Schema, model } from "mongoose";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

interface UserModel extends Model<IUser> {
  createUser(username: string, password: string): Promise<IUser>
  login(username: string, password: string): Promise<IUser>
}

const userSchema = new Schema<IUser, UserModel>({
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  }
})

userSchema.static(
  "createUser",
  async function createUser(username: string, password: string) {
    const salt = await bcrypt.genSalt(12)
    const hash = await bcrypt.hash(password, salt)

    const user = await this.create({ username, password: hash })
    return user
  }
)

userSchema.static(
  "login",
  async function login(username: string, password: string) {
    if (!username || !password) {
      throw Error("All fields must be filled!")
    }

    const user = await this.findOne({ username })

    if (!user) {
      throw Error("User does not exist!")
    }

    const match = bcrypt.compare(password, user.password!)

    if (!match) {
      throw Error("Password does not exist!")
    }

    return user
  }
)

const User = model<IUser, UserModel>("User", userSchema)

export default User
