'use client'

import { api } from '@/lib/axios'
import { useRouter } from 'next/navigation'
import { destroyCookie, parseCookies, setCookie } from 'nookies'
import {
  ReactNode,
  createContext,
  useCallback,
  useEffect,
  useState,
} from 'react'

type Client = {
  email: string
  name: string
}

type SignInCredentials = {
  email: string
  password: string
}

type AuthContextData = {
  signIn: (credentials: SignInCredentials) => Promise<void>
  signOut: () => void
  getClientProfile: () => void
  client: Client | undefined
  isAuthenticated: boolean
}

type AuthContextProviderProps = {
  children: ReactNode
}

export const AuthContext = createContext({} as AuthContextData)

export function AuthContextProvider({ children }: AuthContextProviderProps) {
  const [client, setClient] = useState<Client>()
  const isAuthenticated = !!client

  const router = useRouter()

  async function getClientProfile() {
    const response = await api.get('/me')

    setClient(response.data.user.client.props)
  }

  async function signIn({ email, password }: SignInCredentials) {
    try {
      const response = await api.post('/session', { email, password })

      const { accessToken } = response.data

      setCookie(undefined, 'nextAuth.token', accessToken, {
        maxAge: 60 * 60 * 25 * 30, // 30 days
        path: '/',
      })

      api.defaults.headers.Authorization = `Bearer ${accessToken}`

      router.push('/dashboard')
    } catch (error) {
      console.log(error)
    }
  }

  const signOut = useCallback(async () => {
    setClient({} as Client)
    destroyCookie(undefined, 'nextAuth.token')
    router.push('/')
  }, [router])

  useEffect(() => {
    const subcribe = api.registerInterceptTokenMangager(signOut)

    return () => {
      subcribe()
    }
  }, [signOut])

  return (
    <AuthContext.Provider
      value={{ signIn, signOut, getClientProfile, isAuthenticated, client }}
    >
      {children}
    </AuthContext.Provider>
  )
}
