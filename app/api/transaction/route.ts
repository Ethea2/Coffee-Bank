import Transaction from "@/models/transaction.models";
import { connectDB } from "@/libs/mongodb";
import { NextResponse } from "next/server";
import { verifyToken } from "@/libs/authentication";
import { REPLEval } from "repl";

export const POST = async (request: Request) => {
  // for order
  // user_id, customer_id, order_id, payment_type = "debt" | "credit", transaction_type
  // for credit
  // user_id, customer_id, transaction_description, total_price, transaction_type
  const { customer_id, transaction_type, order_id, transaction_description, total_price, payment_type } = await request.json()
  connectDB()
  const bearer = request.headers.get("Authorization")
  if (!bearer) {
    return NextResponse.json({ message: "Please make sure that you are logged in" }, { status: 401 })
  }
  const token = bearer.split(" ")[1]
  try {
    const claims = verifyToken(token)
    const user_id = claims._id
    if (transaction_type === "order") {
      const newTransaction = await Transaction.generateOrderTransaction(user_id, customer_id, order_id, payment_type)
      return NextResponse.json({ message: "Transaction successfully generated!", newTransaction })
    } else {
      const newTransaction = await Transaction.generateCreditTransaction(user_id, customer_id, transaction_description, total_price)
      return NextResponse.json({ message: "Transaction successfully generated!", newTransaction }, { status: 200 })
    }
  } catch (e) {
    const errorType = e as Error
    return NextResponse.json({ message: errorType.message }, { status: 500 })
  }
}

export const GET = async () => {
  connectDB()
  const allTransactions = await Transaction.getAllTransactions()
  return NextResponse.json({ allTransactions }, { status: 200 })
}
