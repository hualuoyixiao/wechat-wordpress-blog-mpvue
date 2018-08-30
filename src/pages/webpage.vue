<template>
  <div class="web-box">
    <web-view :src="url"></web-view>
  </div>
</template>

<script>
export default {
  data() {
    return {
     url: ""
    };
  },
  mounted() {
    this.url = this.$root.$mp.query.url;
  },
  computed: {
    
  },
  methods: {
    bookDetail (item) {
      // wx.navigateTo({
      //   url: '/pages/detail/main?id=' + item.id
      // })
    }
  }

}
</script>
<style lang="scss" scoped>

</style>

