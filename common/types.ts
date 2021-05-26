// NOTE: all typscript types are provided and do not need to be changed

export type Project = {
  _id: string
  country: string
  name: string
  offsetAmount: number
  technology: string
}

export type Order = {
  _id: string
  _createdAt: string
  _modifiedAt: string
  projectId: string
  projectName: string
  offsetAmount: number
}

export type Api = {
  order: {
    add(
      order: Omit<Order, "_id" | "_createdAt" | "_modifiedAt">
    ): Promise<Order>
    delete(_id: string): Promise<Record<string, Order>>
    fetch(): Promise<Record<string, Order>>
    update(order: Omit<Order, "_createdAt" | "_modifiedAt">): Promise<Order>
  }
  project: {
    fetch(): Promise<Project[]>
  }
}
