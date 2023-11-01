import { useDispatch, useSelector } from 'react-redux'
import { projectApi } from '../api'
import { onAddProducts, onAddServices, onDelete, onAddClient } from '../redux'

export function useNewOrderStore() {

  const { newOrder } = useSelector(state => state.newOrder)
  const dispatch = useDispatch()

  function addClient(client) {
    dispatch(onAddClient(client));
  }

  function addProducts(products) {
    dispatch(onAddProducts(products));
  }
  
  function addServices(services) {
    dispatch(onAddServices(services));
  }
  
  function deleteItems (productIdSet, serviceIdSet) {
    dispatch(onDelete({productIdSet, serviceIdSet}));
  }

  return {
    // Atributos
    newOrder,
    // Metodos
    deleteItems,
    addServices,
    addProducts,
    addClient
  }
}