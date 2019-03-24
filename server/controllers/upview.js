const {mysql} = require('../qcloud')

module.exports = async (ctx)=> {

  let url = ctx.url
  let query = ctx.request.body
  let newid = query.newid
  let view = query.view
  console.log(query)
  try{
    await mysql('newsxx').where({'NEWS_ID':newid})
      .update({"VIEW":view})
    ctx.state.data = {
      status:"0",
      msg:"success"
    }
  } catch(err) {
    ctx.state.data = {
      status:"1",
      msg:"fail",
      error:err
    }
  }


}
