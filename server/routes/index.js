/**
 * ajax 服务路由集合
 */
const router = require('koa-router')({
    prefix: '/weapp'
})
const controllers = require('../controllers')

// 从 sdk 中取出中间件
// 这里展示如何使用 Koa 中间件完成登录态的颁发与验证
const { auth: { authorizationMiddleware, validationMiddleware } } = require('../qcloud')

// --- 登录与授权 Demo --- //
// 登录接口
router.get('/login', authorizationMiddleware, controllers.login)
// 用户信息接口（可以用来验证登录态）
router.get('/user', validationMiddleware, controllers.user)

// --- 图片上传 Demo --- //
// 图片上传接口，小程序端可以直接将 url 填入 wx.uploadFile 中
router.post('/upload', controllers.upload)

// --- 信道服务接口 Demo --- //
// GET  用来响应请求信道地址的
router.get('/tunnel', controllers.tunnel.get)
// POST 用来处理信道传递过来的消息
router.post('/tunnel', controllers.tunnel.post)

// --- 客服消息接口 Demo --- //
// GET  用来响应小程序后台配置时发送的验证请求
router.get('/message', controllers.message.get)
// POST 用来处理微信转发过来的客服消息
router.post('/message', controllers.message.post)


//其他获取数据接口
//获取所有新闻
router.get('/news',controllers.news)
//获取所有新闻栏目
router.get('/program',controllers.program)
//通过id获取新闻信息
router.get('/getnewinfo',controllers.getnewinfo)
//更新访问量
router.post('/upview',controllers.upview)
//获取评论
router.get('/getreview',controllers.getreview)
//用户评论
router.post('/review',controllers.review)
//用户搜索
router.get('/search',controllers.searchnew)
//获取历史搜索
router.post('/gethistoryword',controllers.gethistoryword)
//获取热门搜索
router.get('/gethotword',controllers.gethotword)
//增加历史搜索
router.post('/historysh',controllers.historyword)
//删除历史搜索
router.post('/delhistory',controllers.delhistory)
module.exports = router
