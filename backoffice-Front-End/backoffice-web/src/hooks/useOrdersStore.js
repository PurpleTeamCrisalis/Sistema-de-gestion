import { useDispatch, useSelector } from 'react-redux'
import { projectApi } from '../api'
import {
  onAddNewOrder,
  onLoadOrders,
  onPullActiveOrder,
  onSetActiveOrder,
  onPullSelectedOrder,
  onSetSelectedOrder,
  onChangeOrderState,
  onLoadClientOrders,
  onDeleteCLientOrders
} from '../redux'
import { getErrorResponse } from '../helpers/getErrorResponse';
import { getSuccessResponse } from '../helpers';

export function useOrdersStore() {

  const { orders, activeOrder, selectedOrder, clientOrders } = useSelector(state => state.orders)
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
      dispatch(onSetSelectedOrder(data))
    } catch (error) {
      console.error(error)
    }
  }
  function pullSelectedOrder() {
    dispatch(onPullSelectedOrder())
  }
  async function startLoadingOrders() {
    try {
      const { data } = await projectApi.get('/order/list')
      dispatch(onLoadOrders(data))
      getSuccessResponse("Ordenes cargadas!")
    } catch (error) {
      getErrorResponse(error, "ordenes")
    }
  }

  async function startLoadingClientOrders(clientId) {
    try {
      const { data } = await projectApi.get(`/order/list/${clientId}`)
      dispatch(onLoadClientOrders(data))
    } catch (error) {
      console.error(error)
    }
  }

  function deleteClientOrders() {
    dispatch(onDeleteCLientOrders());
  }

  async function startAddingOrder(order) {
    try {
      const { data } = await projectApi.post('/order', order)
      dispatch(onAddNewOrder({
        client: data.client,
        date: data.date,
        services: data.services,
        products: data.products,
        enabled: data.enabled,
        id: data.id,
        total: data.total,
        totalDiscount: data.totalDiscount,
        discountService: data.discountService
      }))
    } catch (error) {
      console.error(error)
    }
  }

  async function startCancelingOrder(id) {
    try {
      const { data } = await projectApi.delete(`/order/${id}`)
      console.log(data)
      dispatch(onChangeOrderState(data))
    } catch (error) {
      console.log(error)
    }
  }

  return {
    // Atributos
    orders,
    activeOrder,
    selectedOrder,
    clientOrders,
    // Metodos
    startLoadingOrders,
    startLoadingClientOrders,
    startAddingOrder,
    setActiveOrder,
    pullActiveOrder,
    startLoadingOrderById,
    deleteClientOrders,
    pullSelectedOrder,
    startCancelingOrder
  }
}