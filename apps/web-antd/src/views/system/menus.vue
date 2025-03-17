<script lang="ts" setup>
import type { VxeGridProps } from '#/adapter/vxe-table'

import { IconifyIcon } from '@vben/icons'

import { Button, Tag } from 'ant-design-vue'

import { useVbenVxeGrid } from '#/adapter/vxe-table'
import { menuApi } from '#/api/system/menu'

const gridOptions: VxeGridProps = {
  columns: [
    { field: 'id', title: 'ID', width: 100 },
    { field: 'title', minWidth: 300, title: '名称', treeNode: true },
    { field: 'path', title: '路由地址' },
    { field: 'permission', title: '权限' },
    { field: 'sort', title: '排序' },
    { title: '图标', slots: { default: 'icon' } },
    { title: '菜单类型', slots: { default: 'type' } },
    { title: '系统预置', slots: { default: 'isSystem' } },
  ],
  pagerConfig: {
    enabled: false,
  },
  proxyConfig: {
    ajax: {
      query: async () => {
        const list = await menuApi.list()

        return { list }
      },
    },
  },
  treeConfig: {
    transform: false,
  },
}

const [Grid, gridApi] = useVbenVxeGrid({ gridOptions })

const expandAll = () => {
  gridApi.grid?.setAllTreeExpand(true)
}

const collapseAll = () => {
  gridApi.grid?.setAllTreeExpand(false)
}

const createMenu = () => {
  console.warn('createMenu')
}
</script>

<template>
  <div class="vp-raw h-[300px] w-full">
    <Grid table-title="菜单列表">
      <template #toolbar-tools>
        <Button class="mr-2" @click="expandAll">展开全部</Button>
        <Button class="mr-2" @click="collapseAll">折叠全部</Button>
        <Button type="primary" @click="createMenu">添加菜单</Button>
      </template>
      <template #type="{ row }">
        <Tag v-if="row.hidden" color="#2db7f5">按钮</Tag>
        <Tag v-else color="#87d068">菜单</Tag>
      </template>
      <template #isSystem="{ row }">
        <Tag v-if="row.isSystem" color="success">是</Tag>
        <Tag v-else color="error">否</Tag>
      </template>
      <template #icon="{ row }">
        <div class="flex items-center justify-center">
          <IconifyIcon v-if="row.icon" :icon="row.icon" class="h-5 w-5" />
        </div>
      </template>
    </Grid>
  </div>
</template>
