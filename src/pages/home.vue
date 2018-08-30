<template>
    <div class="container">
      <!-- 轮播图 -->
      <div>
        <TopSwiper :tops='tops'></TopSwiper>
      </div>  
      <!-- 搜索 -->
      <div class="seach">
        <van-search
          :value="keyWord"
          placeholder="请输入搜索关键词"
          @change="onChange"
          @search="onSearch"
        >
        </van-search>
      </div>

      <!-- 列表 -->
      <postsList :postsList='postsList'></postsList>

      <i-divider v-if="isFootShow" color="#c4c4c4" line-color="#fff" :content="copyInfo"></i-divider>
    </div>
</template>

<script>
import { posts } from "@/utils/api";
import TopSwiper from "@/components/TopSwiper";
import postsList from "@/components/postsList";
import {tops,copyInfo,appName} from '@/utils/constant'
export default {
  data() {
    return {
      isFootShow: false,
      page: 1,
      keyWord: "",
      tops: tops,
      postsList: [],
      copyInfo: copyInfo
    };
  },
  // 刷新
  onPullDownRefresh: function(){
    this.page = 1
    this.postsList = []
    this.getHomeData()
  },

  // 加载更多
  onReachBottom(){
    this.page++
    this.getHomeData()
    console.log("加载更多")
  },


  components: {
    TopSwiper,
    postsList
  },

  computed: {
   
  },
  methods: {
    getHomeData(){
      this.getPosts();
    },
    onChange(event) {
      this.keyWord = event.mp.detail;
    },
    //  搜索触发
    onSearch(event) {
      console.log("搜索："+this.keyWord);
      this.page = 1
      this.postsList = []
      this.getHomeData();
    },
    // 获取文章列表
    async getPosts() {
      console.log("获取文章列表："+this.page+"页")
      const data = {
        page: this.page,
        search: this.keyWord,
        categories: 0
      }
      let res = await posts(data)

      res.forEach(c => this.postsList.push(c))
      
      console.log(this.postsList)
      this.isFootShow = true
      wx.stopPullDownRefresh()
    },

    detailUrl (item) {
      console.log(item)
      wx.navigateTo({
        url: '/pages/homeDetails?id=' + item.id
      })
    }
  },

  mounted() {
    this.$nextTick(function () {
      this.getHomeData();
    })
  },
  onShareAppMessage(res) {
    if (res.from === "button") {
      // 来自页面内转发按钮
      console.log(res.target);
    }
    return {
      title: '分享"'+appName+'"的首页',
      path: "pages/home"
    };
  }
};
</script>

<style lang="scss" scoped>
.seach {
  border-bottom: 1px solid #eee;
}
</style>
