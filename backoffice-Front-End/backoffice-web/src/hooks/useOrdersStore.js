import { useDispatch, useSelector } from 'react-redux'
import { projectApi } from '../api'
import { onAddNewOrder, onLoadOrders, onPullActiveOrder, onSetActiveOrder, onLoadOrderById, onLoadClientOrders, onDeleteCLientOrders } from '../redux'
import Toastify from "toastify-js";
import "toastify-js/src/toastify.css";
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
      dispatch(onLoadOrderById(data))
    } catch (error) {
      console.error(error)
    }
  }
  async function startLoadingOrders() {
    try {
      const { data } = await projectApi.get('/order/list')
      dispatch(onLoadOrders(data))
      getSuccessResponse("Ordenes cargadas!")
    } catch (error) {
      getErrorResponse(error)
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

  function deleteClientOrders(){
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
    clientOrders,
    // Metodos
    startLoadingOrders,
    startLoadingClientOrders,
    startAddingOrder,
    setActiveOrder,
    pullActiveOrder,
    startLoadingOrderById,
    deleteClientOrders
  }
}