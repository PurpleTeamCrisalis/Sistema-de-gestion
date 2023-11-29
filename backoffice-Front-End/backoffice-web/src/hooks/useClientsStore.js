import { useDispatch, useSelector } from "react-redux";
import { projectApi } from "../api";
import {
  onAddNewClient,
  onLoadClients,
  onUpdateClient,
  onSetActiveClient,
  onPullActiveClient,
  onDeleteClient,
  onLoadClientSubscriptions,
  onDeleteClientSubcriptions,
  onChangeClientSubscriptionState,
} from "../redux/client/clientsSlice";
import { getErrorResponse, getSuccessResponse } from "../helpers";

export function useClientsStore() {
  const { clients, activeClient, clientSubscriptions } = useSelector((state) => state.clients);
  const dispatch = useDispatch();

  function setActiveClient(client) {
    dispatch(onSetActiveClient(client));
  }
  function pullActiveClient() {
    dispatch(onPullActiveClient());
  }

  async function startLoadingClient() {
    try {
      const { data } = await projectApi.get("/client/list");
      if (data.length === 0) throw { response: { status: 404 } }
      dispatch(onLoadClients(data));
      getSuccessResponse('Clientes cargados!')
    } catch (error) {
      getErrorResponse(error, "clientes");
    }
  }

  async function startLoadingClientSubscriptions(clientId) {
    try {
      const { data } = await projectApi.get(`/client/list/${clientId}/subscriptions`)
      dispatch(onLoadClientSubscriptions(data))
    } catch (error) {
      console.error(error)
    }
  }

  function deleteClientSubscriptions() {
    dispatch(onDeleteClientSubcriptions());
  }

  async function startAddingClients(client) {
    try {

      const response = await projectApi.post("/client/", client);

      if (response && response.data) {
        const { data } = response;
        dispatch(
          onAddNewClient({
            name: data.name,
            lastname: data.lastname,
            dni: data.dni,
            phone: data.phone,
            adress: data.adress,
            bussinessname: data.bussinessname,
            isbussiness: data.isbussiness,
            startdate: data.startdate,
            cuit: data.cuit,
            enabled: data.enabled,
            id: data.id,
          })
        );
      } else {
        console.error("Respuesta inesperada del servidor");
      }
    } catch (error) {
      console.error(error);
    }
  }

  async function startDeletingClient() {
    try {
      await projectApi.delete(`/client/delete/${activeClient.id}`);
      dispatch(onDeleteClient());
    } catch (error) {
      console.error(error);
    }
  }
  async function startUpdatingClient(client) {
    try {
      const { data } = await projectApi.patch(
        `/client/update/${client.id}`,
        client
      );
      console.log(data);
      dispatch(onUpdateClient(data));
      dispatch(onChangeClientSubscriptionState(data));
    } catch (error) {
      console.error(error);
    }
  }

  return {
    // Atributos
    clients,
    activeClient,
    clientSubscriptions,
    // Metodos
    startLoadingClient,
    setActiveClient,
    pullActiveClient,
    startAddingClients,
    startDeletingClient,
    startUpdatingClient,
    startLoadingClientSubscriptions,
    deleteClientSubscriptions,
  };
}
