import { IUser } from "@/types/user.types";
import { Model, Schema, model } from "mongoose";
import bcrypt from "bcrypt"

interface UserModel extends Model<IUser> {
  createUser(username: string, password: string): IUser
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



const User = model<IUser, UserModel>("User", userSchema)

export default User
