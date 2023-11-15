import { useDispatch, useSelector } from 'react-redux'
import { projectApi } from '../api'
import { onAddNewService, onDeleteService, onLoadServices, onPullActiveService, onSetActiveService, onUpdateService } from '../redux'

export function useServicesStore() {

  const { services, activeService } = useSelector(state => state.services)
  const dispatch = useDispatch()

  function setActiveService(service) {
    dispatch(onSetActiveService(service))
  }
  function pullActiveService() {
    dispatch(onPullActiveService())
  }
  async function startLoadingServices() {
    try {
      const { data } = await projectApi.get('/service/list')
      dispatch(onLoadServices(data))
    } catch (error) {
      console.error(error)
    }
  }
  async function startAddingService(service) {
    try {
      console.log(service)
      const { data } = await projectApi.post('/service/', service)
      console.log(data)
      
      dispatch(onAddNewService({
        name: data.name,
        description: data.description,
        basePrice: data.basePrice,
        enabled: data.enabled,
        id: data.id,
        isSpecial: data.isSpecial,
        taxes: data.taxes,
        suportCharge: data.suportCharge
      }))
    } catch (error) {
      console.error(error)
    }
  }
  async function startDeletingService() {
    try {
      await projectApi.delete(`/service/delete/${activeService.id}`)
      dispatch(onDeleteService())
    } catch (error) {
      console.error(error)
    }
  }
  async function startUpdatingService(service) {
    try {
      const {data} = await projectApi.patch(`/service/update/${service.id}`, service)
      dispatch(onUpdateService(data))
    } catch (error) {
      console.error(error)
    }
  }

  return {
    // Atributos
    services,
    activeService,
    // Metodos
    startLoadingServices,
    startAddingService,
    setActiveService,
    pullActiveService,
    startDeletingService,
    startUpdatingService
  }
}