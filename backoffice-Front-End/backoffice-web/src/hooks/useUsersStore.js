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

  async function startLoadingProfileImage(username, imageElement, noImageElement, imageElementSmall, noImageElementSmall) {
    try {
      const { data } = await projectApi.get(`/image/${username}`)
      if (!data) throw new Error()
      imageElement.src = `http://localhost:8080/image/${username}`;
      noImageElement.src = "http://localhost:3000/image/hideme";
      if (imageElementSmall && noImageElementSmall) {
        imageElementSmall.src = `http://localhost:8080/image/${username}`;
        noImageElementSmall.src = "http://localhost:3000/image/hideme";
      }
    } catch (error) {
      imageElement.src = `http://localhost:3000/image/hideme`;
    }
  }

  async function startAddingProfileImage(username, form, imageElement, noImageElement, imageElementSmall, noImageElementSmall) {
    try {
      console.log(form)
      const { data } = await projectApi.post(`/image/${username}`, form)
      if (!data) throw new Error()
      imageElement.src = `http://localhost:8080/image/${username}`
      noImageElement.src = "http://localhost:3000/image/hideme";
      noImageElementSmall.src = "http://localhost:3000/image/hideme";
      imageElementSmall.src = `http://localhost:8080/image/${username}`;
    } catch (error) {
      console.error(error);
      imageElement.src = `http://localhost:3000/image/hideme`;
      imageElementSmall.src = `http://localhost:3000/image/hideme`;
    }
  }

  async function startUpdatingProfileImage(username, form, imageElement, noImageElement, imageElementSmall, noImageElementSmall) {
    try {
      const { data } = await projectApi.patch(`/image/${username}`, form)
      if (!data) throw new Error()
      if (imageElement && noImageElement && imageElementSmall && noImageElementSmall) {
        imageElement.src = "http://localhost:3000/image/hideme";
        imageElementSmall.src = "http://localhost:3000/image/hideme";
        noImageElement.src = `http://localhost:8080/image/${username}`;
        noImageElementSmall.src = `http://localhost:8080/image/${username}`;
      }
      return;
    } catch (error) {
      console.error(error)
      imageElement.src = `http://localhost:3000/image/hideme`;
      imageElementSmall.src = `http://localhost:3000/image/hideme`;
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
    startAddingProfileImage,
    startUpdatingProfileImage
  }
}