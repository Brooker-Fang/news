<template>
  <div class="app">

    <scroll-view  class="scro-top" scroll-x="true" >
      <div :class="{'new-nav':!(index == checked),'select-new-nav':index == checked}" v-for="item in newspro" :key="item.ID" @click="getByProgram(index,item.SORT_NAME)">{{item.SORT_NAME}}</div>
    </scroll-view>
    <div class="my-top">
      <img src="../../../static/home/search.png" class="my-icon" @click="gosearch">
      <img src="../../../static/home/person3.png" class="my-icon" @click="gomyself" style="margin-left: 50rpx">
    </div>
    <!--<div class="myicon"></div>-->
  </div>
</template>

<script>
  import {get} from '@/utils/utils'
  import databus from '@/utils/databus'
    export default {
        name: "newtop",

      data() {
          return {
            newspro:[

            ],
            checked:0
          }
      },
      methods: {
        scrolltolower() {
          console.log('scrolltolower')
        },
        scroll(e) {
          console.log('scroll')
          console.log(e)
        },
        gomyself () {
          wx.navigateTo({
            url:'../mypage/main'
          })
        },
        gosearch () {
          wx.navigateTo({
            url:'../search/main'
          })
        },
        async getNewsSortList(){
          var that = this
          const res = await get('/weapp/program')
          that.newspro = res.list ;
          that.checked = 0;
        },
        getByProgram(index,sort) {

          this.checked = index;
          databus.$emit('send',sort)
        }
      },

      mounted () {

        this.getNewsSortList()
      }
    }
</script>

<style scoped>
  * {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
  }
  .app {

    height: 100%;
    font-size: 0;
    -webkit-text-size-adjust:none;


  }
  .new-nav {
    white-space: nowrap;
    display: inline-block;
    width: 100rpx;
    background-color: #97CBFF;

    font-size: 32rpx;
    color:#ffffff;
    vertical-align: top;
    text-align: center;
    line-height: 50rpx;
  }
  .select-new-nav {
    white-space: nowrap;
    display: inline-block;
    width: 100rpx;
    background-color: #ffffff;

    font-size: 32rpx;
    color:#97CBFF;
    vertical-align: top;
    text-align: center;
    line-height: 50rpx;
  }
  .scro-top {
    width: 600rpx;
    height:50rpx;
    white-space: nowrap;
    line-height: 50rpx;
    display: inline-block;
    font-size: 32rpx;

  }
  .my-top {
    display: inline-block;
    width: 154rpx;
    margin-left: -1rpx;
    height: 48rpx;
    border-bottom: 1px solid silver;
    margin: 0;
    font-size: 14rpx;
    position: relative;
    margin-left: -2rpx;

  }
  .my-icon {
    height: 50rpx;
    width:50rpx;
  /* margin-left: 90rpx;*/

  }
</style>
