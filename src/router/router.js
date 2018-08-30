// 首个路由为首页
module.exports = [
    {
        path: 'pages/home',
        name: 'home',
        config: {
            navigationBarTitleText: '首页',
            backgroundTextStyle: "light",
            backgroundColor: "#39f",
            enablePullDownRefresh: true,
            usingComponents: {
                "van-search": "../vant-ui/search/index",
                "i-divider": "../iview-ui/divider/index",
                "van-tag": "../vant-ui/tag/index"
            }
        }
    },
    {
        path: 'pages/homeDetails',
        name: 'details',
        config: {
            navigationBarTitleText: '详情',
            usingComponents: {
                "i-divider": "../iview-ui/divider/index"
            }
        }
    },
    {
        path: 'pages/webpage',
        name: 'webpage',
    },
    {
        path: 'pages/categories',
        name: 'categories',
        config: {
            navigationBarTitleText: '分类',
            backgroundTextStyle: "light",
            backgroundColor: "#39f",
            enablePullDownRefresh: true,
            usingComponents: {
                "i-divider": "../iview-ui/divider/index"
            }
        }
    },
    {
        path: 'pages/about',
        name: 'about',
        config: {
            navigationBarTitleText: '关于',
            usingComponents: {
                "i-divider": "../iview-ui/divider/index"
            }
        }
    },
    {
        path: 'pages/index',
        name: 'Index',
        config: {
            navigationBarTitleText: '文章详情',
        }
    },
    {
        path: 'pages/counter',
        name: 'List',
        config: {
            navigationBarTitleText: 'list详情'
        }
    }
]