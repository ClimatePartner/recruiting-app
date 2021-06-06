import axios from "axios"
import { Api, Order, Project } from "../common/types"

/**
 * TODOS
 * 1. Implement the project fetch function (line 46)
 */

export const api: Api = {
  orders: {
    async add(order) {
      const response = await axios.post<Order>("/orders", order)
      return response.data
    },
    async delete(_id) {
      const response = await axios.delete<Order[]>(`/orders/${_id}`)
      return response.data.reduce((acc, order) => {
        return { ...acc, [order._id]: order }
      }, {})
    },
    async fetch() {
      const response = await axios.get<Order[]>("/orders")
      return response.data
        .sort((a, b) => {
          if (a._createdAt < b._createdAt) {
            return -1
          }

          if (a._createdAt === b._createdAt) {
            return 0
          }

          return 1
        })
        .reduce((acc, order) => {
          return { ...acc, [order._id]: order }
        }, {})
    },
    async update(order) {
      const response = await axios.put<Order>("/orders", order)
      return response.data
    }
  },
  projects: {
    async fetch() {
      // TODO: implement the project fetch function
      return []
    }
  }
}

export default api
