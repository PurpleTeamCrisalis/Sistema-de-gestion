import { useDispatch, useSelector } from "react-redux";
import {
  onSetActiveOrdersHistory,
  onPullActiveOrdersHistory,
  onLoadOrdersHistory,
} from "../redux";
import { projectApi } from "../api";
import { getErrorResponse } from "../helpers/getErrorResponse";
import { getSuccessResponse } from "../helpers";

export function useOrdersHistoryStore() {
  const { ordersHistory, activeOrdersHistory } = useSelector(
    (state) => state.ordersHistory
  );
  const dispatch = useDispatch();

  function setActiveOrdersHistory(ordersHistory) {
    dispatch(onSetActiveOrdersHistory(ordersHistory));
  }
  function pullActiveOrdersHistory() {
    dispatch(onPullActiveOrdersHistory());
  }
  async function startLoadingOrdersHistory() {
    try {
      const { data } = await projectApi.get(`/ticket/orders-history`);
      dispatch(onLoadOrdersHistory(data));
      getSuccessResponse("Historial de pedidos cargados!");
    } catch (error) {
      getErrorResponse(error, "No hay historial de pedidos");
    }
  }

  return {
    // Atributos
    ordersHistory,
    activeOrdersHistory,
    // Metodos
    startLoadingOrdersHistory,
    pullActiveOrdersHistory,
    setActiveOrdersHistory,
  };
}