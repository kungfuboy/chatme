<template>
  <div class="content">
    <div class="title">{{inputing ? '对方正在输入……' : '武协内部聊天中'}}</div>
    <div class="input" @click="saySome">{{inputing ? '对方打字中……' : '说点什么吧...'}}</div>
    <div class="talk" v-show="talkShow" @click="talkShow = false">
      <ul>
        <li v-for="(item, index) in options" :key="index" @click="talkData(item)">{{item.value}}</li>
      </ul>
    </div>
    <ul class="chat-list" ref="chat">
      <li v-for="(item, index) in talkArr" :class="item.user ? item.user + ' left' : 'right'" :key="index">
        <span>{{item.value}}</span>
      </li>
      <li class="left press" v-show="inputing">
        <span>
          <i class="dot"></i>
          <i class="dot"></i>
          <i class="dot"></i>
        </span>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
const talkJson: any = require('@/assets/data.js').default

@Component
export default class Main extends Vue {
  // data
  private talkShow: boolean = false
  private talkArr: any = []
  private options: any = []
  private inputing: boolean = false

  private mounted() {
    const key: string = '0000'
    talkJson[key].res.forEach((item: any) => {
      this.talkArr.push(item)
    })
    this.options = talkJson[key].req
  }

  // methods
  private saySome(): void {
    !this.inputing && (this.talkShow = true)
  }

  private talkData(data: any): void {
    this.talkShow = false
    this.inputing = true // 输入状态

    // 提问处理
    this.talkArr.push({
      user: null,
      value: data.value
    })
    this.updateScroll()

    // 回答处理
    this.options = talkJson[data.next].req

    const resData = talkJson[data.next].res
    const len = resData.length - 1
    let i = 0
    const timer = setInterval(() => {
      this.pushData(resData[i])
      if (i >= len) {
        clearInterval(timer)
        this.inputing = false // 非输入状态
      }
      this.updateScroll()
      i++
    }, 1200)
  }

  private pushData(data: any): void {
    this.talkArr.push(data)
  }

  private updateScroll(): void {
    const $dom: any = this.$refs.chat
    const distance = $dom.scrollHeight - $dom.offsetHeight
    const duration = 250
    const startTime = Date.now()

    requestAnimationFrame(function step() {
      const p = Math.min(1, (Date.now() - startTime) / duration)
      $dom.scrollTop = $dom.scrollTop + distance * p
      p < 1 && requestAnimationFrame(step)
    })
  }
}
</script>

<style scoped lang="less">
@themeColor: #2760bd;
.content {
  margin: auto;
  height: 100vh;
  width: 100%;
  max-width: 420px;
  box-sizing: border-box;
  position: relative;
  // background: #7db9de; // 勿忘草
  background: #fff;
  padding: 45px 0;
  overflow: hidden;
  background-image: url('../assets/images/texture.png');
  .chat-list {
    padding: 0;
    font-size: 13px;
    margin: 0;
    height: 100%;
    overflow: auto;
    padding: 0 15px;
    box-sizing: border-box;
    &::-webkit-scrollbar {
      display: none;
    }
    li {
      list-style: none;
      display: flex;
      overflow: auto;
      padding: 18px 0 10px 0;
      position: relative;
      &:before {
        position: absolute;
        top: 0;
        font-size: 10px;
        color: #fffffb;
        z-index: 5;
        display: block;
        width: auto;
      }
      > span {
        padding: 6px 15px;
        max-width: 65%;
        display: inline-block;
        box-shadow: 0 0 5px #94beb1;
        overflow: hidden;
        word-wrap: break-word;
      }
      &.left {
        justify-content: flex-start;
        left: 0;
        span {
          border-radius: 0 20px 20px 20px;
        }
      }
      &.right {
        justify-content: flex-end;
        right: 0;
        &:before {
          content: '红碧';
        }
        span {
          color: #fcfaf2;
          background: #7b90d2; // 红碧
          border-radius: 20px 0 20px 20px;
        }
      }
      &.press {
        &:before {
          content: '夜愿';
        }
        span {
          background: #fffffb; // 胡粉
        }
      }
      &.eagle {
        &:before {
          content: '夜鹰 蓝墨茶';
        }
        span {
          background: #373c38; // 蓝墨茶
          // background: #8e354a; // 桑染
          color: #fffffb;
        }
      }
      &.eleven {
        &:before {
          content: '十一 黄丹';
        }
        span {
          background: #f05e1c; // 黄丹
          color: #fffffb;
        }
      }
      &.dove {
        &:before {
          content: '白鸽 抚子';
        }
        span {
          background: #dc9fb4; // 抚子 + 一斥染 #F4A7B9
          color: #fffffb;
        }
      }
      &.falcon {
        &:before {
          content: '夜隼 锖青磁';
        }
        span {
          background: #86a697; // 锖青磁
          // background: #373c38; // 蓝墨茶
          color: #fffffb;
        }
      }
      // 豹子 #0089A7 新桥
    }
  }
  .title {
    position: absolute;
    background: @themeColor;
    color: #fff;
    height: 40px;
    line-height: 40px;
    padding: 0 10px;
    box-shadow: 0 0 5px #f1f1f1;
    border-radius: 2px;
    text-align: center;
    left: 0;
    right: 0;
    top: 0;
  }
  .talk {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 40px;
    background: rgba(0, 0, 0, 0.2);
    ul {
      position: absolute;
      bottom: 0;
      background: #fff;
      padding: 0;
      margin: 0;
      width: 100%;
      li {
        height: 35px;
        line-height: 35px;
        padding: 0 15px;
        margin: 0;
        list-style: none;
        color: #2760bd;
        display: block;
        position: relative;
        &:after {
          display: block;
          position: absolute;
          bottom: 0;
          content: '';
          bottom: 0;
          height: 1px;
          left: 10px;
          right: 10px;
          background: #e8e8e8;
        }
      }
    }
  }
  .input {
    position: absolute;
    background: #fff;
    height: 40px;
    line-height: 40px;
    padding: 0 10px;
    box-sizing: border-box;
    bottom: 0;
    left: 0;
    right: 0;
    color: #888;
    font-size: 13px;
    box-shadow: 0 0 5px #afe0f8;
    border-radius: 3px;
  }
  .dot {
    position: relative;
    display: inline-block;
    width: 10px;
    height: 10px;
    background: #c7e8f8;
    border-radius: 50%;
    transform-origin: 50% 50%;
    animation: dotZoomIn 1.4s infinite;
    &:nth-child(1) {
      animation-delay: -0.32s;
    }

    &:nth-child(2) {
      animation-delay: -0.16s;
    }

    & + .dot {
      margin-left: 5px;
    }
    @keyframes dotZoomIn {
      from,
      40%,
      80%,
      100% {
        animation-timing-function: ease-in-out;
      }
      from {
        transform: scale(0);
      }
      40% {
        transform: scale(1);
      }
      80% {
        transform: scale(0);
      }
      100% {
        transform: scale(0);
      }
    }
  }
}
</style>
