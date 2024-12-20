import { IOrder } from "@/types/order.types";
import { Types, model, Schema, Model } from "mongoose";

interface OrderModel extends Model<IOrder> {
  createOrderItem(user_id: string, order_title: string, order_description: string, order_price: number): Promise<IOrder>
}

const orderSchema = new Schema<IOrder, OrderModel>({
  user_id: {
    type: String,
    required: true,
  },
  order_title: {
    type: String,
    required: true
  },
  order_description: {
    type: String,
    require: true
  },
  order_price: {
    type: Number,
    required: true,
  }
})

orderSchema.static(
  "createOrderItem",
  async function createOrderItem(user_id: string, order_title: string, order_description: string, order_price: number) {
    try {
      const order = await this.create({ user_id, order_title, order_description, order_price })
      return order
    } catch (e) {
      throw Error("Something went wrong!")
    }
  }
)

const Order = model<IOrder, OrderModel>("Order", orderSchema)

export default Order
