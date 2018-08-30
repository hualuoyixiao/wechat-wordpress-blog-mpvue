<template>
    <div class="box" v-if="isShow">
        <div class="boxCon">
            <div class="cateItemCon" :key="index" v-for="(item,index) in categors" @click="toWebPage(item)">
                <img :src="item.category_thumbnail_image" class="cateImg"/>
                <div class="cateItemBCon">
                    <p class="cateName" v-text="item.name"></p>
                    <p class="cateCount" v-text="item.count">篇</p>
                </div>
                <p class="cateDes" v-text="item.description"></p>
            </div>
        </div>
        <i-divider color="#c4c4c4" line-color="#fff" :content="copyInfo"></i-divider>
    </div>
    
</template>

<script>
import { categories } from "@/utils/api";
import { copyInfo } from "@/utils/constant";
export default {
  data() {
    return {
      categors: [],
      isShow: false,
      copyInfo: copyInfo
    };
  },
  mounted() {
    this.getCategories();
  },
  methods: {
    // 获取分类
    async getCategories() {
      let res = await categories();
      this.categors = res;

      console.log(res);
      this.isShow = true;
      wx.stopPullDownRefresh()
    },
    // 跳转网页
    toWebPage(item) {
      wx.navigateTo({
        url: "/pages/categoriesList?categoriesId=" + item.id
      });
    }
  },
  // 刷新
  onPullDownRefresh: function() {
    this.page = 1;
    this.categors = [];
    this.getCategories();
  }
};
</script>

<style lang="scss" scoped>
.box {
  display: flex;
  flex-direction: column;
  .boxCon {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    .cateItemCon {
      display: flex;
      flex-direction: column;
      width: 50%;
      padding-top: 20rpx;
      padding-bottom: 50rpx;
      align-items: center;
      .cateImg {
        width: 303rpx;
        height: 303rpx;
        border-radius: 12rpx;
        align-self: center;
      }
      .cateItemBCon {
        display: flex;
        flex-direction: row;
        justify-content: space-around;
        width: 100%;
        margin-top: 10rpx;
        margin-bottom: 20rpx;
        align-items: center;

        .cateName {
          font-size: 30rpx;
          line-height: 30rpx;
          color: #1b1b1b;
        }
        .cateCount {
          font-size: 30rpx;
          color: rgb(121, 121, 121);
        }
      }
      .cateDes {
        font-size: 28rpx;
        line-height: 1.4;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 1;
        -webkit-box-orient: vertical;
        color: #959595;
        padding: 0 35rpx;
      }
    }
  }
}
</style>
