import type { Recordable } from '@vben/types'

import { baseRequestClient, requestClient } from '#/api/request'

export namespace AuthApi {
  /** 登录接口参数 */
  export interface LoginParams {
    password?: string
    username?: string
  }

  /** 登录接口返回值 */
  export interface LoginResult {
    token: string
  }

  export interface RefreshTokenResult {
    data: string
    status: number
  }
}

/**
 * 登录
 */
export async function loginApi(data: AuthApi.LoginParams) {
  return requestClient.post<AuthApi.LoginResult>('/login', data)
}

/**
 * 刷新accessToken
 */
// export async function refreshTokenApi() {
//   return baseRequestClient.post<AuthApi.RefreshTokenResult>('/auth/refresh', {
//     withCredentials: true,
//   })
// }

/**
 * 退出登录
 */
export async function logoutApi() {
  return baseRequestClient.post('/logout', {
    withCredentials: true,
  })
}

/**
 * 修改密码
 */
export async function changePasswordApi(data: Recordable<string>) {
  return requestClient.post('/change-password', data)
}

/**
 * 获取用户权限码
 */
export async function getAccessCodesApi() {
  return requestClient.get<string[]>('/permissions')
}
