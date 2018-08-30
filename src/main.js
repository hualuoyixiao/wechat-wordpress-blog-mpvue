import Vue from 'vue'
import App from '@/App'
import store from '@/store'
import MpvueRouterPatch from 'mpvue-router-patch'

Vue.use(MpvueRouterPatch)

Vue.config.productionTip = false
App.store = store
App.mpType = 'app'

const app = new Vue(App)
app.$mount()

export default {
  // 这个字段走 app.json
  config: {
    pages: [],
    window: {
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#39f',
      navigationBarTitleText: '林朝昆Blog',
      navigationBarTextStyle: 'while'
    },
    tabBar: {
      color: '#fff',
      selectedColor: '#fff',
      backgroundColor: '#39f',
      list: [{
        iconPath: './static/img/homepage.png',
        selectedIconPath: './static/img/homepage_fill.png',
        pagePath: 'pages/home',
        text: '首页'
      }, {
        iconPath: './static/img/manage.png',
        selectedIconPath: './static/img/manage_fill.png',
        pagePath: 'pages/categories',
        text: '分类'
      }, {
        iconPath: './static/img/prompt.png',
        selectedIconPath: './static/img/prompt_fill.png',
        pagePath: 'pages/about',
        text: '关于'
      }]
    }
  }
}
