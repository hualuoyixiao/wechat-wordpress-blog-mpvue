//vue init F-loat/mpvue-quickstart my-project(初始化项目)
import request from'./request'
import enums from './enum'

// 获取首页文章数据
export const posts = (data) => request.get(enums.posts+data.page+"&search="+data.search+(data.categories==0?"":"&categories="+data.categories))
// 获取文章详情
export const postsDetails = (data) => request.get(enums.postsDetails+data)
// 获取分类
export const categories = () => request.get(enums.categories)
// 获取分类信息
export const categorieInfo = (data) => request.get(enums.categorieInfo+data)
// 获取页面
export const pages = () => request.get(enums.pages)

//注册
// export const reqister= (data) => request.post(enums.register,data)
