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
      selectedColor: '#39f',
      list: [{
        iconPath: './static/img/shouye.png',
        selectedIconPath: './static/img/shouye1.png',
        pagePath: 'pages/home',
        text: '首页'
      }, {
        iconPath: './static/img/fenlei.png',
        selectedIconPath: './static/img/fenlei1.png',
        pagePath: 'pages/categories',
        text: '分类'
      }, {
        iconPath: './static/img/guanyu.png',
        selectedIconPath: './static/img/guanyu1.png',
        pagePath: 'pages/about',
        text: '关于'
      }]
    }
  }
}
