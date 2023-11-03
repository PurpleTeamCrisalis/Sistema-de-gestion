import { useDispatch, useSelector } from 'react-redux'
import { projectApi } from '../api'
import { onAddNewOrder, onLoadOrders, onPullActiveOrder, onSetActiveOrder, onLoadOrderById } from '../redux'

export function useOrdersStore() {

  const { orders, activeOrder, selectedOrder } = useSelector(state => state.orders)
  const dispatch = useDispatch()

  function setActiveOrder(order) {
    dispatch(onSetActiveOrder(order))
  }
  function pullActiveOrder() {
    dispatch(onPullActiveOrder())
  }
  async function startLoadingOrderById(id) {
    try {
      const { data } = await projectApi.get(`/order/${id}`)
      dispatch(onLoadOrderById(data))
    } catch (error) {
      console.error(error)
    }
  }
  async function startLoadingOrders() {
    try {
      const { data } = await projectApi.get('/order/list')
      dispatch(onLoadOrders(data))
    } catch (error) {
      console.error(error)
    }
  }
  async function startAddingOrder(order) {
    try {
      const { data } = await projectApi.post('/order', order)
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
    selectedOrder,
    // Metodos
    startLoadingOrders,
    startAddingOrder,
    setActiveOrder,
    pullActiveOrder,
    startLoadingOrderById
  }
}