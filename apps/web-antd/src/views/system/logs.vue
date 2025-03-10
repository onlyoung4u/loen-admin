<script lang="ts" setup>
import type { VxeGridProps } from '#/adapter/vxe-table'

import { EllipsisText, Page } from '@vben/common-ui'

import { Tag } from 'ant-design-vue'

import { useVbenVxeGrid } from '#/adapter/vxe-table'
import { logApi } from '#/api/system/log'

const gridOptions: VxeGridProps = {
  columns: [
    { field: 'id', title: 'ID', width: 100 },
    { field: 'description', title: '操作' },
    { title: '操作人', slots: { default: 'operator' } },
    { field: 'method', title: '请求类型', slots: { default: 'method' } },
    { field: 'ip', title: 'IP' },
    { field: 'createdAt', title: '操作时间' },
    { title: '请求参数', width: 200, slots: { default: 'body' } },
    { title: '状态', slots: { default: 'status' } },
  ],
  height: 'auto',
  proxyConfig: {
    ajax: {
      query: async ({ page }) => {
        return await logApi.list({
          page: page.currentPage,
          limit: page.pageSize,
        })
      },
    },
  },
  toolbarConfig: {
    zoom: true,
    custom: true,
    refresh: { code: 'query' },
  },
}

const [Grid] = useVbenVxeGrid({
  gridOptions,
})

const methodColorMap: Record<string, string> = {
  POST: '#108ee9',
  PUT: '#87d068',
  DELETE: '#f50',
}
</script>

<template>
  <Page auto-content-height>
    <Grid table-title="操作日志">
      <template #operator="{ row }">
        <span v-if="row.userId">{{ row.nickname }} / {{ row.userId }}</span>
        <span v-else>未登录</span>
      </template>
      <template #method="{ row }">
        <Tag :color="methodColorMap[row.method] || 'default'">
          {{ row.method }}
        </Tag>
      </template>
      <template #status="{ row }">
        <Tag v-if="row.success" color="success">成功</Tag>
        <Tag v-else color="error">失败</Tag>
      </template>
      <template #body="{ row }">
        <EllipsisText :line="1">{{ row.body }}</EllipsisText>
      </template>
    </Grid>
  </Page>
</template>
