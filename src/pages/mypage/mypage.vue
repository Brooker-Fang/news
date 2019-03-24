<template>
    <div class="app">
      <div class="container-top">
        <div class="user" v-if="!isload">
          <img src="../../../static/home/nouser.png">
          <button class="username" open-type="getUserInfo" @getuserinfo="bindgetUserInfo" @click="canUse">点击登录</button>
        </div>
        <div class="user" v-if="isload">
          <img :src="userinfo.avatarUrl">
          <div class="username">{{userinfo.nickName}}</div>
        </div>
      </div>
      <button @click="pay">点击支付</button>
      <video src="https://milktea.oss-cn-beijing.aliyuncs.com/sp.mp4?Expires=1537931089&OSSAccessKeyId=TMP.AQH8OC9adyak4VTkeHCx5YHsR1nyT6-BEvmtiB0neyqMqqwdr73MopuQggkuMC4CFQCjXpEa79xSX8hReo5_IvBC2JND6AIVALBOt-8L0n8HkCViiCORGdOGXk50&Signature=6VhH2b1IQFwSwry0%2BO0VpRHHZJQ%3D" binderror="videoErrorCallback"></video>
    </div>
</template>

<script>
  import config from '@/utils/config'
  import utils from '@/utils/utils'
  import qcloud from 'wafer2-client-sdk'
    export default {
      name: "mypage",
      data () {
        return {
          userinfo:{
            avatarUrl: "",
            nickName:""
          },
          isload:false
        }
      },
      created () {

      },
      mounted () {
        var that = this ;
        var userinfo =  wx.getStorageSync("userinfo");
        if(userinfo){
          that.isload = true;
        }
      },
      methods: {
        canUse () {
          console.log('click 先触发')
          if(wx.canIUse('button.open-type.getUserInfo')){
            //版本可用
          }else {
            console.log('版本不支持，请先升级微信版本')
            utils.showMsg('版本不支持，请先升级微信版本')
            return false
          }
        },
        bindgetUserInfo () {
          var that = this ;

          qcloud.setLoginUrl(config.loginUrl)
          qcloud.login({
            success (user) {
              utils.showMsg('登录成功','/static/home/success.png')
              console.log(user)
              wx.setStorageSync('userinfo',user)

              that.userinfo = user;
              that.isload = true ;
            },
            fail (err) {
              console.log(err)
              utils.showMsg('登录失败')
            }
          })
        },
        pay () {
          console.log(1)
          let obj = {
            openid: wx.getStorageSync('userinfo').openId
          }
          wx.requestPayment(obj)
        }
      },

    }
</script>

<style scoped>
  .container-top {
    height: 200px;
    width: 100%;
    background-color:#97CBFF;
    position: relative;
  }
  .user {
    position: absolute;
    left: 50%;
    top: 50%;
    -webkit-transform: translate(-50%,-50%);
    -moz-transform: translate(-50%,-50%);
    -ms-transform: translate(-50%,-50%);
    -o-transform: translate(-50%,-50%);
    transform: translate(-50%,-50%);
  }
  .user img {
    height: 100px;
    width: 100px;
    border-radius: 50%;
  }
  .user .username {
    text-align: center;
    width: 100%;
    color: #fff;
    background-color: #97CBFF;
    border:0px solid black;
  }
  button::after{
    border: none;
  }
</style>
