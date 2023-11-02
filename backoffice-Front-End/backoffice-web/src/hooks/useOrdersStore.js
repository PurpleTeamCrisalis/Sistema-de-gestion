import { useDispatch, useSelector } from 'react-redux'
import { projectApi } from '../api'
import { onAddNewOrder, onLoadOrders, onPullActiveOrder, onSetActiveOrder } from '../redux'

export function useOrdersStore() {

  const { orders, activeOrder } = useSelector(state => state.orders)
  const dispatch = useDispatch()

  function setActiveOrder(order) {
    dispatch(onSetActiveOrder(order))
  }
  function pullActiveOrder() {
    dispatch(onPullActiveOrder())
  }
  async function startLoadingOrders() {
    try {
      const { data } = await projectApi.get('/order/list')
      console.log(data)
      dispatch(onLoadOrders(data))
    } catch (error) {
      console.error(error)
    }
  }
  async function startAddingOrder(order) {
    try {
      const request = {
        clientId: order.client.id,
        services: order.services.map(service => service.id),
        products: order.products.map(product => ({
          productId: product.id,
          quantity: product.quantity,
          warranty: 1
        }))
      };
      console.log(request);
      const { data } = await projectApi.post('/order', request)
      dispatch(onAddNewOrder({
        client: data.client,
        date: data.date,
        services: data.sercices,
        products: data.products,
        enabled: data.enabled,
        id: data.id,
        total: data.total
      }))
    } catch (error) {
      console.error(error)
    } 
  }

  return {
    // Atributos
    orders,
    activeOrder,
    // Metodos
    startLoadingOrders,
    startAddingOrder,
    setActiveOrder,
    pullActiveOrder
  }
}