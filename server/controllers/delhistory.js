const {mysql} = require('../qcloud')
//删除历史搜索
module.exports = async(ctx)=> {
  let query = ctx.request.body

  await mysql('historysh').where('userid', query.userid).del()
}
