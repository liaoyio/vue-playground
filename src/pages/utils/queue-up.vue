<script setup lang="ts">
// 有一个异步函数，如果这个函数在执行，下一次执行排队，后面所有函数都排队
function createAsyncFn(fn: (...args: any) => Promise<any>) {
  let running = false
  const queue: (() => Promise<void>)[] = []

  return function asyncFn(...args: any) {
    return new Promise((reslove, reject) => {
      queue.push(() =>
        fn(...args)
          .then(reslove, reject)
          .finally(() => {
            running = false
            const _fn = queue.shift()
            _fn && _fn()
          }),
      )
      if (running) {
        return
      }
      running = true
      const _fn = queue.shift()
      _fn && _fn()
    })
  }
}

/* function _createAsyncFn<T = unknown, Args extends any[] = any[]>(
  fn: (...args: Args) => Promise<T>,
): (...args: Args) => Promise<T> {
  let lastPromise = Promise.resolve() as Promise<T>;
  return (...args: Args) => {
    lastPromise = lastPromise.then(
      () => fn(...args),
      () => fn(...args),
    );
    return lastPromise;
  };
} */

const fn = createAsyncFn(async (num: number) => {
  console.log('start', num)
  await new Promise(reslove => setTimeout(reslove, 3000))
  console.log('end', num)
})

function handler() {
  fn(1)
  fn(2)
  fn(3)
}
</script>

<template>
  <div>
    <ElButton type="primary" @click="handler">
      点击1
    </ElButton>
  </div>
</template>
