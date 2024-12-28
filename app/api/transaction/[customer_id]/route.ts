import { connectDB } from "@/libs/mongodb"
import Transaction from "@/models/transaction.models"
import { NextResponse } from "next/server"

export const GET = async ({ params }: { params: { customer_id: string } }) => {
  connectDB()
  const { customer_id } = await params
  try {
    const allCustomerTransactions = await Transaction.getCustomerTransactions(customer_id)
    return NextResponse.json({ allCustomerTransactions }, { status: 200 })
  } catch (e) {
    const errorType = e as Error
    return NextResponse.json({ message: errorType.message }, { status: 500 })
  }
}
