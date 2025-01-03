import { connectDB } from "@/libs/mongodb"
import Customer from "@/models/customer.models"
import { NextResponse } from "next/server"

export const GET = async (request: Request, { params }: { params: Promise<{ customer_id: string }> }) => {
  connectDB()
  const { customer_id } = await params
  const customer = await Customer.findById(customer_id)
  return NextResponse.json({ customer }, { status: 200 })
}
