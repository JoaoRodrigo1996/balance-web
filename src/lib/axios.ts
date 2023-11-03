import { rejects } from 'assert'
import axios, { AxiosError, AxiosInstance } from 'axios'
import { request } from 'http'
import { destroyCookie, parseCookies, setCookie } from 'nookies'
import { resolve } from 'path'

type SignOut = () => void

type PromiseType = {
  onSuccess: (token: string) => void
  onFailure: (error: AxiosError) => void
}

type APIInstanceProps = AxiosInstance & {
  registerInterceptTokenMangager: (signOut: SignOut) => () => void
}

const token = parseCookies()

const api = axios.create({
  baseURL: 'http://localhost:3333',
  headers: {
    Authorization: `Bearer ${token['nextAuth.token']}`,
  },
}) as APIInstanceProps

let failedQueue: Array<PromiseType> = []
let isRefreshing = false

api.registerInterceptTokenMangager = (signOut) => {
  const interceptTokenManager = api.interceptors.response.use(
    (response) => response,
    async (requestError) => {
      if (requestError.response.status === 401) {
        if (requestError.response.data?.message === 'Unauthorized') {
          // const token = parseCookies()

          if (!token) {
            signOut()
            return Promise.reject(requestError)
          }

          const originalRequestConfig = requestError.config

          if (!isRefreshing) {
            console.log(token)
            return new Promise((resolve, reject) => {
              failedQueue.push({
                onSuccess: (token: string) => {
                  originalRequestConfig.headers = {
                    Authorization: `Bearer ${token}`,
                  }
                  resolve(api(originalRequestConfig))
                },
                onFailure: (error: AxiosError) => {
                  reject(error)
                },
              })
            })
          }

          isRefreshing = true
        }
      }
      signOut()

      if (requestError.response && requestError.response.data) {
        return Promise.reject(new Error(requestError.response.data.message))
      } else {
        return Promise.reject(new Error(requestError))
      }
    },
  )

  return () => {
    api.interceptors.response.eject(interceptTokenManager)
  }
}

export { api }
