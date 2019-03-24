<script>
  import {get} from './utils/utils'
  import qcloud from 'wafer2-client-sdk/index'
  import config from './utils/config'
export default {
  async created () {

    console.log('小程序启动')

    wx.setBackgroundColor({
      backgroundColor: 'deepskyblue', // 窗口的背景色为白色
    })
  }
}
</script>

<style>
.container {
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 200rpx 0;
  box-sizing: border-box;

}
/* this rule will be remove */
* {
  transition: width 2s;
  -moz-transition: width 2s;
  -webkit-transition: width 2s;
  -o-transition: width 2s;
  box-sizing: border-box;
}
</style>
