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
      <div class="postsListCon">
        <div @click='detailUrl(item)' class="postsItemCon" :key="index" v-for="(item,index) in postsList">
            <img class="postsItemImg" :src="item.post_thumbnail_image" />

            <div class="postItemRCon">

                <div class="postItemRTitleCon">
                  <p class="title" v-text="item.title.rendered"></p>
                </div>
                
                <div class="postItemRbCon">

                    <div class="postItemRbhCon">
                        <img src="../../static/img/category.png"/>
                        <p v-text="item.category_name"></p>
                    </div>

                    <div class="postItemRbhCon">
                        <img src="../../static/img/calendar.png"/>
                        <p v-text="item.date"></p>
                    </div>

                    <div class="postItemRbhCon">
                        <img src="../../static/img/comments.png"/>
                        <p v-text="item.total_comments"></p>
                    </div>

                     <div class="postItemRbhCon">
                        <img src="../../static/img/pageviews.png"/>
                        <p v-text="item.pageviews"></p>
                    </div>

                    <div class="postItemRbhCon">
                        <img src="../../static/img/home-like.png"/>
                        <p v-text="item.like_count"></p>
                    </div>
                    
                </div>
            </div>
        </div>
        
      </div>

      <i-divider v-if="isFootShow" color="#c4c4c4" line-color="#fff" :content="copyInfo"></i-divider>
    </div>
</template>

<script>
import { posts } from "@/utils/api";
import TopSwiper from "@/components/TopSwiper";
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
    TopSwiper
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
        search: this.keyWord
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
.postsItemCon {
  display: flex;
  flex-direction: row;
  padding: 24rpx;
  border-bottom: 1px solid #eee;
  .postsItemImg {
    width: 200rpx;
    height: 150rpx;
    margin-right: 35rpx;
  }
  .postItemRCon {
    display: flex;
    flex-direction: column;
    flex: 1;
    justify-content: space-between;
    .postItemRTitleCon {
      display: inline-flex;
      flex-direction: row;
      justify-content: flex-start;
      .tabFenLei {
        height: 20rpx;;
      }
      .title {
        font-size: 30rpx;
        color: #3a4040;
        line-height: 1.4;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
      }
    }

    .postItemRbCon {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      padding-right: 10rpx;

      .postItemRbhCon {
        display: inline-flex;
        align-items: center;
        p {
          font-size: 20rpx;
          color: #959595;
        }
        img {
          width: 24rpx;
          height: 24rpx;
          margin-right: 10rpx;
        }
      }
    }
  }
}
</style>
