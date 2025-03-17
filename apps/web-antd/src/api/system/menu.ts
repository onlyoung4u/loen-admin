import type { Recordable } from '@vben/types'

import { requestClient } from '#/api/request'

export const menuApi = {
  list: () => {
    return requestClient.get('/menu')
  },
  create: (data: Recordable<any>) => {
    return requestClient.post('/menu', data)
  },
  update: (data: Recordable<any>, id: number) => {
    return requestClient.put(`/menu/${id}`, data)
  },
  delete: (id: number) => {
    return requestClient.delete(`/menu/${id}`)
  },
}
