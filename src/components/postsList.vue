<template>
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
</template>

<script>
export default {
  props: ["postsList"],
  methods: {
    detailUrl(item) {
      console.log(item);
      wx.navigateTo({
        url: "/pages/homeDetails?id=" + item.id
      });
    }
  }
};
</script>

<style lang="scss" scoped>
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
        height: 20rpx;
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
