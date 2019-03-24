<template>

  <div >
    <newtop></newtop>
    <newlist></newlist>

  </div>
</template>

<script>
import card from '@/components/card'
import newtop from '@/pages/newtop/newtop'
import newlist from '@/pages/newlist/newlist'
import qcloud from 'wafer2-client-sdk'
import config from '@/utils/config'
import utils from '@/utils/utils'

export default {
  data () {
    return {
      motto: 'Hello World',
      userInfo: {
        avatarUrl: "../../../static/home/3.jpg",
        nickName:"点击登录"
      }
    }
  },
  mounted () {
    // 一进来看看用户是否授权过
    this.getSetting()

  },
  components: {
    card,newtop,newlist
  },

  methods: {
    bindViewTap () {
      const url = '../logs/main'
      wx.navigateTo({ url })
    },
    getSetting(){
      wx.getSetting({
        success: function(res){
          if (res.authSetting['scope.userInfo']) {
            wx.getUserInfo({
              success: function(res) {
                console.log(res.userInfo)
                //用户已经授权过
                console.log('用户已经授权过')
              }
            })
          }else{
            console.log('用户还未授权过')
          }
        }
      })
    },

  },

  created () {
    // 调用应用实例的方法获取全局数据
    //this.getUserInfo()
  }
}
</script>

<style scoped>

  .app {
    broder-style:1px solid black
  }
</style>
