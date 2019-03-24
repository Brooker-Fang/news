const {mysql} = require('../qcloud')

module.exports = async (ctx)=> {
  let query = ctx.query
  let newid = query.newid
  const res = await mysql('review').select('*')
    .where({'NEW_ID':newid})
    .orderBy('REVIEW_TIME','desc')
  ctx.state.data = {
    status : "0",
    msg : "success",
    list : res
  }
}
