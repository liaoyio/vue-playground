// 孙组件名字 countdownSon
<script setup lang="ts">
// 定义响应式数据
const isFlipping = ref(false);
const flipType = ref("down");
const frontTextFromData = ref<string | number>(0);
const backTextFromData = ref<string | number>(1);

// 接收props
const props = defineProps({
  // 前牌文字
  frontText: {
    type: [Number, String],
    default: 0,
  },
  // 后牌文字
  backText: {
    type: [Number, String],
    default: 1,
  },
  // 翻牌动画时间
  duration: {
    type: Number,
    default: 600,
  },
});

// 计算属性方法
const _textClass = (number: string | number) => {
  return `number${number}`;
};

// 翻牌方法
const _flip = (type: string, front: string | number, back: number) => {
  if (isFlipping.value) return false;
  frontTextFromData.value = front;
  backTextFromData.value = back;
  flipType.value = type;
  isFlipping.value = true;
  setTimeout(() => {
    isFlipping.value = false;
    frontTextFromData.value = back;
  }, props.duration);
};

// 下翻牌方法
const flipDown = (front: string | number, back: number) => {
  _flip("down", front, back);
};

// 上翻牌方法
const flipUp = (front: string | number, back: number) => {
  _flip("up", front, back);
};

// 设置前牌文字方法
const setFront = (text: number) => {
  frontTextFromData.value = text;
};

// 设置后牌文字方法
const setBack = (text: number) => {
  backTextFromData.value = text;
};

// 在组件创建时设置初始值
onMounted(() => {
  frontTextFromData.value = props.frontText;
  backTextFromData.value = props.backText;
});

// 导出方法
defineExpose({
  flipDown,
  flipUp,
  setFront,
  setBack,
});
</script>

<template>
  <div class="M-Flipper" :class="[flipType, { go: isFlipping }]">
    <div class="digital front" :class="_textClass(frontTextFromData)" />
    <div class="digital back" :class="_textClass(backTextFromData)" />
  </div>
</template>

<style scoped>
.M-Flipper {
  display: inline-block;
  position: relative;
  width: 26px;
  height: 30px;
  line-height: 30px;
  border: solid 1px #d6dae6;
  border-radius: 10px;
  background: #fff;
  font-size: 22px;
  color: #4971fe;
  box-shadow: 0 0 6px #d6dae6;
  text-align: center;
}

.M-Flipper .digital:before,
.M-Flipper .digital:after {
  content: "";
  position: absolute;
  left: 0;
  right: 0;

  overflow: hidden;
  box-sizing: border-box;
}

.M-Flipper .digital:before {
  background: linear-gradient(180deg, #f8faff 0%, #e2e8f1 100%);
  top: 0;
  bottom: 50%;
  border-radius: 3px 3px 0 0;
  /* border-bottom: solid 1px #d6dae6; */
}

.M-Flipper .digital:after {
  background: #fff;
  top: 50%;
  bottom: 0;
  border-radius: 0 0 3px 3px;
  line-height: 0;
}

/*向下翻*/
.M-Flipper.down .front:before {
  z-index: 3;
}

.M-Flipper.down .back:after {
  z-index: 2;
  transform-origin: 50% 0%;
  transform: perspective(160px) rotateX(180deg);
}

.M-Flipper.down .front:after,
.M-Flipper.down .back:before {
  z-index: 1;
}

.M-Flipper.down.go .front:before {
  transform-origin: 50% 100%;
  animation: frontFlipDown 0.6s ease-in-out both;
  box-shadow: 0 -2px 6px rgba(255, 255, 255, 0.3);
  backface-visibility: hidden;
}

.M-Flipper.down.go .back:after {
  animation: backFlipDown 0.6s ease-in-out both;
}

/*向上翻*/
.M-Flipper.up .front:after {
  z-index: 3;
}

.M-Flipper.up .back:before {
  z-index: 2;
  transform-origin: 50% 100%;
  transform: perspective(160px) rotateX(-180deg);
}

.M-Flipper.up .front:before,
.M-Flipper.up .back:after {
  z-index: 1;
}

.M-Flipper.up.go .front:after {
  transform-origin: 50% 0;
  animation: frontFlipUp 0.6s ease-in-out both;
  box-shadow: 0 2px 6px rgba(255, 255, 255, 0.3);
  backface-visibility: hidden;
}

.M-Flipper.up.go .back:before {
  animation: backFlipUp 0.6s ease-in-out both;
}

@keyframes frontFlipDown {
  0% {
    transform: perspective(160px) rotateX(0deg);
  }

  100% {
    transform: perspective(160px) rotateX(-180deg);
  }
}

@keyframes backFlipDown {
  0% {
    transform: perspective(160px) rotateX(180deg);
  }

  100% {
    transform: perspective(160px) rotateX(0deg);
  }
}

@keyframes frontFlipUp {
  0% {
    transform: perspective(160px) rotateX(0deg);
  }

  100% {
    transform: perspective(160px) rotateX(180deg);
  }
}

@keyframes backFlipUp {
  0% {
    transform: perspective(160px) rotateX(-180deg);
  }

  100% {
    transform: perspective(160px) rotateX(0deg);
  }
}

.M-Flipper .number0:before,
.M-Flipper .number0:after {
  content: "0";
}

.M-Flipper .number1:before,
.M-Flipper .number1:after {
  content: "1";
}

.M-Flipper .number2:before,
.M-Flipper .number2:after {
  content: "2";
}

.M-Flipper .number3:before,
.M-Flipper .number3:after {
  content: "3";
}

.M-Flipper .number4:before,
.M-Flipper .number4:after {
  content: "4";
}

.M-Flipper .number5:before,
.M-Flipper .number5:after {
  content: "5";
}

.M-Flipper .number6:before,
.M-Flipper .number6:after {
  content: "6";
}

.M-Flipper .number7:before,
.M-Flipper .number7:after {
  content: "7";
}

.M-Flipper .number8:before,
.M-Flipper .number8:after {
  content: "8";
}

.M-Flipper .number9:before,
.M-Flipper .number9:after {
  content: "9";
}
</style>
