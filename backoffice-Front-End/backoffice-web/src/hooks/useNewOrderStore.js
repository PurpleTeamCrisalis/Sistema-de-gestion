import { useDispatch, useSelector } from 'react-redux'
import { projectApi } from '../api'
import { onAddProducts, onAddServices, onDeleteDetail, onAddClient, onSetActiveDetail, onUpdateProductQuantity } from '../redux'

export function useNewOrderStore() {

  const { newOrder } = useSelector(state => state.newOrder)
  const dispatch = useDispatch()

  function updateProductQuantity(quantity, product) {
    dispatch(onUpdateProductQuantity({quantity: quantity, product: product}));
  }

  function setActiveDetail(detail) {
    dispatch(onSetActiveDetail(detail))
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
  
  function deleteDetail () {
    dispatch(onDeleteDetail());
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
    updateProductQuantity
  }
}