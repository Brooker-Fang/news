const {mysql} = require('../qcloud')

module.exports = async(ctx)=>{
  let query = ctx.request.body

  try{
    let res = await mysql('historysh').select('*').where({'userid':query.userid})
    ctx.state.data = {
      status:"0",
      msg:"success",
      list: res
    }
  }catch (err){
    ctx.state.data = {
      status:"1",
      msg:"fail"
    }
  }

}
