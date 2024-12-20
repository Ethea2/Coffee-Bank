import User from "@/models/user.models";
import { connectDB } from "@/libs/mongodb";
import { NextResponse } from "next/server";


export const POST = async (request: Request) => {
  const { username, password } = await request.json()
  connectDB()
  try {
    const user = await User.createUser(username, password)
    return NextResponse.json({ user, message: "User successfully created!" }, { status: 200 })
  } catch (e) {
    return NextResponse.json({ e, message: "Something went wrong!" }, { status: 500 })
  }
}
