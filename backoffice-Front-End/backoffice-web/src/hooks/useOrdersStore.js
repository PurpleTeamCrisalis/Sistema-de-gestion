import { useDispatch, useSelector } from 'react-redux'
import { projectApi } from '../api'
import { onAddNewOrder/*, onDeleteUser*/, onLoadOrders, onPullActiveOrder, onSetActiveOrder } from '../redux'

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
  }/*
  async function startDeletingOrder() {
    try {
      await projectApi.delete(`/order/${activeOrder.id}`)
      dispatch(onDeleteOrder())
    } catch (error) {
      console.error(error)
    }
  }*/

  return {
    // Atributos
    orders,
    activeOrder,
    // Metodos
    startLoadingOrders,
    startAddingOrder,
    setActiveOrder,
    pullActiveOrder,
    //startDeletingUser,
  }
}