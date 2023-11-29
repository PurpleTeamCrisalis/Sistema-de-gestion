import { useDispatch, useSelector } from "react-redux";
import {
  onSetActiveTotalDiscounts,
  onPullActiveTotalDiscounts,
  onLoadTotalDiscounts,
} from "../redux";
import { projectApi } from "../api";
import { getErrorResponse } from "../helpers/getErrorResponse";
import { getSuccessResponse } from "../helpers";

export function useTotalDiscountsStore() {
  const { totalDiscounts, activeTotalDiscounts } = useSelector(
    (state) => state.totalDiscounts
  );
  const dispatch = useDispatch();

  function setActiveTotalDiscounts(totalDiscounts) {
    dispatch(onSetActiveTotalDiscounts(totalDiscounts));
  }
  function pullActiveTotalDiscounts() {
    dispatch(onPullActiveTotalDiscounts());
  }
  async function startLoadingTotalDiscounts() {
    try {
      const { data } = await projectApi.get(
        `/ticket/totalDiscounts`
      );
      dispatch(onLoadTotalDiscounts(data));
      getSuccessResponse("Descuentos Totales cargados!");
    } catch (error) {
      getErrorResponse(error, "Descuentos Totales");
    }
  }

  return {
    // Atributos
    totalDiscounts,
    activeTotalDiscounts,
    // Metodos
    startLoadingTotalDiscounts,
    pullActiveTotalDiscounts,
    setActiveTotalDiscounts,
  };
}
