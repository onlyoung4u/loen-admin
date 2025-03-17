import type { Recordable } from '@vben/types'

import { requestClient } from '#/api/request'

export const logApi = {
  list: (params: Recordable<number | string>) => {
    return requestClient.get('/logs', { params })
  },
}
