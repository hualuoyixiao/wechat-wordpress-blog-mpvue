<template>
    <div class="boxCon" v-if="isShow">
        <div class="topCon">
            <img :src="aboutImg" class="topImg"/>
            <p class="topText" v-text="aboutText"></p>
            <p class="topText topText2" v-text="aboutText2"></p>
        </div>
         <!-- 正文 -->
        <div class="contentCon">
            <wxParse :content="article" className="contentParse"/>
        </div>

        <i-divider color="#c4c4c4" line-color="#fff" :content="copyInfo"></i-divider>
    </div>
</template>

<script>
import wxParse from "mpvue-wxparse";
import { pages } from "@/utils/api";
import { copyInfo,aboutImg,aboutText,aboutText2 } from "@/utils/constant";
export default {
  data() {
    return {
      article: "",
      isShow: false,
      copyInfo: copyInfo,
      aboutImg: aboutImg,
      aboutText: aboutText,
      aboutText2: aboutText2
    };
  },
  components: {
    wxParse
  },
  methods: {
    async getAbout() {
      let res = await pages();
      this.article = res.content.rendered;
      this.isShow = true
    }
  },
  mounted() {
      this.getAbout()
  }
};
</script>

<style lang="scss" scoped>
@import url("~mpvue-wxparse/src/wxParse.css");
.boxCon {
  display: flex;
  flex-direction: column;
  .topCon {
    display: flex;
    flex-direction: column;
    padding: 50rpx 50rpx;
    align-items: center;
    text-align: center;
    .topImg {
      width: 100%;
      height: 260rpx;
      margin-bottom: 30rpx;
    }
    .topText {
      font-size: 30rpx;
      line-height: 50rpx;
      color: #757575;
      width: 100%;
    }
    .topText2 {
      border-bottom: 2rpx solid #ededed;
      padding-bottom: 20rpx;
    }
  }
  .contentCon{
      padding: 20rpx;
  }
}
</style>
