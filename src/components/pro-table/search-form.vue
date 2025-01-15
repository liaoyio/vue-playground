<script setup>
import {
  ElCascader,
  ElDatePicker,
  ElForm,
  ElInput,
  ElSelect,
} from 'element-plus'
import { defineEmits, defineProps, ref, watch } from 'vue'

const props = defineProps({
  columns: {
    type: Array,
    required: false,
  },
  formValue: {
    type: Object,
    default: () => ({
      tableProps: {},
    }),
  },
})

const emit = defineEmits(['updateFormValue'])

const comMap = {
  input: ElInput,
  select: ElSelect,
  datePicker: ElDatePicker,
  cascader: ElCascader,
}

const form = ref({})

watch(
  [() => props.formValue],
  () => {
    form.value = props.formValue
  },
  { immediate: true },
)

// 重置查询表单
function handleResetSearchForm() {
  const map = {}
  for (const item of props.columns) {
    map[item.prop] = item.searchDefaultValue
  }
  Object.keys(form.value).forEach((key) => {
    form.value[key] = map[key]
  })
  handleSearch()
}

// 点击搜索
function handleSearch() {
  const params = {}
  // 过滤空字符串
  Object.keys(form.value).forEach((key) => {
    params[key] = form.value[key]
  })
  emit('updateFormValue', params)
}
</script>

<template>
  <ElForm :model="form" label-width="auto" label-suffix=":" class="pro-form">
    <el-row :gutter="20">
      <el-col v-for="item in columns" :key="item.prop" :span="6">
        <el-form-item :label="item.label" :prop="item.prop">
          <component
            :is="comMap[item.searchType || 'input']" v-bind="item.searchProps" v-model="form[item.prop]"
            style="width: 100%" clearable
          >
            <template v-if="item.searchType === 'select'">
              <el-option
                v-for="option in item.searchProps.options" :key="option.value" :value="option.value"
                :label="option.label"
              />
            </template>

            <template v-if="item.searchType === 'cascader'" #default="{ data }">
              <span>{{ data.label }}</span>
            </template>
          </component>
        </el-form-item>
      </el-col>
    </el-row>

    <div style="margin-top: 20px; text-align: center">
      <el-space>
        <el-button @click="handleResetSearchForm">
          重置
        </el-button>
        <el-button type="primary" @click="handleSearch">
          搜索
        </el-button>
      </el-space>
    </div>
  </ElForm>
</template>
