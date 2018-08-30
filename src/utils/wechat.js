

import enums from './enum'

import { baseUrl } from './constant'

 export const setStorage= (key,val)=>{
   return new Promise( (resolve,reject) =>{
        wx.setStorage({
            key:key,
            data:val,
            success:function(res){
                resolve(res)
            },
            fail:function(err){
                reject(err)
            }
        })
   })
 }

 export const getStorage= (key) => {
     return new Promise((resolve,reject) => {
         wx.getStorage({
             key:key,
             success:function(res){
                 resolve(res)
             },
             fail:function(err){
                reject(err)
             }
         })
     })
 }

 //上传本地文件图片到服务器
export const uploadFile = (data) => {
    const csrfToken=wx.getStorageSync('authToken')
    return new Promise((resolve,reject) =>{
        wx.uploadFile({
          url:baseUrl + enums.uploadMileageImg,
          filePath:data, 
          formData:{"Content-Type": "image/jpg"},
          name: 'file',
          header: {'Authorization':`Bearer ${csrfToken.accessToken}`,
                "Content-Type": "multipart/form-data", //表单提交时伴随文件上传的场合
          },
          success: function (res) {
             resolve(res)
          },
          fail: function (e) {
            reject(e)
          }
      })  
    })
}