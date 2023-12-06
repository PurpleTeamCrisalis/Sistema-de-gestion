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
        email: data.email,
        enabled: data.enabled,
        id: data.id
      }))
    } catch (error) {
      console.error(error)
    }
  }
  async function startDeletingUser() {
    try {
      await projectApi.delete(`/user/delete/${activeUser.id}`)
      dispatch(onDeleteUser())
    } catch (error) {
      console.error(error)
    }
  }
  async function startUpdatingUser(user) {
    try {
      const { data } = await projectApi.patch(`/user/update/${user.id}`, user)
      dispatch(onUpdateUser(data))
    } catch (error) {
      console.error(error)
    }
  }

  async function startLoadingProfileImage(username, imageElement) {
    try {
      const { data } = await projectApi.get(`/user/profileImage/${username}`);
      if (!data) throw new Error()
      imageElement.src = `http://localhost:8080/user/profileImage/${username}`;
    } catch (error) {
    }
  }

  async function startUpdatingProfileImage(username, form, imageElement) {
    try {
      const { data } = await projectApi.patch(`/user/profileImage/${username}`, form)
      if (!data) throw new Error()
      imageElement.src = `http://localhost:8080/user/profileImage/${username}`;
      return;
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
    startUpdatingUser,
    startLoadingProfileImage,
    startUpdatingProfileImage
  }
}