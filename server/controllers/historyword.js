const {mysql} = require('../qcloud')

module.exports = async(ctx)=>{
  let query = ctx.request.body
  let now = new Date()
  //先查找是否已存在搜索
  let res = await mysql('historysh').select('*').where({'keyword':query.word})
  //不存在则进行插入
  if(res.length<=0){
    try{
      await mysql('historysh').insert({'userid':query.userid,'keyword':query.word,'time':now})
      ctx.state.data = {
        status:"0",
        msg:"success"
      }
    }catch (err){
      ctx.state.data = {
        status:"1",
        msg:"fail"
      }
    }
  }else {
    ctx.state.data = {
      status:"0",
      msg:"历史搜索已存在"
    }
  }


}
