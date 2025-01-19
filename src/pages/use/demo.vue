<script lang="ts" setup>
import Child from '@/components/child.vue'
import { Button, InputNumber, Table, TableSummary, TableSummaryCell, TableSummaryRow } from 'ant-design-vue'
import { h, ref } from 'vue'

const data = ref([
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
  { title: '商品名称', dataIndex: 'productName', key: 'productName', width: 140 },
  { title: '规格', dataIndex: 'specification', key: 'specification', width: 140 },
  { title: '配送商', dataIndex: 'supplier', key: 'supplier', width: 140 },
  { title: '售价', dataIndex: 'sellingPrice', key: 'sellingPrice', editable: true, width: 120 },
  { title: '数量', dataIndex: 'quantity', key: 'quantity', editable: true, width: 120 },
  { title: '对冲数', dataIndex: 'hedgeQuantity', key: 'hedgeQuantity', editable: true, width: 120 },
  { title: '优惠规则金额', dataIndex: 'discountAmount', key: 'discountAmount', editable: true, width: 140 },
  { title: '优惠券', dataIndex: 'coupon', key: 'coupon', editable: true, width: 120 },
  { title: '金币使用数', dataIndex: 'coinUsage', key: 'coinUsage', editable: true, width: 120 },
  { title: '返利金币数', dataIndex: 'rebateCoin', key: 'rebateCoin', width: 120 },
  { title: '金币对冲数', dataIndex: 'coinHedge', key: 'coinHedge', width: 120 },
  { title: '商品实付', dataIndex: 'actualPayment', key: 'actualPayment', width: 120 },
  { title: '采购原价', dataIndex: 'purchaseOriginalPrice', key: 'purchaseOriginalPrice', editable: true, width: 120 },
  { title: '采购折扣', dataIndex: 'purchaseDiscount', key: 'purchaseDiscount', editable: true, width: 120 },
  { title: '采购折后总价', dataIndex: 'purchaseFinalPrice', key: 'purchaseFinalPrice', width: 140 },
  { title: '操作', dataIndex: 'action', key: 'action', width: 90 },
]

const summary_columns = [
  '合计',
  '',
  '',
  '',
  'totalQuantity',
  'totalHedgeQuantity',
  '',
  'totalCoupon',
  '',
  '',
  'totalCoinHedge',
  'totalActualPayment',
  '',
  '',
  'totalPurchaseFinalPrice',
  '',
]

function isEditable(dataIndex: string) {
  return columns.some(col => col.dataIndex === dataIndex && col.editable)
}

const totals = computed(() => {
  let [totalQuantity, totalHedgeQuantity, totalCoupon, totalCoinHedge, totalActualPayment, totalPurchaseFinalPrice] = [0, 0, 0, 0, 0, 0]

  data.value.forEach((col) => {
    const { quantity, hedgeQuantity, coupon, coinHedge, actualPayment, purchaseFinalPrice } = col
    totalQuantity += quantity
    totalHedgeQuantity += hedgeQuantity
    totalCoupon += coupon
    totalCoinHedge += coinHedge
    totalActualPayment += actualPayment
    totalPurchaseFinalPrice += purchaseFinalPrice
  })

  return { totalQuantity, totalHedgeQuantity, totalCoupon, totalCoinHedge, totalActualPayment, totalPurchaseFinalPrice }
})

function deleteRow(index: number) {
  data.value.splice(index, 1)
}

function summarys(data: any) {
  console.log('data', data)
  return () => h(Child, { childProps: { name: 'liaoyi' } })
}
</script>

<template>
  <div class="mx-auto w-80% p-10">
    <Table
      :columns="columns"
      :data-source="data"
      bordered

      :pagination="false"
    >
      <template #bodyCell="{ column, record, index }">
        <template v-if="column.dataIndex === 'action'">
          <Button
            type="link"
            icon="delete"
            @click="deleteRow(index)"
          />
        </template>
        <template v-else-if="isEditable(column.dataIndex as string)">
          <InputNumber
            v-model:value="record[column.dataIndex as string]"
            :step="0.01"
            style="width: 100%;"
          />
        </template>
        <template v-else>
          <span>{{ record[column.dataIndex as string] }}</span>
        </template>
      </template>

      <template #summary>
        <TableSummary :columns="summary_columns" :data="totals" />
      </template>
    </Table>

    {{ totals }}
  </div>
</template>

<style>

</style>
