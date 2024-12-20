import User from "@/models/user.models"
import { connectDB } from "@/libs/mongodb";
import { NextResponse } from "next/server";
import { signToken } from "@/libs/authentication";

export const POST = async (request: Request) => {
  const { username, password } = await request.json()
  connectDB()
  try {
    const user = await User.login(username, password)
    const token = signToken(user._id)

    return NextResponse.json({
      token,
      username: user.username,
      message: "Login success!",
    }, { status: 200 })

  } catch (e) {
    return NextResponse.json({ e, message: "Something went wrong!" }, { status: 500 })
  }
}

