<script setup>
import {
  computed,
  defineExpose,
  defineProps,
  onMounted,
  reactive,
  ref,
} from 'vue'
import SearchForm from './search-form.vue'
import { useUrlState } from './use-url-state'

const props = defineProps({
  columns: {
    type: Array,
    required: false,
  },
  options: {
    type: Object,
    default: () => ({
      tableProps: {},
    }),
  },
})

const loading = ref(false)

const tableData = ref([])

const formValue = ref({})

const [state, setState] = useUrlState()

const pagination = reactive({
  page: 1,
  pageSize: 10,
  total: 0,
})

// 过滤隐藏的列
const visibleColumns = computed(() => {
  return props.columns.filter(column => !column.hide)
})

// 查询的列
const searchColumns = computed(() => {
  return props.columns.filter(column => column.search)
})

// 获取请求参数
function getRequestParams() {
  const { page, pageSize } = pagination
  const { options } = props
  // 合并分页参数和自定义参数
  return Object.assign(
    { page, pageSize },
    formValue.value,
    options.requestParams,
  )
}

// 获取表格数据
async function getTableData() {
  const { options } = props
  const params = getRequestParams()

  setState(params)

  // 过滤 undefined和null
  Object.keys(params).forEach((key) => {
    if (typeof params[key] === 'undefined' || params[key] == null) {
      delete params[key]
    }
  })

  if (options.data) {
    // 优先接收传入的data
    tableData.value = options.data
    pagination.total = options.data.length
  }
  else if (options.api) {
    // 请求传入的api
    loading.value = true
    const { success, data } = await options.api(params)
    loading.value = false
    if (!success) {
      return
    }
    handleResponseData(data)
  }
}

// 处理请求数据
function handleResponseData(data) {
  if ('pagination' in data) {
    // 存在分页信息
    tableData.value = data.list
    pagination.total = data.pagination.total
  }
  else {
    // 不存在分页信息的情况
    tableData.value = data
    pagination.total = data.length
  }
}

onMounted(() => {
  setFormDefaultValue()
  if (state.value?.page) {
    pagination.page = +state.value?.page
  }
  if (state.value?.pageSize) {
    pagination.pageSize = +state.value?.pageSize
  }
  getTableData()
})

// 切换分页
function handlePaginationChange() {
  getTableData()
}

// 设置表单默认值
function setFormDefaultValue() {
  const target = {}
  searchColumns.value.forEach((item) => {
    let value = item.searchDefaultValue
    if (state.value[item.prop]) {
      value = state.value[item.prop]
    }
    target[item.prop] = value
  })
  formValue.value = target
}

function updateFormValue(value) {
  formValue.value = value
  getTableData()
}

function refresh() {
  getTableData()
}

defineExpose({
  refresh,
})
</script>

<template>
  <div v-loading="loading">
    <SearchForm
      v-if="searchColumns.length" :columns="searchColumns" :form-value="formValue" style="margin-bottom: 20px"
      @update-form-value="updateFormValue"
    />
    <div v-if="$slots.tools" style="margin-bottom: 20px">
      <slot name="tools" />
    </div>
    <el-table :data="tableData" stripe border v-bind="options.tableProps">
      <el-table-column v-for="column in visibleColumns" :key="column.prop" v-bind="column">
        <!-- 自定义插槽渲染 -->
        <template v-if="$slots[`${column.prop}-default`]" #default="scope">
          <slot :name="`${column.prop}-default`" v-bind="scope" />
        </template>

        <!-- 自定表头插槽渲染 -->
        <template v-if="$slots[`${column.prop}-header`]" #header="scope">
          <slot :name="`${column.prop}-header`" v-bind="scope" />
        </template>
      </el-table-column>
    </el-table>

    <el-pagination
      v-model:current-page="pagination.page" v-model:page-size="pagination.pageSize" background
      style="margin-top: 20px" :total="pagination.total" :page-sizes="[10, 20, 30, 40, 50]"
      layout="prev, pager, next,  sizes, jumper, total" v-bind="props.options.paginationProps"
      @change="handlePaginationChange"
    />
  </div>
</template>
