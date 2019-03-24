const {mysql} = require('../qcloud')
module.exports = async (ctx)=> {
  let now = new Date()
  let query = ctx.request.body
  console.log(query)
  try{
    await mysql('review')
      .insert({'REVIEW_CONT':query.review,'REVIEWER_NAME':query.name,'REVIEW_TIME':now,
        'NEW_ID':query.newid,'REVIEWER_ID':query.id,'NEW_TITLE':query.title})
    ctx.state.data = {
      status : "0",
      msg : "success",
    }
  }catch (err){
    ctx.state.data = {
      status : "1",
      msg : "fail",
      error : err
    }
  }

}
