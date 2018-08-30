<template>
  <div class='swiper'>
    <swiper
      :indicator-dots='true'
      indicator-color='#39f'
      indicator-active-color="#fff"
      :autoplay='true'
      :interval='5000'
      :duration='2000'
      :circular='true'
    >
      <div :key='imgindex' v-for='(top,imgindex) in tops'>
        <swiper-item>
          <img  
            @click='bookDetail(top)'
            class='slide-image'
            :src="top.src" 
            >
        </swiper-item>
      </div>
    
    </swiper>
  </div>
</template>

<script>
export default {
  props: ['tops'],
  computed: {
    
  },
  methods: {
    bookDetail (item) {
      wx.navigateTo({
        url: '/pages/webpage?url=' + item.url
      })
    }
  }

}
</script>
<style lang="scss" scoped>
.swiper{
  width: 100%;
  .slide-image{
    width: 100%;
    height: 100%;
  }
}
</style>

