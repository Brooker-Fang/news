import config from './config'

//get请求
export async function get (url,data) {
  return request(url,data,'GET')
}
//post请求
export async function post(url,data) {
  return request(url,data,'POST')
}
export async function request(url,data,method,header = {}) {
  return new Promise ((resolve,reject) => {
    wx.request ({
      data,
      method,
      url:config.host+url,
      success:function (res) {
        if(res.data.data.status =='0'){
          resolve(res.data.data)
        }else {
          reject(res.data.data)
        }
      },
      fail (res) {
        console.log('error')
      }
    })
  })
}
function showMsg () {
  var title = arguments[0]? arguments[0]:null;
  var url = arguments[1]? arguments[1]:null;
  if (url){
    wx.showToast ({
      title: title,
      icon: 'success',
      image : url,
      duration: 500
    })
  } else {
    wx.showToast ({
      title: title,
      icon: 'success',
      duration: 500
    })
  }

}
export default {
  get,showMsg,post

}
