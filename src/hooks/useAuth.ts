import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '../store'
import { login, logout, updateUser } from '../store/authSlice'

export const useAuth = () => {
  const dispatch = useDispatch()
  const { user, isAuthenticated, token } = useSelector((state: RootState) => state.auth)

  const loginUser = (userData: { id: string; name: string; email: string }, authToken: string) => {
    dispatch(login({ user: userData, token: authToken }))
    localStorage.setItem('authToken', authToken)
    localStorage.setItem('user', JSON.stringify(userData))
  }

  const logoutUser = () => {
    dispatch(logout())
    localStorage.removeItem('authToken')
    localStorage.removeItem('user')
  }

  const updateUserProfile = (updates: Partial<{ name: string; email: string }>) => {
    dispatch(updateUser(updates))
    if (user) {
      localStorage.setItem('user', JSON.stringify({ ...user, ...updates }))
    }
  }

  const initializeAuth = () => {
    const savedToken = localStorage.getItem('authToken')
    const savedUser = localStorage.getItem('user')
    
    if (savedToken && savedUser) {
      try {
        const userData = JSON.parse(savedUser)
        dispatch(login({ user: userData, token: savedToken }))
      } catch (error) {
        console.error('Error parsing saved user data:', error)
        logoutUser()
      }
    }
  }

  return {
    user,
    isAuthenticated,
    token,
    loginUser,
    logoutUser,
    updateUserProfile,
    initializeAuth,
  }
}