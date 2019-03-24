const {mysql} = require('../qcloud')

module.exports = async (ctx)=>{
  let query = ctx.query
  console.log(query)
  let word = query.word
  let likeword = '%'+word+'%'
  //搜索新闻
  let res = await mysql('newsxx').where('NEWS_TITLE', 'like', likeword)

  //查找表里是否已存在搜索词汇
  let isres = await mysql('keyword').select('*').where({'keyword':word})
  console.log(isres)
  if(isres.length>0){
    //若存在，则更新搜索次数num+1，
    try {
      await mysql('keyword').where({'keyword':word}).increment('num',1)
      ctx.state.data = {
        status:"0",
        msg:"success",
        list:res
      }
    }catch (err){
      ctx.state.data = {
        status:"1",
        msg:"fail"
      }
    }
  }else {
    //不存在则进行插入，
    try {
      await mysql('keyword').insert({'keyword':word,'num':1})
      ctx.state.data = {
        status:"0",
        msg:"success",
        list:res
      }
    }catch (err){
      ctx.state.data = {
        status:"1",
        msg:"fail"
      }
    }
  }
}
