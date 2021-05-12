import fastify from "fastify"
import Datastore from "nedb-promises"
import path from "path"
import { Order, Project } from "../common/types"

const app = fastify({ logger: true })
const port = "3001"
const projects = new Datastore({
  filename: path.join(__dirname, "../db/projects.db"),
  autoload: true
})
const orders = new Datastore({
  filename: path.join(__dirname, "../db/orders.db"),
  autoload: true
})

// PROJECT ENDPOINTS
// =================

// Fetch all projects
app.get("/project", async (_, response) => {
  try {
    const docs = await projects.find<Project>({}).exec()
    response.send(docs)
  } catch (error) {
    response.send(error)
  }
})

// TODO: implement project update endpoint

// ORDER ENDPOINTS
// ===============

// Fetch all orders
app.get("/order", async (_, response) => {
  try {
    const docs = await orders.find<Order>({}).exec()
    response.send(docs)
  } catch (error) {}
})

// Add a new order
app.post<{ Body: Order }>("/order/add", async (request, response) => {
  // TODO: update associated project to reflect the change in available offset

  try {
    const result = await orders.insert({
      ...request.body,
      _createdAt: new Date().getTime()
    })
    response.send(result)
  } catch (error) {
    response.send(error)
  }
})

// Update a single order
app.put<{ Body: Order; Params: { id: string } }>(
  "/order/:id",
  async (request, response) => {
    try {
      const numUpdated = await orders.update(
        { _id: request.params.id },
        { ...request.body, _modifiedAt: new Date().getTime() }
      )
      if (numUpdated === 1) {
        response.send(request.body)
      } else {
        throw new Error(`Could not update order with _id ${request.body._id}.`)
      }
    } catch (error) {
      response.send(error)
    }
  }
)

// Delete a single order
app.delete<{ Params: { _id: string } }>(
  "/order/delete/:_id",
  async (request, response) => {
    const _id = request.params._id

    try {
      const numRemoved = await orders.remove({ _id }, {})
      if (numRemoved === 1) {
        const docs = await orders.find({})
        response.send(docs)
      } else {
        throw new Error(`Cannot delete order with _id ${_id}. Order not found!`)
      }
    } catch (error) {
      response.send(error)
    }
  }
)

// BOOTSTRAP SERVER
// ================

app.listen(port, () => {
  app.log.info(`Fastify server running on port ${port}`)
})
