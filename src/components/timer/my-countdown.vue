<script setup lang="ts">
import countdownSon from './countdown-son.vue'

const props = defineProps({
  nowTimeStr: {
    type: Number,
    default: 0,
  },
  nextTimeStr: {
    type: Number,
    default: 0,
  },
})

const flipperHour = ref<InstanceType<typeof countdownSon>>()

watch(
  () => props.nowTimeStr,
  (newval) => {
    if (newval >= 0) {
      // 初始化数字
      flipperHour.value?.setFront(newval)
    }
  },
)
watch(
  () => props.nextTimeStr,
  (newval) => {
    if (newval >= 0) {
      // 开始翻牌
      flipperHour.value?.flipDown(props.nowTimeStr, newval)
    }
  },
)
// 开始计时
// const timer = ref(null);
// const run = () => {
//   timer.value = setInterval(() => {
//     nowTimeStr.value++;
//     nextTimeStr.value++;
//     flipperHour.value.flipDown(nowTimeStr.value, nextTimeStr.value);
//   }, 1000);
// };
</script>

<template>
  <div class="FlipClock">
    <countdownSon ref="flipperHour" />
  </div>
</template>
