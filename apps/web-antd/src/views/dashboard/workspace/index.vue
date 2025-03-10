<script lang="ts" setup>
import { WorkbenchHeader } from '@vben/common-ui'
import { preferences } from '@vben/preferences'
import { useUserStore } from '@vben/stores'
import { formatDate } from '@vben/utils'

const userStore = useUserStore()
</script>

<template>
  <div class="p-5">
    <WorkbenchHeader
      :avatar="userStore.userInfo?.avatar || preferences.app.defaultAvatar"
    >
      <template #title>
        欢迎, {{ userStore.userInfo?.nickname }}, 开始您一天的工作吧！
      </template>
      <template #description>
        今天是 {{ formatDate(new Date().toDateString()) }}
      </template>
    </WorkbenchHeader>
  </div>
</template>
