<template>
  <div>
    admin gogokey main page
    <div>
      <Button type="primary" @click="btAddNewKey">添加新Key</Button>
    </div>
    <gogo-public-key-list></gogo-public-key-list>
  </div>
</template>

<script>
  import gogoPublicKeyList from "./gogoPublicKeyList"
  export default {
    name: "gogoPublicKeyMain",
    components:{
      gogoPublicKeyList
    },
    methods: {
      loadAllData() {
        /**
         * 读取所有系统预定义的gogoKey
         */

      },
      btAddNewKey() {
        this.$router.push({
          name: 'gogoPublicKeyNew'
        })
      }
    }
  }
</script>

<style scoped>

</style>
