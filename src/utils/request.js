
import { baseUrl} from './constant'
var Fly=require("flyio/dist/npm/wx.js") //wx.js为flyio的微信小程序入口文件
const request = new Fly()

request.config.baseURL=baseUrl
request.config.timeout=5000

request.interceptors.request.use((request) => {
        // const csrfToken=wx.getStorageSync('authToken')
    
    //  if(csrfToken){
    //    const csrfTokenFormat=csrfToken
    //    request.headers['Authorization']=`Bearer ${csrfTokenFormat.accessToken}`
    //  }
  
     wx.showLoading({title:'加载中...'})
     return request
  })
  
 request.interceptors.response.use(
    (response, promise) => {
   
    
      wx.hideLoading()
      return promise.resolve(response.data)
    },
    (err, promise) => {
      wx.hideLoading()
      if(err){
        switch(err.status){
          case 400:
            wx.showToast({title:'没有更多数据'})
          break;
          case 401 :
             wx.clearStorageSync()
            //  wx.redirectTo({
            //   url:'/pages/login/login'
            // })
            break;
           
           default:
           wx.showToast({title:'连接错误'})
        }
      }else{
          wx.showToast({
            title:'请检查您的网络',
            icon:'none',
            duration:2000
          })  
      }  
      return promise.resolve()
    }
  )
  
  export default request