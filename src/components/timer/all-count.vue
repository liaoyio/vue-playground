<script setup lang="ts">
import dayjs from 'dayjs'
import MyCountdown from './my-countdown.vue'

// 动态倒计时翻牌器丝滑流畅，可以支持任何倒计时以及当前时间显示
// see: https://juejin.cn/post/7455525119889440820

const beforeTime = ref('2026-1-04 15:12:10')

type MapUnionToType<U extends string, T> = { [K in U]: T }

// 使用示例
type UnionKeys =
  | 'oldDays'
  | 'days'
  | 'oldHours'
  | 'hours'
  | 'oldMinutes'
  | 'minutes'
  | 'oldSeconds'
  | 'seconds'

type MyType = MapUnionToType<UnionKeys, string[]>

function initMys(dateStr: string) {
  // 获取当前时间
  const now = dayjs().valueOf()
  // 将传入的字符串转换为dayjs对象
  const target = dayjs(dateStr).valueOf()
  const oldDiff = target - now
  const diff = target - now - 1000
  const oldDays = Math.floor(oldDiff / (1000 * 60 * 60 * 24))
  const days = Math.floor(diff / (1000 * 60 * 60 * 24))
  const oldHours = Math.floor(
    (oldDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
  )
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
  const oldMinutes = Math.floor((oldDiff % (1000 * 60 * 60)) / (1000 * 60))
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
  const oldSeconds = Math.floor((oldDiff % (1000 * 60)) / 1000)
  const seconds = Math.floor((diff % (1000 * 60)) / 1000)
  return {
    oldDays: pasdValue(oldDays),
    days: pasdValue(days),
    oldHours: pasdValue(oldHours),
    hours: pasdValue(hours),
    oldMinutes: pasdValue(oldMinutes),
    minutes: pasdValue(minutes),
    oldSeconds: pasdValue(oldSeconds),
    seconds: pasdValue(seconds),
  }
}
function pasdValue(values: number) {
  if (values <= 0) {
    return ['0', '0']
  }
  if (values <= 9) {
    return `0${values}`.split('')
  }
  if (values > 9) {
    return String(values).split('')
  }
}

const timeArray = ref<MyType>({
  oldDays: ['0', '0'],
  days: ['0', '0'],
  oldHours: ['0', '0'],
  hours: ['0', '0'],
  oldMinutes: ['0', '0'],
  minutes: ['0', '0'],
  oldSeconds: ['0', '0'],
  seconds: ['0', '0'],
})

const timeEnd = ref(false)
const timer = ref<NodeJS.Timeout | null>(null)

function timerToInit() {
  timer.value = setInterval(() => {
    timeArray.value = initMys(beforeTime.value) as MyType
    if (
      timeArray.value?.days?.[0] == '0'
      && timeArray.value?.days?.[1] == '0'
      && timeArray.value?.hours?.[0] == '0'
      && timeArray.value?.hours?.[1] == '0'
      && timeArray.value?.minutes?.[0] == '0'
      && timeArray.value?.minutes?.[1] == '0'
      && timeArray.value?.seconds?.[0] == '0'
      && timeArray.value?.seconds?.[1] == '0'
    ) {
      timeEnd.value = true
      // @ts-expect-error
      clearInterval(timer.value)
    }
  }, 1000)
}

onMounted(() => {
  timerToInit()
})
</script>

<template>
  <div>
    <div v-if="timeEnd">
      已到申报截止时间！
    </div>
    <div v-else class="flex items-center">
      <div class="pl-10px text-14px color-#303136 fw-600">
        距申报截止时间：
      </div>
      <div class="ml-10px flex items-center">
        <div v-if="timeArray.days?.length && timeArray.days?.length > 0" class="flex">
          <div v-for="(_, i) in timeArray.days.length" :key="i">
            <MyCountdown :now-time-str="Number(timeArray.oldDays[i])" :next-time-str="Number(timeArray.days[i])" />
          </div>
        </div>
        <div class="pl-10px text-14px color-#303136 fw-600">
          天
        </div>
      </div>
      <div class="ml-10px flex items-center">
        <div v-if="timeArray.hours?.length && timeArray.hours?.length > 0" class="flex">
          <div v-for="(_, i) in timeArray.hours.length" :key="i">
            <MyCountdown :now-time-str="Number(timeArray.oldHours[i])" :next-time-str="Number(timeArray.hours[i])" />
          </div>
        </div>
        <div class="pl-10px text-14px color-#303136 fw-600">
          时
        </div>
      </div>
      <div class="ml-10px flex items-center">
        <div v-if="timeArray.minutes?.length && timeArray.minutes?.length > 0" class="flex">
          <div v-for="(_, i) in timeArray.minutes.length" :key="i">
            <MyCountdown
              :now-time-str="Number(timeArray.oldMinutes[i])"
              :next-time-str="Number(timeArray.minutes[i])"
            />
          </div>
        </div>
        <div class="pl-10px text-14px color-#303136 fw-600">
          分
        </div>
      </div>
      <div class="ml-10px flex items-center">
        <div v-if="timeArray.seconds?.length && timeArray.seconds?.length > 0" class="flex">
          <div v-for="(_, i) in timeArray.seconds.length" :key="i">
            <MyCountdown
              :now-time-str="Number(timeArray.oldSeconds[i])"
              :next-time-str="Number(timeArray.seconds[i])"
            />
          </div>
        </div>
        <div class="pl-10px text-14px color-#303136 fw-600">
          秒
        </div>
      </div>
    </div>
  </div>
</template>
