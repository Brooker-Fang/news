<template>
  <div class="app">
    <div class="new-list"  v-for="item in news" :key="item.NEWS_ID">

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
       <img :src="'../../static/NewImg/'+item.PIC_URL" alt="图片不存在" class="img-size" @click="godetial(item.NEWS_ID)">
        <!--<img src="../../../static/home/3.jpg" alt="图片不存在" class="img-size">-->
      </div>

      <!--<div class="new-au">{{item.AUTHOR}}</div>-->
    </div>
    <div class="nomore"  v-if="!more"><span>没有更多了</span></div>
  </div>
</template>

<script>
  import {get} from '@/utils/utils'
  import databus from '@/utils/databus'
    export default {
      name: "newlist",
      data () {
          return {
            news:[],
            pagesize:6,
            pagenum:0,
            more:true,//是否还要更多
            sortname:"推荐"
          }
      },
      onShow(){
        this.getNewsList(true,this.sortname);
      },
      mounted () {
        var that = this
        that.getNewsList(true,this.sortname);
        databus.$on('send',function(sort){
          that.more = true;
          that.pagenum = 0;
          that.sortname = sort
          that.getNewsList(true,that.sortname);
        })

      },
      //
      async onPullDownRefresh() {
        // 显示加载图标
        wx.showLoading({
          title: '玩命加载中',
        })
        //导航条加载动画
        wx.showNavigationBarLoading();
        this.pagenum = 0 ;
        this.getNewsList(true,this.sortname);
        wx.stopPullDownRefresh();// 停止下拉刷新
        wx.hideNavigationBarLoading();
        // 隐藏加载框
        wx.hideLoading();

      },
      //上拉加载
      async onReachBottom () {
        var that = this;

        if(that.more){
          that.pagenum = that.pagenum+1
          that.getNewsList(false,that.sortname);
        }else {
          console.log('没有更多了')
        }

      },
      computed: {
        time() {
          var that = this
          for(let i=0;i<this.news.length;i++){
            that.news[i].CREATE_TIME = that.news[i].CREATE_TIME.substr(0,10)
          }
        }
      },
      methods: {
        godetial (id) {

          wx.navigateTo({
            url:"../newdetail/main?id="+id,
            data:id
          })
        },
        async getNewsList(init,sortname) {

          var that = this ;

          const res = await get('/weapp/news',
            { pagenum:that.pagenum,
              pagesize:that.pagesize,
              sortname:sortname
            })

          //是否还有更多
          if(res.list.length>=0 && res.list.length<that.pagesize) {
            that.more = false;
          }
          //是否初始化
          if(init){

            that.news = res.list ;
          }else {
            that.news = that.news.concat(res.list)
          }

        }
      }

    }
</script>

<style scoped>
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
  .img-size {
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
