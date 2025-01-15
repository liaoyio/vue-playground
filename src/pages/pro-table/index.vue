<script setup>
import ProTable from '@/components/pro-table/pro-table.vue'
import { reactive, ref } from 'vue'
import 'element-plus/theme-chalk/el-select.css'
import 'element-plus/theme-chalk/el-cascader-panel.css'
import 'element-plus/theme-chalk/el-date-picker.css'

// 解决后台管理系统痛点：Vue 3 下的可配置表格组件实践
// https://juejin.cn/post/7355319119296479284

const tableData = ref([
  { name: '张三', address: '广东省惠州市博罗县' },
  { name: '2', address: '广东省惠州市惠城区' },
  { name: '3', address: '广东省惠州市龙门县' },
])

function tableApi(params) {
  console.log(params)
  return new Promise((resolve) => {
    setTimeout(() => {
      // 无分页
      // resolve({ success: true, data: tableData });
      // 存在分页
      resolve({
        success: true,
        data: tableData.value,
      })
    }, 200)
  })
}

const tableOptions = reactive({
  api: tableApi,
  requestParams: {
    // pid: 12,
  },
  tableProps: {
    'onSelection-change': (v) => {
      console.log(v)
    },
  },
})

const statusOptions = ref([
  { label: '全部', value: '0' },
  { label: '正常', value: '1' },
  { label: '停用', value: '2' },
])

const cascaderOptions = ref([
  {
    value: 'gd',
    label: '广东省',
    children: [
      {
        value: 'hz',
        label: '惠州市',
      },
    ],
  },
])

const tableColumns = [
  {
    prop: 'selection',
    type: 'selection',
    width: 50,
  },
  {
    prop: 'status',
    label: '状态',
    formatter: () => '正常',
    search: true,
    searchDefaultValue: '0',
    searchType: 'select',
    searchProps: {
      placeholder: '请选择',
      options: statusOptions.value,
    },
  },
  {
    prop: 'name',
    label: '姓名',
    formatter: row => row.name,
    search: true,
    searchProps: {
      placeholder: '请输入',
    },
  },
  {
    prop: 'age',
    label: '年龄',
    formatter: () => '12',
  },
  {
    prop: 'created_at',
    label: '创建时间',
    formatter: () => '2024-03-25 12:00:00',
    search: true,
    searchType: 'datePicker',
    searchProps: {
      placeholder: '请选择',
      type: 'daterange',
      startPlaceholder: '开始时间',
      endPlaceholder: '结束时间',
      valueFormat: 'YYYY-MM-DD',
    },
  },
  {
    prop: 'address',
    label: '地址',
    hide: true,
    search: true,
    searchType: 'cascader',
    searchProps: {
      placeholder: '请选择',
      options: cascaderOptions.value,
    },
  },
  {
    prop: 'hide',
    label: '隐藏的列',
    hide: true,
  },
  { prop: 'operations', label: '操作', width: 200, align: 'center' },
]
</script>

<template>
  <div class="m-10">
    <div class="pb-5">
      <router-link to="/">
        首页
      </router-link>
    </div>
    <ProTable :options="tableOptions" :columns="tableColumns">
      <template #tools>
        <el-space alignment="normal">
          <el-button type="primary">
            新增
          </el-button>
          <el-button>导出</el-button>
        </el-space>
      </template>

      <template #name-default="{ row }">
        {{ row?.name }}
      </template>

      <template #name-header>
        自定义表头
      </template>

      <template #operations-default>
        <el-space>
          <el-button type="danger" plain size="small">
            删除
          </el-button>
          <el-button type="primary" size="small">
            编辑
          </el-button>
        </el-space>
      </template>
    </ProTable>
  </div>
</template>

<style scoped lang="scss">
.container {
  margin: 40px;
}

.el-form--inline {
  .el-form-item {
    .el-input,
    .el-cascader,
    .el-select,
    .el-autocomplete {
      width: 240px;
    }
  }
}
</style>
