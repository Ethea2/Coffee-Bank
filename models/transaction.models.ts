import { ITransaction } from "@/types/transaction.types"
import { Model, Schema, model } from "mongoose"
import Order from "./order.models"
import Customer from "./customer.models"

interface TransactionModel extends Model<ITransaction> {
  generateCreditTransaction(user_id: string, customer_id: string, transaction_description: string, total_price: Number): Promise<ITransaction>
  generateOrderTransaction(user_id: string, customer_id: string, order_id: string, payment_type: string): Promise<ITransaction>
  getAllTransactions(): Promise<ITransaction[]>
  getCustomerTransactions(customer_id: string): Promise<ITransaction[]>
  getByTransactionType(transaction_type: string): Promise<ITransaction[]>
}

const transactionSchema = new Schema<ITransaction, TransactionModel>({
  user_id: {
    type: String,
    required: true
  },
  customer_id: {
    type: String,
    required: true
  },
  order_id: {
    type: String,
  },
  transaction_description: {
    type: String,
    default: "Ordered a coffee!"
  },
  total_price: {
    type: Number
  },
  transaction_type: {
    type: String,
    enum: ["order", "credit"]
  },
  payment_type: {
    type: String,
    enum: ["debt", "credit"]
  }
}, { timestamps: true })

transactionSchema.static(
  "generateCreditTransaction",
  async function generateCreditTransaction(user_id: string, customer_id: string, transaction_description: string, total_price: Number) {
    const customer = await Customer.findById(customer_id)

    if (!customer) {
      throw Error("Customer not found!")
    }

    const newCredit = Number(customer.credit) + Number(total_price)
    customer.credit = newCredit
    await customer.save()

    const newTransaction = await this.create({ user_id, customer_id, transaction_description, total_price, transaction_type: "credit" })

    return newTransaction
  }
)

transactionSchema.static(
  "generateOrderTransaction",
  async function generateOrderTransaction(user_id: string, customer_id: string, order_id: string, payment_type: string) {
    // PAYMENT TYPE IS EITHER credit or debt
    const order = await Order.findById(order_id)
    const customer = await Customer.findById(customer_id)

    if (!order) {
      throw Error("Order doesn't exist in the menu!")
    }
    if (!customer) {
      throw Error("Customer doesn't exist!")
    }

    const total_price = order.order_price
    const transaction_description = `${customer.name} ordered a ${order.order_title}`

    if (payment_type === "credit") {
      const customerCredit = customer.credit
      const newCredit = Number(customerCredit) - Number(total_price)
      if (newCredit < 0) {
        throw Error("Not enough credit")
      }
      customer.credit = newCredit
      await customer.save()
    } else {
      const customerDebt = customer.debt
      const newDebt = Number(customerDebt) + Number(total_price)
      customer.debt = newDebt
      await customer.save()
    }

    const newTransaction = await this.create({ user_id, customer_id, transaction_description, total_price, transaction_type: "order", payment_type })
    return newTransaction
  }
)

transactionSchema.static(
  "getAllTransactions",
  async function getAllTransactions() {
    const allTransactions = await this.find()
    return allTransactions
  }
)

transactionSchema.static(
  "getCustomerTransactions",
  async function getCustomerTransactions(customer_id: string) {
    const allCustomerTransactions = await this.find({ customer_id })
    return allCustomerTransactions
  }
)

transactionSchema.static(
  "getByTransactionType",
  async function getByTransactionType(transaction_type: string) {
    const transactionsBasedOnType = await this.find({ transaction_type })
    return transactionsBasedOnType
  }
)

const Transaction = model<ITransaction, TransactionModel>("Transaction", transactionSchema)

export default Transaction
