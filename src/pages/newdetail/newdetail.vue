<template>
  <div class="app">
    <div class="new-au">
      <span style="float: left">作者:{{newinfo.AUTHOR}}</span>
      <span style="margin-left: 10px">{{newinfo.CREATE_TIME}}</span>
      <span >
        <span style="float: right;">{{newinfo.VIEW}}</span>
            <img src="../../../static/home/eyeicon.png" class="eyeicon">

          </span>
    </div>
    <div style="text-align: center">
      <img v-if="newinfo.PIC_URL!=undefined && newinfo.PIC_URL!=null" :src="newinfo.PIC_URL" alt="图片不存在" class="img-size">
    </div>

    <div class="new-cont">{{newinfo.NEWS_CONT}}</div>

    <!--评论框-->
    <div class="review">
      <textarea  v-model="reviewcont" class="rew-input" placeholder="请说两句吧。。。" placeholder-class="pla"/>
      <button class="rew-but" @click="userReview()">评论</button>
      <button class="rew-but" open-type="share" @click="sharePage">分享给好友</button>
    </div>
    <!--评论区-->
    <ul class="rew-ul">
      <div class="remen">热门评论</div>
      <li class="rew-li" v-for="item in reviews" :key="item.REVIEW_ID">
        <div style="margin:5px 0 0 10px;color: deepskyblue;">{{item.REVIEWER_NAME}}</div>
        <p style="margin-top: 5px;margin-left: 10px">{{item.REVIEW_CONT}}</p>
        <div style="margin:5px 0px 10px 10px">{{item.REVIEW_TIME}}</div>
      </li>
    </ul>
  </div>
</template>

<script>
  import utils from '@/utils/utils'

    export default {
      name: "newdetail",
      data () {
        return {
          newinfo:{
            NEWS_ID:'',
            NEWS_TITLE:'',
            NEWS_CONT:'',
            PIC_URL:'',
            AUTHOR:'',
            CREATE_TIME:'',
            STATE:'',
            NEWS_SORT:'',
            VIEW:'',
          },
          reviews:[],
          reviewcont:""
        }
      },
      created() {
        this.newinfo = {
          NEWS_ID:'',
            NEWS_TITLE:'',
            NEWS_CONT:'',
            PIC_URL:'',
            AUTHOR:'',
            CREATE_TIME:'',
            STATE:'',
            NEWS_SORT:'',
            VIEW:'',
        }
      },
      mounted() {
        this.getNewinfo()
        this.getReviewList()
      },
      computed: {
        time () {
          this.newinfo.CREATE_TIME = this.newinfo.CREATE_TIME.substr(0,10)
        },
        reviewtime () {
          var that = this
          for(let i = 0;i<that.reviews.length;i++){
            that.reviews[i].REVIEW_TIME = that.reviews[i].REVIEW_TIME.substr(0,10)
          }
        }
      },
      onReachBottom (){

      },
      onShareAppMessage (){
        console.log('onShareAppMessage')
      },
      onPullDownRefresh (){
        wx.showLoading({
          title: '玩命加载中',
        })
        this.getNewinfo()
        this.getReviewList()
        wx.hideLoading();
      },
      methods: {
        //获取新闻信息
        async getNewinfo() {
          var that = this;
          //通过id搜索新闻信息
          let res = await utils.get("/weapp/getnewinfo?id="+this.$root.$mp.query.id);

          if(res.status == '0'){
            that.newinfo = res.list;
            that.newinfo.PIC_URL = '/static/NewImg/'+that.newinfo.PIC_URL;
            //更新访问量
            let view = parseInt(that.newinfo.VIEW)+1;
            let upres = await utils.post("/weapp/upview",{newid:that.$root.$mp.query.id,view:view})
          }

        },
        //评论功能
        async userReview () {
          let that = this
          let user = wx.getStorageSync('userinfo')
          if(user){
            console.log(22222)
            if(that.reviewcont== "" || that.reviewcont==null){
              console.log(1111)
              utils.showMsg('评论内容不能为空','/static/home/nohappy.png')
              return false
            }
            let data = {
              id:user.openId,
              name:user.nickName,
              newid:that.newinfo.NEWS_ID,
              title:that.newinfo.NEWS_TITLE,
              review:that.reviewcont
            }

            let res = await utils.post('/weapp/review',data)
            if(res.status == '0'){
              that.getReviewList()
              that.reviews == ""
              utils.showMsg('评论成功','/static/home/success.png')

            }else {
              utils.showMsg('评论失败','/static/home/nohappy.png')
            }
          }else {
            utils.showMsg('用户未登录','/static/home/nohappy.png')
          }
        },
        //获取评论列表
        async getReviewList (){
          var that = this
          let res = await utils.get('/weapp/getreview',{'newid':this.$root.$mp.query.id})
          if(res.status == '0'){
            that.reviews = res.list
          }
        },
        sharePage () {
          console.log('share')

        }
      }
    }
</script>

<style scoped>
  * {
    font-size: 14px;
  }
  .img-size {
    margin: 5px auto;
    width: 95%;
    height: 220px;
  }
  .new-cont {
    width: 95%;
    padding: 5px 10px;
    font-size: 14px;

  }
  .eyeicon {
    width: 15px;
    height: 15px;
    float: right;
    margin: 3px 5px 0 0;

  }
  .new-au {
    font-size: 14px;
    color: silver;
    text-align: center;

    width: 93%;
    margin:5px auto;
  }
  .review {
    width: 100%;

  }
  .rew-input {
    margin: 5px auto;
    width:  95%;
    height: 100px;
    border: 1px solid silver ;
    border-radius:5px;
    padding: 5px 5px;
    font-size: 14px;
  }
  .pla {
    color: silver;
    font-size: 12px;
    padding: 5px 5px ;
  }
  .rew-but {
    background-color: #97CBFF;
    font-size: 14px;
    color: #fff;
    width: 30%;
    float: right;
    height: 35px;
    line-height: 35px;
    margin-right: 1%;
  }
  .rew-ul {
    width: 95%;
    margin: 45px auto;
    padding: 0;
  }
  .rew-li {
    width: 100%;
    font-size: 14px;
    border: 1px solid silver;
    -webkit-border-radius: 5px;
    -moz-border-radius: 5px;
    border-radius: 5px;
    margin-top: 2px;

  }
  .remen {
    font-size: 16px;
    border-left: 2px solid red;
    margin-bottom: 10px;
    padding-left: 5px;
  }
</style>
