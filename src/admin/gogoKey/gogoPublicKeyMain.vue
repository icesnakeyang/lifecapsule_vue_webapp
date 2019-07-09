<template>
  <div>
    admin gogokey main page
    <div>
      <Button type="primary" @click="btAddNewKey">添加新Key</Button>
    </div>
  </div>
</template>

<script>
  export default {
    name: "gogoPublicKeyMain",
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
