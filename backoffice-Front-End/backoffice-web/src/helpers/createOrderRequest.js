export function createOrderRequest(order) {
  return {
    clientId: order.client.id,
    products: order.products.map(product => {
      return {
        productId: product.id,
        quantity: product.quantity,
        warranty: 10.5
      }
    }),
    services: order.services.map(service => service.id)
  }
}