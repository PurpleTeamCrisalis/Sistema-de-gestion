import { useDispatch, useSelector } from 'react-redux'
import { projectApi } from '../api'
import { onAddNewProduct, onDeleteProduct, onLoadProducts, onPullActiveProduct, onSetActiveProduct, onUpdateProduct } from '../redux'

export function useProductsStore() {

  const { products, activeProduct } = useSelector(state => state.products)
  const dispatch = useDispatch()

  function setActiveProduct(product) {
    dispatch(onSetActiveProduct(product))
  }
  function pullActiveProduct() {
    dispatch(onPullActiveProduct())
  }
  async function startLoadingProducts() {
    try {
      const {data} = await projectApi.get('/product/list')
      console.log(data)
      dispatch(onLoadProducts(data))
    } catch (error) {
      console.error(error)
    }
  }
  async function startAddingProduct(product) {
    try {
      const {data}  = await projectApi.post('/product/', product);

      dispatch(onAddNewProduct({
        name: data.name,
        description: data.description,
        basePrice: data.basePrice,
        enabled: data.enabled,
        taxes: data.taxes,
        id: data.id
      }))
    } catch (error) {
      console.error(error)
    }
  }
  async function startDeletingProduct() {
    try {
      await projectApi.delete(`/product/delete/${activeProduct.id}`)
      dispatch(onDeleteProduct())
    } catch (error) {
      console.error(error)
    }
  }
  async function startUpdatingProduct(product) {
    try {
      const {data} = await projectApi.patch(`/product/update/${product.id}`, product)
      console.log(data)
      dispatch(onUpdateProduct(data))
    } catch (error) {
      console.error(error)
    }
  }

  return {
    // Atributos
    products,
    activeProduct,
    // Metodos
    startLoadingProducts,
    startAddingProduct,
    setActiveProduct,
    pullActiveProduct,
    startDeletingProduct,
    startUpdatingProduct
  }
}