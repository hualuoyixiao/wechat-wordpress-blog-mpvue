<template>
    <div class="boxCon" v-if="isShow">
        <div class="topCon">
            <img class="topImg" :src="categorieInfo.category_thumbnail_image"/>
            <p class="topText" v-text="categorieInfo.name"></p>
            <div class="topLine"></div>
            <p class="topDes" v-text="categorieInfo.description"></p>
        </div>
        <!-- 列表 -->
      <postsList :postsList='postsList'></postsList>

      <i-divider color="#c4c4c4" line-color="#fff" :content="copyInfo"></i-divider>
    </div>
</template>

<script>
import { posts, categorieInfo } from "@/utils/api";
import postsList from "@/components/postsList";
import { copyInfo } from "@/utils/constant";
export default {
  data() {
    return {
      isShow: false,
      page: 1,
      keyWord: "",
      categoriesId: 0,
      postsList: [],
      categorieInfo: {},
      copyInfo: copyInfo
    };
  },
  // 刷新
  onPullDownRefresh: function() {
    this.page = 1;
    this.postsList = [];
    this.getPosts();
  },

  // 加载更多
  onReachBottom() {
    this.page++;
    this.getPosts();
  },
  components: {
    postsList
  },
  methods: {
    // 获取分类
    async getCategorieInfo() {
      let res = await categorieInfo(this.categoriesId);
      this.categorieInfo = res;
    },

    // 获取文章列表
    async getPosts() {
      console.log("获取文章列表：" + this.page + "页");
      const data = {
        page: this.page,
        search: this.keyWord,
        categories: this.categoriesId
      };
      let res = await posts(data);

      res.forEach(c => this.postsList.push(c));

      console.log(this.postsList);
      this.isShow = true;
      wx.stopPullDownRefresh();
    }
  },
  mounted() {
    this.$nextTick(function() {
      this.isShow = false;
      this.page = 1;
      this.postsList = [];
      this.categoriesId = this.$root.$mp.query.categoriesId;

      this.getCategorieInfo();
      this.getPosts();
    });
  },

  onShareAppMessage(res) {
      const that = this
    if (res.from === "button") {
      // 来自页面内转发按钮
      console.log(res.target);
    }
    return {
      title: '分享"' + that.categorieInfo.name + '"的文章',
      path: "pages/categoriesList?categoriesId=" + this.categoriesId
    };
  }
};
</script>

<style lang="scss" scoped>
.boxCon {
  display: flex;
  flex-direction: column;
  .topCon {
    position: relative;
    overflow: hidden;
    clear: both;
    margin-bottom: 30rpx;

    .topImg {
      width: 100%;
      height: 375rpx;
      filter: blur(4px);
    }
    .topText {
      padding: 16rpx 0rpx;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      position: absolute;
      z-index: 2;
      left: 60rpx;
      top: 120rpx;
      font-size: 48rpx;
      line-height: 48rpx;
      color: #fff;
    }
    .topLine {
      width: 48px;
      padding: 16rpx 0rpx;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      position: absolute;
      border-bottom: 1px solid #fff;
      z-index: 2;
      left: 64rpx;
      top: 180rpx;
    }
    .topDes {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      position: absolute;
      z-index: 2;
      left: 60rpx;
      top: 240rpx;
      font-size: 32rpx;
      line-height: 32rpx;
      color: #fff;
    }
  }
}
</style>
