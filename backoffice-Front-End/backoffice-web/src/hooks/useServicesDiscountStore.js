import { useDispatch, useSelector } from "react-redux";
import {
  onSetActiveServicesDiscount,
  onPullActiveServicesDiscount,
  onLoadServicesDiscount,
} from "../redux";
import { projectApi } from "../api";
import { getErrorResponse } from "../helpers/getErrorResponse";
import { getSuccessResponse } from "../helpers";

export function useServicesDiscountStore() {
  const { servicesDiscount, activeServiceDiscount } = useSelector(
    (state) => state.servicesDiscount
  );
  const dispatch = useDispatch();

  function setActiveServicesDiscount(servicesDiscount) {
    dispatch(onSetActiveServicesDiscount(servicesDiscount));
  }
  function pullActiveServicesDiscount() {
    dispatch(onPullActiveServicesDiscount());
  }
  async function startLoadingServicesDiscount() {
    try {
      const { data } = await projectApi.get(""); //preguntar la lista por defecto
      dispatch(onLoadServicesDiscount(data));
      getSuccessResponse("Servicios descontados cargados!");
    } catch (error) {
      getErrorResponse(error, "servicios descontados");
    }
  }

  return {
    // Atributos
    servicesDiscount,
    activeServiceDiscount,
    // Metodos
    startLoadingServicesDiscount,
    pullActiveServicesDiscount,
    setActiveServicesDiscount,
  };
}
