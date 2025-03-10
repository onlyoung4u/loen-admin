import type {
  VbenFormSchema as FormSchema,
  VbenFormProps,
} from '@vben/common-ui'

import type { ComponentType } from './component'

import { setupVbenForm, useVbenForm as useForm, z } from '@vben/common-ui'

setupVbenForm<ComponentType>({
  config: {
    // ant design vue组件库默认都是 v-model:value
    baseModelPropName: 'value',

    // 一些组件是 v-model:checked 或者 v-model:fileList
    modelPropNameMap: {
      Checkbox: 'checked',
      Radio: 'checked',
      Switch: 'checked',
      Upload: 'fileList',
    },
  },
  defineRules: {
    required: (value, _params, ctx) => {
      if (value === undefined || value === null || value.length === 0) {
        return `请输入${ctx.label}`
      }
      return true
    },
    selectRequired: (value, _params, ctx) => {
      if (value === undefined || value === null) {
        return `请选择${ctx.label}`
      }
      return true
    },
  },
})

const useVbenForm = useForm<ComponentType>

export { useVbenForm, z }

export type VbenFormSchema = FormSchema<ComponentType>
export type { VbenFormProps }
