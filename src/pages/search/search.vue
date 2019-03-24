<template>
    <div class="app">
      <!--搜索区-->
      <div class="top">
        <div class="search-cont">

          <!--<img src="/static/home/search.png" class="img-size"/>-->
          <input type="text" class="sear-input" v-model="searchword" placeholder="请输入关键字" @focus="focusinput(e)"></input>
          <img src="/static/home/search2.png" class="img-size" @click="search()"/>
          <img src="/static/home/error.png" class="img-size" @click="reset()"/>
        </div>
      </div>
      <div v-if="true">
        <!--历史搜索-->
        <div class="history" style="border-bottom: 1px solid silver" v-if="historyword.length">
          <div class="history-top " style="margin:10px auto">
            <span >历史搜索</span>
            <img src="/static/home/garbage.png" class="img-size" style="float: right" @click="deletehisword"/>
          </div>
          <ul class="historylist">
            <li class="hisword" v-for="item in historyword" :key="item.id">{{item.keyword}}</li>
          </ul>
        </div>

        <!--热搜区-->
        <div class="hot-search">
          <div class="history-top " style="margin:10px auto">
            <span >热门搜索</span>

          </div>
          <ul class="historylist ">
            <li class="hisword bg-color" v-for="item in hotword" :key="item.id" @click="add(item.keyword)">{{item.keyword}}</li>


          </ul>
        </div>
        <!--搜索结果区-->
        <div class="new-list"  v-for="item in news" :key="item.NEWS_ID" v-if="news.length">

          <div class="new-title" @click="godetial(item.NEWS_ID)">
            {{item.NEWS_TITLE}}
            <div class="new-author">
              <span>{{item.CREATE_TIME}}</span>
              {{item.AUTHOR}}
              <span >
            <span style="float: right;margin-right: 10px">{{item.VIEW}}</span>
            <img src="../../../static/home/eyeicon.png" class="eyeicon">

          </span>

            </div>
          </div>
          <div class="new-img">
            <img :src="'../../static/NewImg/'+item.PIC_URL" alt="图片不存在" class="img-size3" @click="godetial(item.NEWS_ID)">
            <!--<img src="../../../static/home/3.jpg" alt="图片不存在" class="img-size">-->
          </div>

          <!--<div class="new-au">{{item.AUTHOR}}</div>-->
        </div>
      </div>
    </div>
</template>

<script>
  import utils from '@/utils/utils'
    export default {
      name: "search",
      data () {
        return {
          searchword:"",
          historyword:[],
          hotword:[],
          news:[]
        }
      },
      mounted() {
        //获取历史搜索
        this.getHistoryWord()
        //获取热门搜索
        this.getHotWord()
      },
      onShow() {
        this.searchword = ""
        this.news = []
      },
      computed:{
        time() {
          var that = this
          for(let i=0;i<this.news.length;i++){
            that.news[i].CREATE_TIME = that.news[i].CREATE_TIME.substr(0,10)
          }
        }
      },
      methods : {
        //获取历史搜索
        async getHistoryWord (){
          let that = this
          let user = wx.getStorageSync('userinfo');
          if(user){
            let openId = user.openId
            let res = await utils.post('/weapp/gethistoryword',{'userid':openId})
            if(res.status == '0'){
              that.historyword = res.list
            }
          }else {
            console.log('用户未登录，没有历史搜索记录')
          }
        },
        //获取热门搜索
        async getHotWord () {
          let that = this
          let res = await utils.get('/weapp/gethotword')
          if(res.status == '0'){
            that.hotword = res.list
          }
        },
        //用户搜索
        async search () {
          let that = this;
          if(!that.searchword){
            console.log('搜索内容为空')
            return false
          }
          //用户是否登录
          let user = wx.getStorageSync('userinfo')
          if(user){
            let query = {
              userid:user.openId,
              word:that.searchword
            }
            //已登录，添加历史搜索
            let res = await utils.post('/weapp/historysh',query)
          }
          let result = await utils.get('/weapp/search',{'word':that.searchword})

            console.log(result.list)
            that.news = result.list
            that.getHotWord()
            that.getHistoryWord()

        },

        //将值赋给搜索框
        add(word) {

          this.searchword = word
        },
        //清空搜索框
        reset() {
          this.searchword = ""
          this.news = []
        },
        focusinput (e) {

        },
        //新闻详情页
        godetial (id) {

          wx.navigateTo({
            url:"../newdetail/main?id="+id,
            data:id
          })
        },
        //删除历史搜索
        deletehisword () {
          let that = this
          wx.showModal({
            title: '提示',
            content: '确认删除历史搜索记录？',
            success: function(res) {
              let user = wx.getStorageSync('userinfo')
              if (res.confirm) {
                utils.post('/weapp/delhistory',{'userid':user.openId})
                that.getHistoryWord()
              }
            }
          })
        }
      }
    }
</script>

<style scoped>
  * {
    box-sizing: border-box;
  }
  .top {
    width: 100%;
    height: 2.2em;
    border-bottom: 1px solid silver;
    position: relative;
  }
  .search-cont {
    width: 90%;
    height: 1.8em;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);
    /*background-color: #F0F0F0;*/
    line-height: 1.6em;
    border-radius: 10px;
  }
  .sear-input {
    width: 280px;
    height: 1.4em;
    line-height: 1.4em;
    border-radius: 10px;
    border: 1px solid silver;
    font-size: 12px;
    padding-left: 10px;
    padding-top: 2.5px;
    display: inline-block;
    box-sizing: border-box;
    vertical-align: middle;
  }
  .img-size {
    width: 1.4em;
    height: 1.4em;
    display: inline-block;
    vertical-align: middle;
  }
  .img-size2 {
    width: 1.2em;
    height: 1.2em;
    display: inline-block;
    vertical-align: middle;
  }
  .history-top {
    font-size: 14px;
    height: 1.4em;
    line-height: 1.4em;
    width: 90%;
    margin: 0 auto;
  }
  .historylist {
    width: 95%;
    margin: 0 auto;
    margin-bottom: 10px;
  }
  .hisword {
    width: 30%;
    height: 1.5em;
    line-height: 1.5em;
    margin-left: 3px;
    background-color: #CEFFCE;
    border-radius: 5px;
    text-align: center;
    font-size: 14px;
    display: inline-block;
  }
  .bg-color {
    background-color: #FFFF6F;
  }
  .new-list {
    border-bottom: 1px solid #bfbfbf;
    height: 100px;
    width: 98%;
    padding: 5px 20px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items:center;
    background-color: #fff;
  }

  .new-img {
    display: inline-block;
    height: 80px;
    flex: 1 ;


  }
  .img-size3 {
    width: 80px;
    height: 80px;
    vertical-align: middle;
    margin-left: 5px;
  }
  .new-title {
    display: inline-block;
    height: 80px;
    flex: 2 ;
    font-size: 14px;
    position: relative;
  }
  .new-author {
    color: silver;
    position: absolute;
    top: 65%;
    width: 100%;
    height: 20px;
    line-height: 20px;
    font-size: 12px;

  }
  .eyeicon {
    width: 15px;
    height: 15px;
    float: right;
    margin: 2.5px 5px 0 0;

  }
  .nomore {
    text-align: center;
    color: silver;
    font-size: 16px;
  }
</style>
