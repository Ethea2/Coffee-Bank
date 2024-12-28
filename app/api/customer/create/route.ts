import Customer from "@/models/customer.models";
import { connectDB } from "@/libs/mongodb";
import { NextResponse } from "next/server";
import { verifyToken } from "@/libs/authentication";

export const POST = async (request: Request) => {
  const { name } = await request.json()
  connectDB()
  const bearer = request.headers.get("Authorization")
  if (!bearer) {
    return NextResponse.json({ message: "Please make sure that you are logged in" }, { status: 401 })
  }
  const token = bearer.split(" ")[1]

  try {
    const claims = verifyToken(token)
    const customer = await Customer.createCustomer(claims._id, name)

    if (!customer) {
      return NextResponse.json({ message: "Something went wrong with creating the customer!" }, { status: 500 })
    }

    return NextResponse.json({ customer, message: "Customer successfully created!" })
  } catch (e) {
    const errorType = e as Error
    return NextResponse.json({ message: errorType.message }, { status: 500 })
  }
}
