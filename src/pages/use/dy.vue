<script setup lang="ts">
import { InputNumber, Table } from 'ant-design-vue'
import { h } from 'vue'

const dataSource = ref([
  {
    key: '1',
    productName: '(dhe)怡宝水2.08L',
    specification: '(dhe)pet2.08L*8',
    supplier: 'xq东霸非自营',
    sellingPrice: 18.8,
    quantity: 10,
    hedgeQuantity: 0,
    discountAmount: 0,
    coupon: 0,
    coinUsage: 0,
    rebateCoin: 10,
    coinHedge: 10,
    actualPayment: 0,
    purchaseOriginalPrice: 18,
    purchaseDiscount: 0.95,
    purchaseFinalPrice: 0,
  },
])

const columns = [
  {
    title: 'coinHedge',
    dataIndex: 'coinHedge',
    customRender: ({ record, index }: any) => {
      const InputStyle = {}
      return h(InputNumber, {
        placeholder: '请输入',
        min: 0,
        precision: 0,
        style: InputStyle,
        value: record.coinHedge,
        onChange: (e) => {
          record.changeActQty = e
          // 直接更新数组中的元素
          dataSource.value[index] = { ...record }
        },
      })
    },
  },
]

// 使用
</script>

<template>
  <div>
    <Table
      stripe
      :pagination="false"
      :columns="columns"
      :data-source="dataSource"
      :scroll="{ x: 1000 }"
    />
  </div>
</template>

<style lang="scss"></style>
