<template>
  <div class="content">
    <div class="title">{{inputing ? '对方正在输入……' : '和夜鹰聊天中'}}</div>
    <div class="input" @click="saySome">{{inputing ? '夜鹰打字中……' : '说点什么吧...'}}</div>
    <div class="talk" v-show="talkShow">
      <ul>
        <li v-for="(item, index) in options" :key="index" @click="talkData(item)">{{item}}</li>
      </ul>
    </div>
    <ul class="chat-list" ref="chat">
      <li v-for="(item, index) in talkArr" :key="index">
        <span :class="item.type">{{item.value}}</span>
      </li>
      <li v-show="inputing">
        <span class="answer">
          <i class="dot"></i>
          <i class="dot"></i>
          <i class="dot"></i>
        </span>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import talkJson from '@/assets/data.js'

@Component
export default class Main extends Vue {
  // data
  private talkShow = false
  private talkArr = []
  private options = []
  private inputing = false

  private mounted() {
    this.talkArr.push({
      type: 'answer',
      value: '你好，我叫夜鹰！'
    })
    const key = this.talkArr[this.talkArr.length - 1].value
    this.options = talkJson[key].select
  }

  // methods
  private saySome(): void {
    !this.inputing && (this.talkShow = true)
  }

  private talkData(data: string): void {
    this.updateScroll()
    this.talkShow = false
    this.inputing = true    // 输入状态

    this.talkArr.push({ 
      type: 'question',
      value: data 
    })
    this.options = talkJson[data].select

    const ansData = talkJson[data].answer
    const len = ansData.length - 1
    let i = 0
    const timer = setInterval(() => {
      if(i === len) {
        clearInterval(timer)
        this.inputing = false   // 非输入状态
      }
      this.pushData(ansData[i])
      this.updateScroll()
      i++
    }, 1200)
  }

  private pushData(data): void {
    this.talkArr.push({ 
      type: 'answer',
      value: data 
    })
  }

  private updateScroll(): void {
    this.$refs.chat.scrollTop = this.$refs.chat.scrollHeight
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
  background: #c7e8f8;
  padding: 45px 0;
  overflow: hidden;
  .chat-list {
    padding: 0;
    font-size: 13px;
    margin: 0;
    height: 100%;
    overflow: auto;
    padding: 15px;
    box-sizing: border-box;
    li {
      list-style: none;
      padding: 0;
      display: block;
      overflow: auto;
      clear: both;
      span {
        padding: 6px 15px;
        max-width: 65%;
        display: inline-block;
        box-shadow: 0 0 4px #94beb1;
        overflow: hidden;
        word-wrap: break-word;
        &.answer {
        background: #fff;
        border-radius: 0 20px 20px 20px;
        }
        &.question {
          float: right;
          text-align: right;
          background: @themeColor;
          color: #fff;
          border-radius: 20px 0 20px 20px;
        }
      }
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
    background: rgba(0,0,0,0.2);
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
      from, 40%, 80%, 100% {
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
