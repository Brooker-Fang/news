const {mysql} = require("../qcloud")

module.exports = async (ctx)=>{
  let url = ctx.url;
  let query = ctx.query;
  let querystr = ctx.querystring
  const id = query.id
  const res = await mysql("newsxx").select('*').where('NEWS_ID',id).first();
  ctx.state.data = {
    status:"0",
    msg:"success",
    list:res
  }

}
