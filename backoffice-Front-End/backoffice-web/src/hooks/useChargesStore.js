import { useDispatch, useSelector } from 'react-redux'
import { projectApi } from '../api'
import { onAddNewCharge, onDeleteCharge, onLoadCharges, onPullActiveCharge, onSetActiveCharge, onUpdateCharge } from '../redux'
import { getErrorResponse, getSuccessResponse } from '../helpers'

export function useChargesStore() {

    const { charges, activeCharge } = useSelector(state => state.charges)
    const dispatch = useDispatch()

    function setActiveCharge(charge) {
        dispatch(onSetActiveCharge(charge))
    }
    function pullActiveCharge() {
        dispatch(onPullActiveCharge())
    }
    async function startLoadingCharges() {
        try {
            const { data } = await projectApi.get('/charge/list')
            dispatch(onLoadCharges(data))
            getSuccessResponse("Impuestos cargados!")
        } catch (error) {
            getErrorResponse(error, "impuestos")
        }
    }
    async function startAddingCharge(charge) {
        try {
        const { data } = await projectApi.post('/charge/create', charge)
        dispatch(onAddNewCharge({
            name: data.username,
            percentage: data.percentage,
            enabled: data.enabled,
            id: data.id
        }))
        } catch (error) {
        console.error(error)
        }
    }
    async function startDeletingCharge() {
        try {
        await projectApi.delete(`/charge/delete/${activeCharge.id}`)
        dispatch(onDeleteCharge())
        } catch (error) {
        console.error(error)
        }
    }
    async function startUpdatingCharge(charge) {
        try {
        const {data} = await projectApi.patch(`/charge/update/${charge.id}`, charge)
        dispatch(onUpdateCharge(data))
        } catch (error) {
        console.error(error)
        }
    }

    return {
        charges,
        activeCharge,
        startLoadingCharges,
        startAddingCharge,
        setActiveCharge,
        pullActiveCharge,
        startDeletingCharge,
        startUpdatingCharge
    }
}