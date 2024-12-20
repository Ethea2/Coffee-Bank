import { ICustomer } from "@/types/customer.types";
import { Model, Schema, Types, model } from "mongoose";

interface CustomerModel extends Model<ICustomer> {
  createCustomer(user_id: string, customer_name: string): Promise<ICustomer>
}

const customerSchema = new Schema<ICustomer, CustomerModel>({
  user_id: {
    type: String,
    required: true
  },
  debt: {
    type: Number,
    default: 0
  },
  credit: {
    type: Number,
    default: 0
  },
  name: {
    type: String
  }
})

customerSchema.static(
  "createCustomer",
  async function createCustomer(user_id: string, customer_name: string) {
    try {
      const newCustomer = await this.create({ user_id, name: customer_name })

      return newCustomer
    } catch (e) {
      throw Error("Failed to create a new customer!")
    }
  }
)

const Customer = model<ICustomer, CustomerModel>("Customer", customerSchema)

export default Customer
