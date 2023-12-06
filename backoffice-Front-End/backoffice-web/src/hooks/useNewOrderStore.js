import { useDispatch, useSelector } from 'react-redux'
import { onAddProducts, onAddServices, onDeleteDetail, onAddClient, onSetActiveDetail, onPullActiveDetail, onUpdateQuantity, onCleanNewOrder, onUpdateWarranty } from '../redux'

export function useNewOrderStore() {

  const { newOrder } = useSelector(state => state.newOrder)
  const dispatch = useDispatch()

  function setActiveDetail(detail) {
    dispatch(onSetActiveDetail(detail))
  }
  function pullActiveDetail() {
    dispatch(onPullActiveDetail())
  }

  function addClient(client) {
    dispatch(onAddClient(client));
  }

  function addProducts(products) {
    dispatch(onAddProducts(products));
  }

  function addServices(services) {
    dispatch(onAddServices(services));
  }

  function deleteDetail() {
    dispatch(onDeleteDetail());
  }

  function updateQuantity(objeto) {
    dispatch(onUpdateQuantity(objeto))
  }

  function updateWarranty(objeto) {
    dispatch(onUpdateWarranty(objeto))
  }

  function cleanNewOrder() {
    dispatch(onCleanNewOrder())
  }

  return {
    // Atributos
    newOrder,
    // Metodos
    addServices,
    addProducts,
    addClient,
    setActiveDetail,
    deleteDetail,
    updateQuantity,
    updateWarranty,
    pullActiveDetail,
    cleanNewOrder
  }
}