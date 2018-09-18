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
@themeColor: #7b90d2;
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
        color: #006284; // 缥
        z-index: 5;
        display: block;
        width: auto;
      }
      > span {
        padding: 6px 15px;
        max-width: 65%;
        display: inline-block;
        box-shadow: 0 1px 5px @themeColor;
        overflow: hidden;
        word-wrap: break-word;
      }
      &.left {
        justify-content: flex-start;
        left: 0;
        span {
          border-radius: 0 15px 15px 15px;
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
          background: @themeColor; // 红碧
          border-radius: 15px 0 15px 15px;
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
          content: '夜鹰 红掛花 & 蓝墨茶';
        }
        span {
          // background: #373c38; // 蓝墨茶
          background: linear-gradient(to right,#4E4F97 10%, #373c38);
          // background: #8e354a; // 桑染
          color: #fffffb;
        }
      }
      &.eleven {
        &:before {
          content: '十一 纁 & 黄丹  ';
        }
        span {
          background: linear-gradient(to right, #ED784A 10%, #f05e1c);
          // background: #f05e1c; // 黄丹
          color: #fffffb;
        }
      }
      &.dove {
        &:before {
          content: '白鸽 退红 & 桃';
        }
        span {
          background: linear-gradient(to right,#F8C3CD 20%, #F596AA); // 退红 + 桃
          color: #fffffb;
        }
      }
      &.falcon {
        &:before {
          content: '夜隼 老竹 & 锖青磁';
        }
        span {
          background: #86a697; // 锖青磁
          background: linear-gradient(to right,#86a697 20%, #6A8372);
          // background: #373c38; // 蓝墨茶
          color: #fffffb;
        }
      }
      &.leopard {
        &:before {
          content: '青豹 水浅葱 & 新桥';
        }
        span {
          background: linear-gradient(to right,#66BAB7 20%, #0089A7);
          color: #fffffb;
        }
      }
      &.sky {
        &:before {
          content: '天啸 苏芳香 & 海老茶';
        }
        span {
          background: linear-gradient(to right,#A96360 20%, #734338);
          color: #fffffb;
        }
      }
      &.fire {
        &:before {
          content: '黑火 海松 & 千岁茶';
        }
        span {
          background: linear-gradient(to right,#5B622E 20%, #4D5139);
          color: #fffffb;
        }
      }
      &.swallow {
        &:before {
          content: '夜燕 熨斗目花 & 缥';
        }
        span {
          background: linear-gradient(to right,#2B5F75 20%, #006284);
          color: #fffffb;
        }
      }
      &.wolf {
        &:before {
          content: '小狼 银鼠 & 灰';
        }
        span {
          background: linear-gradient(to right,#91989F 20%, #828282);
          color: #fffffb;
        }
      }
    }
  }
  .title {
    position: absolute;
    background: @themeColor;
    color: #fff;
    height: 45px;
    line-height: 45px;
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
    background: rgba(0, 0, 0, 0.4);
    z-index: 5;
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
    box-shadow: 0 0 20px @themeColor;
    border-top-left-radius: 4px;
    border-top-right-radius: 4px;
  }
  .dot {
    position: relative;
    display: inline-block;
    width: 10px;
    height: 10px;
    background: @themeColor;
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
