const {mysql} = require('../qcloud')
module.exports = async (ctx)=> {
  try{
    const res = await mysql('newsort').select('*')
    ctx.state.data = {
      status:"0",
      msg:"success",
      list:res
    }
  }catch (err){
    ctx.state.data = {
      status:"0",
      msg:err,

    }
  }

}
