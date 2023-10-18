import { useDispatch, useSelector } from 'react-redux'
import { projectApi } from '../api'
import { onAddNewUser, onDeleteUser, onLoadUsers, onPullActiveUser, onSetActiveUser, onUpdateUser } from '../redux'

export function useUsersStore() {

  const { users, activeUser } = useSelector(state => state.users)
  const dispatch = useDispatch()

  function setActiveUser(user) {
    dispatch(onSetActiveUser(user))
  }
  function pullActiveUser() {
    dispatch(onPullActiveUser())
  }
  async function startLoadingUsers() {
    try {
      const { data } = await projectApi.get('/user/list')
      dispatch(onLoadUsers(data))
    } catch (error) {
      console.error(error)
    }
  }
  async function startAddingUser(user) {
    try {
      const { data } = await projectApi.post('/user/create', user)
      dispatch(onAddNewUser({
        username: data.username,
        id: data.id
      }))
    } catch (error) {
      console.error(error)
    }
  }
  async function startDeletingUser() {
    try {
      await projectApi.delete(`/user/${activeUser.userId}`)
      dispatch(onDeleteUser())
    } catch (error) {
      console.error(error)
    }
  }
  async function startUpdatingUser(user) {
    try {
      await projectApi.put('/user', user)
      dispatch(onUpdateUser(user))
    } catch (error) {
      console.error(error)
    }
  }

  return {
    // Atributos
    users,
    activeUser,
    // Metodos
    startLoadingUsers,
    startAddingUser,
    setActiveUser,
    pullActiveUser,
    startDeletingUser,
    startUpdatingUser
  }
}