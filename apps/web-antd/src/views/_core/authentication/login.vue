<script lang="ts" setup>
import type { VbenFormSchema } from '@vben/common-ui'

import { computed, markRaw } from 'vue'

import { AuthenticationLogin, SliderCaptcha, z } from '@vben/common-ui'

import { useAuthStore } from '#/store'

defineOptions({ name: 'Login' })

const authStore = useAuthStore()

const formSchema = computed((): VbenFormSchema[] => {
  return [
    {
      component: 'VbenInput',
      componentProps: {
        placeholder: '请输入用户名',
      },
      fieldName: 'username',
      label: '用户名',
      rules: z.string().min(1, { message: '请输入用户名' }),
    },
    {
      component: 'VbenInputPassword',
      componentProps: {
        placeholder: '请输入密码',
      },
      fieldName: 'password',
      label: '密码',
      rules: z.string().min(1, { message: '请输入密码' }),
    },
    {
      component: markRaw(SliderCaptcha),
      fieldName: 'captcha',
      rules: z.boolean().refine((value) => value, {
        message: '请完成验证',
      }),
    },
  ]
})
</script>

<template>
  <AuthenticationLogin
    title="欢迎使用 👋🏻"
    sub-title="请输入您的用户信息以登录系统"
    :form-schema="formSchema"
    :loading="authStore.loginLoading"
    @submit="authStore.authLogin"
  />
</template>
