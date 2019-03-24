const {mysql} = require('../qcloud')
module.exports = async (ctx) =>{
  let url = ctx.url;
  let query = ctx.query;
  const pagenum = query.pagenum;
  const pagesize = query.pagesize;
  const sortname = query.sortname;
  console.log(query)
  try{

    if(sortname == "" || sortname =="推荐"){
      const res = await mysql('newsxx').select('*')
        .limit(pagesize)
        .offset(Number(pagenum)*pagesize)
        .orderBy ('CREATE_TIME','desc');
      ctx.state.data = {
        status:"0",
        msg:"success",
        list: res
      }
    }else {
      const res = await mysql('newsxx').select('*')
        .where({"NEWS_SORT":sortname})
        .limit(pagesize)
        .offset(Number(pagenum)*pagesize)
        .orderBy ('CREATE_TIME','desc');
      ctx.state.data = {
        status:"0",
        msg:"success",
        list: res
      }

    }


  }catch(err) {
    ctx.state.data = {
      status:"1",
      msg:err,

    }
  }

}

/*module.exports = {
  getNews,
  post
}*/
