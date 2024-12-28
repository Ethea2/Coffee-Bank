import { connectDB } from "@/libs/mongodb"
import Order from "@/models/order.models"
import { NextResponse } from "next/server"

export const GET = async (request: Request) => {
  connectDB()
  const orders = await Order.find()
  return NextResponse.json({ orders }, { status: 200 })
}
