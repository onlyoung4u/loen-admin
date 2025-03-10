<script lang="ts" setup>
import type { VbenFormSchema } from '#/adapter/form'

import { computed, reactive } from 'vue'

import { useVbenModal } from '@vben/common-ui'

import { message } from 'ant-design-vue'

import { useVbenForm, z } from '#/adapter/form'
import { changePasswordApi } from '#/api/core/auth'

defineOptions({
  name: 'ChangePasswordModal',
})

const [Form, { validate, resetForm, getValues }] = useVbenForm(
  reactive({
    commonConfig: {
      hideRequiredMark: false,
    },
    schema: computed((): VbenFormSchema[] => [
      {
        component: 'VbenInputPassword',
        componentProps: {
          placeholder: '请输入旧密码',
        },
        fieldName: 'oldPassword',
        label: '旧密码',
        rules: z
          .string({ message: '请输入旧密码' })
          .min(8, { message: '密码长度不能小于8个字符' })
          .max(16, { message: '密码长度不能超过16个字符' }),
      },
      {
        component: 'VbenInputPassword',
        componentProps: {
          passwordStrength: true,
          placeholder: '请输入新密码',
        },
        fieldName: 'newPassword',
        label: '新密码',
        renderComponentContent() {
          return {
            strengthText: () => '使用 8-16 个字符，混合字母、数字和符号',
          }
        },
        rules: z
          .string({ message: '请输入新密码' })
          .min(8, { message: '密码长度不能小于8个字符' })
          .max(16, { message: '密码长度不能超过16个字符' }),
      },
      {
        component: 'VbenInputPassword',
        componentProps: {
          placeholder: '请再次输入新密码',
        },
        fieldName: 'confirmPassword',
        label: '确认新密码',
        dependencies: {
          rules(values) {
            const { newPassword } = values
            return z
              .string({ message: '请再次输入新密码' })
              .refine((value) => value === newPassword, {
                message: '两次输入的密码不一致',
              })
          },
          triggerFields: ['newPassword'],
        },
      },
    ]),
    showDefaultActions: false,
  }),
)

async function handleSubmit() {
  try {
    const { valid } = await validate()

    if (!valid) return

    modalApi.lock(true)

    // 获取表单值
    const values = await getValues()

    await changePasswordApi(values)

    message.success('密码修改成功')

    modalApi.close()
  } catch (error) {
    console.error('修改密码失败:', error)
  } finally {
    modalApi.lock(false)
  }
}

const [Modal, modalApi] = useVbenModal({
  onOpenChange(isOpen) {
    if (!isOpen) {
      resetForm()
    }
  },
  async onConfirm() {
    await handleSubmit()
  },
})
</script>

<template>
  <Modal title="修改密码" class="sm:max-w-[500px]" :fullscreen-button="false">
    <Form />
  </Modal>
</template>
