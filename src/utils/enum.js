import { leftUrl,aboutId} from './constant'

// 获取首页文章数据
const posts = leftUrl+'/posts?per_page=10&orderby=date&order=desc&page='
// 获取文章详情
const postsDetails = leftUrl+'/posts/'
// 获取分类列表
const categories = leftUrl+'/categories?per_page=10&orderby=count&order=desc'
// 获取页面
const pages =  leftUrl+'/pages/'+aboutId

export default {
    posts:posts,
    postsDetails:postsDetails,
    categories: categories,
    pages: pages
}
