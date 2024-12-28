import { connectDB } from "@/libs/mongodb"
import Transaction from "@/models/transaction.models"
import { NextResponse } from "next/server"

export const GET = async (_request: Request, { params }: { params: Promise<{ transaction_type: string }> }) => {
  connectDB()
  const { transaction_type } = await params
  console.log(transaction_type)
  try {
    const transactionByType = await Transaction.getByTransactionType(transaction_type)
    return NextResponse.json({ transactionByType }, { status: 200 })
  } catch (e) {
    const errorType = e as Error
    return NextResponse.json({ message: errorType.message }, { status: 500 })
  }
}
