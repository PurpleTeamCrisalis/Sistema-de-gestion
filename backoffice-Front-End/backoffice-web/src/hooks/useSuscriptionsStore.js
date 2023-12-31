import { useDispatch, useSelector } from 'react-redux'
import { projectApi } from '../api'
import { onAddNewSuscription, onLoadSuscriptions, onSetActiveSuscription, onUpdateSuscription, onLoadSuscriptionById, onLoadClientSuscriptions, onDeleteCLientSuscriptions } from '../redux'

export function useSuscriptionsStore() {

  const { suscriptions, activeSuscription, selectedSuscription, clientSuscriptions } = useSelector(state => state.suscriptions)
  const dispatch = useDispatch()

  function setActiveSuscription(suscription) {
    dispatch(onSetActiveSuscription(suscription))
  }
  function pullActiveSuscription() {
    dispatch(onPullActive())
  }
  async function startLoadingSuscriptionById(id) {
    try {
      const { data } = await projectApi.get(`/suscription/${id}`)
      console.log(data);
      dispatch(onLoadSuscriptionById(data))
    } catch (error) {
      console.error(error)
    }
  }
  async function startLoadingSuscriptions() {
    try {
      const { data } = await projectApi.get('/suscription/list')
      dispatch(onLoadSuscriptions(data))
    } catch (error) {
      console.error(error)
    }
  }

  async function startLoadingClientSuscriptions(clientId) {
    try {
      const { data } = await projectApi.get(`/suscription/list/${clientId}`)
      console.log(data)
      dispatch(onLoadClientSuscriptions(data))
    } catch (error) {
      console.error(error)
    }
  }

  function deleteClientSuscriptions() {
    dispatch(onDeleteCLientSuscriptions());
  }

  async function startUpdatingSuscription(suscription) {
    try {
      const { data } = await projectApi.patch(
        `/suscription/update/${suscription.id}`,
        suscription
      );
      dispatch(onUpdateSuscription(data));
    } catch (error) {
      console.error(error);
    }
  }

  async function startAddingSuscription(suscription) {
    try {
      const { data } = await projectApi.post('/suscription', suscription)
      dispatch(onAddNewSuscription({
        services: data.services,
        enabled: data.enabled,
        id: data.id,
      }))
    } catch (error) {
      console.error(error)
    }
  }

  return {
    // Atributos
    suscriptions,
    activeSuscription,
    selectedSuscription,
    clientSuscriptions,
    // Metodos
    startLoadingSuscriptions,
    startLoadingClientSuscriptions,
    startAddingSuscription,
    setActiveSuscription,
    pullActiveSuscription,
    startLoadingSuscriptionById,
    deleteClientSuscriptions,
    startUpdatingSuscription
  }
}