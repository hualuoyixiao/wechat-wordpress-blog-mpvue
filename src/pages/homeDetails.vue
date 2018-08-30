<template>
    <div class="container" v-if="isShow">
        <div class="headCon">
            <p class="title" v-text="title"></p>
            
            <div class="postItemRbCon">
                <div class="postItemRbhCon">
                    <img src="../../static/img/calendar.png"/>
                    <p v-text="itemDetails.date"></p>
                </div>

                <div class="postItemRbhCon">
                    <img src="../../static/img/category.png"/>
                    <p v-text="itemDetails.category_name"></p>
                </div>
                
                <div class="postItemRbhCon">
                    <img src="../../static/img/comments.png"/>
                    <p v-text="itemDetails.total_comments"></p>
                </div>

                    <div class="postItemRbhCon">
                    <img src="../../static/img/pageviews.png"/>
                    <p v-text="itemDetails.pageviews"></p>
                </div>

                <div class="postItemRbhCon">
                    <img src="../../static/img/home-like.png"/>
                    <p v-text="itemDetails.like_count"></p>
                </div>
                
            </div>
        </div>

        <!-- 正文 -->
        <div class="content">
            <wxParse :content="article" className="contentCon"/>
        </div>
        
        <i-divider v-if="isShow" style="margin-bottom: 150rpx;" color="#c4c4c4" line-color="#fff" :content="copyInfo"></i-divider>

        <!-- 底部按钮 -->
        <div class="bottomCon">

          <div class="bottomItemCon">
            <img class="itemImg" src="../../static/img/forwarding.png" />
            <p class="itemText">转发</p>
            <button class="share-button touch-active" open-type="share"></button>
          </div>


          <div class="bottomItemCon" @click="toWebPage">
            <img class="itemImg" src="../../static/img/copy.png" />
            <p class="itemText">原文</p>
          </div>

          <!-- <div class="bottomItemCon">
            <img class="itemImg" src="../../static/img/like.png" />
            <p class="itemText">点赞</p>
          </div> -->

          <div class="bottomItemCon" @click="previewImage">
            <img class="itemImg" src="../../static/img/appreciation.png" />
            <p class="itemText">支持</p>
          </div>
        </div>

        
    </div>
</template>

<script>
import { postsDetails } from "@/utils/api";
import wxParse from "mpvue-wxparse";
import { copyInfo,zanshang,appName } from "@/utils/constant";
export default {
  data() {
    return {
      WebsiteName: appName,
      isShow: false,
      bookId: "",
      itemDetails: {},
      title: "",
      article: "",
      savedImgUrl:"",
      copyInfo: copyInfo,
      zanshang: zanshang
    };
  },
  components: {
    wxParse
  },
  mounted() {
    this.bookId = this.$root.$mp.query.id;
    this.getPostsDetails();
  },
  onUnload(){
    console.log("销毁")
    this.isShow = false;
  },
  methods: {
    async getPostsDetails() {
      let res = await postsDetails(this.bookId);
      this.title = res.title.rendered;
      this.itemDetails = res;
      this.article = res.content.rendered;

      this.isShow = true;
    },
    // 支持，预览图片
    previewImage(){
      wx.previewImage({
        current: this.zanshang, // 当前显示图片的http链接
        urls: [this.zanshang] // 需要预览的图片http链接列表
      })
    },
    // 跳转到原文
    toWebPage(){
      wx.navigateTo({
        url: '/pages/webpage?url=' + this.itemDetails.link
      })
    }
    
  },
  onShareAppMessage(res) {
    if (res.from === "button") {
      // 来自页面内转发按钮
      console.log(res.target);
    }
    return {
      title: '分享"' + this.WebsiteName + '"的文章：' + this.title,
      path: "pages/homeDetails?id=" + this.itemDetails.id,
      imageUrl: this.itemDetails.post_thumbnail_image
    };
  }
};
</script>
<style lang="scss">
.contentCon {
  .p {
    .img {
      width: 100% !important;
    }
  }
}
</style>


<style lang="scss" scoped>
@import url("~mpvue-wxparse/src/wxParse.css");

.container {
  display: flex;
  height: 100%;
  flex-direction: column;
  .headCon {
    padding: 20rpx;
    display: flex;
    flex-direction: column;
    .title {
      font-size: 50rpx;
      color: rgb(32, 32, 32);
    }
    .postItemRbCon {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      margin-top: 20rpx;
      padding-right: 150rpx;
      padding-bottom: 10rpx;
      border-bottom: 1px solid #eee;

      .postItemRbhCon {
        display: inline-flex;
        align-items: center;
        p {
          font-size: 23rpx;
          color: #959595;
        }
        img {
          width: 27rpx;
          height: 27rpx;
          margin-right: 10rpx;
        }
      }
    }
  }

  .content {
    padding: 20rpx;
    
  }

  .bottomCon {
    background-color: #eee;
    position: fixed;
    bottom: 0;
    width: 100%;
    padding: 10rpx;
    border-top: 1px solid #eee;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    z-index:9999;
    .bottomItemCon {
      display: flex;
      flex-direction: column;
      align-items: center;

      .share-button{
        opacity: 0; 
        position:absolute;
        width: 30%;
        height: 100%;
        margin: 0;
        padding: 0;
        top:0;
        left: 0;

      }
      
      .itemImg {
        width: 50rpx;
        height: 50rpx;
        padding:10rpx;
      }
      .itemText {
        font-size: 24rpx;
        color: #959595;
      }
    }
  }
}
</style>
