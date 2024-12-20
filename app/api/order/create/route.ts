import Order from "@/models/order.models";
import { connectDB } from "@/libs/mongodb";
import { NextResponse } from "next/server";
import { verifyToken } from "@/libs/authentication";

export const POST = async (request: Request) => {
  const { order_title, order_description, order_price } = await request.json()
  connectDB()
  const bearer = request.headers.get("Authorization")
  if (!bearer) {
    return NextResponse.json({ message: "Please make sure that you are logged in" }, { status: 401 })
  }
  const token = bearer.split(" ")[1]

  try {
    const id = verifyToken(token)._id
    if (!id) {
      return NextResponse.json({ message: "User doesn't exist" }, { status: 404 })
    }

    const order = await Order.createOrderItem(id, order_title, order_description, Number(order_price))

    return NextResponse.json({ order, message: "Order Successfully created!" })
  } catch (e) {
    return NextResponse.json({ message: "Something went wrong with creating an order" }, { status: 500 })
  }
}
