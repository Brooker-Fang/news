const {mysql} = require('../qcloud')

module.exports = async(ctx)=>{
  let res = await mysql('keyword').select('*').limit(6).orderBy('num','desc')
  ctx.state.data = {
    status: "0",
    msg: "success",
    list: res
  }
}
