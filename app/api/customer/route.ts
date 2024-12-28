import { connectDB } from "@/libs/mongodb"
import Customer from "@/models/customer.models"
import { NextResponse } from "next/server"

export const GET = async () => {
  connectDB()
  const customers = await Customer.find()
  return NextResponse.json({ customers }, { status: 200 })
}
