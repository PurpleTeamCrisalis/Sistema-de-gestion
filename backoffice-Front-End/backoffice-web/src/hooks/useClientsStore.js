import { useDispatch, useSelector } from "react-redux";
import { projectApi } from "../api";
import {
  onAddNewClient,
  onLoadClients,
  onUpdateClient,
  onSetActiveClient,
  onPullActiveClient,
  onDeleteClient,
} from "../redux/client/clientsSlice";

export function useClientsStore() {
  const { clients, activeClient } = useSelector((state) => state.clients);
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
      dispatch(onLoadClients(data));
    } catch (error) {
      console.error("Lista vacía");
    }
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
      dispatch(onUpdateClient(data));
    } catch (error) {
      console.error(error);
    }
  }

  return {
    // Atributos
    clients,
    activeClient,
    // Metodos
    startLoadingClient,
    setActiveClient,
    pullActiveClient,
    startAddingClients,
    startDeletingClient,
    startUpdatingClient,
  };
}
